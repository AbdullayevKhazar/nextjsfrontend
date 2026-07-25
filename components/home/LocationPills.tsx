"use client";

import { Location } from "@/types/customer";
import { useTranslation } from "react-i18next";

interface LocationPillsProps {
  locations: Location[];
  selected: string;
  onChange: (location: string) => void;
}

export default function LocationPills({
  locations,
  selected,
  onChange,
}: LocationPillsProps) {
  const { t } = useTranslation("customers");
  return (
    <div
      className="
        -mx-5
        flex
        gap-2
        overflow-x-auto
        px-5
        pb-1
        scrollbar-hide
      "
    >
      <button
        onClick={() => onChange("")}
        className={`
          shrink-0
          rounded-full
          px-4
          py-2
          text-[13px]
          font-semibold
          transition-colors
          duration-200

          ${
            selected === ""
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
          }
        `}
      >
        {t("allPill")}
      </button>

      {locations.map((location) => (
        <button
          key={location.name}
          onClick={() => onChange(location.name)}
          className={`
            shrink-0
            rounded-full
            px-4
            py-2
            text-[13px]
            font-semibold
            transition-colors
            duration-200

            ${
              selected === location.name
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
            }
          `}
        >
          {location.name}
        </button>
      ))}
    </div>
  );
}
