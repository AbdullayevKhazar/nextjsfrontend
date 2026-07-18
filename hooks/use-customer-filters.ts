import { useMemo, useState } from "react";
import { useDebounce } from "./use-debounce";

export function useCustomerFilters() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("created_desc");
  const [overdue, setOverdue] = useState<boolean | undefined>(undefined);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  const filters = useMemo(
    () => ({
      search: debouncedSearch,
      location,
      sort,
      overdue,
      page,
      limit: 20,
    }),
    [debouncedSearch, location, sort, overdue, page],
  );

  return {
    filters,

    search,
    setSearch,

    location,
    setLocation,

    sort,
    setSort,

    overdue,
    setOverdue,

    page,
    setPage,
  };
}
