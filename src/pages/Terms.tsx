import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg">
            <p className="mb-6">
              Welcome to SummryAI. By using our service, you agree to these terms. Please read them carefully.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing or using SummryAI, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
            <p className="mb-6">
              We grant you a limited, non-exclusive, non-transferable license to use our service for educational and personal use, subject to these terms.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Content Generation</h2>
            <p className="mb-6">
              While we strive to provide accurate and helpful content generation, you acknowledge that AI-generated content may require human review and verification.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;