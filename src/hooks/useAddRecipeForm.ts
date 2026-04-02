import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type {
  RecipeCategory,
  RecipeIngredient,
  NumericField,
  Ingredient,
} from "../utils/AddRecipe.type";
import useIngredient from "./useIngredients";

export type UseAddRecipeFormReturn = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  category: RecipeCategory;
  setCategory: Dispatch<SetStateAction<RecipeCategory>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  portions: NumericField;
  setPortions: Dispatch<SetStateAction<NumericField>>;
  prepTime: NumericField;
  setPrepTime: Dispatch<SetStateAction<NumericField>>;
  cookTime: NumericField;
  setCookTime: Dispatch<SetStateAction<NumericField>>;
  calories: NumericField;
  setCalories: Dispatch<SetStateAction<NumericField>>;
  protein: NumericField;
  setProtein: Dispatch<SetStateAction<NumericField>>;
  carbohydrate: NumericField;
  setCarbohydrate: Dispatch<SetStateAction<NumericField>>;
  fat: NumericField;
  setFat: Dispatch<SetStateAction<NumericField>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  setSteps: Dispatch<SetStateAction<string[]>>;
  setRecipeIngredients: Dispatch<SetStateAction<RecipeIngredient[]>>;

  recipeIngredients: RecipeIngredient[];
  addRecipeIngredient: () => void;
  removeRecipeIngredient: (id: number) => void;
  updateRecipeIngredient: (
    id: number,
    field: keyof Pick<RecipeIngredient, "name" | "amount">,
    value: string | number,
  ) => void;

  steps: string[];
  addStep: () => void;
  removeStep: (index: number) => void;
  updateStep: (index: number, value: string) => void;

  ingredients: Ingredient[];
};

export const useAddRecipeForm = (): UseAddRecipeFormReturn => {
  const { fetchIngredients, ingredientData } = useIngredient();

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<RecipeCategory>("Breakfast");
  const [description, setDescription] = useState<string>("");
  const [portions, setPortions] = useState<NumericField>("");
  const [prepTime, setPrepTime] = useState<NumericField>("");
  const [cookTime, setCookTime] = useState<NumericField>("");
  const [calories, setCalories] = useState<NumericField>("");
  const [protein, setProtein] = useState<NumericField>("");
  const [carbohydrate, setCarbohydrate] = useState<NumericField>("");
  const [fat, setFat] = useState<NumericField>("");
  const [recipeIngredients, setRecipeIngredients] = useState<
    RecipeIngredient[]
  >([{ id: 1, name: "", amount: 0 }]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const addRecipeIngredient = (): void =>
    setRecipeIngredients((prev) => [
      ...prev,
      { id: Date.now(), name: "", amount: 0 },
    ]);

  const removeRecipeIngredient = (id: number): void =>
    setRecipeIngredients((prev) => prev.filter((i) => i.id !== id));

  const updateRecipeIngredient = (
    id: number,
    field: keyof Pick<RecipeIngredient, "name" | "amount">,
    value: string | number,
  ): void =>
    setRecipeIngredients((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              [field]:
                field === "amount" ? (value === "" ? 0 : Number(value)) : value,
            }
          : i,
      ),
    );

  const addStep = (): void => setSteps((prev) => [...prev, ""]);

  const removeStep = (index: number): void =>
    setSteps((prev) => prev.filter((_, i) => i !== index));

  const updateStep = (index: number, value: string): void =>
    setSteps((prev) => prev.map((s, i) => (i === index ? value : s)));

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  return {
    name,
    setName,
    category,
    setCategory,
    description,
    setDescription,
    portions,
    setPortions,
    prepTime,
    setPrepTime,
    cookTime,
    setCookTime,
    calories,
    setCalories,
    protein,
    setProtein,
    carbohydrate,
    setCarbohydrate,
    fat,
    setFat,
    tags,
    setTags,
    image,
    setImage,
    recipeIngredients,
    addRecipeIngredient,
    removeRecipeIngredient,
    updateRecipeIngredient,
    steps,
    addStep,
    removeStep,
    updateStep,
    ingredients: ingredientData,
    setSteps,
    setRecipeIngredients,
  };
};
