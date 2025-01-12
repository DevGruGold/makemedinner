import { useState } from "react";
import { VideoUpload } from "@/components/VideoUpload";
import { RecipeDisplay } from "@/components/RecipeDisplay";
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
    analyzeVideo(file);
  };

  const analyzeVideo = async (file: File) => {
    setIsAnalyzing(true);
    try {
      // Convert video to base64
      const base64Video = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(",")[1]);
        };
        reader.readAsDataURL(file);
      });

      // Call Gemini API
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('GEMINI_API_KEY')}`
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Analyze this video and suggest meals and drinks that can be made with the visible ingredients. Format the response as JSON with two arrays: 'meals' and 'drinks'. Each item should have 'name', 'ingredients', and 'instructions' properties."
            }, {
              inline_data: {
                mime_type: "video/mp4",
                data: base64Video
              }
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze video');
      }

      const data = await response.json();
      
      // Parse the response text as JSON
      const recipesData = JSON.parse(data.candidates[0].content.parts[0].text);
      
      setMeals(recipesData.meals);
      setDrinks(recipesData.drinks);
      
      toast({
        title: "Analysis Complete",
        description: "Your recipes are ready!",
      });
    } catch (error) {
      console.error('Error analyzing video:', error);
      toast({
        title: "Error",
        description: "Failed to analyze video. Please try again.",
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