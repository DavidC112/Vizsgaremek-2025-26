import { useEffect } from "react";
import { useRecipes } from "../../hooks/useRecipes";
import { Flame } from "lucide-react";
import Modal from "../ui/Modal";
import { useNotification } from "../../context/NotificationProvider";
import useIngredient from "../../hooks/useIngredients";
import RecipeAdminModal from "../Modals/RecipeAdminModal";
import RecipeAdminCreateModal from "../Modals/RecipeAdminCreateModal";
import useAdminFilter from "../../hooks/useAdminFilter";
import AdminSearchBar from "../ui/Admin/AdminSearchBar";

const RecipeAdmin = () => {
  const {
    fetchAdminRecipes,
    recipeArray,
    AdminDeleteRecipe,
    restoreRecipe,
    editRecipe,
    adminUploadRecipeImage,
    addAdminRecipe,
  } = useRecipes();

  const { fetchIngredients, ingredientData } = useIngredient();

  const { search, setSearch, filters, setFilters, filtered } = useAdminFilter(
    recipeArray,
    (recipe, search) =>
      recipe.name.toLowerCase().includes(search.toLowerCase()),
    (recipe, filters) => {
      if (filters.deleted !== recipe.isDeleted) return false;
      if (filters.community && !recipe.isCommunity) return false;
      if (filters.vegetarian && !recipe.isVegetarian) return false;
      if (filters.vegan && !recipe.isVegan) return false;
      return true;
    },
    { community: false, vegetarian: false, vegan: false, deleted: false },
  );

  useEffect(() => {
    fetchAdminRecipes();
  }, [fetchAdminRecipes]);

  const { addNotification } = useNotification();

  return (
    <div className="mx-auto max-w-5xl p-5">
      <div className="flex flex-col items-start gap-3 px-5 md:flex-row md:items-start md:justify-between lg:px-0">
        <RecipeAdminCreateModal
          adminUploadRecipeImage={adminUploadRecipeImage}
          addAdminRecipe={addAdminRecipe}
          addNotification={addNotification}
          ingredientData={ingredientData}
          fetchIngredients={fetchIngredients}
        />
        <div className="self-end md:self-auto">
          <AdminSearchBar
            type="Recipe"
            value={search}
            onChange={setSearch}
            placeholder="Search recipes..."
            isCommunity={filters.community}
            onCommunityChange={(val: boolean) =>
              setFilters((f) => ({ ...f, community: val }))
            }
            isVegetarian={filters.vegetarian}
            onVegetarianChange={(value: boolean) =>
              setFilters((f) => ({ ...f, vegetarian: value }))
            }
            isVegan={filters.vegan}
            onVeganChange={(value: boolean) =>
              setFilters((f) => ({ ...f, vegan: value }))
            }
            isDeleted={filters.deleted}
            onDeletedChange={(value: boolean) =>
              setFilters((f) => ({ ...f, deleted: value }))
            }
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
        {filtered.map((recipe) => (
          <li
            key={recipe.id}
            className={`overflow-hidden rounded-lg border-2 bg-white text-gray-600 shadow-md ${
              recipe.isDeleted ? "border-red-700" : "border-primary-green-400"
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
                        className="active:bg-gray-1000 w-20 rounded border border-gray-200 bg-white px-2 py-1 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
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
                  className="w-20 rounded border border-gray-200 bg-white px-2 py-1 text-sm font-medium transition hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50"
                >
                  Restore
                </button>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default RecipeAdmin;
