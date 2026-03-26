import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecipes } from "../hooks/useRecipes";
import { Clock, Utensils } from "lucide-react";
import AddTodayRecipeModal from "../components/AddTodayRecipeModal";
import { useMeals } from "../hooks/useMeals";
import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const RecipePage = () => {
  const recipeId = useParams();
  const { fetchRecipeById, recipeData } = useRecipes();
  const { addMeal } = useMeals();

  const splitRecipSteps = (steps: string | undefined) => {
    if (!steps) return;
    return steps.split(";");
  };

  useEffect(() => {
    fetchRecipeById(Number(recipeId.id));
  }, [fetchRecipeById, recipeId]);

  return (
    <div className="from-primary-green-50 min-h-full min-w-full bg-linear-to-br to-blue-50">
      <main className="mx-auto max-w-7xl space-y-6 rounded-2xl p-4">
        <motion.section className="flex justify-between" {...fadeUp(0)}>
          <h1 className="text-3xl font-semibold">
            {recipeData?.name}{" "}
            <div className="mt-2 text-sm font-extralight">
              {`by - ${recipeData?.isCommunity ? recipeData?.userName : "NutriLife"}`}
            </div>
          </h1>
          <div>
            {recipeData && (
              <AddTodayRecipeModal
                props={{ isSearch: false, recipeData, addMeal }}
              />
            )}
          </div>
        </motion.section>

        {/* Tags */}
        <motion.section className="flex gap-2" {...fadeUp(0.08)}>
          {recipeData?.isVegan && (
            <div className="rounded-full bg-green-100 px-2 py-1 text-center text-xs text-green-800">
              Vegan
            </div>
          )}
          {recipeData?.isVegetarian && (
            <div className="rounded-full bg-lime-100 px-2 py-1 text-center text-xs text-lime-800">
              Vegetarian
            </div>
          )}
          {recipeData?.isCommunity && (
            <div className="rounded-full bg-violet-100 px-2 py-1 text-center text-xs text-violet-800">
              {recipeData?.isCommunity ? "Community" : "Official"}
            </div>
          )}
        </motion.section>

        <motion.section
          className="overflow-hidden rounded-xl"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
        >
          <img
            src={recipeData?.imageUrl ?? "/2641886.jpg"}
            alt={recipeData?.name}
            className="h-96 w-full rounded-xl object-cover transition-transform duration-300 hover:scale-99"
          />
        </motion.section>

        <motion.section
          className="rounded-xl border border-slate-300 bg-white p-4"
          {...fadeUp(0.22)}
        >
          <div>{recipeData?.description}</div>
        </motion.section>

        <motion.section
          className="grid grid-cols-3 items-stretch gap-2 rounded-xl border border-slate-300 bg-white p-4"
          {...fadeUp(0.3)}
        >
          {[
            {
              icon: <Clock className="h-5 w-5 shrink-0 text-blue-600" />,
              label: "Prep Time",
              value: `${recipeData?.preparationTime} min`,
            },
            {
              icon: <Clock className="h-5 w-5 shrink-0 text-green-600" />,
              label: "Cooking Time",
              value: `${recipeData?.cookingTime} min`,
              border: true,
            },
            {
              icon: <Utensils className="h-5 w-5 shrink-0 text-violet-600" />,
              label: "Servings",
              value: recipeData?.portions,
            },
          ].map(({ icon, label, value, border }, i) => (
            <motion.div
              key={label}
              className={`flex flex-col items-center gap-2 text-center ${border ? "border-x border-slate-200" : ""}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut" as const,
                delay: 0.35 + i * 0.08,
              }}
            >
              <div className="flex min-h-10 flex-col items-center justify-center gap-1">
                {icon}
                <p className="text-sm leading-tight font-light">{label}</p>
              </div>
              <p className="text-xl md:text-2xl">{value}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Nutrition */}
        <motion.section
          className="flex flex-col gap-4 rounded-xl border border-slate-300 bg-linear-to-br from-orange-50 to-red-50 p-4"
          {...fadeUp(0.4)}
        >
          <h2 className="text-lg font-semibold">
            Nutritional Information{" "}
            <span className="text-sm font-extralight">(per 100g)</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { label: "Calories", value: recipeData?.calories, unit: "kcal" },
              { label: "Protein", value: recipeData?.protein, unit: "g" },
              { label: "Carbs", value: recipeData?.carbohydrate, unit: "g" },
              { label: "Fat", value: recipeData?.fat, unit: "g" },
            ].map(({ label, value, unit }, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center gap-1 py-3 text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut" as const,
                  delay: 0.45 + i * 0.08,
                }}
              >
                <p className="text-xs font-light tracking-widest">{label}</p>
                <p className="text-2xl">{value}</p>
                <p className="text-xs font-extralight">{unit}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="rounded-xl border border-slate-300 bg-white p-4"
          {...fadeUp(0.5)}
        >
          <h1 className="pb-5 text-xl font-semibold">Ingredients</h1>
          <ul className="list-disc pl-10 md:pl-18">
            {recipeData?.ingredients.map((ingredient, idx) => (
              <motion.li
                className=""
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut" as const,
                  delay: 0.55 + idx * 0.05,
                }}
              >
                {` ${ingredient.ingredientName}: ${ingredient.amount} g`}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          className="rounded-xl border border-slate-300 bg-white p-4"
          {...fadeUp(0.6)}
        >
          <h1 className="pb-5 text-xl font-semibold">Instructions</h1>
          <div className="space-y-3 md:pl-10">
            {splitRecipSteps(recipeData?.instructions)?.map((step, idx) => (
              <motion.section
                key={idx}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut" as const,
                  delay: 0.65 + idx * 0.07,
                }}
              >
                <div className="bg-primary-green-100 text-primary-green-800 flex min-h-10 min-w-10 items-center justify-center rounded-full">
                  {idx + 1}
                </div>
                <div className="font-light">{step}</div>
              </motion.section>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default RecipePage;
