import { useCallback, useState } from "react";
import api from "../api/axios";

export type RecipeIngredient = {
  ingredientId: number;
  ingredientName: string;
  amount: number;
};

export type CreateRecipe = {
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
  ingredients: RecipeIngredient[];
};

export type Recipe = {
  id: number;
  userName: string;
  userProfilePicture: string;
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

  const defaultImageUrl =
    "https://ik.imagekit.io/nrt5lwugy/pictures/defaultrecipe.jpg";

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
                imageUrl: defaultImageUrl,
              }
            : recipe,
        ),
      );
    } catch (error) {
      console.log("AdminDeleteRecipeError" + error);
    }
  };

  const restoreRecipe = async (recipeId: number) => {
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
                imageUrl: defaultImageUrl,
              }
            : recipe,
        ),
      );
    } catch (error) {
      console.log("RecipeRestoreError" + error);
    }
  };

  const editRecipe = async (
    recipeId: number,
    updatedFields: Partial<Recipe>,
  ) => {
    try {
      await api.patch(`admin/recipe/${recipeId}/edit`, updatedFields, {
        withCredentials: true,
      });
      setRecipeArray((prev) =>
        prev.map((recipe) =>
          recipe.id === recipeId ? { ...recipe, ...updatedFields } : recipe,
        ),
      );
    } catch (error) {
      console.log("EditRecipeError" + error);
    }
  };

  const adminUploadRecipeImage = async (recipeId: number, image: File) => {
    try {
      const formData = new FormData();
      formData.append("File", image);

      const res = await api.post(
        `admin/recipe/create/${recipeId}/upload-image`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const result = res.data.data;

      setRecipeArray((prev) =>
        prev.map((recipe) =>
          recipe.id === recipeId
            ? { ...recipe, imageUrl: result.url, fileId: result.fileId }
            : recipe,
        ),
      );

      console.log("upload response:", res.data);
    } catch (error) {
      console.log("AdminUploadRecipeImageError", error);
    }
  };

  const addAdminRecipe = async (
    recipe: CreateRecipe,
  ): Promise<Recipe | null> => {
    try {
      const res = await api.post("admin/recipe/create", recipe, {
        withCredentials: true,
      });
      setRecipeArray((prev) => prev.concat(res.data.data));
      return res.data.data;
    } catch (error) {
      console.log("AddAdminRecipeError" + error);
      return null;
    }
  };
  return {
    recipeArray,
    fetchAllRecipes,
    fetchRecipeById,
    recipeData,
    fetchAdminRecipes,
    AdminDeleteRecipe,
    restoreRecipe,
    editRecipe,
    adminUploadRecipeImage,
    addAdminRecipe,
  };
};
