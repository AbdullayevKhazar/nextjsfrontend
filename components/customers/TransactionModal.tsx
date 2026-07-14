"use client";

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
  const isDebt = type === "debt";
  const isEdit = !!transaction;
  const { mutateAsync: createTransaction, isPending: isCreating } = useCreateTransaction();
  const { mutateAsync: updateTransaction, isPending: isUpdating } = useUpdateTransaction();
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
        date: new Date(transaction.createdAt).toISOString().slice(0, 16),
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
            ? "Debt updated successfully."
            : "Payment updated successfully.",
        );
      } else {
        await createTransaction({
          customerId,
          type,
          ...values,
        });
        toast.success(
          type === "debt"
            ? "Debt created successfully."
            : "Payment created successfully.",
        );
      }

      reset();

      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "An error occurred.");
    }
  };

  return (
    <>
      <Backdrop open={open} onClose={onClose} />

      <BottomSheet open={open}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {" "}
          <h2 className="text-2xl font-bold">
            {isDebt ? "Borrow" : "Pay"}
          </h2>
          <div>
            <label className="mb-2 block text-sm font-medium">Amount</label>
            <input
              type="number"
              step="0.01"
              {...register("amount")}
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-zinc-200
                px-4
                text-xl
                font-bold
                outline-none
              "
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Date</label>

            <input
              type="datetime-local"
              {...register("date")}
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-zinc-200
                px-4
                outline-none
              "
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Note</label>

            <textarea
              rows={4}
              {...register("note")}
              className="
                w-full
                rounded-2xl
                border
                border-zinc-200
                p-4
                outline-none
              "
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className={`
    h-14
    w-full
    rounded-2xl
    font-semibold
    text-white
    transition
    disabled:opacity-60

    ${isDebt ? "bg-red-500" : "bg-emerald-500"}
  `}
          >
            {isPending
              ? "Saving..."
              : isDebt
                ? "Create Debt"
                : "Create Payment"}
          </button>
        </form>
      </BottomSheet>
    </>
  );
}
