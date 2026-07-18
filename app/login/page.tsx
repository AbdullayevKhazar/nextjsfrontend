"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("auth");
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
      toast.success(t("loginSuccess"));
      router.push("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? t("loginFailed"));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-5">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900">
            {t("loginTitle")}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">{t("signInDescription")}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            label={t("emailLabel")}
            type="email"
            placeholder={t("emailPlaceholder")}
            error={errors.email?.message}
            {...register("email")}
          />

          <TextField
            label={t("passwordLabel")}
            type="password"
            placeholder={t("passwordPlaceholder")}
            error={errors.password?.message}
            {...register("password")}
          />

          <PrimaryButton type="submit" loading={isLoading}>
            {t("signInButton")}
          </PrimaryButton>
        </form>
      </div>
    </main>
  );
}
