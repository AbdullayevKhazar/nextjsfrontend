import { useQuery } from "@tanstack/react-query";
import { getPublicCustomer } from "@/services/public";

export function usePublicCustomer(token: string) {
  return useQuery({
    queryKey: ["public-customer", token],
    queryFn: () => getPublicCustomer(token),
    enabled: !!token,
  });
}
