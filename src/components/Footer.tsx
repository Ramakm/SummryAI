import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SummryAI</h3>
            <p className="text-gray-600">
              Transform your audio content into accurate text with AI-powered
              technology.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#features"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            © 2024 AudioToContent. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="/blog"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="/privacy"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="/terms"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
