import { Card } from "@/components/ui/card";
import { FileText, List, HelpCircle, Presentation, Gamepad2, MessageSquare, Lightbulb, Clock, File, Map } from "lucide-react";

export const features = [
  {
    icon: FileText,
    title: "Summary",
    description: "Create concise summaries of the source material's key points",
  },
  {
    icon: List,
    title: "Lesson Outline",
    description: "Generate a structured outline for a class session",
  },
  {
    icon: HelpCircle,
    title: "Quiz Generator",
    description: "Automatically generate quizzes with multiple-choice and short-answer questions",
  },
  {
    icon: File,
    title: "Exercise",
    description: "Create practice exercises based on the source content",
  },
  {
    icon: Map,
    title: "Visual Map",
    description: "Generate a visual representation of key concepts",
  },
  {
    icon: Presentation,
    title: "Classroom Presentation",
    description: "Automatically generate slide decks summarizing the content",
  },
  {
    icon: Gamepad2,
    title: "Gamified Content",
    description: "Generate interactive flashcards, trivia games, or other gamified assets",
  },
  {
    icon: MessageSquare,
    title: "Discussion Prompts",
    description: "Provide open-ended questions to encourage classroom discussions",
  },
  {
    icon: File,
    title: "Student Handouts",
    description: "Create downloadable and printable PDFs with lesson summaries",
  },
  {
    icon: Lightbulb,
    title: "Project Ideas",
    description: "Generate creative project ideas for individual or group work",
  },
  {
    icon: Clock,
    title: "Timelines",
    description: "Create chronological timelines based on historical or process-driven content",
  },
  {
    icon: FileText,
    title: "Glossary",
    description: "Extract and define key terms or jargon from the content",
  },
];

interface FeaturesProps {
  selectedFeatures: string[];
  onSelect: (features: string[]) => void;
}

export const Features = ({ selectedFeatures, onSelect }: FeaturesProps) => {
  const handleFeatureToggle = (title: string) => {
    if (selectedFeatures.includes(title)) {
      onSelect(selectedFeatures.filter(f => f !== title));
    } else {
      onSelect([...selectedFeatures, title]);
    }
  };

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">All the Tools You Need, Built for Teachers</h2>
          <p className="text-gray-600 text-lg">
            Transform any video or audio content into engaging educational materials with our comprehensive suite of tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleFeatureToggle(feature.title)}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};