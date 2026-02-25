import { useEffect } from "react";
import useIngredients from "../../hooks/useIngredients";
import { Flame } from "lucide-react";
import Modal from "../ui/Modal";
import { useNotification } from "../../context/NotificationProvider";

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
  const { addNotification } = useNotification();

  return (
    <div className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
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
              <Modal
                onClose={() => {}}
                trigger={
                  <button
                    disabled={ingredient.isDeleted}
                    className="w-20 rounded border border-red-200 bg-red-100 px-2 py-1 text-sm font-medium text-red-600/90 transition hover:border-red-300 hover:bg-red-200 active:bg-red-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    Delete
                  </button>
                }
                title="Delete ingredient"
                description={`Are you sure you want to delete ${ingredient.name}`}
                actions={(close) => (
                  <>
                    <button
                      onClick={() => {
                        close();
                      }}
                      className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        await deleteIngredient(ingredient.id);
                        close();
                        addNotification(
                          `${ingredient.name} deleted succesfully`,
                        );
                      }}
                      className="w-20 rounded border border-red-200 bg-red-100 px-2 py-1 text-sm font-medium text-red-600/90 transition hover:border-red-300 hover:bg-red-200 active:bg-red-100"
                    >
                      Delete
                    </button>
                  </>
                )}
              ></Modal>

              <button
                disabled={ingredient.isDeleted}
                className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
              >
                Edit
              </button>

              <button
                onClick={async () => {
                  await restoreIngredient(ingredient.id);
                  addNotification(`${ingredient.name} restored successfully`);
                }}
                disabled={!ingredient.isDeleted}
                className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
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
