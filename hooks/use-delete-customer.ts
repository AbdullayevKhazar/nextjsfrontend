import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteCustomer } from "@/services/customer";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,

    onMutate: async (customerId) => {
      await queryClient.cancelQueries({
        queryKey: ["customers"],
      });

      const previous = queryClient.getQueriesData({
        queryKey: ["customers"],
      });

      queryClient.setQueriesData(
        {
          queryKey: ["customers"],
        },
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            items: old.items.filter((x: any) => x._id !== customerId),
          };
        },
      );

      return { previous };
    },

    onError: (_err, _id, context) => {
      context?.previous?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });

      toast.error("Failed to delete customer.");
    },

    onSuccess: () => {
      toast.success("Customer deleted.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
}
