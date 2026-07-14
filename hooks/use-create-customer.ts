import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "@/services/customer";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      queryClient.invalidateQueries({
        queryKey: ["locations"],
      });
    },
  });
}
