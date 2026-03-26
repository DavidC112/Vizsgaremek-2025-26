import { useState, useMemo } from "react";
import {
  type Filters,
  DEFAULT_FILTERS,
  type FilterChangeHandler,
} from "../components/RecipeListPage/filters/Filters";
import type { Recipe } from "./useRecipes";

export const useRecipeFilter = (recipes: Recipe[]) => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const updateFilter: FilterChangeHandler = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const filteredRecipes = useMemo(() => {
    const filterRules: Array<(recipe: Recipe) => boolean> = [
      (r) =>
        !filters.search ||
        r.name.toLowerCase().includes(filters.search.toLowerCase()),

      (r) =>
        filters.tags.isCommunity === null ||
        r.isCommunity === filters.tags.isCommunity,
      (r) =>
        filters.tags.isVegan === null || r.isVegan === filters.tags.isVegan,
      (r) =>
        filters.tags.isVegetarian === null ||
        r.isVegetarian === filters.tags.isVegetarian,

      (r) => !filters.category.length || filters.category.includes(r.category),

      (r) =>
        filters.prepTime.min === null ||
        r.preparationTime >= filters.prepTime.min,
      (r) =>
        filters.prepTime.max === null ||
        r.preparationTime <= filters.prepTime.max,

      (r) =>
        filters.cookTime.min === null || r.cookingTime >= filters.cookTime.min,
      (r) =>
        filters.cookTime.max === null || r.cookingTime <= filters.cookTime.max,

      (r) =>
        filters.calories.min === null || r.calories >= filters.calories.min,
      (r) =>
        filters.calories.max === null || r.calories <= filters.calories.max,

      (r) => filters.portions === null || r.portions === filters.portions,
    ];

    return recipes.filter((recipe) =>
      filterRules.every((rule) => rule(recipe)),
    );
  }, [recipes, filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredRecipes,
  };
};
