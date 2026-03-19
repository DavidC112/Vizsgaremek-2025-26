import { useState, useEffect } from "react";
import type { Ingredient } from "../../hooks/useIngredients";
import Modal from "../ui/Modal";

type Props = {
  ingredient: Ingredient;
  editIngredient: (id: number, data: Partial<Ingredient>) => Promise<void>;
  addNotification: (msg: string) => void;
};

const IngredientModal = ({
  ingredient,
  editIngredient,
  addNotification,
}: Props) => {
  const [tempData, setTempData] = useState({
    name: ingredient.name,
    calories: ingredient.calories,
    protein: ingredient.protein,
    carbohydrate: ingredient.carbohydrate,
    fat: ingredient.fat,
  });

  useEffect(() => {
    setTempData({
      name: ingredient.name,
      calories: ingredient.calories,
      protein: ingredient.protein,
      carbohydrate: ingredient.carbohydrate,
      fat: ingredient.fat,
    });
  }, [ingredient]);

  const isChanged =
    tempData.name !== ingredient.name ||
    tempData.calories !== ingredient.calories ||
    tempData.protein !== ingredient.protein ||
    tempData.carbohydrate !== ingredient.carbohydrate ||
    tempData.fat !== ingredient.fat;

  return (
    <Modal
      onClose={() => {}}
      trigger={
        <button
          disabled={ingredient.isDeleted}
          className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600/90 hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:border-red-500 disabled:bg-red-200 disabled:text-red-600 disabled:opacity-50"
        >
          Edit
        </button>
      }
      title={`Edit ${ingredient.name}`}
      actions={(close) => (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => {
              close();
            }}
            className="w-20 rounded border border-emerald-200 bg-white px-2 py-1 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
          >
            Cancel
          </button>
          <button
            disabled={!isChanged}
            onClick={async () => {
              await editIngredient(ingredient.id, tempData);
              close();
              addNotification(`${tempData.name} updated successfully`);
            }}
            className="brder-red-500 w-20 rounded border bg-red-100 px-2 py-1 text-sm font-medium text-red-600 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:bg-red-200 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      )}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={tempData.name}
            onChange={(e) =>
              setTempData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-1 block w-full rounded border px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Calories</label>
          <input
            type="number"
            value={tempData.calories}
            onChange={(e) =>
              setTempData((prev) => ({
                ...prev,
                calories: Number(e.target.value),
              }))
            }
            className="mt-1 block w-full rounded border px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Protein</label>
          <input
            type="number"
            value={tempData.protein}
            onChange={(e) =>
              setTempData((prev) => ({
                ...prev,
                protein: Number(e.target.value),
              }))
            }
            className="mt-1 block w-full rounded border px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Carbohydrates</label>
          <input
            type="number"
            value={tempData.carbohydrate}
            onChange={(e) =>
              setTempData((prev) => ({
                ...prev,
                carbohydrate: Number(e.target.value),
              }))
            }
            className="mt-1 block w-full rounded border px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Fat</label>
          <input
            type="number"
            value={tempData.fat}
            onChange={(e) =>
              setTempData((prev) => ({ ...prev, fat: Number(e.target.value) }))
            }
            className="mt-1 block w-full rounded border px-2 py-1"
          />
        </div>
      </div>
    </Modal>
  );
};

export default IngredientModal;
