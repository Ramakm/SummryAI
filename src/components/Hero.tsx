import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1A1F2C] to-[#403E43]">
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <span className="inline-block animate-fade-up opacity-0 [--animation-delay:200ms] animation-delay-200">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-[#9b87f5]/10 text-[#9b87f5] rounded-full mb-8">
            Transform your audio content effortlessly
          </span>
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-up opacity-0 [--animation-delay:400ms] animation-delay-400 text-white font-['Plus Jakarta Sans']">
          Convert Audio to Text
          <br />
          <span className="text-[#7E69AB]">with Perfect Accuracy</span>
        </h1>
        <p className="text-xl text-[#C8C8C9] mb-8 max-w-2xl mx-auto animate-fade-up opacity-0 [--animation-delay:600ms] animation-delay-600 font-['Inter']">
          Transform any audio or video into accurate text content. Perfect for
          podcasters, journalists, and content creators.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up opacity-0 [--animation-delay:800ms] animation-delay-800">
          <Button 
            className="bg-[#9b87f5] hover:bg-[#8B5CF6] text-white transition-all duration-300 px-8 py-6 text-lg transform hover:scale-105"
            onClick={() => navigate("/auth")}
          >
            Start Converting Now
          </Button>
          <Button
            variant="outline"
            className="border-2 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 transition-all duration-300 px-8 py-6 text-lg transform hover:scale-105"
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
};