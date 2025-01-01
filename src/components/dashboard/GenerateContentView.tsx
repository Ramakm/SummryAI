import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/ui/custom-select";
import { SelectItem } from "@/components/ui/select";
import { Search, FileText } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ContentPreview } from "./ContentPreview";
import { generatePDF } from "@/utils/pdfGenerator";

export const GenerateContentView = () => {
  const [selectedTab, setSelectedTab] = useState("youtube");
  const [sourceUrl, setSourceUrl] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [outputLanguage, setOutputLanguage] = useState("");
  const [targetAge, setTargetAge] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const subjects = [
    "General", "Mathematics", "Science", "History", "Geography", 
    "Literature", "Entertainment", "Technology", "Arts", "Music"
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const languages = [
    "English", "Spanish", "German", "French", "Italian", "Portuguese",
    "Hindi", "Tamil", "Telugu", "Odia", "Kannada", "Punjabi", "Bengali"
  ];

  const ageGroups = ["Elementary", "High School", "College", "Adult"];

  const handleGenerateContent = async () => {
    if (!sourceUrl || !subject || !difficulty || !outputLanguage || !targetAge || selectedFeatures.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          sourceType: selectedTab,
          sourceUrl,
          subject,
          difficulty,
          language: outputLanguage,
          targetAge,
          selectedFeatures,
        }
      });

      if (error) throw error;

      const { data: savedContent, error: saveError } = await supabase
        .from('generated_content')
        .insert({
          user_id: user.id,
          source_type: selectedTab,
          source_url: sourceUrl,
          subject,
          difficulty,
          output_language: outputLanguage,
          target_age: targetAge,
          selected_features: selectedFeatures,
          generated_outputs: data.outputs
        })
        .select()
        .single();

      if (saveError) throw saveError;

      setGeneratedContent(data.outputs);
      toast.success("Content generated successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  const handleDownloadPDF = (content: string, feature: string) => {
    const plainText = content.replace(/\*\*(.*?)\*\*/g, '$1');
    generatePDF(plainText, `${feature} - Generated Content`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 animate-fade-up">
        <h1 className="text-4xl font-bold text-white font-['Plus Jakarta Sans']">Transform Content into Educational Materials</h1>
        <p className="text-xl text-gray-400 font-['Inter']">
          Create engaging educational content from any video or audio source
        </p>
      </div>

      <Card className="p-6 space-y-6 bg-[#2A2D3A]/50 backdrop-blur-lg border border-white/10 animate-fade-up animation-delay-200">
        <div className="flex gap-4 p-4 bg-gray-50 rounded-lg overflow-x-auto">
          {["youtube", "audio", "podcast"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedTab === tab ? "bg-white shadow text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Source URL</label>
            <Input 
              placeholder={`Paste ${selectedTab} URL here...`}
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Subject/Topic</label>
              <CustomSelect
                value={subject}
                onValueChange={setSubject}
                placeholder="Select Subject/Topic"
              >
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </CustomSelect>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Difficulty Level</label>
              <CustomSelect
                value={difficulty}
                onValueChange={setDifficulty}
                placeholder="Select Difficulty Level"
              >
                {difficulties.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </CustomSelect>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Output Language</label>
              <CustomSelect
                value={outputLanguage}
                onValueChange={setOutputLanguage}
                placeholder="Select Output Language"
              >
                {languages.map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </CustomSelect>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Target Age Group</label>
              <CustomSelect
                value={targetAge}
                onValueChange={setTargetAge}
                placeholder="Select Target Age Group"
              >
                {ageGroups.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </CustomSelect>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Features to Generate</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {["Summary", "Lesson Outline", "Quiz Generator"].map((feature) => (
                <Card
                  key={feature}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedFeatures.includes(feature)
                      ? "border-blue-500 shadow-md"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => {
                    setSelectedFeatures((prev) =>
                      prev.includes(feature)
                        ? prev.filter((f) => f !== feature)
                        : [...prev, feature]
                    );
                  }}
                >
                  <div className="flex items-center gap-3">
                    <FileText className={`w-8 h-8 ${
                      selectedFeatures.includes(feature) ? "text-blue-500" : "text-gray-500"
                    }`} />
                    <div>
                      <h4 className="font-semibold">{feature}</h4>
                      <p className="text-sm text-gray-600">
                        {feature === "Summary" && "Create concise content summaries"}
                        {feature === "Lesson Outline" && "Generate structured lesson plans"}
                        {feature === "Quiz Generator" && "Create interactive assessments"}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleGenerateContent}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? "Generating..." : "Generate Content"}
          </Button>
        </div>
      </Card>

      {sourceUrl && <ContentPreview url={sourceUrl} type={selectedTab as any} />}

      {generatedContent && (
        <Card className="mt-8 p-6 space-y-6 bg-[#2A2D3A]/50 backdrop-blur-lg border border-white/10">
          <h2 className="text-2xl font-bold text-white">Generated Content</h2>
          {Object.entries(generatedContent).map(([feature, content]) => (
            <Card key={feature} className="p-4 bg-[#1F2937]/50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-white">{feature}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
                  onClick={() => handleDownloadPDF(content as string, feature)}
                >
                  Download PDF
                </Button>
              </div>
              <div 
                className="whitespace-pre-wrap text-gray-300"
                dangerouslySetInnerHTML={{ __html: formatContent(content as string) }}
              />
            </Card>
          ))}
        </Card>
      )}
    </div>
  );
};
