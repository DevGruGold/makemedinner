import { useState } from "react";
import { VideoUpload } from "@/components/VideoUpload";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
}

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [meals, setMeals] = useState<Recipe[]>([]);
  const [drinks, setDrinks] = useState<Recipe[]>([]);
  const { toast } = useToast();

  const handleVideoSelect = (file: File) => {
    setSelectedVideo(file);
    setMeals([]);
    setDrinks([]);
  };

  const analyzeVideo = async () => {
    if (!selectedVideo) {
      toast({
        title: "No video selected",
        description: "Please upload a video first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // Convert video to base64
      const base64Video = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(",")[1]);
        };
        reader.readAsDataURL(selectedVideo);
      });

      // Here we would make the API call to Gemini
      // For now, we'll simulate a response
      // In production, you would use the actual Gemini API endpoint
      
      // Simulated response for testing
      const mockResponse = {
        meals: [
          {
            name: "Pasta Primavera",
            ingredients: ["Pasta", "Tomatoes", "Basil", "Olive Oil"],
            instructions: ["Boil pasta", "Mix ingredients", "Serve hot"],
          },
        ],
        drinks: [
          {
            name: "Citrus Spritzer",
            ingredients: ["Sparkling Water", "Lemon", "Lime", "Mint"],
            instructions: ["Muddle mint", "Add citrus", "Top with sparkling water"],
          },
        ],
      };

      setMeals(mockResponse.meals);
      setDrinks(mockResponse.drinks);
    } catch (error) {
      toast({
        title: "Error analyzing video",
        description: "There was an error analyzing your video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Make Me Dinner</h1>
          <p className="text-lg text-gray-600">
            Upload a video of your ingredients and let AI suggest meals and drinks!
          </p>
        </div>

        <div className="space-y-8">
          <VideoUpload onVideoSelect={handleVideoSelect} />
          
          {selectedVideo && (
            <div className="text-center">
              <Button
                onClick={analyzeVideo}
                disabled={isAnalyzing}
                className="bg-sage-500 hover:bg-sage-600"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Ingredients"}
              </Button>
            </div>
          )}

          {(meals.length > 0 || drinks.length > 0 || isAnalyzing) && (
            <div className="mt-8">
              <RecipeDisplay
                meals={meals}
                drinks={drinks}
                isLoading={isAnalyzing}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;