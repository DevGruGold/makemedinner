import { Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Support() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-sage-700">
          Need Help?
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-lg text-gray-600 mb-8">
            We're here to help you make the most of your ingredients! Reach out to us through any of
            these channels:
          </p>
          <div className="space-y-6">
            <a
              href="mailto:xmrtsolutions@gmail.com"
              className="flex items-center p-4 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors"
            >
              <Mail className="h-6 w-6 text-sage-600 mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-sage-700">Email Support</h2>
                <p className="text-sage-600">xmrtsolutions@gmail.com</p>
              </div>
            </a>
            <a
              href="https://wa.me/50661500559"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-sage-50 rounded-lg hover:bg-sage-100 transition-colors"
            >
              <MessageCircle className="h-6 w-6 text-sage-600 mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-sage-700">WhatsApp</h2>
                <p className="text-sage-600">+506 6150 0559</p>
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}