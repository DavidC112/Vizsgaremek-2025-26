import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { useRecipes, type Recipe } from "../../hooks/useRecipes";
import ImageUpload from "../ImageUpload";
import type { Ingredient } from "../../hooks/useIngredients";

type Props = {
  recipe: Recipe;
  editrecipe: (id: number, data: Partial<Recipe>) => Promise<void>;
  addNotification: (msg: string) => void;
  ingredientData: Ingredient[];
  fetchIngredients: () => Promise<void>;
};

const RecipeAdminModal = ({
  recipe,
  editrecipe,
  addNotification,
  ingredientData,
  fetchIngredients,
}: Props) => {
  const [tempData, setTempData] = useState(recipe);
  const [openSections, setOpenSections] = useState({
    basic: true,
    times: false,
    nutrition: false,
    ingredient: false,
    other: false,
  });
  const { adminUploadRecipeImage } = useRecipes();
  const [preview, setPreview] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const [amount, setAmount] = useState<number>(0);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const Image = (file: File) => {
    setPreview(URL.createObjectURL(file));
    const localUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setTempData((prev) => ({
      ...prev,
      imageUrl: localUrl,
    }));
  };

  useEffect(() => {
    setTempData(recipe);
  }, [recipe]);

  const numberFields: { label: string; key: keyof Recipe }[] = [
    { label: "Calories", key: "calories" },
    { label: "Protein (g)", key: "protein" },
    { label: "Carbohydrate (g)", key: "carbohydrate" },
    { label: "Fat (g)", key: "fat" },
    { label: "Portions", key: "portions" },
    { label: "Preparation Time (min)", key: "preparationTime" },
    { label: "Cooking Time (min)", key: "cookingTime" },
  ];

  const isChanged =
    Object.keys(tempData).some(
      (key) =>
        key !== "ingredients" &&
        key !== "imageUrl" &&
        (tempData as any)[key] !== (recipe as any)[key],
    ) ||
    JSON.stringify(tempData.ingredients) !==
      JSON.stringify(recipe.ingredients) ||
    selectedFile != null;

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const loadNumbers = (keys: typeof numberFields) => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {keys.map((f) => (
        <div key={f.key}>
          <label className="block text-sm font-medium">{f.label}</label>
          <input
            type="number"
            value={tempData[f.key] as number}
            onChange={(e) =>
              setTempData((prev) => ({
                ...prev,
                [f.key]: Number(e.target.value),
              }))
            }
            className="mt-1 block w-full rounded border px-2 py-1"
          />
        </div>
      ))}
    </div>
  );

  return (
    <Modal
      onClose={() => {}}
      trigger={
        <button
          disabled={recipe.isDeleted}
          className="w-20 rounded border border-gray-200 bg-white px-2 py-1 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50"
        >
          Edit
        </button>
      }
      title={`Edit ${recipe.name}`}
      actions={(close) => (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => close()}
            className="w-20 rounded border border-gray-200 bg-white px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={!isChanged}
            onClick={async () => {
              await editrecipe(recipe.id, tempData);
              if (selectedFile) {
                await adminUploadRecipeImage(recipe.id, selectedFile);
              }
              close();
              addNotification(`${tempData.name} updated successfully`);
            }}
            className="bg-primary-green-400 border-primary-green-600 hover:bg-primary-green-300 w-20 rounded border-2 px-2 py-1 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save
          </button>
        </div>
      )}
    >
      <div className="max-h-[80vh] space-y-4 px-2 py-2">
        <div className="flex flex-col md:flex-row md:justify-between">
          <ImageUpload onImageChange={Image} />
          {preview && (
            <img
              src={preview}
              alt="Uploaded preview"
              className="mt-3 max-h-40 w-full rounded-lg object-cover md:mt-0 md:ml-3 md:h-27 md:w-47 lg:h-40 lg:w-70"
            />
          )}
        </div>
        <div className="rounded border">
          <button
            type="button"
            className="flex w-full items-center justify-between bg-gray-100 px-3 py-2 text-left font-medium hover:bg-gray-200"
            onClick={() => toggleSection("basic")}
          >
            <span>Basic Info</span>
            <span>{openSections.basic ? "▲" : "▼"}</span>
          </button>
          {openSections.basic && (
            <div className="space-y-3 p-3">
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
                <label className="block text-sm font-medium">Category</label>
                <select
                  value={tempData.category}
                  onChange={(e) =>
                    setTempData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded border px-2 py-1"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Main">Main</option>
                  <option value="Soup">Soup</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="rounded border">
          <button
            type="button"
            className="flex w-full items-center justify-between bg-gray-100 px-3 py-2 text-left font-medium hover:bg-gray-200"
            onClick={() => toggleSection("times")}
          >
            <span>Times & Portions</span>
            <span>{openSections.times ? "▲" : "▼"}</span>
          </button>
          {openSections.times && (
            <div className="space-y-3 p-3">
              {loadNumbers(numberFields.slice(4))}
            </div>
          )}
        </div>
        <div className="rounded border">
          <button
            type="button"
            className="flex w-full items-center justify-between bg-gray-100 px-3 py-2 text-left font-medium hover:bg-gray-200"
            onClick={() => toggleSection("nutrition")}
          >
            <span>Nutrition</span>
            <span>{openSections.nutrition ? "▲" : "▼"}</span>
          </button>
          {openSections.nutrition && (
            <div className="space-y-3 p-3">
              {loadNumbers(numberFields.slice(0, 4))}
            </div>
          )}
        </div>
        <div className="rounded border">
          <button
            type="button"
            className="flex w-full items-center justify-between bg-gray-100 px-3 py-2 text-left font-medium hover:bg-gray-200"
            onClick={() => toggleSection("other")}
          >
            <span>Other</span>
            <span>{openSections.other ? "▲" : "▼"}</span>
          </button>
          {openSections.other && (
            <div className="space-y-3 p-3">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={tempData.description}
                onChange={(e) =>
                  setTempData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded border px-2 py-1"
              />
              <label className="block text-sm font-medium">Instructions</label>
              <textarea
                value={tempData.instructions}
                onChange={(e) =>
                  setTempData((prev) => ({
                    ...prev,
                    instructions: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded border px-2 py-1"
              />
              <div className="mt-2 flex flex-wrap gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={tempData.isVegan}
                    onChange={(e) =>
                      setTempData((prev) => ({
                        ...prev,
                        isVegan: e.target.checked,
                      }))
                    }
                  />
                  Vegan
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={tempData.isVegetarian}
                    onChange={(e) =>
                      setTempData((prev) => ({
                        ...prev,
                        isVegetarian: e.target.checked,
                      }))
                    }
                  />
                  Vegetarian
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="rounded border">
          <button
            type="button"
            className="flex w-full items-center justify-between bg-gray-100 px-3 py-2 text-left font-medium hover:bg-gray-200"
            onClick={() => {
              toggleSection("ingredient");
              if (ingredientData.length === 0) fetchIngredients();
            }}
          >
            <span>Ingredients</span>
            <span>{openSections.ingredient ? "▲" : "▼"}</span>
          </button>

          {openSections.ingredient && (
            <div className="space-y-3 p-3">
              {tempData.ingredients.length === 0 ? (
                <p className="text-sm text-gray-400">No ingredients yet.</p>
              ) : (
                <ul className="space-y-1">
                  {tempData.ingredients.map((ing) => (
                    <li
                      key={ing.ingredientId}
                      className="flex items-center justify-between rounded border px-2 py-1 text-sm"
                    >
                      <span>{ing.ingredientName}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">{ing.amount}g</span>
                        <button
                          onClick={() =>
                            setTempData((prev) => ({
                              ...prev,
                              ingredients: prev.ingredients.filter(
                                (i) => i.ingredientId !== ing.ingredientId,
                              ),
                            }))
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <hr />
              <input
                type="text"
                placeholder="Search ingredient..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIngredient(null);
                }}
                className="block w-full rounded border px-2 py-1 text-sm"
              />

              <ul className="max-h-40 overflow-y-auto rounded border text-sm">
                {ingredientData
                  .filter(
                    (i) =>
                      !i.isDeleted &&
                      i.name.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((i) => (
                    <li
                      key={i.id}
                      onClick={() => {
                        setSelectedIngredient(i);
                        setSearch(i.name);
                      }}
                      className={`cursor-pointer px-2 py-1 hover:bg-emerald-50 ${
                        selectedIngredient?.id === i.id ? "bg-emerald-100" : ""
                      }`}
                    >
                      {i.name}
                    </li>
                  ))}
              </ul>

              {selectedIngredient && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-24 rounded border px-2 py-1 text-sm"
                    placeholder="Amount (g)"
                  />
                  <button
                    disabled={amount <= 0}
                    onClick={() => {
                      setTempData((prev) => {
                        const exists = prev.ingredients.find(
                          (i) => i.ingredientId === selectedIngredient.id,
                        );
                        return {
                          ...prev,
                          ingredients: exists
                            ? prev.ingredients.map((i) =>
                                i.ingredientId === selectedIngredient.id
                                  ? { ...i, amount: i.amount + amount }
                                  : i,
                              )
                            : [
                                ...prev.ingredients,
                                {
                                  ingredientId: selectedIngredient.id,
                                  ingredientName: selectedIngredient.name,
                                  amount,
                                },
                              ],
                        };
                      });
                      setSelectedIngredient(null);
                      setSearch("");
                      setAmount(0);
                    }}
                    className="rounded border border-emerald-200 bg-white px-3 py-1 text-sm font-medium text-emerald-600 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RecipeAdminModal;
