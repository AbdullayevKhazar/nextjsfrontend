"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

interface TotalDebtCardProps {
  amount: number;
}

const STORAGE_KEY = "show-total-debt";

export default function TotalDebtCard({ amount }: TotalDebtCardProps) {
  const { t } = useTranslation("debt");
  const [showAmount, setShowAmount] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      setShowAmount(saved === "true");
    }
  }, []);

  const toggleVisibility = () => {
    const next = !showAmount;

    setShowAmount(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  };

  return (
    <section
      className="
        rounded-[28px]
        bg-white
        p-6
        shadow-sm
        border
        border-zinc-100
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          {t("totalDebtCard")}
        </p>

        <button
          onClick={toggleVisibility}
          className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100"
          aria-label={showAmount ? t("hideAmount") : t("showAmount")}
        >
          {showAmount ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      <h1 className="mt-2 text-[34px] font-bold tracking-tight text-primary tabular-nums">
        {showAmount ? `₼${amount.toLocaleString()}` : "₼ ****"}
      </h1>
    </section>
  );
}
