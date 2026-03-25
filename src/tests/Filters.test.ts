import { describe, it, expect } from "vitest";
import { DEFAULT_FILTERS } from "../../src/components/RecipeListPage/filters/Filters";

describe("DEFAULT_FILTERS", () => {
  it("has an empty search string", () => {
    expect(DEFAULT_FILTERS.search).toBe("");
  });

  it("has null isCommunity tag", () => {
    expect(DEFAULT_FILTERS.tags.isCommunity).toBeNull();
  });

  it("has null isVegan tag", () => {
    expect(DEFAULT_FILTERS.tags.isVegan).toBeNull();
  });

  it("has null isVegetarian tag", () => {
    expect(DEFAULT_FILTERS.tags.isVegetarian).toBeNull();
  });

  it("has an empty category array", () => {
    expect(DEFAULT_FILTERS.category).toHaveLength(0);
  });

  it("has null min and max for prepTime", () => {
    expect(DEFAULT_FILTERS.prepTime.min).toBeNull();
    expect(DEFAULT_FILTERS.prepTime.max).toBeNull();
  });

  it("has null min and max for cookTime", () => {
    expect(DEFAULT_FILTERS.cookTime.min).toBeNull();
    expect(DEFAULT_FILTERS.cookTime.max).toBeNull();
  });

  it("has null min and max for calories", () => {
    expect(DEFAULT_FILTERS.calories.min).toBeNull();
    expect(DEFAULT_FILTERS.calories.max).toBeNull();
  });

  it("has null portions", () => {
    expect(DEFAULT_FILTERS.portions).toBeNull();
  });
});
