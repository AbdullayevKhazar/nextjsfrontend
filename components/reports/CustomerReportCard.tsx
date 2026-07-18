"use client";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Phone } from "lucide-react";
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
    <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden transition-all">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left transition-all active:scale-[0.99]"
        aria-expanded={isExpanded}
        aria-label={`Toggle ${customer.customer.fullName} details`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-zinc-900 mb-1">
              {customer.customer.fullName}
            </h3>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <div className="flex items-center gap-1">
                <Phone size={12} />
                <span>{customer.customer.phone}</span>
              </div>
              {customer.customer.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span className="truncate">{customer.customer.location}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-semibold tabular-nums ${
                customer.customer.balance > 0
                  ? "text-red-600"
                  : "text-emerald-600"
              }`}
            >
              {formatAmount(customer.customer.balance)}
            </span>
            {isExpanded ? (
              <ChevronUp size={20} className="text-zinc-400" />
            ) : (
              <ChevronDown size={20} className="text-zinc-400" />
            )}
          </div>
        </div>

        <div className="flex gap-4 text-xs">
          <div className="flex gap-2">
            <span className="text-zinc-500">{t("totalDebt")} :</span>
            <span className="font-semibold text-zinc-900 tabular-nums">
              {formatAmount(customer.customer.totalDebt)}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-500">{t("totalPaid")} :</span>
            <span className="font-semibold text-zinc-900 tabular-nums">
              {formatAmount(customer.customer.totalPaid)}
            </span>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 pt-0 border-t border-zinc-100">
          <div className="pt-4 space-y-2">
            {customer.transactions.map((transaction) => (
              <ReportTransactionCard
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
