"use client";

import { ReactNode } from "react";

interface Props {
  open: boolean;
  children: ReactNode;
  className?: string;
}

export default function BottomSheet({ open, children, className = "" }: Props) {
  return (
    <div
      className={`
        fixed left-0 right-0 bottom-0 z-50
        flex max-h-[92vh] flex-col
        rounded-t-[32px] bg-white dark:bg-zinc-950
        border-t border-transparent dark:border-zinc-800/80
        shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.8)]
        transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${open ? "translate-y-0" : "translate-y-full"}
        ${className}
      `}
    >
      {/* Üst tutacaq (Drag handle) */}
      <div className="flex w-full shrink-0 items-center justify-center pt-4 pb-2">
        <div className="h-1.5 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Məzmun hissəsi (Scrollable) */}
      <div className="overflow-y-auto overscroll-contain px-5 pb-8 sm:pb-10">
        {children}
      </div>
    </div>
  );
}
