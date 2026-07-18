"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

type Period = "today" | "thisWeek" | "thisMonth" | "thisYear" | "custom";

interface Props {
  value: Period;
  onChange: (period: Period, startDate?: string, endDate?: string) => void;
}

export default function PeriodSelector({ value, onChange }: Props) {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
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

  const handleCustomDateChange = (startDate: string, endDate: string) => {
    onChange("custom", startDate, endDate);
    setShowCustomPicker(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => handlePeriodChange(period.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
              transition-all active:scale-95
              ${
                value === period.id
                  ? "bg-zinc-900 text-white shadow-md"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
              }
            `}
            aria-label={`Select ${period.label}`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {showCustomPicker && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={18} className="text-zinc-500" />
            <span className="text-sm font-medium text-zinc-900">
              Custom Range
            </span>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                onChange={(e) => {
                  const startDate = e.target.value;
                  const endDateInput = document.getElementById(
                    "custom-end-date",
                  ) as HTMLInputElement;
                  if (startDate && endDateInput?.value) {
                    handleCustomDateChange(startDate, endDateInput.value);
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                End Date
              </label>
              <input
                id="custom-end-date"
                type="date"
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                onChange={(e) => {
                  const endDate = e.target.value;
                  const startDateInput = document.querySelector(
                    'input[type="date"]:first-of-type',
                  ) as HTMLInputElement;
                  if (endDate && startDateInput?.value) {
                    handleCustomDateChange(startDateInput.value, endDate);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
