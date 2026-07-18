"use client";

import { ArrowDownRight, ArrowUpRight, Wallet, Users } from "lucide-react";
import { OverviewResponse } from "@/services/report";

function formatCurrency(value: number): string {
  return `₼${value.toLocaleString("az-AZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function OverviewGrid({ data }: { data: OverviewResponse }) {
  const cards = [
    {
      title: "Total Debt",
      value: formatCurrency(data.totalDebt),
      icon: <ArrowDownRight className="h-5 w-5 text-rose-500" />,
      bgColor: "bg-rose-50",
    },
    {
      title: "Total Paid",
      value: formatCurrency(data.totalPaid),
      icon: <ArrowUpRight className="h-5 w-5 text-emerald-500" />,
      bgColor: "bg-emerald-50",
    },
    {
      title: "Total Customers",
      value: data.customerCount.toString(),
      icon: <Users className="h-5 w-5 text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Today Payment",
      value: formatCurrency(data.todayPayment),
      icon: <Wallet className="h-5 w-5 text-indigo-500" />,
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-900/5 transition-all hover:shadow-md"
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${card.bgColor}`}
          >
            {card.icon}
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500">{card.title}</p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-zinc-900">
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
