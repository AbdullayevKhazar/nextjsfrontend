"use client";

import { ArrowLeft, Check } from "lucide-react";
import BottomSheet from "@/components/shared/BottomSheet";
import Backdrop from "@/components/shared/Backdrop";
import type { CustomerSort } from "@/types/customer";

interface Props {
  open: boolean;
  onClose: () => void;

  sort: CustomerSort;
  onSortChange: (value: CustomerSort) => void;

  overdue: boolean | undefined;
  onOverdueChange: (value: boolean | undefined) => void;
}

const SORT_OPTIONS: {
  label: string;
  value: CustomerSort;
}[] = [
  { label: "Newest", value: "created_desc" },
  { label: "Oldest", value: "created_asc" },
  { label: "A → Z", value: "name_asc" },
  { label: "Z → A", value: "name_desc" },
  { label: "Highest Debt", value: "balance_desc" },
  { label: "Lowest Debt", value: "balance_asc" },
];

export default function FilterSheet({
  open,
  onClose,
  sort,
  onSortChange,
  overdue,
  onOverdueChange,
}: Props) {
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

          <h2 className="text-xl font-bold">Filters</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-500 uppercase tracking-wide">
              Sort By
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
                      {item.label}
                    </span>

                    {active && <Check size={18} className="text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overdue */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-500 uppercase tracking-wide">
              Status
            </h3>

            <button
              onClick={() => onOverdueChange(overdue ? undefined : true)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 transition ${
                overdue
                  ? "border-red-500 bg-red-50"
                  : "border-zinc-200 bg-white"
              }`}
            >
              <span
                className={
                  overdue ? "font-semibold text-red-600" : "text-zinc-700"
                }
              >
                Show only overdue customers
              </span>

              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                  overdue ? "border-red-500 bg-red-500" : "border-zinc-300"
                }`}
              >
                {overdue && <Check size={14} className="text-white" />}
              </div>
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                onSortChange("created_desc");
                onOverdueChange(undefined);
              }}
              className="h-14 flex-1 rounded-2xl border border-zinc-200 font-semibold transition active:scale-[0.98]"
            >
              Reset
            </button>

            <button
              onClick={onClose}
              className="h-14 flex-1 rounded-2xl bg-blue-600 font-semibold text-white transition active:scale-[0.98]"
            >
              Apply
            </button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
