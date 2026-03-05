import FilterAccordion from "./FilterAccordion";
import { useDrawerDraft } from "../../../context/DrawerDraftContext";

const PORTION_OPTIONS = [1, 2, 4, 6, 8];

const PortionFilter = () => {
  const { draft, updateDraft } = useDrawerDraft();
  const value = draft.portions;

  return (
    <FilterAccordion label="Portions" activeCount={value !== null ? 1 : 0}>
      <div className="flex flex-wrap gap-2 pt-1">
        {PORTION_OPTIONS.map((n) => (
          <button
            key={n}
            onClick={() => updateDraft("portions", value === n ? null : n)}
            className={`h-10 w-10 cursor-pointer rounded-full border text-sm font-medium transition-colors ${
              value === n
                ? "border-primary-green-400 bg-primary-green-400 text-white"
                : "hover:border-primary-green-500 hover:text-primary-green-700 border-neutral-200 bg-white text-neutral-500"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </FilterAccordion>
  );
};

export default PortionFilter;
