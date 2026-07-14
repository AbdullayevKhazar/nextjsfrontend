"use client";

export default function EmptyTransactions() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-12 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-50">
        <svg
          className="h-10 w-10 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-zinc-900">No transactions yet</h3>

      <p className="mt-2 text-sm text-zinc-500">
        Your debt and payment history will appear here.
      </p>
    </div>
  );
}
