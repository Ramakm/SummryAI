import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check for user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        duration: 2000,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1A1F2C]/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-xl font-semibold text-white font-['Plus Jakarta Sans']">
            SummryAI
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/#features"
              className="text-sm font-medium text-[#C8C8C9] hover:text-white transition-colors font-['Inter']"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#C8C8C9] hover:text-white transition-colors font-['Inter']"
            >
              How it Works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-[#C8C8C9] hover:text-white transition-colors font-['Inter']"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Button 
                variant="outline" 
                className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 transition-all duration-300"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 transition-all duration-300"
                  onClick={() => navigate("/auth")}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-[#9b87f5] hover:bg-[#8B5CF6] text-white transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate("/auth")}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};