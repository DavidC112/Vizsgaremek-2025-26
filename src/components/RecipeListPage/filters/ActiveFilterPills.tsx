import { useFilterContext } from "../../../context/FilterContext";

type Pill = {
  label: string;
  onRemove: () => void;
};

const ActiveFilterPills = () => {
  const { filters, updateFilter, resetFilters } = useFilterContext();

  const pills: Pill[] = [
    filters.tags.isCommunity !== null
      ? {
          label: filters.tags.isCommunity ? "Community" : "Official",
          onRemove: () =>
            updateFilter("tags", { ...filters.tags, isCommunity: null }),
        }
      : null,

    filters.tags.isVegan !== null
      ? {
          label: filters.tags.isVegan ? "Vegan" : "Not Vegan",
          onRemove: () =>
            updateFilter("tags", { ...filters.tags, isVegan: null }),
        }
      : null,

    filters.tags.isVegetarian !== null
      ? {
          label: filters.tags.isVegetarian ? "Vegetarian" : "Not Vegetarian",
          onRemove: () =>
            updateFilter("tags", { ...filters.tags, isVegetarian: null }),
        }
      : null,

    filters.category.length
      ? {
          label: filters.category.join(", "),
          onRemove: () => updateFilter("category", []),
        }
      : null,

    filters.prepTime.min !== null || filters.prepTime.max !== null
      ? {
          label: `Prep: ${filters.prepTime.min ?? 0}–${filters.prepTime.max ?? 180}min`,
          onRemove: () => updateFilter("prepTime", { min: null, max: null }),
        }
      : null,

    filters.cookTime.min !== null || filters.cookTime.max !== null
      ? {
          label: `Cook: ${filters.cookTime.min ?? 0}–${filters.cookTime.max ?? 180}min`,
          onRemove: () => updateFilter("cookTime", { min: null, max: null }),
        }
      : null,

    filters.calories.min !== null || filters.calories.max !== null
      ? {
          label: `${filters.calories.min ?? 0}–${filters.calories.max ?? 2000} kcal`,
          onRemove: () => updateFilter("calories", { min: null, max: null }),
        }
      : null,

    filters.portions !== null
      ? {
          label: `${filters.portions} portions`,
          onRemove: () => updateFilter("portions", null),
        }
      : null,
  ].filter((p): p is Pill => p !== null);

  if (!pills.length) return null;

  return (
    <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-2">
      {pills.map((pill) => (
        <span
          key={pill.label}
          className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
        >
          {pill.label}
          <button
            onClick={pill.onRemove}
            className="cursor-pointer leading-none hover:text-emerald-900"
            aria-label={`Remove ${pill.label} filter`}
          >
            ✕
          </button>
        </span>
      ))}
      <button
        onClick={resetFilters}
        className="cursor-pointer text-xs text-neutral-400 underline underline-offset-2 transition-colors hover:text-red-400"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilterPills;
