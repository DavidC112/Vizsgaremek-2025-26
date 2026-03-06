import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeListPage/RecipeCard";
import RecipeFilterBar from "../components/RecipeListPage/filters/RecipeFilterBar";
import ActiveFilterPills from "../components/RecipeListPage/filters/ActiveFilterPills";
import { FilterProvider } from "../context/FilterContext";
import { useFilterContext } from "../context/FilterContext";
import { useRecipes } from "../hooks/useRecipes";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../utils/MaterialUITheme";

const RecipeListPageContent = ({
  fetchAllRecipes,
}: {
  fetchAllRecipes: () => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { filteredRecipes } = useFilterContext();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        await fetchAllRecipes();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadRecipes();
  }, [fetchAllRecipes]);

  return (
    <main className="from-primary-green-50 flex flex-1 flex-col bg-linear-to-br to-blue-50">
      <ThemeProvider theme={theme}>
        <RecipeFilterBar />
      </ThemeProvider>
      <ActiveFilterPills />

      <section className="mx-auto w-full max-w-7xl p-4">
        <div className="grid grid-cols-1 gap-4 *:min-w-0 md:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonLoading key={index} index={index} />
              ))
            : filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
        </div>
      </section>
    </main>
  );
};

const RecipeListPage = () => {
  const { recipeArray, fetchAllRecipes } = useRecipes();
  return (
    <FilterProvider recipes={recipeArray}>
      <RecipeListPageContent fetchAllRecipes={fetchAllRecipes} />
    </FilterProvider>
  );
};

const SkeletonLoading = ({ index }: { index: number }) => {
  return (
    <div
      key={index}
      className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white"
    >
      <div className="h-48 w-full animate-pulse bg-neutral-200" />

      <div className="flex flex-1 flex-col space-y-5 p-4">
        <div className="h-6 w-3/4 animate-pulse rounded-full bg-neutral-200" />

        <div className="flex gap-2">
          <div className="h-6 w-14 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-neutral-200" />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="h-3 w-full animate-pulse rounded-full bg-neutral-200" />
          <div className="h-3 w-5/6 animate-pulse rounded-full bg-neutral-200" />
        </div>

        <div className="flex items-center justify-between">
          <div className="h-4 w-8 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-4 w-14 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-4 w-16 animate-pulse rounded-full bg-neutral-200" />
        </div>

        <div className="flex gap-4 border-t pt-3">
          <div className="h-3 w-12 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-3 w-12 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-3 w-12 animate-pulse rounded-full bg-neutral-200" />
        </div>
      </div>
    </div>
  );
};

export default RecipeListPage;
