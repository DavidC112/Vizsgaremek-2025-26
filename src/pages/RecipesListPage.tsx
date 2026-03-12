import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeListPage/RecipeCard";
import RecipeFilterBar from "../components/RecipeListPage/filters/RecipeFilterBar";
import ActiveFilterPills from "../components/RecipeListPage/filters/ActiveFilterPills";
import { FilterProvider } from "../context/FilterContext";
import { useFilterContext } from "../context/FilterContext";
import { useRecipes } from "../hooks/useRecipes";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../utils/MaterialUITheme";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
            : filteredRecipes.map((recipe, i) => (
                <AnimatedRecipeCard key={recipe.id} recipe={recipe} index={i} />
              ))}
        </div>
      </section>
    </main>
  );
};

const AnimatedRecipeCard = ({
  recipe,
  index,
}: {
  recipe: Parameters<typeof RecipeCard>[0]["recipe"];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  if (index < 6) {
    return <RecipeCard recipe={recipe} />;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -80 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: (index % 3) * 0.12,
      }}
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
      style={{ borderRadius: "0.75rem" }}
    >
      <RecipeCard recipe={recipe} />
    </motion.div>
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
    <motion.div
      key={index}
      className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
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
    </motion.div>
  );
};

export default RecipeListPage;
