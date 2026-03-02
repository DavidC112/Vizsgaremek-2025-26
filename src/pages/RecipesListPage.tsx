import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeListPage/RecipeCard";
import { useRecipes } from "../hooks/useRecipes";

const RecipeListPage = () => {
  const { fetchAllRecipes, recipeArray } = useRecipes();
  const [isLoading, setIsLoading] = useState(true);

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
    <main className="from-primary-green-50 bg-linear-to-br to-blue-50">
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map(
              (_, index) => <SkeletonLoading key={index} index={index} />,
              console.log("Rendering loading skeletons:", isLoading),
            )
          : recipeArray.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
      </section>
    </main>
  );
};

const SkeletonLoading = ({ index }: { index: number }) => {
  return (
    <div key={index} className="animate-pulse">
      <div className="flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
        <div className="rounded-base flex h-48 w-full items-center justify-center bg-neutral-200">
          <svg
            className="text-fg-disabled h-11 w-11 text-neutral-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
            />
          </svg>
        </div>
        <div className="flex flex-1 flex-col space-y-5 p-4">
          <h3 className="mb-3 h-3 w-48 rounded-full bg-neutral-200"></h3>
          <div className="flex flex-col space-x-2">
            <div className="flex gap-2">
              <div className="mb-4 h-2.5 w-72 rounded-full bg-neutral-200"></div>
            </div>
          </div>
          <p className="mb-3 line-clamp-2 flex-1 text-sm font-light">
            <div className="mb-4 h-2.5 w-full rounded-full bg-neutral-200"></div>
          </p>
          <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
            <div className="mb-4 h-2.5 w-full rounded-full bg-neutral-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeListPage;
