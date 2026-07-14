"use client";

import { Location } from "@/types/customer";

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
              : "bg-white text-zinc-600 border border-zinc-200"
          }
        `}
      >
        All
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
                : "bg-white text-zinc-600 border border-zinc-200"
            }
          `}
        >
          {location.name}
        </button>
      ))}
    </div>
  );
}
