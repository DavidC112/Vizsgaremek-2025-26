export type RecipeCategory = "Breakfast" | "Lunch" | "Dinner";

export type RecipeIngredient = {
  id: number;
  name: string;
  amount: number;
};

export type NumericField = number | "";

export type Ingredient = {
  id: number;
  name: string;
};

export type NutritionFieldDescriptor = {
  label: string;
  unit: "kcal" | "g";
  value: NumericField;
  set: (v: NumericField) => void;
};

export type CreateRecipeIngredientPayload = {
  ingredientId: number;
  amount: number;
};

export type CreateRecipePayload = {
  name: string;
  category: RecipeCategory;
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
  ingredients: CreateRecipeIngredientPayload[];
};

export type CreateRecipeResponse = {
  message: string;
  data: CreateRecipePayload & { id: number };
};

export type SubmitStatus = {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
};
