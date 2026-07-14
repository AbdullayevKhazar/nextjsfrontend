import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTransaction } from "@/services/transaction";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,

    onSuccess: () => {
      toast.success("Transaction deleted.");
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["customer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
    },

    onError: () => {
      toast.error("Failed to delete transaction.");
    },
  });
}
