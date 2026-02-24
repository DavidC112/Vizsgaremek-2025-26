import { useEffect } from "react";
import useIngredients from "../../hooks/useIngredients";
import { DeleteIcon, Flame } from "lucide-react";

const IngredientAdmin = () => {
  const {
    ingredientData,
    fetchIngredients,
    deleteIngredient,
    restoreIngredient,
  } = useIngredients();

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  return (
    <div className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:grid-cols-3">
      {ingredientData.map((ingredient) => (
        <li
          key={ingredient.id}
          className={`rounded-lg p-4 ${
            ingredient.isDeleted
              ? "bg-red-100 text-red-800"
              : "bg-emerald-100 text-emerald-900"
          }`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p
                className={`text-lg font-semibold ${
                  ingredient.isDeleted ? "line-through" : ""
                }`}
              >
                {ingredient.name}
              </p>
              <p
                className={`${ingredient.isDeleted ? "text-red-600" : "text-orange-600"} text-md flex flex-row gap-1`}
              >
                <Flame className="h-5 w-5" />
                <span className="font-semibold">
                  {ingredient.calories}
                </span>{" "}
                <span>cal</span>
              </p>
              <p className="text-sm font-light">
                carbohydrate: {ingredient.carbohydrate}g | protein:{" "}
                {ingredient.protein}g | fat: {ingredient.fat}g
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                disabled={ingredient.isDeleted}
                onClick={() => deleteIngredient(ingredient.id)}
                className="w-20 rounded border px-2 py-1 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
              >
                Delete
              </button>
              <button
                disabled={ingredient.isDeleted}
                className="w-20 rounded border px-2 py-1 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
              >
                Edit
              </button>
              <button
                disabled={!ingredient.isDeleted}
                onClick={() => restoreIngredient(ingredient.id)}
                className="w-20 rounded border px-2 py-1 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-emerald-200 disabled:opacity-50"
              >
                Restore
              </button>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default IngredientAdmin;
