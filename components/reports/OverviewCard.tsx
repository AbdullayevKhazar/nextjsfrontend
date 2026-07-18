import { ArrowUp, ArrowDown, Users, TrendingUp, Wallet } from "lucide-react";

interface Props {
  title: string;
  value: number;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: number;
  color?: "blue" | "green" | "red" | "purple" | "orange";
}

const colorClasses = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  green: "bg-emerald-50 text-emerald-600 border-emerald-100",
  red: "bg-red-50 text-red-600 border-red-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
};

const iconMap = {
  totalDebt: <Wallet size={20} />,
  totalBorrowed: <TrendingUp size={20} />,
  totalPaid: <ArrowUp size={20} />,
  totalCustomers: <Users size={20} />,
  customersWithDebt: <Users size={20} />,
  todayDebt: <Wallet size={20} />,
  todayPayment: <ArrowUp size={20} />,
  thisMonthDebt: <Wallet size={20} />,
  thisMonthPayment: <ArrowUp size={20} />,
};

export default function OverviewCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = "blue",
}: Props) {
  const formatValue = (val: number | undefined) => {
    if (val === undefined || val === null) return "₼0";
    return `₼${val.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100 transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-xl ${colorClasses[color]}`}>
          {icon}
        </div>
        {trend && trendValue && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              trend === "up" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {trend === "up" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            {trendValue}%
          </div>
        )}
      </div>
      <p className="text-xs font-medium text-zinc-500 mb-1">{title}</p>
      <p className="text-xl font-bold text-zinc-900 tabular-nums">
        {formatValue(value)}
      </p>
    </div>
  );
}
