"use client";

import { useTranslation } from "react-i18next";
import Backdrop from "@/components/shared/Backdrop";
import BottomSheet from "@/components/shared/BottomSheet";
import { useDeleteCustomer } from "@/hooks/use-delete-customer";

interface Props {
  open: boolean;
  customerId: string | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DeleteCustomerModal({
  open,
  customerId,
  onClose,
  onSuccess,
}: Props) {
  const { t } = useTranslation("customers");
  const { mutate, isPending } = useDeleteCustomer();

  const handleDelete = () => {
    if (!customerId) return;

    mutate(customerId, {
      onSuccess: () => {
        onClose();
        onSuccess?.();
      },
    });
  };

  return (
    <>
      <Backdrop open={open} onClose={onClose} />

      <BottomSheet open={open}>
        <h2 className="text-center text-xl font-bold">
          {t("deleteCustomerTitle")}
        </h2>

        <p className="mt-3 text-center text-sm text-zinc-500">
          {t("deleteWarning")}
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="h-14 flex-1 rounded-2xl bg-zinc-100 font-semibold"
          >
            {t("cancelButton")}
          </button>

          <button
            onClick={handleDelete}
            disabled={isPending}
            className="h-14 flex-1 rounded-2xl bg-red-600 font-semibold text-white disabled:opacity-50"
          >
            {isPending ? t("deletingButton") : t("deleteButton")}
          </button>
        </div>
      </BottomSheet>
    </>
  );
}
