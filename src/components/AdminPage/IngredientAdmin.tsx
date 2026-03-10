import { useEffect } from "react";
import useIngredients from "../../hooks/useIngredients";
import { Flame } from "lucide-react";
import Modal from "../ui/Modal";
import { useNotification } from "../../context/NotificationProvider";
import IngredientModal from "../Modals/IngredientModal";
import GenericAdminModal from "../Modals/GenericAdminModal";
import useAdminFilter from "../../hooks/useAdminFilter";
import AdminSearchBar from "../ui/Admin/AdminSearchBar";

const IngredientAdmin = () => {
  const {
    ingredientData,
    fetchIngredients,
    deleteIngredient,
    restoreIngredient,
    editIngredient,
    addIngredient,
  } = useIngredients();

  const { search, setSearch, filters, setFilters, filtered } = useAdminFilter(
    ingredientData,
    (ingredient, search) =>
      ingredient.name.toLowerCase().includes(search.toLowerCase()),
    (ingredient, filters) => {
      if (filters.deleted !== ingredient.isDeleted) return false;
      return true;
    },
    { deleted: false },
  );

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);
  const { addNotification } = useNotification();

  return (
    <div className="mx-auto max-w-5xl p-5">
      <div className="flex flex-col items-start gap-3 px-5 md:flex-row md:items-start md:justify-between lg:px-0">
        <GenericAdminModal
          data={{ name: "", calories: 0, protein: 0, carbohydrate: 0, fat: 0 }}
          onSave={addIngredient}
          addNotification={addNotification}
          triggerLabel="+ Add"
          fields={[
            { name: "name", label: "Name", type: "text" },
            { name: "calories", label: "Calories", type: "number" },
            { name: "protein", label: "Protein", type: "number" },
            { name: "carbohydrate", label: "Carbohydrates", type: "number" },
            { name: "fat", label: "Fat", type: "number" },
          ]}
        />
        <AdminSearchBar
          type="Ingredient"
          value={search}
          onChange={setSearch}
          placeholder="Search ingredient..."
          isDeleted={filters.deleted}
          onDeletedChange={(val) => setFilters((f) => ({ ...f, deleted: val }))}
        />
      </div>
      <div className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
        {filtered.map((ingredient) => (
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
                      className="brder-red-500 w-20 rounded border bg-red-100 px-2 py-1 text-sm font-medium text-red-600 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
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

                <IngredientModal
                  ingredient={ingredient}
                  editIngredient={editIngredient}
                  addNotification={addNotification}
                />
                <button
                  onClick={async () => {
                    await restoreIngredient(ingredient.id);
                    addNotification(`${ingredient.name} restored successfully`);
                  }}
                  disabled={!ingredient.isDeleted}
                  className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 transition hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100 disabled:cursor-not-allowed disabled:bg-emerald-200 disabled:opacity-50"
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

export default IngredientAdmin;
