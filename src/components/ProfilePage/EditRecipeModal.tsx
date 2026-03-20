import { useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import type { NumericField, RecipeCategory } from "../../utils/AddRecipe.type";
import { useAddRecipeForm } from "../../hooks/useAddRecipeForm";
import { useRecipeUpdate } from "../../hooks/useRecipeUpdate";
import { theme } from "../../utils/MaterialUITheme";
import ImageUpload from "../ImageUpload";
import { TagSelector } from "../AddRecipePage/TagSelector";
import RecipeIngredientList from "../AddRecipePage/RecipeIngredientList";
import RecipeStepList from "../AddRecipePage/RecipeStepList";
import { Loader2 } from "lucide-react";
import type { Recipe } from "../../hooks/useRecipes";

type Props = {
  isOpen: boolean;
  isLoading: boolean;
  recipe: Recipe | null;
  onClose: () => void;
  onSuccess: () => void;
};

const EditRecipeModal = ({
  isOpen,
  isLoading,
  recipe,
  onClose,
  onSuccess,
}: Props) => {
  const form = useAddRecipeForm();
  const { update, isSubmitting } = useRecipeUpdate();

  useEffect(() => {
    if (!recipe) return;
    form.setName(recipe.name ?? "");
    form.setCategory((recipe.category as RecipeCategory) ?? "Breakfast");
    form.setDescription(recipe.description ?? "");
    form.setPortions(recipe.portions ?? "");
    form.setPrepTime(recipe.preparationTime ?? "");
    form.setCookTime(recipe.cookingTime ?? "");
    form.setCalories(recipe.calories ?? "");
    form.setProtein(recipe.protein ?? "");
    form.setCarbohydrate(recipe.carbohydrate ?? "");
    form.setFat(recipe.fat ?? "");

    const tags: string[] = [];
    if (recipe.isVegan) tags.push("Vegan");
    if (recipe.isVegetarian) tags.push("Vegetarian");
    form.setTags(tags);

    if (recipe.instructions) {
      const steps = recipe.instructions.split(";").filter(Boolean);
      form.setSteps(steps);
    }

    if (recipe.ingredients?.length) {
      const mapped = recipe.ingredients.map((ing, i) => ({
        id: i === 0 ? 1 : Date.now() + i,
        name: ing.ingredientName,
        amount: ing.amount,
      }));
      form.setRecipeIngredients(mapped);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe?.id]);

  const handleSubmit = async () => {
    if (!recipe) return;
    const success = await update(
      recipe.id,
      {
        name: form.name.trim(),
        category: form.category,
        preparationTime: Number(form.prepTime) || 0,
        cookingTime: Number(form.cookTime) || 0,
        description: form.description.trim(),
        instructions: form.steps.map((s) => s.replace("\n", ";")).join(";"),
        portions: Number(form.portions) || 0,
        calories: Number(form.calories) || 0,
        protein: Number(form.protein) || 0,
        carbohydrate: Number(form.carbohydrate) || 0,
        fat: Number(form.fat) || 0,
        isVegan: form.tags.includes("Vegan"),
        isVegetarian: form.tags.includes("Vegetarian"),
        ingredients: form.recipeIngredients
          .filter((i) => i.name)
          .map((i) => {
            const match = form.ingredients.find(
              (ing) => ing.name === i.name || String(ing.id) === i.name,
            );
            return {
              ingredientId: match?.id ?? (Number(i.name) || 0),
              amount: i.amount,
            };
          }),
      },
      form.image,
    );
    if (success) {
      onSuccess();
      onClose();
    }
  };

  const nutritionFields: {
    label: string;
    unit: "kcal" | "g";
    value: NumericField;
    set: (v: NumericField) => void;
  }[] = [
    {
      label: "Calorie",
      unit: "kcal",
      value: form.calories,
      set: form.setCalories,
    },
    { label: "Protein", unit: "g", value: form.protein, set: form.setProtein },
    {
      label: "Carbohydrate",
      unit: "g",
      value: form.carbohydrate,
      set: form.setCarbohydrate,
    },
    { label: "Fat", unit: "g", value: form.fat, set: form.setFat },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="flex max-h-[90dvh] w-full max-w-2xl flex-col rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="border-primary-green-400 border-b-3 p-6 text-center">
            <DialogTitle className="text-2xl font-bold">
              Edit Recipe
            </DialogTitle>
          </div>

          {isLoading ? (
            <div className="flex flex-1 items-center justify-center py-24">
              <Loader2 className="size-8 animate-spin text-neutral-400" />
            </div>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-10">
              <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    justifyContent: "space-between",
                    mb: 4,
                  }}
                >
                  <FormControl
                    variant="standard"
                    sx={{ width: 150, mt: "16px" }}
                  >
                    <InputLabel id="edit-category" shrink>
                      Category
                    </InputLabel>
                    <Select
                      labelId="edit-category"
                      value={form.category}
                      onChange={(e) =>
                        form.setCategory(e.target.value as RecipeCategory)
                      }
                    >
                      <MenuItem value="Breakfast">Breakfast</MenuItem>
                      <MenuItem value="Lunch">Lunch</MenuItem>
                      <MenuItem value="Dinner">Dinner</MenuItem>
                    </Select>
                  </FormControl>
                  <span className="flex items-end">
                    <ImageUpload onImageChange={form.setImage} />
                  </span>
                </Box>

                {form.image && (
                  <section className="mb-6">
                    <img
                      src={URL.createObjectURL(form.image)}
                      alt=""
                      className="h-64 w-full rounded-xl object-cover"
                    />
                  </section>
                )}

                <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <TextField
                    fullWidth
                    label="Recipe Name"
                    variant="standard"
                    value={form.name}
                    onChange={(e) => form.setName(e.target.value)}
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    variant="standard"
                    value={form.description}
                    onChange={(e) => form.setDescription(e.target.value)}
                  />

                  <TextField
                    type="number"
                    label="Portion"
                    variant="standard"
                    value={form.portions}
                    onChange={(e) =>
                      form.setPortions(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    slotProps={{ htmlInput: { min: 1 } }}
                  />

                  <Box sx={{ display: "flex", gap: 3 }}>
                    <TextField
                      fullWidth
                      label="Prep Time (min)"
                      variant="standard"
                      type="number"
                      value={form.prepTime}
                      onChange={(e) =>
                        form.setPrepTime(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      slotProps={{ htmlInput: { min: 1 } }}
                    />
                    <TextField
                      fullWidth
                      label="Cook Time (min)"
                      variant="standard"
                      type="number"
                      value={form.cookTime}
                      onChange={(e) =>
                        form.setCookTime(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      slotProps={{ htmlInput: { min: 1 } }}
                    />
                  </Box>

                  <TagSelector selected={form.tags} onChange={form.setTags} />

                  <RecipeIngredientList
                    recipeIngredients={form.recipeIngredients}
                    ingredients={form.ingredients}
                    onAdd={form.addRecipeIngredient}
                    onRemove={form.removeRecipeIngredient}
                    onUpdate={form.updateRecipeIngredient}
                  />

                  <RecipeStepList
                    steps={form.steps}
                    onAdd={form.addStep}
                    onRemove={form.removeStep}
                    onUpdate={form.updateStep}
                  />

                  <Box className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {nutritionFields.map(({ label, unit, value, set }) => (
                      <TextField
                        key={label}
                        type="number"
                        label={label}
                        variant="standard"
                        value={value}
                        onChange={(e) =>
                          set(
                            e.target.value === "" ? "" : Number(e.target.value),
                          )
                        }
                        slotProps={{
                          htmlInput: { min: 0 },
                          input: {
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                sx={{
                                  opacity: 0,
                                  pointerEvents: "none",
                                  [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]:
                                    { opacity: 1 },
                                }}
                              >
                                {unit}
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </ThemeProvider>
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-gray-100 p-6">
            <button
              onClick={onClose}
              className="rounded-full border border-neutral-300 px-6 py-1.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isLoading}
              className="bg-primary-green-400 hover:bg-primary-green-500 active:bg-primary-green-600 rounded-full px-8 py-1.5 text-sm font-medium text-white transition disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditRecipeModal;
