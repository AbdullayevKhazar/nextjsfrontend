"use client";

import { useTranslation } from "react-i18next";

interface Props {
  balance: number;
}

export default function CustomerBalanceCard({ balance }: Props) {
  const { t } = useTranslation("customers");
  const formattedBalance = balance.toLocaleString("az-AZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const hasDebt = balance > 0;

  return (
    <div
      className={`
        mx-auto
        w-full
        max-w-md
        rounded-3xl
        border
        p-6
        shadow-sm
        transition-all
        mt-5
        ${
          hasDebt
            ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-500/10 text-red-900 dark:text-red-100"
            : "border-emerald-100 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100"
        }
      `}
    >
      <div className="space-y-2">
        <span
          className={`
            block
            text-xs
            font-bold
            uppercase
            tracking-wider

            ${hasDebt ? "text-red-500 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}
          `}
        >
          {t("currentBalance")}
        </span>

        <h2 className="text-4xl font-bold tracking-tight tabular-nums">
          {formattedBalance}

          <span
            className={`
              ml-1
              text-3xl
              font-semibold

              ${hasDebt ? "text-red-500 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}
            `}
          >
            ₼
          </span>
        </h2>

        <p
          className={`text-sm font-medium ${
            hasDebt
              ? "text-red-700 dark:text-red-300"
              : "text-emerald-700 dark:text-emerald-300"
          }`}
        >
          {hasDebt ? t("outstandingDebt") : t("noOutstandingDebt")}
        </p>
      </div>
    </div>
  );
}
