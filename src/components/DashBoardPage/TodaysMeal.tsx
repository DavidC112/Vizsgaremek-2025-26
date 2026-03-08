import type { MealsResponse } from "../../hooks/useMeals";
import AddTodayRecipeModal from "../AddTodayRecipeModal";
import { useRecipes } from "../../hooks/useRecipes";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type TodaysMealProps = {
  todayMeals: MealsResponse | undefined;
  addMeal: (
    recipeId: number,
    category: string,
    amount: number,
  ) => Promise<void>;
};

const TodaysMeal = ({ todayMeals, addMeal }: TodaysMealProps) => {
  const { recipeArray, fetchAllRecipes } = useRecipes();
  useEffect(() => {
    fetchAllRecipes();
  }, [fetchAllRecipes]);

  return (
    <section className="w-full">
      <motion.div
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 sm:space-y-6 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold sm:text-xl">Today's Meals</h2>
          <AddTodayRecipeModal
            props={{ isSearch: true, recipeArray, addMeal: addMeal }}
          />
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {todayMeals?.data.map((meal, i) => (
              <motion.div
                key={meal.id}
                layout
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16, scale: 0.97 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                whileHover={{ x: 4 }}
                className="flex flex-col gap-3 rounded-lg bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{meal.mealName}</p>
                  <p className="text-sm font-extralight text-gray-600">
                    {meal.category}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1 sm:items-end">
                  <p className="font-semibold whitespace-nowrap text-orange-600">
                    {meal.calories} cal
                  </p>
                  <p className="text-xs font-extralight whitespace-nowrap text-gray-600 sm:text-sm">
                    P: {meal.protein}g | C: {meal.carbohydrate}g | F: {meal.fat}
                    g
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default TodaysMeal;
