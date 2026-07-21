import { z } from "zod";
import { isAzerbaijaniPhone } from "@/lib/phone";

export function createCustomerSchema(t?: (key: string) => string) {
  return z.object({
    fullName: z.string().min(2, t?.("fullNameTooShort") ?? "Full name must be at least 2 characters"),
    phone: z
      .string()
      .trim()
      .min(1, t?.("phoneRequired") ?? "Phone number is required")
      .refine(isAzerbaijaniPhone, {
        message: t?.("phoneInvalid") ?? "Phone number must be a valid +994 number",
      }),

    location: z.string().optional(),
    note: z.string().optional(),
  });
}

export type CreateCustomerSchema = z.infer<ReturnType<typeof createCustomerSchema>>;
export type CreateCustomerInput = z.input<ReturnType<typeof createCustomerSchema>>;
