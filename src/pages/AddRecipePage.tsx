import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { Plus, Trash2 } from "lucide-react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// Mock data
const INGREDIENTS = [
  "Salt",
  "Pepper",
  "Olive Oil",
  "Butter",
  "Garlic",
  "Onion",
  "Flour",
  "Sugar",
  "Eggs",
  "Milk",
  "Tomato",
  "Chicken",
  "Beef",
  "Pasta",
  "Rice",
  "Lemon",
  "Basil",
  "Oregano",
  "Thyme",
  "Cumin",
];

const theme = createTheme({
  palette: { primary: { main: "#6b9080" } },
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          "&:hover:not(.Mui-disabled):before": { borderBottomColor: "#6b9080" },
          "&:before": { borderBottomColor: "#d1d5db" },
          "&:after": { borderBottomColor: "#6b9080" },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#6b7280",
          "&.Mui-focused": { color: "#6b9080" },
        },
      },
    },
  },
});

type Ingredient = {
  id: number;
  name: string;
  amount: string;
};

const AddRecipePage = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 1, name: "", amount: "" },
  ]);

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: Date.now(), name: "", amount: "" },
    ]);
  };

  const removeIngredient = (id: number) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const updateIngredient = (
    id: number,
    field: "name" | "amount",
    value: string,
  ) => {
    setIngredients((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing)),
    );
  };

  const [steps, setSteps] = useState<string[]>([""]);

  const addStep = () => setSteps((prev) => [...prev, ""]);

  const removeStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, value: string) => {
    setSteps((prev) => prev.map((step, i) => (i === index ? value : step)));
  };

  return (
    <main className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-2xl font-bold">Upload a new Recipe</h1>
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <section className="mx-auto w-full max-w-5xl space-y-10 rounded-2xl border bg-white p-10 shadow-xl">
          <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <TextField fullWidth label="Recipe Name" variant="standard" />
              <TextField fullWidth label="Description" variant="standard" />
            </Box>

            <FormControl sx={{ width: 150 }}>
              <InputLabel id="category">Category</InputLabel>
              <Select labelId="category" id="category" label="Category">
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
              </Select>
            </FormControl>

            <div className="space-y-3">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-end gap-3">
                  <Autocomplete
                    options={INGREDIENTS}
                    value={ingredient.name}
                    onChange={(_, newValue) =>
                      updateIngredient(ingredient.id, "name", newValue ?? "")
                    }
                    onInputChange={(_, newValue) =>
                      updateIngredient(ingredient.id, "name", newValue)
                    }
                    freeSolo
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Ingredient"
                        variant="standard"
                      />
                    )}
                  />

                  <TextField
                    placeholder="Amount"
                    variant="standard"
                    value={ingredient.amount}
                    onChange={(e) =>
                      updateIngredient(ingredient.id, "amount", e.target.value)
                    }
                    sx={{ width: "80px", flexShrink: 0 }}
                  />

                  <button
                    type="button"
                    onClick={() => removeIngredient(ingredient.id)}
                    disabled={ingredients.length === 1}
                    className="mb-1 text-red-600 transition hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addIngredient}
                className="text-primary-green-500 hover:text-primary-green-600 flex items-center gap-1 text-sm transition"
              >
                <Plus size={16} />
                Add Ingredient
              </button>
            </div>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-end gap-3">
                  <span className="text-primary-green-400 mb-2 text-sm font-medium">
                    {index + 1}.
                  </span>
                  <TextField
                    fullWidth
                    placeholder="Describe the step..."
                    variant="standard"
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    disabled={steps.length === 1}
                    className="mb-1 text-red-600 transition hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addStep}
                className="text-primary-green-500 hover:text-primary-green-600 flex items-center gap-1 text-sm transition"
              >
                <Plus size={16} />
                Add Step
              </button>
            </div>
          </ThemeProvider>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              className="bg-primary-green-400 hover:bg-primary-green-500 active:bg-primary-green-600 flex items-center justify-center rounded-full px-8 py-1.5 font-medium tracking-tight text-white transition duration-350"
            >
              Submit
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AddRecipePage;
