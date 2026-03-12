import { useCallback, useState } from "react";
import api from "../api/axios";

export type RecipeIngredient = {
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
  instructions: string;
  portions: number;
  calories: number;
  protein: number;
  carbohydrate: number;
  fat: number;
  isVegan: boolean;
  isVegetarian: boolean;
  isCommunity: boolean;
  imageUrl: string | null;
  isDeleted: boolean;
  ingredients: RecipeIngredient[];
};

export const useRecipes = () => {
  const [recipeArray, setRecipeArray] = useState<Recipe[]>([]);
  const [recipeData, setRecipeData] = useState<Recipe>();

  const fetchAllRecipes = useCallback(async () => {
    try {
      const res = await api.get("/recipe/all");
      setRecipeArray(res.data);
    } catch (error) {
      console.error("fetchAllRecipes error: " + error);
      return;
    }
  }, []);

  const fetchRecipeById = useCallback(async (id: number) => {
    try {
      const res = await api.get(`/recipe/${id}`);
      setRecipeData(res.data);
      return res.data;
    } catch (error) {
      console.error("fetchRecipeById error: " + error);
      return;
    }
  }, []);

  return { recipeArray, fetchAllRecipes, fetchRecipeById, recipeData };
};
