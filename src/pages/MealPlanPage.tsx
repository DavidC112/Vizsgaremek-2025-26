import { useState } from "react";
import { useMeals, type DailyMeal } from "../hooks/useMeals";
import SelectedMealPlan from "../components/MealPlanPage/SelectedMealPlan";

const MealPlanPage = () => {
  const { recommendedMeals, todayRecommendedMeals } = useMeals();
  const [selectedMeals, setSelectedMeals] = useState<DailyMeal | undefined>(
    undefined,
  );

  const dailyMeals = selectedMeals ?? todayRecommendedMeals;

  const getDayOfWeek = (dateString: string) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return days[date.getDay()];
  };

  const changeDailyPlan = (index: number) => {
    setSelectedMeals(recommendedMeals?.data.dailyMeals[index]);
  };

  return (
    <>
      <main className="mx-auto w-full max-w-7xl space-y-10">
        <section className="flex flex-wrap justify-center gap-2 pt-10">
          {recommendedMeals?.data.dailyMeals.map((plan, index) => (
            <button
              onClick={() => changeDailyPlan(index)}
              key={index}
              className={`rounded-xl border border-neutral-200 p-1 px-3 transition-colors ${
                plan.date === dailyMeals?.date
                  ? "bg-primary-green-400 text-white"
                  : "bg-transparent"
              }`}
            >
              {getDayOfWeek(plan.date)}
            </button>
          ))}
        </section>
        <section className="px-4 pb-4">
          {dailyMeals && <SelectedMealPlan dailyPlan={dailyMeals} />}
        </section>
      </main>
    </>
  );
};
export default MealPlanPage;
