import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About SummryAI</h1>
          <div className="prose prose-lg">
            <p>
              SummryAI is an innovative educational technology platform that transforms video and audio content into comprehensive learning materials. Our mission is to make education more accessible and engaging through the power of artificial intelligence.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              We believe in democratizing education by providing educators and students with powerful tools to create, understand, and retain knowledge. By leveraging cutting-edge AI technology, we help transform complex content into clear, engaging educational materials.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">What We Do</h2>
            <p>
              Our platform specializes in converting video and audio content into various educational formats, including summaries, quizzes, lesson outlines, and more. We support multiple languages and cater to different learning levels, making education more accessible to everyone.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;