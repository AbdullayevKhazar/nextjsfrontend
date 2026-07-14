import { useQuery } from "@tanstack/react-query";
import { getTransactions, TransactionsQuery } from "@/services/transaction";

export function useGetTransactions(query: TransactionsQuery) {
  return useQuery({
    queryKey: ["transactions", query],
    queryFn: () => getTransactions(query),
    staleTime: 1000 * 60 * 5,
  });
}
