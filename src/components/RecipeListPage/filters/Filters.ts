export type Filters = {
  search: string;
  tags: {
    isCommunity: boolean | null;
    isVegan: boolean | null;
    isVegetarian: boolean | null;
  };
  category: string[];
  prepTime: { min: number | null; max: number | null };
  cookTime: { min: number | null; max: number | null };
  calories: { min: number | null; max: number | null };
  portions: number | null;
};

export const DEFAULT_FILTERS: Filters = {
  search: "",
  tags: {
    isCommunity: null,
    isVegan: null,
    isVegetarian: null,
  },
  category: [],
  prepTime: { min: null, max: null },
  cookTime: { min: null, max: null },
  calories: { min: null, max: null },
  portions: null,
};

export type FilterChangeHandler = <K extends keyof Filters>(
  key: K,
  value: Filters[K],
) => void;
