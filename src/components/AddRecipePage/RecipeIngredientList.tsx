import { Plus } from "lucide-react";
import RecipeIngredient from "./RecipeIngredient";

type RecipeIngredient = { id: number; name: string; amount: number };
type Ingredient = { name: string; [key: string]: unknown };

type Props = {
  recipeIngredients: RecipeIngredient[];
  ingredients: Ingredient[];
  onAdd: () => void;
  onRemove: (id: number) => void;
  onUpdate: (
    id: number,
    field: "name" | "amount",
    value: string | number,
  ) => void;
};

const RecipeIngredientList = ({
  recipeIngredients,
  ingredients,
  onAdd,
  onRemove,
  onUpdate,
}: Props) => (
  <div className="space-y-3">
    {recipeIngredients.map((ingredient) => (
      <RecipeIngredient
        key={ingredient.id}
        ingredient={ingredient}
        ingredients={ingredients}
        isOnly={recipeIngredients.length === 1}
        onUpdate={onUpdate}
        onRemove={onRemove}
      />
    ))}
    <button
      type="button"
      onClick={onAdd}
      className="text-primary-green-500 hover:text-primary-green-600 flex items-center gap-1 text-sm transition"
    >
      <Plus size={16} /> Add Ingredient
    </button>
  </div>
);
export default RecipeIngredientList;
