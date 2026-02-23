import { useCallback, useState } from "react";
import api from "../api/axios";

export type Ingredient = {
  ingredientId: number;
  ingredientName: string;
  amount: number;
};

export type Recipe = {
  id: number;
  name: string;
  category: string;
  preparationTime: number;
  cookingTime: number;
  description: string;
  portions: number;
  calories: number;
  protein: number;
  carbohydrate: number;
  fat: number;
  isVegan: boolean;
  isVegetarian: boolean;
  isCommunity: boolean;
  imageUrl: string | null;
  ingredients: Ingredient[];
};

export const useRecipes = () => {
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);

  const fetchAllRecipes = useCallback(async () => {
    const res = await api.get("/recipe/all");

    setRecipeData(res.data);
  }, []);

  return { recipeData, fetchAllRecipes };
};
