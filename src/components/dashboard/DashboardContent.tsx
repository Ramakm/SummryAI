import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Pricing } from "@/components/Pricing";
import { FeedbackForm } from "@/components/dashboard/FeedbackForm";
import { HelpSidebar } from "@/components/dashboard/HelpSidebar";
import { GeneratedContentView } from "@/components/dashboard/GeneratedContentView";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { GenerateContentView } from "@/components/dashboard/GenerateContentView";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DashboardContentProps {
  activeSection: string;
}

export const DashboardContent = ({ activeSection }: DashboardContentProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (!session) {
          navigate("/auth");
          return;
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw userError;
        }

        if (!user) {
          navigate("/auth");
          return;
        }

        setUser(user);

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else {
          setProfile(profileData);
        }
      } catch (error: any) {
        console.error("Auth error:", error.message);
        toast.error("Authentication error. Please sign in again.");
        navigate("/auth");
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3D]">
      <div className="mb-8 animate-fade-up">
        <h1 className="text-4xl font-bold text-white font-['Plus Jakarta Sans']">
          Welcome back, {profile?.full_name || user.email.split('@')[0]}!
        </h1>
      </div>
      
      <div className="animate-fade-up animation-delay-200">
        {activeSection === "dashboard" && <DashboardView />}
        {activeSection === "generate" && <GenerateContentView />}
        {activeSection === "generated" && <GeneratedContentView />}
        {activeSection === "billing" && <Pricing />}
        {activeSection === "feedback" && <FeedbackForm />}
        {activeSection === "help" && <HelpSidebar />}
      </div>
    </div>
  );
};