"use client";

import { ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
  className?: string;
}

export default function BottomSheet({ open, children, className }: Props) {
  return (
    <div
      className={`
        fixed
        left-0
        right-0
        bottom-0

        z-50

        rounded-t-[30px]
        bg-white

        transition-transform
        duration-300
        ease-out

        ${open ? "translate-y-0" : "translate-y-full"}
        ${className ?? ""}
        `}
    >
      <div className="mx-auto mt-3 mb-5 h-1.5 w-12 rounded-full bg-zinc-300" />

      <div className="px-5 pb-8">{children}</div>
    </div>
  );
}
