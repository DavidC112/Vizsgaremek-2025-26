import TextField from "@mui/material/TextField";
import { Trash2 } from "lucide-react";

type Props = {
  index: number;
  step: string;
  isOnly: boolean;
  onUpdate: (index: number, value: string) => void;
  onRemove: (index: number) => void;
};

const RecipeStep = ({ index, step, isOnly, onUpdate, onRemove }: Props) => (
  <div className="flex items-end gap-3">
    <span className="text-primary-green-400 mb-2 text-sm font-medium">
      {index + 1}.
    </span>
    <TextField
      autoComplete="off"
      fullWidth
      placeholder="Describe the step..."
      variant="standard"
      value={step}
      onChange={(e) => onUpdate(index, e.target.value)}
    />
    <button
      type="button"
      onClick={() => onRemove(index)}
      disabled={isOnly}
      className="mb-1 text-red-600 transition hover:text-red-700"
    >
      <Trash2 size={18} />
    </button>
  </div>
);
export default RecipeStep;
