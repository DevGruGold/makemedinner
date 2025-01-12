import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
}

interface RecipeDisplayProps {
  meals: Recipe[];
  drinks: Recipe[];
  isLoading: boolean;
}

export const RecipeDisplay = ({ meals, drinks, isLoading }: RecipeDisplayProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-lg bg-gray-100 p-4 h-48"
          >
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Tabs defaultValue="meals" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="meals">Meals</TabsTrigger>
        <TabsTrigger value="drinks">Drinks</TabsTrigger>
      </TabsList>
      <TabsContent value="meals">
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{meal.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Ingredients:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {meal.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Instructions:</h4>
                    <ol className="list-decimal pl-5 space-y-1">
                      {meal.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="drinks">
        <div className="space-y-4">
          {drinks.map((drink, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{drink.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Ingredients:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {drink.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Instructions:</h4>
                    <ol className="list-decimal pl-5 space-y-1">
                      {drink.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};