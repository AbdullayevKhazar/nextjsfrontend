"use client";

import { Plus } from "lucide-react";

interface FloatingButtonProps {
  onClick: () => void;
}

export function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        right-5
        bottom-28
        z-40

        flex
        h-14
        w-14
        items-center
        justify-center

        rounded-full

        bg-blue-600
        text-white

        shadow-[0_12px_30px_rgba(37,99,235,.35)]

        transition-transform
        duration-200

        active:scale-95
      "
    >
      <Plus size={24} strokeWidth={2.5} />
    </button>
  );
}
