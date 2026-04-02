import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import RecipeStepList from "../components/AddRecipePage/RecipeStepList";
import RecipeIngredientList from "../components/AddRecipePage/RecipeIngredientList";
import { TagSelector } from "../components/AddRecipePage/TagSelector";
import ImageUpload from "../components/ImageUpload";
import { useAddRecipeForm } from "../hooks/useAddRecipeForm";
import { useRecipeSubmit } from "../hooks/useRecipeSubmit";
import type { NumericField, RecipeCategory } from "../utils/AddRecipe.type";
import { theme } from "../utils/MaterialUITheme";
import { motion } from "framer-motion";
import SubmittedView from "../components/AddRecipePage/SubmittedView";

const AddRecipePage = () => {
  const form = useAddRecipeForm();
  const { submit, isSubmitting, isSubmitted } = useRecipeSubmit();

  if (isSubmitted) return <SubmittedView />;
  const handleSubmit = () =>
    submit(
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
        isVegan: form.tags.includes("vegan"),
        isVegetarian: form.tags.includes("vegetarian"),
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
    <main className="from-primary-green-50 mx-auto min-h-screen min-w-full space-y-5 bg-linear-to-b via-white to-blue-50 md:max-w-7xl md:p-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: "easeInOut" }}
        className="flex flex-1 flex-col items-center justify-center p-4"
      >
        <section className="mx-auto w-full space-y-10 rounded-2xl bg-white md:max-w-5xl md:border md:p-10 md:shadow-xl">
          <h1 className="border-primary-green-400 border-b-3 p-5 text-center text-2xl font-bold">
            Upload a new Recipe
          </h1>

          <ThemeProvider theme={theme}>
            <Box
              sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
            >
              <FormControl variant="standard" sx={{ width: 150, mt: "16px" }}>
                <InputLabel id="category" shrink>
                  Category
                </InputLabel>
                <Select
                  labelId="category"
                  label="Category"
                  value={form.category}
                  onChange={(e) =>
                    form.setCategory(e.target.value as RecipeCategory)
                  }
                >
                  <MenuItem value="Breakfast">Breakfast</MenuItem>
                  <MenuItem value="Soup">Lunch</MenuItem>
                  <MenuItem value="Main Course">Main Course</MenuItem>
                  <MenuItem value="Dinner">Dinner</MenuItem>
                </Select>
              </FormControl>
              <span className="flex items-end">
                <ImageUpload onImageChange={form.setImage} />
              </span>
            </Box>

            <section
              className={`overflow-hidden ${form.image ? "" : "hidden"}`}
            >
              <img
                src={form.image ? URL.createObjectURL(form.image) : ""}
                alt=""
                className="h-96 w-full rounded-xl object-cover transition-transform duration-300 hover:scale-99"
              />
            </section>

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
                  autoComplete="off"
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
                  autoComplete="off"
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
                      set(e.target.value === "" ? "" : Number(e.target.value))
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

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="bg-primary-green-400 hover:bg-primary-green-500 active:bg-primary-green-600 flex items-center justify-center gap-2 rounded-full px-8 py-1.5 font-medium tracking-tight text-white transition duration-350 disabled:opacity-60"
            >
              Submit
            </button>
          </div>
        </section>
      </motion.div>
    </main>
  );
};

export default AddRecipePage;
