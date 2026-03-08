import CalorieGoal from "../components/DashBoardPage/CalorieGoal";
import TodaysMeal from "../components/DashBoardPage/TodaysMeal";
import { Utensils } from "lucide-react";
import { useMeals } from "../hooks/useMeals";
import { useCaliorie } from "../hooks/useCalorieGoal";
import { useAttributes } from "../hooks/useAttributes";
import { useActivity } from "../hooks/useActivity";
import { useEffect } from "react";
import RecommendedMeals from "../components/DashBoardPage/RecommendedMeals";
import AddExerciseModal from "../components/ActivityModal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: "easeOut" as const },
});

export const DashBoardPage = () => {
  const { meals, todayRecommendedMeals, reFetchMeals, addMeal } = useMeals();
  const { consumedCalorie, reFetchDailyIntake } = useCaliorie();
  const { lastAttribute, fetchAttributes } = useAttributes();
  const {
    activityData,
    userActivityData,
    fetchActivities,
    fetchUserActivities,
    burnedCalorie,
    addUserActivity,
  } = useActivity();

  useEffect(() => {
    reFetchDailyIntake();
    fetchAttributes();
    fetchUserActivities();
    reFetchMeals();
    fetchActivities();
  }, [
    reFetchDailyIntake,
    fetchAttributes,
    fetchUserActivities,
    reFetchMeals,
    fetchActivities,
  ]);

  useEffect(() => {
    reFetchDailyIntake();
  }, [meals, reFetchDailyIntake]);

  return (
    <>
      <div className="from-primary-green-50 min-h-screen min-w-full bg-linear-to-b via-white to-blue-50">
        <main className="mx-auto max-w-7xl space-y-6 p-5">
          <motion.h1
            className="text-4xl md:text-5xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Welcome!
          </motion.h1>

          <motion.h2
            className="text-md font-extralight text-neutral-600 md:text-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          >
            Here's your nutrition overview for today
          </motion.h2>

          <motion.div {...fadeUp(0.15)}>
            <CalorieGoal
              consumedCalorie={consumedCalorie}
              burnedCalorie={burnedCalorie}
              netCalorie={Math.round(consumedCalorie - burnedCalorie)}
              weight={lastAttribute?.weight}
              workoutToday={userActivityData?.data.length ?? 0}
              bmr={lastAttribute?.calories ?? 0}
              goalType={lastAttribute?.goalType ?? "N/A"}
            />
          </motion.div>

          <motion.div {...fadeUp(0.25)}>
            <RecommendedMeals recommendedMeals={todayRecommendedMeals} />
          </motion.div>

          <motion.div {...fadeUp(0.35)}>
            <TodaysMeal todayMeals={meals} addMeal={addMeal} />
          </motion.div>

          <motion.section
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
          >
            <AddExerciseModal
              activityData={activityData}
              addUserActivity={addUserActivity}
            />

            <Link to="/recipes">
              <motion.div
                className="flex items-center space-x-5 rounded-xl border border-gray-200 bg-white p-4"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Utensils className="text-blue-600" />
                </motion.div>
                <div>
                  <h2 className="text-xl">Browse Recipes</h2>
                  <h1 className="font-extralight">
                    Discover healthy meal ideas
                  </h1>
                </div>
              </motion.div>
            </Link>
          </motion.section>
        </main>
      </div>
    </>
  );
};

export default DashBoardPage;
