import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMeals, type DailyMeal } from "../hooks/useMeals";
import SelectedMealPlan from "../components/MealPlanPage/SelectedMealPlan";

const MealPlanPage = () => {
  const { recommendedMeals, todayRecommendedMeals } = useMeals();
  const [selectedMeals, setSelectedMeals] = useState<DailyMeal | undefined>(
    undefined,
  );
  const [direction, setDirection] = useState(0);

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
    const currentIndex =
      recommendedMeals?.data.dailyMeals.findIndex(
        (p) => p.date === dailyMeals?.date,
      ) ?? 0;
    setDirection(index > currentIndex ? 1 : -1);
    setSelectedMeals(recommendedMeals?.data.dailyMeals[index]);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
    }),
  };

  return (
    <main className="mx-auto w-full max-w-7xl space-y-10">
      <motion.section
        className="flex flex-wrap justify-center gap-2 pt-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {recommendedMeals?.data.dailyMeals.map((plan, index) => {
          const isActive = plan.date === dailyMeals?.date;
          return (
            <motion.button
              key={index}
              onClick={() => changeDailyPlan(index)}
              className="relative overflow-hidden rounded-xl border border-neutral-200 p-1 px-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {isActive && (
                <motion.span
                  layoutId="active-day-pill"
                  className="bg-primary-green-400 absolute inset-0 z-0 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  isActive ? "text-white" : ""
                }`}
              >
                {getDayOfWeek(plan.date)}
              </span>
            </motion.button>
          );
        })}
      </motion.section>
      <section
        className="px-4 pb-4"
        style={{ position: "relative", overflowX: "clip" }}
      >
        <AnimatePresence custom={direction}>
          {dailyMeals && (
            <motion.div
              key={dailyMeals.date}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.15 },
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <SelectedMealPlan dailyPlan={dailyMeals} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
};

export default MealPlanPage;
