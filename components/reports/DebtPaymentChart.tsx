"use client";

import { ReportSummary } from "@/services/report";

interface Props {
  data: ReportSummary;
}

export default function DebtPaymentChart({ data }: Props) {
  const total = data.debt + data.payment;

  if (total === 0) {
    return null;
  }

  const debtPercentage = (data.debt / total) * 100;
  const paymentPercentage = (data.payment / total) * 100;

  const formatValue = (val: number) => {
    return `₼${val.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-zinc-100">
      <h3 className="text-sm font-semibold text-zinc-900 mb-4">Debt vs Payment</h3>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-zinc-600">Total Debt</span>
            <span className="font-semibold text-zinc-900">{debtPercentage.toFixed(1)}%</span>
          </div>
          <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-all duration-500"
              style={{ width: `${debtPercentage}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500 mt-1">{formatValue(data.debt)}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-zinc-600">Total Paid</span>
            <span className="font-semibold text-zinc-900">{paymentPercentage.toFixed(1)}%</span>
          </div>
          <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${paymentPercentage}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500 mt-1">{formatValue(data.payment)}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-100">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600">Total</span>
          <span className="font-semibold text-zinc-900">{formatValue(total)}</span>
        </div>
      </div>
    </div>
  );
}
