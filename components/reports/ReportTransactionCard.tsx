"use client";

import { ReportTransaction } from "@/services/report";

interface Props {
  transaction: ReportTransaction;
}

export default function ReportTransactionCard({ transaction }: Props) {
  const isDebt = transaction.type === "debt";

  const formatAmount = (amount: number | undefined) => {
    if (amount === undefined || amount === null) return "₼0.00";
    return `₼${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-zinc-50 rounded-xl p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isDebt
                ? "bg-red-100 text-red-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {isDebt ? "Debt" : "Payment"}
          </span>
        </div>
        <span className="text-sm font-semibold tabular-nums">
          {formatAmount(transaction.amount)}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
        <span>{formatDate(transaction.date)}</span>
        <span>•</span>
        <span>{formatTime(transaction.createdAt)}</span>
      </div>

      {transaction.note && (
        <p className="text-sm text-zinc-600 line-clamp-2">{transaction.note}</p>
      )}
    </div>
  );
}
