import { useState } from "react";

type FilterObject = {
  [key: string]: boolean;
};

const useAdminFilter = <T>(
  data: T[],
  searchFn: (item: T, search: string) => boolean,
  filterFn?: (item: T, filters: FilterObject) => boolean,
  initialFilters?: FilterObject,
) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterObject>(initialFilters ?? {});

  const filtered = data.filter((item) => {
    const matchesSearch = searchFn(item, search);
    const matchesFilters = filterFn ? filterFn(item, filters) : true;
    return matchesSearch && matchesFilters;
  });

  return {
    search,
    setSearch,
    filters,
    setFilters,
    filtered,
  };
};

export default useAdminFilter;
