import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Upload Your Audio",
    description: "Upload any audio or video file to our platform",
  },
  {
    number: "02",
    title: "AI Processing",
    description: "Our AI technology processes and transcribes your content",
  },
  {
    number: "03",
    title: "Get Your Text",
    description: "Download your accurately transcribed content",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-['Plus Jakarta Sans']">
            How It Works
          </h2>
          <p className="text-xl text-[#C8C8C9] max-w-2xl mx-auto font-['Inter']">
            Three simple steps to convert your audio to text
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-[#403E43] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <span className="text-4xl font-bold text-[#9b87f5]/20">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold mt-4 mb-2 text-white font-['Plus Jakarta Sans']">
                  {step.title}
                </h3>
                <p className="text-[#C8C8C9] font-['Inter']">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-6 w-8 h-8 text-[#9b87f5] transform -translate-y-1/2 z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};