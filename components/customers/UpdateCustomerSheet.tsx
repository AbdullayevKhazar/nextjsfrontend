"use client";

import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Backdrop from "@/components/shared/Backdrop";
import BottomSheet from "@/components/shared/BottomSheet";

import { Customer } from "@/types/customer";
import { useUpdateCustomer } from "@/hooks/use-update-customer";

import {
  createCustomerSchema,
  CreateCustomerInput,
} from "@/lib/validations/customer";

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
  const { mutateAsync, isPending } = useUpdateCustomer();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCustomerInput>({
    resolver: zodResolver(createCustomerSchema),

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

      toast.success("Customer updated successfully.");

      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Failed to update customer.",
      );
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

          <h2 className="text-xl font-bold">Edit Customer</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-600">
              Full Name
            </label>

            <input
              {...register("fullName")}
              placeholder="John Doe"
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
            <label className="mb-2 block text-sm font-medium text-zinc-600">
              Phone Number
            </label>

            <input
              {...register("phone")}
              placeholder="+994..."
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

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-600">
              Location
            </label>

            <input
              {...register("location")}
              placeholder="Baku"
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
              Note
            </label>

            <textarea
              rows={4}
              {...register("note")}
              placeholder="Optional..."
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
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </BottomSheet>
    </>
  );
}
