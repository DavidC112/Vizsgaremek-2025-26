import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import { Trash2 } from "lucide-react";

type Ingredient = { name: string; [key: string]: unknown };

type Props = {
  ingredient: { id: number; name: string; amount: number };
  ingredients: Ingredient[];
  isOnly: boolean;
  onUpdate: (
    id: number,
    field: "name" | "amount",
    value: string | number,
  ) => void;
  onRemove: (id: number) => void;
};

const RecipeIngredient = ({
  ingredient,
  ingredients,
  isOnly,
  onUpdate,
  onRemove,
}: Props) => (
  <div className="flex items-end gap-3">
    <Autocomplete
      options={ingredients}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      value={ingredient.name}
      onChange={(_, newValue) =>
        onUpdate(
          ingredient.id,
          "name",
          typeof newValue === "object" && newValue !== null
            ? newValue.name
            : (newValue ?? ""),
        )
      }
      onInputChange={(_, newValue) => onUpdate(ingredient.id, "name", newValue)}
      freeSolo
      fullWidth
      renderInput={(params) => (
        <TextField {...params} label="Ingredient" variant="standard" />
      )}
    />

    <TextField
      type="number"
      label="Amount"
      variant="standard"
      value={ingredient.amount}
      onChange={(e) => onUpdate(ingredient.id, "amount", e.target.value)}
      sx={{ width: "80px", flexShrink: 0 }}
      slotProps={{
        htmlInput: { min: 1 },
        input: {
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                opacity: 0,
                pointerEvents: "none",
                [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                  opacity: 1,
                },
              }}
            >
              g
            </InputAdornment>
          ),
        },
      }}
    />
    <button
      type="button"
      onClick={() => onRemove(ingredient.id)}
      disabled={isOnly}
      className="mb-1 text-red-600 transition hover:text-red-700"
    >
      <Trash2 size={18} />
    </button>
  </div>
);
export default RecipeIngredient;
