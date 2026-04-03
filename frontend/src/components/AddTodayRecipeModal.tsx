import { useState } from "react";
import Modal from "./ui/Modal";
import { useNotification } from "../context/NotificationProvider";
import Tooltip from "@mui/material/Tooltip";
import { ChevronDownIcon, Plus } from "lucide-react";
import type { Recipe } from "../hooks/useRecipes";
import { Field, Fieldset, Input, Label, Select } from "@headlessui/react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../utils/MaterialUITheme";

type AddTodayRecipeModalProps =
  | {
      isSearch: true;
      recipeArray: Recipe[];
      addMeal: (
        recipeId: number,
        category: string,
        amount: number,
      ) => Promise<void>;
    }
  | {
      isSearch: false;
      recipeData: Recipe;
      addMeal: (
        recipeId: number,
        category: string,
        amount: number,
      ) => Promise<void>;
    };

const AddTodayRecipeModal = ({
  props,
}: {
  props: AddTodayRecipeModalProps;
}) => {
  const [category, setCategory] = useState<string>("Breakfast");
  const [amount, setAmount] = useState<number>(1);
  const mealCategories = ["Breakfast", "Soup", "Lunch", "Dinner"];

  const { addNotification } = useNotification();

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    props.isSearch ? undefined : props.recipeData,
  );

  return (
    <>
      <Modal
        onClose={() => {
          setCategory("Breakfast");
          setAmount(1);
        }}
        trigger={
          <Tooltip title="Add to today's meal">
            <button className="hover:bg-primary-green-300 rounded-full border border-gray-300 bg-white p-1 transition-colors hover:text-white">
              <Plus className="h-7 w-7" />
            </button>
          </Tooltip>
        }
        title="Add to Today's Meal"
        actions={(close) => (
          <>
            <button
              onClick={() => {
                close();
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                try {
                  await props.addMeal(
                    selectedRecipe?.id ?? 0,
                    category,
                    amount,
                  );
                  addNotification(
                    `${selectedRecipe?.name} added successfully!`,
                  );
                } catch {
                  addNotification("Something went wrong", "error");
                } finally {
                  close();
                }
              }}
              className="bg-primary-green-400 hover:bg-primary-green-500 rounded-lg px-4 py-2 text-sm font-semibold text-white"
            >
              Add Meal
            </button>
          </>
        )}
      >
        <Fieldset className="space-y-5 pt-5">
          {props.isSearch && (
            <ThemeProvider theme={theme}>
              <Autocomplete
                onChange={(_, value) => {
                  const found = props.recipeArray.find(
                    (r: Recipe) => r.name === value,
                  );
                  setSelectedRecipe(found);
                }}
                options={props.recipeArray.map((o: Recipe) => o.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Recipe"
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        type: "search",
                        className: "text-sm/6 text-black",
                      },
                    }}
                  />
                )}
              />
            </ThemeProvider>
          )}
          <Field>
            <Label className="text-sm font-medium">Category</Label>
            <div className="relative">
              <Select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="mt-3 block w-full appearance-none rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
              >
                {mealCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
          </Field>
          <Field>
            <Label className="text-sm font-medium">Amount (g)</Label>
            <Input
              placeholder="1"
              min={1}
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
              type="number"
              className="mt-3 block w-full rounded-lg border bg-white/5 px-3 py-1.5 text-sm/6 text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            />
          </Field>
        </Fieldset>
      </Modal>
    </>
  );
};
export default AddTodayRecipeModal;
