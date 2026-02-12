import { Check, Plus } from "lucide-react";
import type { MealsResponse } from "../../hooks/useMeals";

export type TodaysMealProps = {
  todayMeals: MealsResponse | undefined;
};

const TodaysMeal = ({ todayMeals }: TodaysMealProps) => {
  return (
    <>
      <section className="">
        <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
          <span className="flex justify-between">
            <div className="text-xl">Today's Meals</div>
            <div className="cursor-default rounded-xl border border-gray-400 px-3 py-1 hover:bg-gray-100">
              View Plan
            </div>
          </span>
          <div>
            <div className="space-y-3">
              {todayMeals?.data.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold">{meal.mealName}</p>
                      <p className="text-sm font-extralight">{meal.category}</p>
                    </div>
                  </div>
                  <div className="cols-2 flex gap-3 text-right">
                    <div>
                      <p className="font-semibold text-orange-600">
                        {meal.calories} cal
                      </p>
                      <p className="text-xs font-extralight md:text-sm">
                        P: {meal.protein}g | C: {meal.carbohydrate} g | F:{" "}
                        {meal.fat} g
                      </p>
                    </div>

                    {/* if the user adds the meal as eaten */}
                    {/* <div className="flex size-10 items-center justify-center rounded-full bg-emerald-300">
                      <Check className="text-emerald-800" />
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full border border-gray-400 bg-white">
            <Plus className="2" />
          </div>
        </div>
      </section>
    </>
  );
};
export default TodaysMeal;
