import { useQuery } from "@tanstack/react-query";

import { getCustomer } from "@/services/customer";

export function useCustomer(id: string) {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomer(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
