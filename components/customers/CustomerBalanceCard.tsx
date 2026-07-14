"use client";

interface Props {
  balance: number;
}

export default function CustomerBalanceCard({ balance }: Props) {
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

        ${
          hasDebt
            ? "border-red-100 bg-red-50 text-red-900"
            : "border-emerald-100 bg-emerald-50 text-emerald-900"
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

            ${hasDebt ? "text-red-500" : "text-emerald-600"}
          `}
        >
          Current Balance
        </span>

        <h2 className="text-4xl font-bold tracking-tight tabular-nums">
          {formattedBalance}

          <span
            className={`
              ml-1
              text-3xl
              font-semibold

              ${hasDebt ? "text-red-500" : "text-emerald-600"}
            `}
          >
            ₼
          </span>
        </h2>

        <p
          className={`text-sm font-medium ${
            hasDebt ? "text-red-700" : "text-emerald-700"
          }`}
        >
          {hasDebt ? "Outstanding Debt" : "No Outstanding Debt"}
        </p>
      </div>
    </div>
  );
}
