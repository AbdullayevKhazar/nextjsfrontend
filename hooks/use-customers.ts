import { useQuery } from "@tanstack/react-query";

import { getCustomers } from "@/services/customer";
import { CustomerFilters } from "@/types/customer";
export function useCustomers(filters: CustomerFilters) {
  return useQuery({
    queryKey: ["customers", filters],
    queryFn: () => getCustomers(filters),

    staleTime: 0,

    placeholderData: (previousData) => previousData,

    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
