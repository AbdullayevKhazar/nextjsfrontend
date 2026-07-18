"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Transaction } from "@/types/customer";

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

  const formatAmount = (amount: number) => {
    return `₼${amount.toFixed(2)}`;
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
      className="w-full min-h-[120px] rounded-3xl bg-white p-5 shadow-sm transition-all duration-200 active:scale-[0.98] active:shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
      onContextMenu={(e) => {
        e.preventDefault();
        onLongPress?.();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      aria-label={`${isDebt ? "Debt" : "Payment"} of ${formatAmount(transaction.amount)} on ${formatDate(transaction.createdAt)}. ${transaction.note ? `Note: ${transaction.note}` : ""}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
            isDebt ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
          }`}
        >
          {isDebt ? t("debt") : t("payment")}
        </span>
        <span className="text-sm text-zinc-500">
          {formatDate(transaction.createdAt)}
        </span>
      </div>

      {/* Amount */}
      <div className="mb-3">
        <p
          className={`text-2xl font-bold tabular-nums ${
            isDebt ? "text-red-600" : "text-green-600"
          }`}
        >
          {formatAmount(transaction.amount)}
        </p>
      </div>

      {/* Note */}
      {transaction.note && (
        <div className="mb-4">
          <p className="text-sm text-zinc-500 line-clamp-2">
            {transaction.note}
          </p>
        </div>
      )}
    </button>
  );
}
