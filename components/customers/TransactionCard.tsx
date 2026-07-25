"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Transaction } from "@/types/customer";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface Props {
  transaction: Transaction;
  onLongPress?: () => void;
}

export default function TransactionCard({ transaction, onLongPress }: Props) {
  const { t } = useTranslation("transactions");
  const isDebt = transaction.type === "debt";
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} • ${hours}:${minutes}`;
  };

  // Yeni məbləğ formatı funksiyası
  const formatAmountWithSign = (amount: number) => {
    const symbol = isDebt ? "-" : "+";
    const formattedAmount = amount.toFixed(2);
    return `${symbol} ₼${formattedAmount}`;
  };

  const handleTouchStart = useCallback(() => {
    const timer = setTimeout(() => {
      onLongPress?.();
    }, 500);
    setPressTimer(timer);
  }, [onLongPress]);

  const handleTouchEnd = useCallback(() => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  }, [pressTimer]);

  const handleTouchMove = useCallback(() => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  }, [pressTimer]);

  return (
    <button
      className="group relative w-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md active:scale-[0.98] active:bg-zinc-50 dark:active:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:ring-offset-2 text-left"
      onContextMenu={(e) => {
        e.preventDefault();
        onLongPress?.();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      aria-label={`${isDebt ? "Debt" : "Payment"} of ${formatAmountWithSign(transaction.amount)} on ${formatDate(transaction.date)}. ${transaction.note ? `Note: ${transaction.note}` : ""}`}
    >
      {/* Sol Accent Bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${
          isDebt ? "bg-red-500" : "bg-emerald-500"
        }`}
      />

      <div className="flex flex-col gap-3">
        {/* Sətir 1: Başlıq */}
        <div className="flex items-center justify-between gap-3">
          {/* Sol: İkon və Növ */}
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                isDebt
                  ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {isDebt ? (
                <ArrowDownLeft className="h-5 w-5" />
              ) : (
                <ArrowUpRight className="h-5 w-5" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {isDebt ? t("debt") : t("payment")}
              </span>
            </div>
          </div>

          {/* Sağ: Tarix */}
          <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500 truncate">
            {formatDate(transaction.date)}
          </span>
        </div>

        {/* Sətir 2: Məbləğ */}
        <p
          className={`text-3xl tracking-normal tabular-nums ${
            isDebt
              ? "text-red-600 dark:text-red-400"
              : "text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {formatAmountWithSign(transaction.amount)}
        </p>

        {/* Sətir 3: Qeyd */}
        {transaction.note && (
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1 leading-relaxed">
              {transaction.note}
            </p>
          </div>
        )}
      </div>
    </button>
  );
}
