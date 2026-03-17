import { createContext, useContext, useEffect, useMemo } from "react";
import { useActivity, type ActivityResponse } from "../hooks/useActivity";
import { useDailyIntake, type ResolvedDailyEntry } from "../hooks/useMeals";
import { useAttributes, type AttributeType } from "../hooks/useAttributes";

type StatisticsContextValue = {
  userActivityData: ActivityResponse | undefined;
  dailyIntake: ResolvedDailyEntry[];
  loading: boolean;
  avgCaloriesConsumed: string | number;
  avgCaloriesBurned: string | number;
  avgMacroNutrients: Macros;
  attributesData: AttributeType[];
};

type Macros = {
  carbohydrate: number;
  protein: number;
  fat: number;
};

const StatisticsContext = createContext<StatisticsContextValue | null>(null);

export const StatisticsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userActivityData, fetchUserActivities } = useActivity();
  const { dailyIntake, loading } = useDailyIntake();
  const { fetchAttributes, attributesData } = useAttributes();

  const avgCaloriesConsumed = useMemo(() => {
    if (!dailyIntake.length) return 0;
    const total = dailyIntake.reduce((sum, entry) => sum + entry.calories, 0);
    return (total / dailyIntake.length).toFixed(1);
  }, [dailyIntake]);

  const avgCaloriesBurned = useMemo(() => {
    if (!userActivityData?.data.length) return 0;
    const grouped = userActivityData.data.reduce<Record<string, number>>(
      (acc, a) => {
        acc[a.date] = (acc[a.date] ?? 0) + a.caloriesBurned;
        return acc;
      },
      {},
    );
    const days = Object.keys(grouped);
    const total = Object.values(grouped).reduce((sum, v) => sum + v, 0);
    return (total / days.length).toFixed(1);
  }, [userActivityData]);

  const avgMacroNutrients = useMemo(() => {
    if (!dailyIntake.length) return { carbohydrate: 0, protein: 0, fat: 0 };
    const totals = dailyIntake.reduce<Macros>(
      (acc, a) => ({
        carbohydrate: acc.carbohydrate + a.carbohydrate,
        protein: acc.protein + a.protein,
        fat: acc.fat + a.fat,
      }),
      { carbohydrate: 0, protein: 0, fat: 0 },
    );
    return {
      carbohydrate: parseFloat(
        (totals.carbohydrate / dailyIntake.length).toFixed(1),
      ),
      protein: parseFloat((totals.protein / dailyIntake.length).toFixed(1)),
      fat: parseFloat((totals.fat / dailyIntake.length).toFixed(1)),
    };
  }, [dailyIntake]);

  useEffect(() => {
    fetchUserActivities();
    fetchAttributes();
  }, [fetchUserActivities, fetchAttributes]);

  return (
    <StatisticsContext.Provider
      value={{
        userActivityData,
        dailyIntake,
        loading,
        avgCaloriesConsumed,
        avgCaloriesBurned,
        avgMacroNutrients,
        attributesData: attributesData.data,
      }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStatistics = () => {
  const ctx = useContext(StatisticsContext);
  if (!ctx)
    throw new Error("useStatistics must be used within StatisticsProvider");
  return ctx;
};
