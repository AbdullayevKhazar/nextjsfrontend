"use client";

import { ReportSummary } from "@/services/report";
import { TrendingUp, ArrowDown, Users, FileText } from "lucide-react";

interface Props {
  data: ReportSummary;
}

export default function SummaryCard({ data }: Props) {
  const formatValue = (val: number | undefined) => {
    if (val === undefined || val === null) return "₼0";
    return `₼${val.toLocaleString()}`;
  };

  const summaryItems = [
    {
      label: "Total Debt",
      value: formatValue(data.debt),
      icon: <TrendingUp size={20} />,
      color: "bg-red-50 text-red-600",
    },
    {
      label: "Total Payment",
      value: formatValue(data.payment),
      icon: <ArrowDown size={20} />,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Current Balance",
      value: formatValue(data.balance),
      icon: <TrendingUp size={20} />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Transaction Count",
      value: data.transactionCount?.toString() || "0",
      icon: <FileText size={20} />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Customer Count",
      value: data.customerCount?.toString() || "0",
      icon: <Users size={20} />,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-zinc-100">
      <h3 className="text-sm font-semibold text-zinc-900 mb-4">Summary</h3>
      <div className="space-y-3">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-zinc-50 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${item.color}`}>{item.icon}</div>
              <span className="text-sm text-zinc-600">{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900 tabular-nums">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
