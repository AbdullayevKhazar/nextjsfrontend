"use client";

import { useEffect } from "react";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Backdrop from "@/components/shared/Backdrop";
import BottomSheet from "@/components/shared/BottomSheet";

import { Customer } from "@/types/customer";
import { useUpdateCustomer } from "@/hooks/use-update-customer";
import AzerbaijaniPhoneField from "@/components/ui/AzerbaijaniPhoneField";

import {
  createCustomerSchema,
  CreateCustomerInput,
} from "@/lib/validations/customer";
import { getErrorMessage } from "@/lib/error";

interface Props {
  open: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export default function UpdateCustomerSheet({
  open,
  onClose,
  customer,
}: Props) {
  const { t } = useTranslation("customers");
  const { mutateAsync, isPending } = useUpdateCustomer();
  const customerSchema = useMemo(() => createCustomerSchema(t), [t]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCustomerInput>({
    resolver: zodResolver(customerSchema),

    defaultValues: {
      fullName: "",
      phone: "",
      location: "",
      note: "",
    },
  });

  useEffect(() => {
    if (!customer) return;

    reset({
      fullName: customer.fullName,
      phone: customer.phone,
      location: customer.location,
      note: customer.note ?? "",
    });
  }, [customer, reset]);

  const onSubmit = async (values: CreateCustomerInput) => {
    if (!customer) return;

    try {
      await mutateAsync({
        id: customer._id,
        body: values,
      });

      toast.success(t("customerUpdatedSuccess"));

      onClose();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, t("customerUpdatedFailed")));
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

          <h2 className="text-xl font-bold">{t("editCustomer")}</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-600">
              {t("fullName")}
            </label>

            <input
              {...register("fullName")}
              placeholder={t("fullNamePlaceholder")}
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-zinc-200
                px-4
                outline-none
                transition
                focus:border-blue-500
              "
            />

            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <AzerbaijaniPhoneField
              control={control}
              name="phone"
              label={t("phoneNumber")}
              error={errors.phone?.message}
              placeholder={t("phonePlaceholder")}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-600">
              {t("location")}
            </label>

            <input
              {...register("location")}
              placeholder={t("locationPlaceholder")}
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-zinc-200
                px-4
                outline-none
                transition
                focus:border-blue-500
              "
            />

            {errors.location && (
              <p className="mt-1 text-sm text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-600">
              {t("noteLabel")}
            </label>

            <textarea
              rows={4}
              {...register("note")}
              placeholder={t("notePlaceholder")}
              className="
                w-full
                rounded-2xl
                border
                border-zinc-200
                p-4
                outline-none
                transition
                focus:border-blue-500
                resize-none
              "
            />

            {errors.note && (
              <p className="mt-1 text-sm text-red-500">{errors.note.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="
              mt-6
              h-14
              w-full
              rounded-2xl
              bg-blue-600
              text-[15px]
              font-semibold
              text-white
              transition
              active:scale-[0.98]
              disabled:opacity-60
            "
          >
            {isPending ? t("savingButton") : t("saveChanges")}
          </button>
        </form>
      </BottomSheet>
    </>
  );
}
