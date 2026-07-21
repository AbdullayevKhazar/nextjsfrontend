"use client";

import { ArrowLeft, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import BottomSheet from "@/components/shared/BottomSheet";
import Backdrop from "@/components/shared/Backdrop";
import type { CustomerSort } from "@/types/customer";

interface Props {
  open: boolean;
  onClose: () => void;

  sort: CustomerSort;
  onSortChange: (value: CustomerSort) => void;
}

const SORT_OPTIONS: {
  label: string;
  value: CustomerSort;
}[] = [
  { label: "newest", value: "created_desc" },
  { label: "oldest", value: "created_asc" },
  { label: "aToZ", value: "name_asc" },
  { label: "zToA", value: "name_desc" },
  { label: "highestDebt", value: "balance_desc" },
  { label: "lowestDebt", value: "balance_asc" },
];

export default function FilterSheet({
  open,
  onClose,
  sort,
  onSortChange,
}: Props) {
  const { t } = useTranslation("filters");
  return (
    <>
      <Backdrop open={open} onClose={onClose} />

      <BottomSheet open={open} className="rounded-t-none">
        <div className="flex items-center gap-3 pb-6">
          <button
            onClick={onClose}
            className="rounded-full p-2 transition active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>

          <h2 className="text-xl font-bold">{t("filtersTitle")}</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-500 uppercase tracking-wide">
              {t("sortBy")}
            </h3>

            <div className="space-y-2">
              {SORT_OPTIONS.map((item) => {
                const active = sort === item.value;

                return (
                  <button
                    key={item.value}
                    onClick={() => onSortChange(item.value)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 transition ${
                      active
                        ? "border-blue-600 bg-blue-50"
                        : "border-zinc-200 bg-white"
                    }`}
                  >
                    <span
                      className={
                        active ? "font-semibold text-blue-600" : "text-zinc-700"
                      }
                    >
                      {t(item.label as any)}
                    </span>

                    {active && <Check size={18} className="text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                onSortChange("created_desc");
              }}
              className="h-14 flex-1 rounded-2xl border border-zinc-200 font-semibold transition active:scale-[0.98]"
            >
              {t("reset")}
            </button>

            <button
              onClick={onClose}
              className="h-14 flex-1 rounded-2xl bg-blue-600 font-semibold text-white transition active:scale-[0.98]"
            >
              {t("apply")}
            </button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
