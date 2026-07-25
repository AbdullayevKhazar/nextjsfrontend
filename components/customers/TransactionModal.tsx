"use client";

import { useTranslation } from "react-i18next";
import Backdrop from "@/components/shared/Backdrop";
import BottomSheet from "@/components/shared/BottomSheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTransactionInput,
  createTransactionSchema,
  CreateTransactionSchema,
} from "@/lib/validations/transaction";
import { useCreateTransaction } from "@/hooks/use-create-transaction";
import { useUpdateTransaction } from "@/hooks/use-update-transaction";
import { toast } from "sonner";
import { Transaction } from "@/types/customer";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  type: "debt" | "payment";
  customerId: string;
  transaction?: Transaction;
}

export default function TransactionModal({
  open,
  onClose,
  type,
  customerId,
  transaction,
}: Props) {
  const { t } = useTranslation("transactions");
  const isDebt = type === "debt";
  const isEdit = !!transaction;

  const { mutateAsync: createTransaction, isPending: isCreating } =
    useCreateTransaction();
  const { mutateAsync: updateTransaction, isPending: isUpdating } =
    useUpdateTransaction();
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTransactionInput, any, CreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: undefined,
      note: "",
      date: new Date().toISOString().slice(0, 16),
    },
  });

  useEffect(() => {
    if (transaction) {
      reset({
        amount: transaction.amount,
        note: transaction.note || "",
        date: new Date(transaction.date).toISOString().slice(0, 16),
      });
    } else {
      reset({
        amount: undefined,
        note: "",
        date: new Date().toISOString().slice(0, 16),
      });
    }
  }, [transaction, reset]);

  const onSubmit = async (values: CreateTransactionSchema) => {
    try {
      if (isEdit && transaction) {
        await updateTransaction({
          id: transaction._id,
          payload: {
            customerId,
            type,
            ...values,
          },
        });
        toast.success(
          type === "debt"
            ? t("debtUpdatedSuccess")
            : t("paymentUpdatedSuccess"),
        );
      } else {
        await createTransaction({
          customerId,
          type,
          ...values,
        });
        toast.success(
          type === "debt"
            ? t("debtCreatedSuccess")
            : t("paymentCreatedSuccess"),
        );
      }

      reset();
      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? t("errorOccurred", { ns: "common" }),
      );
    }
  };

  // Ortaq input sinifləri (təkrarın qarşısını almaq üçün)
  const inputBaseClasses = `
    w-full rounded-2xl border px-4 outline-none transition-all
    bg-zinc-50 dark:bg-zinc-900/50 
    border-zinc-200 dark:border-zinc-800 
    text-zinc-900 dark:text-zinc-100
    focus:bg-white dark:focus:bg-zinc-900
    focus:border-zinc-400 dark:focus:border-zinc-600
    focus:ring-2 focus:ring-zinc-400/20 dark:focus:ring-zinc-600/20
    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
  `;

  return (
    <>
      <Backdrop open={open} onClose={onClose} />

      <BottomSheet open={open}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {isDebt ? t("borrow") : t("pay")}
          </h2>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {t("transactionAmount")}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-zinc-400 dark:text-zinc-500 pointer-events-none">
                ₼
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("amount")}
                className={`h-14 pl-10 text-xl font-bold ${inputBaseClasses}`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1.5 text-sm font-medium text-red-500 dark:text-red-400">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {t("transactionDate")}
            </label>
            <input
              type="datetime-local"
              {...register("date")}
              className={`h-14 dark:[color-scheme:dark] ${inputBaseClasses}`}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {t("transactionNote")}
            </label>
            <textarea
              rows={3}
              placeholder={t("optionalNote", "Optional note...")}
              {...register("note")}
              className={`py-4 resize-none ${inputBaseClasses}`}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`
              mt-2 flex h-14 w-full items-center justify-center rounded-2xl font-bold text-white transition-all
              disabled:opacity-60 disabled:cursor-not-allowed
              active:scale-[0.98]
              ${
                isDebt
                  ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                  : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              }
            `}
          >
            {isPending
              ? t("savingTransaction")
              : isEdit
                ? t("updateTransaction", "Yenilə")
                : isDebt
                  ? t("createDebtButton")
                  : t("createPaymentButton")}
          </button>
        </form>
      </BottomSheet>
    </>
  );
}
