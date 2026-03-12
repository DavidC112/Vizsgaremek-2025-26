import { Plus } from "lucide-react";
import RecipeStep from "./RecipeStep";

type Props = {
  steps: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: string) => void;
};

const RecipeStepList = ({ steps, onAdd, onRemove, onUpdate }: Props) => (
  <div className="space-y-3">
    {steps.map((step, index) => (
      <RecipeStep
        key={index}
        index={index}
        step={step}
        isOnly={steps.length === 1}
        onUpdate={onUpdate}
        onRemove={onRemove}
      />
    ))}
    <button
      type="button"
      onClick={onAdd}
      className="text-primary-green-500 hover:text-primary-green-600 flex items-center gap-1 text-sm transition"
    >
      <Plus size={16} /> Add Step
    </button>
  </div>
);
export default RecipeStepList;
