"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

interface CustomerCardProps {
  id: string;
  fullName: string;
  location: string;
  balance: number;
  overdue: boolean;
  onDelete?: (id: string) => void;
}

export default function CustomerCard({
  id,
  fullName,
  location,
  balance,
  onDelete,
  overdue,
}: CustomerCardProps) {
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const initials = fullName
    .split(" ")
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();

  const handlePressStart = () => {
    timer.current = setTimeout(() => {
      onDelete?.(id);
    }, 600);
  };

  const handlePressEnd = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const handleClick = () => {
    router.push(`/customer/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
 className={`
  flex
  w-full
  items-center
  justify-between
  rounded-[24px]
  border
  px-5
  py-4
  shadow-sm
  transition
  active:scale-[0.98]
  cursor-pointer
  select-none
  ${
    overdue
      ? "border-red-200 bg-red-50"
      : "border-zinc-100 bg-white"
  }
`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
          {initials}
        </div>

        <div className="text-left">
          <h3 className="text-[15px] font-semibold text-zinc-900">
            {fullName}
          </h3>

          <p className="mt-0.5 text-xs text-zinc-500">{location}</p>
        </div>
      </div>

      <p className="text-[20px] font-bold tabular-nums text-zinc-900">
        ₼{balance.toLocaleString()}
      </p>
    </div>
  );
}
