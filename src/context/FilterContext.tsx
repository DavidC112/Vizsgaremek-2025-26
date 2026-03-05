import { createContext, useContext, type ReactNode } from "react";
import { useRecipeFilter } from "../hooks/useRecipeFilter";
import type { Recipe } from "../hooks/useRecipes";

type FilterContextType = ReturnType<typeof useRecipeFilter> & {
  recipes: Recipe[];
};

const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider = ({
  children,
  recipes,
}: {
  children: ReactNode;
  recipes: Recipe[];
}) => {
  const filterState = useRecipeFilter(recipes);

  return (
    <FilterContext.Provider value={{ ...filterState, recipes }}>
      {children}
    </FilterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx)
    throw new Error("useFilterContext must be used inside <FilterProvider>");
  return ctx;
};
