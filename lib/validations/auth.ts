import { z } from "zod";

export function createLoginSchema(t?: (key: string) => string) {
  return z.object({
    email: z.email(t?.("validEmailError") ?? "Please enter a valid email."),
    password: z
      .string()
      .min(6, t?.("passwordTooShort") ?? "Password must be at least 6 characters"),
  });
}

export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>;
