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
  imageUrl: string;
  ingredients: RecipeIngredient[];
  isDeleted: boolean;
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
    } catch (error) {
      console.error("fetchRecipeById error: " + error);
      return;
    }
  }, []);

  //Admin

  const fetchAdminRecipes = useCallback(async () => {
    try {
      const res = await api.get("/admin/recipe/all");
      setRecipeArray(res.data);
    } catch (error) {
      console.log("fetchAdminRecipes error" + error);
    }
  }, []);

  const AdminDeleteRecipe = async (recipeId: number) => {
    try {
      await api.patch(`admin/recipe/${recipeId}/delete`, null, {
        withCredentials: true,
      });
      setRecipeArray((prev) =>
        prev.map((recipe) =>
          recipe.id === recipeId
            ? {
                ...recipe,
                isDeleted: true,
                imageUrl:
                  "https://ik.imagekit.io/nrt5lwugy/pictures/def_Recipe.png?updatedAt=1771956292901",
              }
            : recipe,
        ),
      );
    } catch (error) {
      console.log("AdminDeleteRecipeError" + error);
    }
  };

  const RestoreRecipe = async (recipeId: number) => {
    try {
      await api.patch(`admin/recipe/${recipeId}/restore`, null, {
        withCredentials: true,
      });
      setRecipeArray((prev) =>
        prev.map((recipe) =>
          recipe.id === recipeId
            ? {
                ...recipe,
                isDeleted: false,
                imageUrl:
                  "https://ik.imagekit.io/nrt5lwugy/pictures/def_Recipe.png?updatedAt=1771956292901",
              }
            : recipe,
        ),
      );
    } catch (error) {
      console.log("RecipeRestoreError" + error);
    }
  };

  return {
    recipeArray,
    fetchAllRecipes,
    fetchRecipeById,
    recipeData,
    fetchAdminRecipes,
    AdminDeleteRecipe,
    RestoreRecipe,
  };
};
