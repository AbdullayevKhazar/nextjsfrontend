import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCustomer } from "@/services/customer";

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      updateCustomer(id, body),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["customer", variables.id],
      });
    },
  });
}
