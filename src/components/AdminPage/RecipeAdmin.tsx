import { useEffect } from "react";
import { useRecipes } from "../../hooks/useRecipe";
import { Flame } from "lucide-react";
import Modal from "../ui/Modal";
import { useNotification } from "../../context/NotificationProvider";
import RecipeAdminModal from "../Modals/RecipeAdminModal";
import useIngredient from "../../hooks/useIngredients";

const RecipeAdmin = () => {
  const {
    fetchAdminRecipes,
    recipeArray,
    AdminDeleteRecipe,
    restoreRecipe,
    editRecipe,
  } = useRecipes();

  const { fetchIngredients, ingredientData } = useIngredient();

  useEffect(() => {
    fetchAdminRecipes();
  }, [fetchAdminRecipes]);

  const { addNotification } = useNotification();

  return (
    <div className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
      {recipeArray.map((recipe) => (
        <li
          key={recipe.id}
          className={`overflow-hidden rounded-lg ${
            recipe.isDeleted
              ? "bg-red-100 text-red-800"
              : "bg-emerald-100 text-emerald-900"
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
              <div className="flex items-center gap-2">
                <img
                  className="h-10 w-10 rounded-full border object-cover"
                  src={recipe.userProfilePicture}
                  alt="profile picture"
                />{" "}
                <p className="text-lg font-medium">{recipe.userName}</p>
              </div>
              <p
                className={`text-lg font-semibold ${recipe.isDeleted ? "line-through" : ""}`}
              >
                {recipe.name}
              </p>
              <p
                className={`${recipe.isDeleted ? "text-red-700" : "text-orange-600"} text-md flex flex-row gap-1`}
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
                    className="brder-red-500 w-20 rounded border bg-red-100 px-2 py-1 text-sm font-medium text-red-600 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
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
              <RecipeAdminModal
                fetchIngredients={fetchIngredients}
                ingredientData={ingredientData}
                recipe={recipe}
                editrecipe={editRecipe}
                addNotification={addNotification}
              />

              <button
                onClick={async () => {
                  await restoreRecipe(recipe.id);
                  addNotification(`${recipe.name} restored successfully`);
                }}
                disabled={!recipe.isDeleted}
                className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100 disabled:cursor-not-allowed disabled:bg-emerald-200 disabled:opacity-50"
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
