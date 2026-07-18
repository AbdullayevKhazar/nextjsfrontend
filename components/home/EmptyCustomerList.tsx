"use client";

import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EmptyCustomerListProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export default function EmptyCustomerList({
  hasFilters,
  onClearFilters,
}: EmptyCustomerListProps) {
  const { t } = useTranslation("customers");
  return (
    <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
        <Users size={28} className="text-zinc-400" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-zinc-900">
        {hasFilters ? t("noCustomersFound") : t("noCustomersYet")}
      </h3>

      <p className="mt-1 text-sm text-zinc-500">
        {hasFilters ? t("adjustSearchFilters") : t("addFirstCustomer")}
      </p>

      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="mt-4 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition active:scale-[0.98]"
        >
          {t("clearFilters")}
        </button>
      )}
    </div>
  );
}
