import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/ui/custom-select";
import { SelectItem } from "@/components/ui/select";
import { Search, Filter, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentPreview } from "./ContentPreview";
import { generatePDF } from "@/utils/pdfGenerator";
import { Json } from "@/integrations/supabase/types";
import { toast } from "sonner";

interface GeneratedContent {
  id: string;
  source_type: string;
  source_url: string;
  subject: string;
  created_at: string;
  output_language: string;
  target_age: string;
  generated_outputs: Json;
  difficulty: string;
  selected_features: string[];
  user_id: string;
}

export const GeneratedContentView = () => {
  const [content, setContent] = useState<GeneratedContent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [contentFilter, setContentFilter] = useState("All Content");
  const [languageFilter, setLanguageFilter] = useState("All Languages");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  useEffect(() => {
    fetchGeneratedContent();
  }, []);

  const handleDownloadPDF = async (content: string, feature: string) => {
    try {
      const plainText = content.replace(/\*\*(.*?)\*\*/g, '$1');
      await generatePDF(plainText, `${feature} - Generated Content`);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF');
    }
  };

  const fetchGeneratedContent = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('generated_content')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching content:', error);
      return;
    }

    setContent(data || []);
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = 
      item.source_url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = sourceFilter === "All Sources" || item.source_type === sourceFilter.toLowerCase();
    const matchesLanguage = languageFilter === "All Languages" || item.output_language === languageFilter;
    return matchesSearch && matchesSource && matchesLanguage;
  });

  const toggleContentExpansion = (id: string) => {
    setExpandedContent(expandedContent === id ? null : id);
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 font-['Plus Jakarta Sans'] text-white">Generated Content</h1>
      
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 bg-[#2A2D3A]/50 border-gray-700 text-white"
            placeholder="Search by content type or source name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <CustomSelect 
            value={sourceFilter} 
            onValueChange={setSourceFilter}
            placeholder="Select Source"
          >
            <SelectItem value="All Sources">All Sources</SelectItem>
            <SelectItem value="YouTube">YouTube</SelectItem>
            <SelectItem value="Audio">Audio</SelectItem>
            <SelectItem value="Podcast">Podcast</SelectItem>
          </CustomSelect>

          <CustomSelect 
            value={contentFilter} 
            onValueChange={setContentFilter}
            placeholder="Select Content Type"
          >
            <SelectItem value="All Content">All Content</SelectItem>
            <SelectItem value="Summaries">Summaries</SelectItem>
            <SelectItem value="Quizzes">Quizzes</SelectItem>
          </CustomSelect>

          <CustomSelect 
            value={languageFilter} 
            onValueChange={setLanguageFilter}
            placeholder="Select Language"
          >
            <SelectItem value="All Languages">All Languages</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="Hindi">Hindi</SelectItem>
          </CustomSelect>

          <CustomSelect 
            value={timeFilter} 
            onValueChange={setTimeFilter}
            placeholder="Select Time Period"
          >
            <SelectItem value="All Time">All Time</SelectItem>
            <SelectItem value="Last Week">Last Week</SelectItem>
            <SelectItem value="Last Month">Last Month</SelectItem>
          </CustomSelect>
        </div>

        <div className="space-y-4">
          {filteredContent.map((item) => (
            <Card key={item.id} className="p-6 bg-[#2A2D3A]/50 backdrop-blur-lg border border-white/10">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <ContentPreview url={item.source_url} type={item.source_type as any} />
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded-full text-xs bg-[#9b87f5]/20 text-[#9b87f5]">
                      {item.source_type}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-[#9b87f5]/20 text-[#9b87f5]">
                      {item.output_language}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-[#9b87f5]/20 text-[#9b87f5]">
                      {item.target_age}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => toggleContentExpansion(item.id)}
                  className="text-[#9b87f5] hover:text-[#8B5CF6] transition-colors"
                >
                  {expandedContent === item.id ? "Hide Details" : "View Details"}
                </Button>
              </div>

              {expandedContent === item.id && (
                <div className="mt-4 space-y-4">
                  {Object.entries(item.generated_outputs as Record<string, string>).map(([feature, content]) => (
                    <div key={feature} className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-white">{feature}</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
                          onClick={() => handleDownloadPDF(content, feature)}
                        >
                          Download PDF
                        </Button>
                      </div>
                      <div 
                        className="whitespace-pre-wrap text-gray-300"
                        dangerouslySetInnerHTML={{ __html: formatContent(content) }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}

          {filteredContent.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No content found matching your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};