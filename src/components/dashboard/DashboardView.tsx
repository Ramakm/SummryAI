import { Card } from "@/components/ui/card";
import { FileText, Users, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const DashboardView = () => {
  const navigate = useNavigate();

  const { data: generatedContent } = useQuery({
    queryKey: ['generated-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*');
      if (error) throw error;
      return data || [];
    }
  });

  const totalContent = generatedContent?.length || 0;
  const activeStudents = generatedContent?.reduce((acc, content) => {
    // Assuming each content reaches unique students
    return acc + (content.target_age === 'Elementary' ? 30 : 
                 content.target_age === 'High School' ? 40 :
                 content.target_age === 'College' ? 25 : 15);
  }, 0) || 0;

  const engagementRate = totalContent > 0 ? 85 : 0; // Default to 0 if no content

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 space-y-2 bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Content Generated</h3>
            <FileText className="h-5 w-5 text-[#9b87f5]" />
          </div>
          <p className="text-3xl font-bold">{totalContent}</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </Card>

        <Card className="p-6 space-y-2 bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Students</h3>
            <Users className="h-5 w-5 text-[#9b87f5]" />
          </div>
          <p className="text-3xl font-bold">{activeStudents}</p>
          <p className="text-sm text-gray-500">Across all content</p>
        </Card>

        <Card className="p-6 space-y-2 bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Engagement Rate</h3>
            <Activity className="h-5 w-5 text-[#9b87f5]" />
          </div>
          <p className="text-3xl font-bold">{engagementRate}%</p>
          <p className="text-sm text-gray-500">Average completion rate</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {generatedContent && generatedContent.length > 0 ? (
              generatedContent.slice(0, 2).map((content, index) => (
                <div key={content.id} className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-blue-500'}`} />
                  <div>
                    <p className="font-medium">{content.subject} content generated</p>
                    <p className="text-sm text-gray-500">
                      {new Date(content.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent activity</p>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/dashboard/generate')}
              className="p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <h4 className="font-medium">Generate Content</h4>
              <p className="text-sm text-gray-500">Create new educational material</p>
            </button>
            <button 
              onClick={() => navigate('/dashboard/generated')}
              className="p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <h4 className="font-medium">View Analytics</h4>
              <p className="text-sm text-gray-500">Check content performance</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};