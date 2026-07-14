import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTransaction } from "@/services/transaction";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      queryClient.invalidateQueries({
        queryKey: ["customer", variables.customerId],
      });
    },
  });
}
