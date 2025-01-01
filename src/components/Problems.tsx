import { CheckCircle } from "lucide-react";

export const Problems = () => {
  const problems = [
    "Finding the right resources for your class takes too much time.",
    "Creating customized quizzes and summaries feels overwhelming.",
    "You wish you could repurpose great content from YouTube or podcasts quickly.",
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Struggling to Keep Your Class Materials Fresh?
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm animate-fade-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CheckCircle className="w-6 h-6 text-indigo-600 flex-shrink-0" />
              <p className="text-lg text-gray-700">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};