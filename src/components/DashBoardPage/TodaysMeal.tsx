import { Plus } from "lucide-react";
import type { MealsResponse } from "../../hooks/useMeals";

export type TodaysMealProps = {
  todayMeals: MealsResponse | undefined;
};

const TodaysMeal = ({ todayMeals }: TodaysMealProps) => {
  return (
    <section className="w-full">
      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 sm:space-y-6 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold sm:text-xl">Today's Meals</h2>
          <button className="rounded-full border border-gray-400 p-1 transition-colors hover:bg-gray-100">
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-3">
          {todayMeals?.data.map((meal) => (
            <div
              key={meal.id}
              className="flex flex-col gap-3 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 sm:flex-row sm:items-center sm:justify-between"
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
                  P: {meal.protein}g | C: {meal.carbohydrate}g | F: {meal.fat}g
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TodaysMeal;
