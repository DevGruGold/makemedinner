import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      title: "Record Your Ingredients",
      description: "Use your device camera to capture all the ingredients you have.",
      icon: "📸",
    },
    {
      title: "Upload Your Video",
      description: "Share your ingredient video with our AI.",
      icon: "⬆️",
    },
    {
      title: "Get Recipes",
      description: "Receive personalized meal and drink suggestions based on your ingredients.",
      icon: "🍳",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-sage-700">
        How It Works
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <div className="text-4xl mb-4">{step.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-sage-600">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}