import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),

  note: z.string().optional(),

  date: z.string().min(1, "Date is required"),
});

export type CreateTransactionInput = z.input<typeof createTransactionSchema>;

export type CreateTransactionSchema = z.output<typeof createTransactionSchema>;
