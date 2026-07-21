import { useMemo, useState } from "react";
import { useDebounce } from "./use-debounce";

export function useCustomerFilters() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("created_desc");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  const filters = useMemo(
    () => ({
      search: debouncedSearch,
      location,
      sort,
      page,
      limit: 20,
    }),
    [debouncedSearch, location, sort, page],
  );

  return {
    filters,

    search,
    setSearch,

    location,
    setLocation,

    sort,
    setSort,

    page,
    setPage,
  };
}
