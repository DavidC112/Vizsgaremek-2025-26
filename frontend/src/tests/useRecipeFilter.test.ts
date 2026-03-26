import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRecipeFilter } from "../../src/hooks/useRecipeFilter";
import type { Recipe } from "../../src/hooks/useRecipes";

const makeRecipe = (overrides: Partial<Recipe>): Recipe => ({
  id: 1,
  userName: "Test User",
  userProfilePicture: "",
  name: "Default Recipe",
  category: "Main",
  preparationTime: 30,
  cookingTime: 30,
  description: "A test recipe",
  instructions: "Step 1",
  portions: 4,
  calories: 500,
  protein: 20,
  carbohydrate: 60,
  fat: 15,
  isVegan: false,
  isVegetarian: false,
  isCommunity: false,
  imageUrl: "",
  ingredients: [],
  isDeleted: false,
  ...overrides,
});

const recipes: Recipe[] = [
  makeRecipe({
    id: 1,
    name: "Caesar Salad",
    category: "Main",
    calories: 350,
    portions: 2,
    preparationTime: 10,
    cookingTime: 5,
    isVegan: false,
    isVegetarian: true,
    isCommunity: false,
  }),
  makeRecipe({
    id: 2,
    name: "Vegan Burger",
    category: "Main",
    calories: 600,
    portions: 1,
    preparationTime: 20,
    cookingTime: 15,
    isVegan: true,
    isVegetarian: true,
    isCommunity: true,
  }),
  makeRecipe({
    id: 3,
    name: "Scrambled Eggs",
    category: "Breakfast",
    calories: 250,
    portions: 2,
    preparationTime: 5,
    cookingTime: 10,
    isVegan: false,
    isVegetarian: true,
    isCommunity: false,
  }),
  makeRecipe({
    id: 4,
    name: "Lentil Soup",
    category: "Soup",
    calories: 400,
    portions: 4,
    preparationTime: 15,
    cookingTime: 40,
    isVegan: true,
    isVegetarian: true,
    isCommunity: true,
  }),
];

describe("useRecipeFilter – initial state", () => {
  it("returns all recipes when no filters are applied", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));
    expect(result.current.filteredRecipes).toHaveLength(recipes.length);
  });

  it("exposes default filters with null / empty values", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));
    const { filters } = result.current;
    expect(filters.search).toBe("");
    expect(filters.tags.isVegan).toBeNull();
    expect(filters.tags.isVegetarian).toBeNull();
    expect(filters.tags.isCommunity).toBeNull();
    expect(filters.category).toHaveLength(0);
    expect(filters.portions).toBeNull();
  });
});

describe("useRecipeFilter – search filter", () => {
  it("filters by name substring (case-insensitive)", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => result.current.updateFilter("search", "salad"));

    expect(result.current.filteredRecipes).toHaveLength(1);
    expect(result.current.filteredRecipes[0].name).toBe("Caesar Salad");
  });

  it("returns all recipes when search is cleared", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => result.current.updateFilter("search", "eggs"));
    act(() => result.current.updateFilter("search", ""));

    expect(result.current.filteredRecipes).toHaveLength(recipes.length);
  });

  it("returns empty array when search matches nothing", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => result.current.updateFilter("search", "zzznomatch"));

    expect(result.current.filteredRecipes).toHaveLength(0);
  });
});

describe("useRecipeFilter – tag filters", () => {
  it("filters to vegan-only recipes", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() =>
      result.current.updateFilter("tags", {
        isCommunity: null,
        isVegan: true,
        isVegetarian: null,
      }),
    );

    expect(result.current.filteredRecipes.every((r) => r.isVegan)).toBe(true);
  });

  it("filters to non-vegan recipes when isVegan is false", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() =>
      result.current.updateFilter("tags", {
        isCommunity: null,
        isVegan: false,
        isVegetarian: null,
      }),
    );

    expect(result.current.filteredRecipes.every((r) => !r.isVegan)).toBe(true);
  });

  it("filters to community recipes only", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() =>
      result.current.updateFilter("tags", {
        isCommunity: true,
        isVegan: null,
        isVegetarian: null,
      }),
    );

    expect(result.current.filteredRecipes.every((r) => r.isCommunity)).toBe(
      true,
    );
  });
});

describe("useRecipeFilter – category filter", () => {
  it("filters recipes to a single category", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => result.current.updateFilter("category", ["Breakfast"]));

    expect(
      result.current.filteredRecipes.every((r) => r.category === "Breakfast"),
    ).toBe(true);
    expect(result.current.filteredRecipes).toHaveLength(1);
  });

  it("returns recipes matching any of multiple categories", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => result.current.updateFilter("category", ["Breakfast", "Soup"]));

    const filtered = result.current.filteredRecipes;
    expect(
      filtered.every((r) => ["Breakfast", "Soup"].includes(r.category)),
    ).toBe(true);
    expect(filtered).toHaveLength(2);
  });
});

describe("useRecipeFilter – calorie range filter", () => {
  it("filters recipes within calorie range", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => result.current.updateFilter("calories", { min: 300, max: 500 }));

    expect(
      result.current.filteredRecipes.every(
        (r) => r.calories >= 300 && r.calories <= 500,
      ),
    ).toBe(true);
  });

  it("applies only min bound when max is null", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => result.current.updateFilter("calories", { min: 400, max: null }));

    expect(result.current.filteredRecipes.every((r) => r.calories >= 400)).toBe(
      true,
    );
  });

  it("applies only max bound when min is null", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => result.current.updateFilter("calories", { min: null, max: 400 }));

    expect(result.current.filteredRecipes.every((r) => r.calories <= 400)).toBe(
      true,
    );
  });
});

describe("useRecipeFilter – time range filters", () => {
  it("filters by maximum preparation time", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => result.current.updateFilter("prepTime", { min: null, max: 10 }));

    expect(
      result.current.filteredRecipes.every((r) => r.preparationTime <= 10),
    ).toBe(true);
  });

  it("filters by maximum cooking time", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => result.current.updateFilter("cookTime", { min: null, max: 15 }));

    expect(
      result.current.filteredRecipes.every((r) => r.cookingTime <= 15),
    ).toBe(true);
  });
});

describe("useRecipeFilter – portions filter", () => {
  it("returns only recipes with the exact portions value", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => result.current.updateFilter("portions", 2));

    expect(result.current.filteredRecipes.every((r) => r.portions === 2)).toBe(
      true,
    );
  });
});

describe("useRecipeFilter – resetFilters", () => {
  it("restores all recipes after a reset", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => result.current.updateFilter("search", "salad"));
    act(() => result.current.resetFilters());

    expect(result.current.filteredRecipes).toHaveLength(recipes.length);
  });

  it("resets all filter fields to defaults", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => {
      result.current.updateFilter("calories", { min: 100, max: 300 });
      result.current.updateFilter("category", ["Soup"]);
      result.current.resetFilters();
    });

    expect(result.current.filters.calories).toEqual({ min: null, max: null });
    expect(result.current.filters.category).toHaveLength(0);
  });
});

describe("useRecipeFilter – combined filters", () => {
  it("applies search and tag filter simultaneously", () => {
    const { result } = renderHook(() => useRecipeFilter(recipes));

    act(() => {
      result.current.updateFilter("search", "burger");
      result.current.updateFilter("tags", {
        isCommunity: null,
        isVegan: true,
        isVegetarian: null,
      });
    });

    expect(result.current.filteredRecipes).toHaveLength(1);
    expect(result.current.filteredRecipes[0].name).toBe("Vegan Burger");
  });
});
