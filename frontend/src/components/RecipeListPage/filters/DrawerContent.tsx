import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";

import { DrawerDraftContext } from "../../../context/DrawerDraftContext";
import { useFilterContext } from "../../../context/FilterContext";
import TagFilter from "./TagFilter";
import CategoryFilter from "./CategoryFilter";
import TimeRangeFilter from "./TimeRangeFilter";
import CalorieFilter from "./CalorieFilter";
import PortionFilter from "./PortionFilter";
import type { FilterChangeHandler, Filters } from "./Filters";

const DrawerContent = ({ onClose }: { onClose: () => void }) => {
  const { filters, updateFilter, resetFilters } = useFilterContext();

  const [draft, setDraft] = useState<Filters>(filters);

  const updateDraft: FilterChangeHandler = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    (Object.keys(draft) as Array<keyof Filters>).forEach((key) => {
      updateFilter(key, draft[key] as Filters[typeof key]);
    });
    onClose();
  };

  const handleReset = () => {
    resetFilters();
    onClose();
  };

  return (
    <DrawerDraftContext.Provider value={{ draft, updateDraft }}>
      <div className="flex h-full w-80 flex-col bg-neutral-50">
        <div className="flex items-center justify-between border-b border-neutral-100 bg-white px-5 py-4">
          <div className="flex items-center gap-2">
            <TuneIcon fontSize="small" className="text-primary-green-600" />
            <span className="font-semibold text-neutral-800">Filters</span>
          </div>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>

        <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
          <TagFilter />
          <CategoryFilter />
          <TimeRangeFilter label="Prep Time" filterKey="prepTime" />
          <TimeRangeFilter label="Cook Time" filterKey="cookTime" />
          <CalorieFilter />
          <PortionFilter />
        </div>

        <div className="flex gap-3 border-t border-neutral-100 bg-white px-4 py-4">
          <button
            onClick={handleReset}
            className="flex-1 cursor-pointer rounded-xl border border-neutral-200 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50"
          >
            Reset all
          </button>
          <button
            onClick={handleApply}
            className="bg-primary-green-400 hover:bg-primary-green-500 flex-1 cursor-pointer rounded-xl py-2 text-sm font-semibold text-white transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </DrawerDraftContext.Provider>
  );
};

export default DrawerContent;
