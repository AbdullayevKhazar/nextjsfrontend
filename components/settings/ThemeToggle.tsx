"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation("settings");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
          {t("themeSection")}
        </h2>
        <div className="flex w-full gap-2 rounded-2xl bg-white dark:bg-[#18181b] p-2 shadow-sm border border-zinc-100 dark:border-[#27272a] opacity-50">
          <div className="flex-1 h-[40px]" />
        </div>
      </div>
    );
  }

  const themes = [
    { id: "system", label: t("themeSystem") },
    { id: "light", label: t("themeLight") },
    { id: "dark", label: t("themeDark") },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
        {t("themeSection")}
      </h2>

      <div className="flex w-full gap-2 rounded-2xl bg-white dark:bg-[#18181b] p-2 shadow-sm border border-zinc-100 dark:border-[#27272a]">
        {themes.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTheme(id)}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
              theme === id
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
