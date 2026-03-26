import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

export type DailyIntakeEntry = {
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  recipeIds: number[];
  ingredientIds: number[];
  date: string;
};

export type RecipeDetail = {
  id: number;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbohydrate: number;
  fat: number;
  imageUrl: string;
  ingredients: {
    ingredientId: number;
    ingredientName: string;
    amount: number;
  }[];
};

export type IngredientDetail = {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbohydrate: number;
  fat: number;
};

export type ResolvedDailyEntry = {
  date: string;
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  recipes: RecipeDetail[];
  ingredients: IngredientDetail[];
};

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

export const useDailyIntake = () => {
  const [dailyIntake, setDailyIntake] = useState<ResolvedDailyEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDailyIntake = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<DailyIntakeEntry[]>("/users/me/daily-intake", {
        withCredentials: true,
      });

      const resolved = await Promise.all(
        res.data.map(async (entry) => {
          const [recipes, ingredients] = await Promise.all([
            Promise.all(
              entry.recipeIds.map((id) =>
                api
                  .get<RecipeDetail>(`/recipe/${id}`, { withCredentials: true })
                  .then((r) => r.data),
              ),
            ),
            Promise.all(
              entry.ingredientIds.map((id) =>
                api
                  .get<IngredientDetail>(`/ingredient/${id}`, {
                    withCredentials: true,
                  })
                  .then((r) => r.data),
              ),
            ),
          ]);

          return {
            date: entry.date,
            calories: entry.calories,
            carbohydrate: entry.carbohydrate,
            protein: entry.protein,
            fat: entry.fat,
            recipes,
            ingredients,
          };
        }),
      );

      // Sort newest first
      resolved.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setDailyIntake(resolved);
    } catch (error) {
      console.error("fetchDailyIntake error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDailyIntake();
  }, [fetchDailyIntake]);

  return { dailyIntake, loading, reFetchDailyIntake: fetchDailyIntake };
};
