import { useEffect, useState } from "react";
import { useRecipes, type Recipe } from "../../hooks/useRecipes";
import type { DailyMeal } from "../../hooks/useMeals";
import RecipeCard from "../RecipeListPage/RecipeCard";

const SelectedMealPlan = ({ dailyPlan }: { dailyPlan: DailyMeal }) => {
  const { fetchRecipeById } = useRecipes();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const labels = [
    { title: "Breakfast", bg: "#fef3c7", text: "#92400e" },
    { title: "Soup", bg: "#ffedd5", text: "#9a3412" },
    { title: "Main course", bg: "#d1fae5", text: "#065f46" },
    { title: "Dinner", bg: "#e0e7ff", text: "#3730a3" },
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      const [breakfast, soup, lunch, dinner] = await Promise.all([
        fetchRecipeById(dailyPlan.breakfastRecipeId),
        fetchRecipeById(dailyPlan.soupRecipeId),
        fetchRecipeById(dailyPlan.lunchRecipeId),
        fetchRecipeById(dailyPlan.dinnerRecipeId),
      ]);
      setRecipes([breakfast, soup, lunch, dinner].filter(Boolean) as Recipe[]);
    };
    fetchRecipes();
  }, [dailyPlan, fetchRecipeById]);

  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
      {recipes.map((recipe, index) => (
        <div key={index} className="relative w-full">
          <span
            className="absolute top-3 left-3 z-10 rounded-full px-3 py-0.5 text-xs font-semibold"
            style={{
              backgroundColor: labels[index].bg,
              color: labels[index].text,
            }}
          >
            {labels[index].title}
          </span>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
};

export default SelectedMealPlan;
