import { z } from "zod";

export const createCustomerSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),

  location: z.string().optional(),
  note: z.string().optional(),
});

export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
export type CreateCustomerInput = z.input<typeof createCustomerSchema>;
