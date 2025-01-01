import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface ContentPreviewProps {
  url: string;
  type: "youtube" | "audio" | "podcast";
}

export const ContentPreview = ({ url, type }: ContentPreviewProps) => {
  const [title, setTitle] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");

  useEffect(() => {
    const fetchPreview = async () => {
      if (!url) return;
      
      try {
        const { data, error } = await supabase.functions.invoke('fetch-content-preview', {
          body: { url, type }
        });
        
        if (error) throw error;
        
        setTitle(data.title);
        setThumbnail(data.thumbnail);
      } catch (error) {
        console.error('Error fetching preview:', error);
      }
    };

    fetchPreview();
  }, [url, type]);

  if (!url) return null;

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-start gap-4">
        {thumbnail && (
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-32 h-24 object-cover rounded"
          />
        )}
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600">{url}</p>
        </div>
      </div>
    </Card>
  );
};