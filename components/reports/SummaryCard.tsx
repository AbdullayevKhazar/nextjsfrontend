"use client";

import { ReportSummary } from "@/services/report";
import { TrendingUp, ArrowDown, Users, FileText, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  data: ReportSummary;
}

export default function SummaryCard({ data }: Props) {
  const { t } = useTranslation("reports");

  const formatValue = (val: number | undefined) => {
    if (val === undefined || val === null) return "₼0";
    return `₼${val.toLocaleString()}`;
  };

  const summaryItems = [
    {
      label: t("totalDebt"),
      value: formatValue(data.debt),
      icon: <TrendingUp size={20} strokeWidth={2.5} />,
      colorClasses:
        "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    },
    {
      label: t("totalPaid"),
      value: formatValue(data.payment),
      icon: <ArrowDown size={20} strokeWidth={2.5} />,
      colorClasses:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
      label: t("currentBalance"),
      value: formatValue(data.balance),
      icon: <Wallet size={20} strokeWidth={2.5} />,
      colorClasses:
        "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    },
    {
      label: t("transactionCount"),
      value: data.transactionCount?.toString() || "0",
      icon: <FileText size={20} strokeWidth={2.5} />,
      colorClasses:
        "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
    },
    {
      label: t("customerCount"),
      value: data.customerCount?.toString() || "0",
      icon: <Users size={20} strokeWidth={2.5} />,
      colorClasses:
        "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    },
  ];

  return (
    <div className="rounded-3xl bg-white dark:bg-zinc-900/80 p-5 shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h3 className="mb-5 text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
        {t("summary")}
      </h3>

      <div className="flex flex-col">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3.5 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0 last:pb-0 first:pt-0"
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.colorClasses}`}
              >
                {item.icon}
              </div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {item.label}
              </span>
            </div>
            <span className="text-base font-bold text-zinc-900 dark:text-white tabular-nums tracking-tight">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
