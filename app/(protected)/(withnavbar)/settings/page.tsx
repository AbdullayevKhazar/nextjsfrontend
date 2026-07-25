"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { LogOut, Download, Upload } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";
import { useExportBackup, useImportBackup } from "@/hooks/use-backup";
import { useLanguage } from "@/i18n/hooks";
import { languages, type Language } from "@/i18n/settings";
import PasskeySetupCard from "@/components/settings/PasskeySetupCard";
import { ThemeToggle } from "@/components/settings/ThemeToggle";

export default function SettingsPage() {
  const { t: t_settings } = useTranslation("settings");
  const { t: t_auth } = useTranslation("auth");
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { mutate: exportBackup, isPending: isExporting } = useExportBackup();
  const { mutate: importBackup, isPending: isImporting } = useImportBackup();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { language, setLanguage } = useLanguage();

  const handleLogout = async () => {
    try {
      await import("@/services/auth").then((m) => m.logout());
      toast.success(t_auth("logoutSuccess"));
      router.push("/login");
      router.refresh();
    } catch {
      toast.error(t_auth("logoutFailed"));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      toast.error(t_settings("pleaseSelectJsonFile"));
      return;
    }

    importBackup(file, {
      onSuccess: () => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  const handleChangeLanguage = (lang: Language) => {
    setLanguage(lang);
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-28">
      <section className="mx-auto flex w-full max-w-md flex-col gap-5 px-5 pt-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {t_settings("settingsTitle")}
        </h1>

        {isAuthenticated && user && (
          <div className="rounded-3xl bg-white dark:bg-zinc-900 p-5 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-500">
              {t_auth("signedInAs")}
            </p>
            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {user.fullName}
            </p>
            <p className="text-sm text-zinc-500">{user.email}</p>
          </div>
        )}

        {isAuthenticated && <PasskeySetupCard />}

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
            {t_settings("languageSection")}
          </h2>

          <div className="flex w-full gap-2 rounded-2xl bg-white dark:bg-zinc-900 p-2 shadow-sm border border-zinc-100 dark:border-zinc-800">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleChangeLanguage(lang)}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
                  language === lang
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:bg-zinc-50"
                }`}
              >
                {t_settings(lang)}
              </button>
            ))}
          </div>
        </div>

        <ThemeToggle />

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
            {t_settings("backupSection")}
          </h2>

          <button
            onClick={() => exportBackup()}
            disabled={isExporting}
            className="flex w-full items-center gap-3 rounded-2xl bg-white dark:bg-zinc-900 p-4 shadow-sm border border-zinc-100 dark:border-zinc-800 transition active:scale-[0.98] disabled:opacity-50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Download size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {isExporting
                  ? t_settings("exportingButton")
                  : t_settings("exportBackup")}
              </p>
              <p className="text-xs text-zinc-500">
                {t_settings("downloadDataDescription")}
              </p>
            </div>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="flex w-full items-center gap-3 rounded-2xl bg-white dark:bg-zinc-900 p-4 shadow-sm border border-zinc-100 dark:border-zinc-800 transition active:scale-[0.98] disabled:opacity-50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Upload size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {isImporting
                  ? t_settings("importingButton")
                  : t_settings("importBackup")}
              </p>
              <p className="text-xs text-zinc-500">
                {t_settings("restoreDataDescription")}
              </p>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div className="space-y-3 pt-4">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
            {t_settings("accountSection")}
          </h2>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl bg-white dark:bg-zinc-900 p-4 shadow-sm border border-zinc-100 dark:border-zinc-800 transition active:scale-[0.98] hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
              <LogOut size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-zinc-900">
                {t_settings("logout")}
              </p>
              <p className="text-xs text-zinc-500">
                {t_settings("logoutDescription")}
              </p>
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}
