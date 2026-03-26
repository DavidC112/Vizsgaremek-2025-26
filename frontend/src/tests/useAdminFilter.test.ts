import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useAdminFilter from "../../src/hooks/useAdminFilter";

type Item = {
  id: number;
  name: string;
  isDeleted: boolean;
  role?: string;
};

const items: Item[] = [
  { id: 1, name: "Alice", isDeleted: false, role: "admin" },
  { id: 2, name: "Bob", isDeleted: true, role: "user" },
  { id: 3, name: "Charlie", isDeleted: false, role: "user" },
  { id: 4, name: "alice duplicate", isDeleted: true, role: "admin" },
];

const searchFn = (item: Item, search: string) =>
  item.name.toLowerCase().includes(search.toLowerCase());

const filterFn = (item: Item, filters: Record<string, boolean>) => {
  if (filters.deleted !== item.isDeleted) return false;
  return true;
};

describe("useAdminFilter – initial state", () => {
  it("returns all items when search is empty and no filters are set", () => {
    const { result } = renderHook(() =>
      useAdminFilter(items, searchFn, filterFn, { deleted: false }),
    );
    // Only non-deleted items pass the initial filter
    expect(result.current.filtered.every((i) => !i.isDeleted)).toBe(true);
  });

  it("initialises search as an empty string", () => {
    const { result } = renderHook(() =>
      useAdminFilter(items, searchFn, filterFn, { deleted: false }),
    );
    expect(result.current.search).toBe("");
  });

  it("initialises filters from initialFilters argument", () => {
    const { result } = renderHook(() =>
      useAdminFilter(items, searchFn, filterFn, { deleted: true }),
    );
    expect(result.current.filters.deleted).toBe(true);
  });
});

describe("useAdminFilter – search", () => {
  it("filters items by search term (case-insensitive)", () => {
    const { result } = renderHook(() =>
      useAdminFilter(items, searchFn, filterFn, { deleted: false }),
    );

    act(() => {
      result.current.setSearch("alice");
    });

    expect(result.current.filtered.every((i) => /alice/i.test(i.name))).toBe(
      true,
    );
  });

  it("returns empty array when no items match the search term", () => {
    const { result } = renderHook(() =>
      useAdminFilter(items, searchFn, filterFn, { deleted: false }),
    );

    act(() => {
      result.current.setSearch("zzznomatch");
    });

    expect(result.current.filtered).toHaveLength(0);
  });

  it("returns all matching items when search is cleared", () => {
    const { result } = renderHook(() =>
      useAdminFilter(items, searchFn, filterFn, { deleted: false }),
    );

    act(() => result.current.setSearch("alice"));
    act(() => result.current.setSearch(""));

    // All non-deleted items should be back
    const nonDeletedCount = items.filter((i) => !i.isDeleted).length;
    expect(result.current.filtered).toHaveLength(nonDeletedCount);
  });
});

describe("useAdminFilter – filters", () => {
  it("shows only deleted items when deleted filter is toggled to true", () => {
    const { result } = renderHook(() =>
      useAdminFilter(items, searchFn, filterFn, { deleted: false }),
    );

    act(() => {
      result.current.setFilters((f) => ({ ...f, deleted: true }));
    });

    expect(result.current.filtered.every((i) => i.isDeleted)).toBe(true);
  });

  it("shows only non-deleted items when deleted filter is false", () => {
    const { result } = renderHook(() =>
      useAdminFilter(items, searchFn, filterFn, { deleted: true }),
    );

    act(() => {
      result.current.setFilters((f) => ({ ...f, deleted: false }));
    });

    expect(result.current.filtered.every((i) => !i.isDeleted)).toBe(true);
  });
});

describe("useAdminFilter – combined search and filter", () => {
  it("applies both search and filter simultaneously", () => {
    const { result } = renderHook(() =>
      useAdminFilter(items, searchFn, filterFn, { deleted: false }),
    );

    act(() => {
      result.current.setSearch("alice");
      result.current.setFilters((f) => ({ ...f, deleted: false }));
    });

    const filtered = result.current.filtered;
    expect(filtered.every((i) => /alice/i.test(i.name) && !i.isDeleted)).toBe(
      true,
    );
  });
});

describe("useAdminFilter – without filterFn", () => {
  it("returns all items matching the search when no filterFn is provided", () => {
    const { result } = renderHook(() => useAdminFilter(items, searchFn));

    act(() => result.current.setSearch("bob"));

    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].name).toBe("Bob");
  });

  it("returns all items when search is empty and no filterFn is provided", () => {
    const { result } = renderHook(() => useAdminFilter(items, searchFn));
    expect(result.current.filtered).toHaveLength(items.length);
  });
});

describe("useAdminFilter – empty data array", () => {
  it("returns empty filtered array when data is empty", () => {
    const { result } = renderHook(() =>
      useAdminFilter([], searchFn, filterFn, { deleted: false }),
    );
    expect(result.current.filtered).toHaveLength(0);
  });
});
