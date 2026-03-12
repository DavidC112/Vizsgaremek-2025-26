import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

export type MealsResponse = {
  message: string;
  data: Meal[];
};

export type Meal = {
  id: number;
  category: string;
  mealName: string;
  recipeId: number | null;
  ingredientId: number | null;
  amount: number;
  calories: number;
  protein: number;
  carbohydrate: number;
  fat: number;
};

//Reccomended daily meals
export type DailyMeal = {
  date: string;
  breakfast: string;
  breakfastRecipeId: number;
  soup: string;
  soupRecipeId: number;
  lunch: string;
  lunchRecipeId: number;
  dinner: string;
  dinnerRecipeId: number;
};

export type MealPlanData = {
  dailyMeals: DailyMeal[];
  expiryDate: string;
};

export type MealPlanResponse = {
  message: string;
  data: MealPlanData;
};

export const useMeals = () => {
  const [meals, setMeals] = useState<MealsResponse | undefined>(undefined);
  const [recommendedMeals, setRecommendedMeals] = useState<
    MealPlanResponse | undefined
  >(undefined);

  const fetchMeals = useCallback(async () => {
    try {
      const res = await api.get("/users/me/meals", {
        withCredentials: true,
      });
      console.log(res.data);
      setMeals(res.data);
    } catch (error) {
      console.error("fetchMeals error:" + error);
    }
  }, []);

  const fetchRecommendedMeals = useCallback(async () => {
    try {
      const res = await api.get("/users/me/weekly-meal-plan", {
        withCredentials: true,
      });
      console.log(res.data.dailyMeals);
      setRecommendedMeals(res.data);
    } catch (error) {
      console.error("fetchReccomendedMeals" + error);
    }
  }, []);

  const todayRecommendedMeals = useMemo(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    return recommendedMeals?.data.dailyMeals.find(
      (item) => item.date === todayDate,
    );
  }, [recommendedMeals]);

  const addMeal = useCallback(
    async (recipeId: number, category: string, amount: number) => {
      try {
        const res = await api.post(
          "/users/me/meals/add",
          {
            category: category,
            recipeId: recipeId,
            amount: amount,
          },
          {
            withCredentials: true,
          },
        );
        setMeals((prev) => ({
          message: prev?.message ?? "",
          data: [...(prev?.data ?? []), res.data.data],
        }));
        return res.data;
      } catch (error) {
        console.error("addMeal error:" + error);
        throw error;
      }
    },
    [],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRecommendedMeals();
  }, [fetchRecommendedMeals]);

  return {
    meals,
    reFetchMeals: fetchMeals,
    reFetchRecommendedMeals: fetchRecommendedMeals,
    todayRecommendedMeals,
    recommendedMeals,
    addMeal,
  };
};
