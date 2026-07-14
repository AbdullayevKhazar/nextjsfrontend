"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import TextField from "@/components/ui/TextField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { login } from "@/services/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginInput = z.input<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginInput) => {
    try {
      setIsLoading(true);
      await login(values);
      toast.success("Login successful");
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Login failed");
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-5">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900">Debt Book</h1>
          <p className="mt-2 text-sm text-zinc-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <TextField
            label="Password"
            type="password"
            placeholder="••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <PrimaryButton type="submit" loading={isLoading}>
            Sign In
          </PrimaryButton>
        </form>
      </div>
    </main>
  );
}
