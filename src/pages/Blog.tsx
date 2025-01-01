import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const blogs = [
  {
    title: "The Evolution of AI in Education",
    date: "March 15, 2024",
    excerpt: "Explore how artificial intelligence is revolutionizing the educational landscape, from personalized learning experiences to automated content generation.",
    content: "Artificial Intelligence has become an integral part of modern education...",
    author: "Sarah Johnson",
    readTime: "5 min read"
  },
  {
    title: "Understanding AI Agents in Learning",
    date: "March 10, 2024",
    excerpt: "Dive deep into how AI agents are transforming the way we learn and teach, making education more interactive and personalized.",
    content: "AI agents are sophisticated programs that can understand, learn, and interact...",
    author: "Michael Chen",
    readTime: "7 min read"
  },
  {
    title: "The Future of AI Text Conversion",
    date: "March 5, 2024",
    excerpt: "Discover how AI-powered text conversion is making content more accessible and adaptable for different learning styles.",
    content: "Text conversion technology has come a long way...",
    author: "Emily Rodriguez",
    readTime: "6 min read"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center">Latest from Our Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{blog.date}</span>
                <span className="text-sm ml-auto">{blog.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold mb-3">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">By {blog.author}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;