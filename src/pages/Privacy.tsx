import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-lg">
            <p className="mb-6">
              At SummryAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Content you upload or generate</li>
              <li>Usage data and preferences</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Communicate with you</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;