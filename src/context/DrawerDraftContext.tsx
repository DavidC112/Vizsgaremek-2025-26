import { createContext, useContext } from "react";
import type {
  Filters,
  FilterChangeHandler,
} from "../components/RecipeListPage/filters/Filters";

export type DrawerDraftContextType = {
  draft: Filters;
  updateDraft: FilterChangeHandler;
};

export const DrawerDraftContext = createContext<DrawerDraftContextType | null>(
  null,
);

export const useDrawerDraft = () => {
  const ctx = useContext(DrawerDraftContext);
  if (!ctx) throw new Error("useDrawerDraft must be used inside DrawerContent");
  return ctx;
};
