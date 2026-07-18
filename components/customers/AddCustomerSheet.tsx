"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import BottomSheet from "@/components/shared/BottomSheet";
import Backdrop from "@/components/shared/Backdrop";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCustomerSchema,
  type CreateCustomerSchema,
} from "@/lib/validations/customer";
import { useCreateCustomer } from "@/hooks/use-create-customer";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddCustomerSheet({ open, onClose }: Props) {
  const { t } = useTranslation("customers");
  const { mutateAsync, isPending } = useCreateCustomer();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCustomerSchema>({
    resolver: zodResolver(createCustomerSchema),
  });
  const onSubmit = async (values: CreateCustomerSchema) => {
    try {
      await mutateAsync(values);

      toast.success(t("customerCreatedSuccess"));

      reset();

      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? t("customerCreatedFailed"));
    }
  };
  return (
    <>
      <Backdrop open={open} onClose={onClose} />

      <BottomSheet open={open}>
        <div className="flex items-center gap-3 pb-6">
          <button
            onClick={onClose}
            className="rounded-full p-2 transition active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>

          <h2 className="text-xl font-bold">{t("addCustomer")}</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-600">
              {t("fullName")}
            </label>

            <input
              {...register("fullName")}
              className="h-14 w-full rounded-2xl border border-zinc-200 px-4 outline-none focus:border-blue-500"
              placeholder={t("fullNamePlaceholder")}
            />

            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-600">
              {t("phoneNumber")}
            </label>

            <input
              {...register("phone")}
              className="h-14 w-full rounded-2xl border border-zinc-200 px-4 outline-none focus:border-blue-500"
              placeholder={t("phonePlaceholder")}
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-600">
              {t("location")}
            </label>
            <input
              {...register("location")}
              className="h-14 w-full rounded-2xl border border-zinc-200 px-4 outline-none focus:border-blue-500"
              placeholder={t("locationPlaceholder")}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 h-14 w-full rounded-2xl bg-blue-600 text-[15px] font-semibold text-white transition active:scale-[0.98] disabled:opacity-60"
          >
            {isPending ? t("creatingButton") : t("createCustomerButton")}
          </button>
        </form>
      </BottomSheet>
    </>
  );
}
