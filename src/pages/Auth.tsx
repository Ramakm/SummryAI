import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3D] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-bold text-white mb-2 font-['Plus Jakarta Sans']">
              SummryAI
            </h1>
          </Link>
          <h2 className="mt-6 text-4xl font-extrabold text-white font-['Plus Jakarta Sans'] tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-400 font-['Inter']">
            Sign in to continue your journey
          </p>
        </div>
        <div className="mt-8 bg-[#2A2D3A]/50 backdrop-blur-lg py-8 px-4 shadow-xl rounded-2xl border border-white/10 sm:px-10">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#9b87f5',
                    brandAccent: '#8B5CF6',
                    brandButtonText: "white",
                    defaultButtonBackground: "#2A2D3A",
                    defaultButtonBackgroundHover: "#363A47",
                    inputBackground: "#1F2937",
                    inputBorder: "#374151",
                    inputBorderHover: "#4B5563",
                    inputBorderFocus: "#6366F1",
                    inputText: "white",
                    inputPlaceholder: "#9CA3AF",
                  },
                  space: {
                    buttonPadding: "12px 16px",
                    inputPadding: "12px 16px",
                  },
                  borderWidths: {
                    buttonBorderWidth: "1px",
                    inputBorderWidth: "1px",
                  },
                  radii: {
                    borderRadiusButton: "12px",
                    buttonBorderRadius: "12px",
                    inputBorderRadius: "12px",
                  },
                  fonts: {
                    bodyFontFamily: `'Inter', sans-serif`,
                    buttonFontFamily: `'Plus Jakarta Sans', sans-serif`,
                    inputFontFamily: `'Inter', sans-serif`,
                    labelFontFamily: `'Inter', sans-serif`,
                  },
                },
              },
              className: {
                container: "space-y-4",
                button: "w-full font-semibold transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]",
                label: "text-sm font-medium text-gray-300",
                input: "w-full bg-[#1F2937] border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200",
                divider: "bg-gray-700",
                message: "text-sm text-gray-400",
              },
            }}
            theme="dark"
            providers={["google", "github"]}
            redirectTo={window.location.origin + "/dashboard"}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;