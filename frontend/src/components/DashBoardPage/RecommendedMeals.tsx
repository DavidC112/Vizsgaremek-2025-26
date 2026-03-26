import { Link } from "react-router-dom";
import type { DailyMeal } from "../../hooks/useMeals";
import { motion } from "framer-motion";

interface MealItemProps {
  type: string;
  name?: string;
  recipeId?: number;
  index: number;
}

const MealItem = ({ type, name, recipeId, index }: MealItemProps) => (
  <motion.div
    className="flex flex-col gap-3 rounded-lg bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 + index * 0.08, duration: 0.4, ease: "easeOut" }}
    whileHover={{ x: 4 }}
  >
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold">{name}</p>
      <p className="text-xs font-extralight text-gray-600">{type}</p>
    </div>
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
      <Link
        to={`/recipe/${recipeId}`}
        className="hover:bg-primary-green-400 flex items-center justify-center gap-1 rounded-xl border border-gray-400 bg-white px-3 py-2 text-sm whitespace-nowrap transition-colors hover:text-white sm:self-center"
      >
        View recipe <span className="ml-1">→</span>
      </Link>
    </motion.div>
  </motion.div>
);

const RecommendedMeals = ({
  recommendedMeals,
}: {
  recommendedMeals: DailyMeal | undefined;
}) => {
  const mealTypes = [
    {
      name: "Breakfast",
      meal: recommendedMeals?.breakfast,
      recipeId: recommendedMeals?.breakfastRecipeId,
    },
    {
      name: "Soup",
      meal: recommendedMeals?.soup,
      recipeId: recommendedMeals?.soupRecipeId,
    },
    {
      name: "Lunch",
      meal: recommendedMeals?.lunch,
      recipeId: recommendedMeals?.lunchRecipeId,
    },
    {
      name: "Dinner",
      meal: recommendedMeals?.dinner,
      recipeId: recommendedMeals?.dinnerRecipeId,
    },
  ];

  return (
    <section className="w-full">
      <motion.div
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 sm:space-y-6 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold sm:text-xl">
            Recommended Meals
          </h2>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/meal-plan"
              className="self-start rounded-xl border border-gray-400 px-3 py-2 text-sm whitespace-nowrap transition-colors hover:bg-neutral-100 sm:self-auto"
            >
              View Plan
            </Link>
          </motion.div>
        </div>

        <div className="space-y-3">
          {mealTypes.map(({ name, meal, recipeId }, i) => (
            <MealItem
              key={name}
              type={name}
              name={meal}
              recipeId={recipeId}
              index={i}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default RecommendedMeals;
