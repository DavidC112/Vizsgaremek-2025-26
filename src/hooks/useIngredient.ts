import { useCallback, useState } from "react";
import api from "../api/axios";

export type Ingredient = {
  id: number;
  name: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  isDeleted: boolean;
};

export const useIngredient = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const fetchIngredients = useCallback(async () => {
    try {
      const res = await api.get("/ingredient/all");

      setIngredients(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {
    fetchIngredients,
    ingredients,
  };
};
