import type { CreateRecipePayload } from "../utils/AddRecipe.type";

export type ValidationError = string;

export const validateRecipePayload = (
  payload: CreateRecipePayload,
  image: File | null,
  options?: { requireImage?: boolean },
): ValidationError | null => {
  const { requireImage = true } = options ?? {};

  if (!payload.name.trim()) return "Recipe name is required.";

  if (!payload.description.trim()) return "Description is required.";

  if (!payload.portions || payload.portions < 1)
    return "Portions must be at least 1.";

  if (!payload.preparationTime || payload.preparationTime < 1)
    return "Prep time must be at least 1 minute.";

  if (!payload.cookingTime || payload.cookingTime < 1)
    return "Cook time must be at least 1 minute.";

  if (!payload.instructions.trim()) return "At least one step is required.";

  if (payload.ingredients.length === 0)
    return "At least one ingredient is required.";

  const invalidIngredient = payload.ingredients.find(
    (i) => i.ingredientId <= 0 || i.amount <= 0,
  );
  if (invalidIngredient)
    return "All ingredients must have a name and an amount greater than 0.";

  if (!payload.calories || payload.calories < 1)
    return "Calories are required.";

  if (!payload.protein || payload.protein < 1) return "Protein is required.";

  if (!payload.carbohydrate || payload.carbohydrate < 1)
    return "Carbohydrate is required.";

  if (!payload.fat || payload.fat < 1) return "Fat is required.";

  if (requireImage && !image) return "A recipe image is required.";

  return null;
};
