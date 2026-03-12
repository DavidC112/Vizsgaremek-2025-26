import { useDrawerDraft } from "../../../context/DrawerDraftContext";
import FilterAccordion from "./FilterAccordion";

const CATEGORIES = ["Breakfast", "Soup", "Main"];

const CategoryFilter = () => {
  const { draft, updateDraft } = useDrawerDraft();
  const selected = draft.category;

  const toggle = (cat: string) => {
    updateDraft(
      "category",
      selected.includes(cat)
        ? selected.filter((c: string) => c !== cat)
        : [...selected, cat],
    );
  };

  return (
    <FilterAccordion label="Category" activeCount={selected.length}>
      <div className="flex flex-wrap gap-2 pt-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => toggle(cat)}
            className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors ${
              selected.includes(cat)
                ? "border-primary-green-400 bg-primary-green-400 font-medium text-white"
                : "hover:border-primary-green-500 hover:text-primary-green-700 border-neutral-200 bg-white text-neutral-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </FilterAccordion>
  );
};

export default CategoryFilter;
