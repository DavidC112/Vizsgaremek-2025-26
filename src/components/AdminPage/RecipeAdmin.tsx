import { useEffect } from "react";
import { useRecipes } from "../../hooks/useRecipe";
import { Flame } from "lucide-react";
import Modal from "../ui/Modal";
import { useNotification } from "../../context/NotificationProvider";

const RecipeAdmin = () => {
  const { fetchAdminRecipes, recipeArray, AdminDeleteRecipe, RestoreRecipe } =
    useRecipes();

  useEffect(() => {
    fetchAdminRecipes();
  }, [fetchAdminRecipes]);

  const { addNotification } = useNotification();

  return (
    <div className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
      {recipeArray.map((recipe) => (
        <li
          key={recipe.id}
          className={`overflow-hidden rounded-lg ${
            recipe.isDeleted ? "bg-red-100" : "bg-emerald-100"
          }`}
        >
          <div className="h-30 overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={recipe.imageUrl}
              alt="recipe image"
            />
          </div>
          <div className="m-4 flex flex-col gap-3">
            <div className="flex flex-col">
              <p
                className={`text-lg font-semibold ${recipe.isDeleted ? "text-red-600" : "text-emerald-600"}`}
              >
                {recipe.name}
              </p>
              <p
                className={`${recipe.isDeleted ? "text-red-600" : "text-orange-600"} text-md flex flex-row gap-1`}
              >
                <Flame className="h-5 w-5" />
                <span className="font-semibold">{recipe.calories}</span>{" "}
                <span>cal</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Modal
                onClose={() => {}}
                trigger={
                  <button
                    disabled={recipe.isDeleted}
                    className="w-20 rounded border border-red-200 bg-red-100 px-2 py-1 text-sm font-medium text-red-600/90 transition hover:border-red-300 hover:bg-red-200 active:bg-red-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    Delete
                  </button>
                }
                title="Delete ingredient"
                description={`Are you sure you want to delete ${recipe.name}`}
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
                        await AdminDeleteRecipe(recipe.id);
                        close();
                        addNotification(`${recipe.name} deleted succesfully`);
                      }}
                      className="w-20 rounded border border-red-200 bg-red-100 px-2 py-1 text-sm font-medium text-red-600/90 transition hover:border-red-300 hover:bg-red-200 active:bg-red-100"
                    >
                      Delete
                    </button>
                  </>
                )}
              ></Modal>
              <button
                disabled={recipe.isDeleted}
                className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
              >
                Details
              </button>

              <button
                onClick={async () => {
                  await RestoreRecipe(recipe.id);
                  addNotification(`${recipe.name} restored successfully`);
                }}
                disabled={!recipe.isDeleted}
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

export default RecipeAdmin;
