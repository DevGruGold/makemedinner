import { Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-sage-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sage-600 animate-fade-in">
            Made with ❤️ by Make Me Dinner
          </p>
          <div className="flex space-x-4">
            <a
              href="mailto:xmrtsolutions@gmail.com"
              className="flex items-center text-sage-600 hover:text-sage-700 transition-colors"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Us
            </a>
            <a
              href="https://wa.me/50661500559"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sage-600 hover:text-sage-700 transition-colors"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}