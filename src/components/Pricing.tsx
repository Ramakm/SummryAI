import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    description: "For individuals to test",
    monthlyPrice: "0",
    yearlyPrice: "0",
    features: [
      "5 credits per month",
      "Audios <25MB or 15 minutes",
      "Basic content generation",
      "Standard support",
      "3 languages",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    description: "For professional teachers",
    monthlyPrice: "7.9",
    yearlyPrice: "79",
    features: [
      "100 credits per month",
      "Audios <25MB or 15 minutes",
      "Advanced content generation",
      "Priority support",
      "6 languages",
      "Custom templates",
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Advanced",
    description: "To Save 30% of your time",
    monthlyPrice: "9.9",
    yearlyPrice: "99",
    features: [
      "250 credits per month",
      "Unlimited audio size and length",
      "Premium content generation",
      "24/7 Priority support",
      "+10 languages",
      "Custom templates (coming soon)",
      "Canva Integration (coming soon)",
      "PowerPoint Integration (coming soon)",
    ],
    buttonText: "Upgrade to Advanced",
  },
];

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Start for Free. Upgrade as You Grow.
          </h2>
          
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-full ${
                !isYearly ? 'bg-emerald-500 text-white' : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                isYearly ? 'bg-emerald-500 text-white' : 'text-gray-600'
              }`}
            >
              Yearly
              <span className="text-xs bg-emerald-600 text-white px-2 py-1 rounded-full">
                16% OFF
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "border-2 border-indigo-500"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-8 bg-indigo-500 text-white px-3 py-1 rounded-full text-sm">
                  Popular
                </span>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">€</span>
                  <span className="text-4xl font-bold">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600 ml-2">/monthly</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-indigo-500" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full transition-all duration-300 ${
                  plan.popular
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                    : "bg-white hover:bg-gray-50 text-black border-2 border-gray-200"
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <p className="text-center text-gray-600 mt-8">
          Cancel anytime. No hidden fees.
        </p>
      </div>
    </section>
  );
};