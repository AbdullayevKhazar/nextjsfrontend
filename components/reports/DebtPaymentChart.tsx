"use client";

import { ReportSummary } from "@/services/report";
import { useTranslation } from "react-i18next";

interface Props {
  data: ReportSummary;
}

export default function DebtPaymentChart({ data }: Props) {
  const { t } = useTranslation("reports");
  const total = (data.debt || 0) + (data.payment || 0);

  if (total === 0) {
    return null;
  }

  const debtPercentage = (data.debt / total) * 100;
  const paymentPercentage = (data.payment / total) * 100;

  const formatValue = (val: number) => {
    return `₼${val.toLocaleString()}`;
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-zinc-900/80 p-5 shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col gap-5">
        {/* Borc (Debt) Bölməsi */}
        <div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {t("totalDebt")}
            </span>
            <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white tabular-nums">
              {debtPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="h-3.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800/80 overflow-hidden">
            <div
              className="h-full rounded-full bg-red-500 dark:bg-red-500/90 transition-all duration-700 ease-out"
              style={{ width: `${debtPercentage}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-500 tabular-nums">
            {formatValue(data.debt)}
          </p>
        </div>

        {/* Ödəniş (Payment) Bölməsi */}
        <div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {t("totalPaid")}
            </span>
            <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white tabular-nums">
              {paymentPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="h-3.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800/80 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 dark:bg-emerald-500/90 transition-all duration-700 ease-out"
              style={{ width: `${paymentPercentage}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-500 tabular-nums">
            {formatValue(data.payment)}
          </p>
        </div>
      </div>

      {/* Cəmi (Total) Bölməsi */}
      <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {t("total")}
          </span>
          <span className="text-base font-bold text-zinc-900 dark:text-white tabular-nums tracking-tight">
            {formatValue(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
