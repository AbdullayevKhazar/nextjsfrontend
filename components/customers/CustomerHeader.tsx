"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface CustomerHeaderProps {
  rightSlot?: ReactNode;
  readonly?: boolean;
}

export default function CustomerHeader({
  rightSlot,
  readonly,
}: CustomerHeaderProps) {
  const router = useRouter();

  return (
    !readonly && (
      <header className="flex items-center justify-between px-1 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-10 w-10 bg-zink-100 dark:bg-zinc-600 items-center justify-center rounded-full transition hover:bg-zinc-100 active:scale-95"
        >
          <ArrowLeft size={22} className="text-zinc-900 dark:text-white" />
        </button>

        {/* Right Action */}
        <div className="flex min-w-[48px] justify-end">
          {!readonly && rightSlot}
        </div>
      </header>
    )
  );
}
