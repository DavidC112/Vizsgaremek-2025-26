import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import TuneIcon from "@mui/icons-material/Tune";

import RecipeFilterDrawer from "./RecipeFilterDrawer";
import { useFilterContext } from "../../../context/FilterContext";

const RecipeFilterBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { filters, updateFilter, recipes } = useFilterContext();

  return (
    <>
      <div className="w-full">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Autocomplete
            freeSolo
            options={recipes}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.name
            }
            inputValue={filters.search}
            onInputChange={(_, value) => updateFilter("search", value)}
            onChange={(_, value) => {
              if (value && typeof value !== "string") {
                updateFilter("search", value.name);
              }
            }}
            className="flex-1 rounded-2xl bg-white"
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search recipes..."
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0.75rem",
                  },
                }}
              />
            )}
          />

          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50`}
          >
            <TuneIcon fontSize="small" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      <RecipeFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
};

export default RecipeFilterBar;
