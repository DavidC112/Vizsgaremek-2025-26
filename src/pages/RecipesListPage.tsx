import { useEffect } from "react";
import RecipeCard from "../components/RecipeListPage/RecipeCard";
import { useRecipes } from "../hooks/useRecipes";

const RecipeListPage = () => {
  const { fetchAllRecipes, recipeData } = useRecipes();

  useEffect(() => {
    fetchAllRecipes();
  }, [fetchAllRecipes]);

  return (
    <main className="from-primary-green-50 bg-linear-to-br to-blue-50">
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
        {recipeData.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </section>
    </main>
  );
};
export default RecipeListPage;
