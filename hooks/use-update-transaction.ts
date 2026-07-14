import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTransaction } from "@/services/transaction";

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateTransaction(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      queryClient.invalidateQueries({
        queryKey: ["customer"],
      });
    },
  });
}
