import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "@/services/transaction";

export function useGetTransaction(id: string) {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransaction(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
