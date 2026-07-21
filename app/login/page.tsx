"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import TextField from "@/components/ui/TextField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import PasskeySignInButton from "@/components/auth/PasskeySignInButton";
import { getErrorMessage } from "@/lib/error";
import { useAuth } from "@/hooks/use-auth";
import { login } from "@/services/auth";
import { createLoginSchema } from "@/lib/validations/auth";

type LoginInput = z.input<ReturnType<typeof createLoginSchema>>;

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation("auth");
  const [isLoading, setIsLoading] = useState(false);
  const loginSchema = useMemo(() => createLoginSchema(t), [t]);
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

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
      router.replace("/");
      router.refresh();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, t("loginFailed")));
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
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAFA]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600" />
      </main>
    );
  }

  if (isAuthenticated) {
    return null;
  }

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
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <TextField
            label={t("passwordLabel")}
            type="password"
            placeholder={t("passwordPlaceholder")}
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <PrimaryButton type="submit" loading={isLoading}>
            {t("signInButton")}
          </PrimaryButton>
        </form>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#FAFAFA] px-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
              {t("or")}
            </span>
          </div>
        </div>

        <PasskeySignInButton />
      </div>
    </main>
  );
}
