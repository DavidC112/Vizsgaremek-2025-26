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

export const DashBoardPage = () => {
  const { meals, todayRecommendedMeals, reFetchMeals } = useMeals();
  const { consumedCalorie, reFetchDailyIntake, netCalorie } = useCaliorie();
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

  return (
    <>
      <div className="from-primary-green-50 min-h-screen min-w-full bg-linear-to-b via-white to-blue-50">
        <main className="l mx-auto max-w-7xl space-y-6 p-5">
          <h1 className="text-4xl md:text-5xl">Welcome back!</h1>
          <h2 className="text-md font-extralight text-neutral-600 md:text-xl">
            Here's your nutrition overview for today
          </h2>
          <CalorieGoal
            consumedCalorie={consumedCalorie}
            burnedCalorie={burnedCalorie}
            netCalorie={netCalorie}
            weight={lastAttribute?.weight}
            workoutToday={userActivityData?.data.length ?? 0}
            bmr={lastAttribute?.calories ?? 0} //calorie goal
            goalType={lastAttribute?.goalType ?? "N/A"}
          />

          <RecommendedMeals recommendedMeals={todayRecommendedMeals} />
          <TodaysMeal todayMeals={meals} />

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AddExerciseModal
              activityData={activityData}
              addUserActivity={addUserActivity}
            />

            <Link to="/recipes">
              <div className="flex items-center space-x-5 rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Utensils className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl">Browse Recipes</h2>
                  <h1 className="font-extralight">
                    Discover healthy meal ideas
                  </h1>
                </div>
              </div>
            </Link>
          </section>
        </main>
      </div>
    </>
  );
};

export default DashBoardPage;
