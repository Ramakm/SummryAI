import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Problems } from "@/components/Problems";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Problems />
      <Features selectedFeatures={[]} onSelect={() => {}} />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;