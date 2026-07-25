"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, MapPin, Phone } from "lucide-react";
import { ReportCustomer } from "@/services/report";
import ReportTransactionCard from "./ReportTransactionCard";

interface Props {
  customer: ReportCustomer;
}

export default function CustomerReportCard({ customer }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation("reports");

  const formatAmount = (amount: number | undefined) => {
    if (amount === undefined || amount === null) return "₼0";
    return `₼${amount.toLocaleString()}`;
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-zinc-900/80 shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left transition-colors active:bg-zinc-50 dark:active:bg-zinc-800/50"
        aria-expanded={isExpanded}
        aria-label={`Toggle ${customer.customer.fullName} details`}
      >
        <div className="flex items-start justify-between mb-3.5">
          {/* Müştəri Məlumatları */}
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="truncate text-base font-bold text-zinc-900 dark:text-white mb-1.5">
              {customer.customer.fullName}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5 shrink-0">
                <Phone size={14} strokeWidth={2.5} />
                <span>{customer.customer.phone}</span>
              </div>
              {customer.customer.location && (
                <div className="flex items-center gap-1.5 min-w-0">
                  <MapPin size={14} strokeWidth={2.5} className="shrink-0" />
                  <span className="truncate">{customer.customer.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Balans və Ox ikonu */}
          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`text-sm font-bold tracking-tight tabular-nums ${
                customer.customer.balance > 0
                  ? "text-red-600 dark:text-red-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {formatAmount(customer.customer.balance)}
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
              <ChevronDown
                size={16}
                strokeWidth={2.5}
                className={`transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Ümumi Statistika (Alt Hissə) */}
        <div className="flex gap-5 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-zinc-500 dark:text-zinc-400">
              {t("totalDebt")}:
            </span>
            <span className="font-bold text-zinc-900 dark:text-white tabular-nums">
              {formatAmount(customer.customer.totalDebt)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-zinc-500 dark:text-zinc-400">
              {t("totalPaid")}:
            </span>
            <span className="font-bold text-zinc-900 dark:text-white tabular-nums">
              {formatAmount(customer.customer.totalPaid)}
            </span>
          </div>
        </div>
      </button>

      {/* Tranzaksiyalar (Açılan hissə) */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-0">
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 space-y-2">
            {customer.transactions.map((transaction) => (
              <ReportTransactionCard
                key={transaction._id}
                transaction={transaction}
              />
            ))}

            {customer.transactions.length === 0 && (
              <p className="text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 py-2">
                Əməliyyat tapılmadı
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
