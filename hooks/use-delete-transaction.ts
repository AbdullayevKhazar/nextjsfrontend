import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import i18n from "@/i18n/client";
import { deleteTransaction } from "@/services/transaction";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,

    onSuccess: () => {
      toast.success(
        i18n.t("transactionDeletedSuccess", { ns: "transactions" }),
      );
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
      toast.error(i18n.t("transactionDeletedFailed", { ns: "transactions" }));
    },
  });
}
