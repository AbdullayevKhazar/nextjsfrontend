"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";

import TextField from "@/components/ui/TextField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { getErrorMessage } from "@/lib/error";
import { useAuth } from "@/hooks/use-auth";
import { register as registerUser } from "@/services/auth";
import { createRegisterSchema } from "@/lib/validations/auth";

type RegisterInput = z.input<ReturnType<typeof createRegisterSchema>>;

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation("auth");
  const [isLoading, setIsLoading] = useState(false);
  const registerSchema = useMemo(() => createRegisterSchema(t), [t]);
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterInput) => {
    try {
      setIsLoading(true);
      await registerUser(values);
      toast.success(t("registerSuccess"));
      router.replace("/");
      router.refresh();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, t("registerFailed")));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 dark:border-zinc-800 border-t-blue-600 dark:border-t-blue-500" />
      </main>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-5 py-10">
      <div className="w-full max-w-sm space-y-8">
        
        {/* Başlıq və Təsvir */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {t("registerTitle")}
          </h1>
          <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {t("registerDescription")}
          </p>
        </div>

        {/* Qeydiyyat Formu */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label={t("fullNameLabel")}
            type="text"
            placeholder={t("fullNamePlaceholder")}
            autoComplete="name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <TextField
            label={t("emailLabel")}
            type="email"
            placeholder={t("emailPlaceholder")}
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <TextField
            label={t("passwordLabel")}
            type="password"
            placeholder={t("passwordPlaceholder")}
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="pt-2">
            <PrimaryButton type="submit" loading={isLoading}>
              {t("registerButton")}
            </PrimaryButton>
          </div>
        </form>

        {/* Girişə Keçid Linki */}
        <div className="text-center pt-2">
          <Link
            href="/login"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
          >
            {t("haveAccount")}
          </Link>
        </div>

      </div>
    </main>
  );
}