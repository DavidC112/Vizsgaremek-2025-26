import { useCallback, useEffect, useState } from "react";
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

export const useMeals = () => {
  const [meals, setMeals] = useState<MealsResponse | undefined>(undefined);

  const fetchMeals = useCallback(async () => {
    const res = await api.get("/users/me/meals", {
      withCredentials: true,
    });

    console.log(res.data);
    setMeals(res.data);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMeals();
  }, [fetchMeals]);

  return {
    meals,
    reFetchMeals: fetchMeals,
  };
};
