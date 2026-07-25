"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

type Period = "today" | "thisWeek" | "thisMonth" | "thisYear" | "custom";

interface Props {
  value: Period;
  onChange: (period: Period, startDate?: string, endDate?: string) => void;
}

export default function PeriodSelector({ value, onChange }: Props) {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customStart, setCustomStart] = useState<string>("");
  const [customEnd, setCustomEnd] = useState<string>("");

  const { t } = useTranslation("reports");

  const periods: { id: Period; label: string }[] = [
    { id: "today", label: t("today") },
    { id: "thisWeek", label: t("thisWeek") },
    { id: "thisMonth", label: t("thisMonth") },
    { id: "thisYear", label: t("thisYear") },
    { id: "custom", label: t("customRange") },
  ];

  const handlePeriodChange = (period: Period) => {
    if (period === "custom") {
      setShowCustomPicker(true);
      return;
    }

    setShowCustomPicker(false);
    const now = new Date();
    let startDate: string;
    let endDate: string = now.toISOString().split("T")[0];

    switch (period) {
      case "today":
        startDate = endDate;
        break;
      case "thisWeek":
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startDate = startOfWeek.toISOString().split("T")[0];
        break;
      case "thisMonth":
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        startDate = startOfMonth.toISOString().split("T")[0];
        break;
      case "thisYear":
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        startDate = startOfYear.toISOString().split("T")[0];
        break;
      default:
        startDate = endDate;
    }

    onChange(period, startDate, endDate);
  };

  // Custom tarix aralığı tam seçildikdə tetikləyirik
  useEffect(() => {
    if (customStart && customEnd && showCustomPicker) {
      onChange("custom", customStart, customEnd);
    }
  }, [customStart, customEnd, showCustomPicker, onChange]);

  const inputBaseClasses = `
    w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium
    bg-zinc-50 dark:bg-zinc-900/50 
    border-zinc-200 dark:border-zinc-800 
    text-zinc-900 dark:text-zinc-100
    focus:bg-white dark:focus:bg-zinc-900
    focus:border-zinc-400 dark:focus:border-zinc-600
    focus:ring-2 focus:ring-zinc-400/20 dark:focus:ring-zinc-600/20
  `;

  return (
    <div className="space-y-4">
      {/* Sürüşdürülə bilən Seçimlər (Pills) */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {periods.map((period) => {
          const isActive = value === period.id;
          return (
            <button
              key={period.id}
              onClick={() => handlePeriodChange(period.id)}
              className={`
                px-5 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-95
                ${
                  isActive
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md shadow-zinc-900/10 dark:shadow-white/10"
                    : "bg-white dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }
              `}
              aria-label={`Select ${period.label}`}
              aria-pressed={isActive}
            >
              {period.label}
            </button>
          );
        })}
      </div>

      {/* Xüsusi Tarix Seçici (Custom Range Modal-like Card) */}
      {showCustomPicker && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 rounded-3xl bg-white dark:bg-zinc-900/80 p-5 shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              <Calendar size={16} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold text-zinc-900 dark:text-white">
              {t("customRangeTitle", "Custom Range")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                {t("startDate", "Start Date")}
              </label>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className={`dark:[color-scheme:dark] ${inputBaseClasses}`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                {t("endDate", "End Date")}
              </label>
              <input
                type="date"
                value={customEnd}
                min={customStart} // Bitiş tarixi başlanğıcdan əvvəl ola bilməz
                onChange={(e) => setCustomEnd(e.target.value)}
                className={`dark:[color-scheme:dark] ${inputBaseClasses}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
