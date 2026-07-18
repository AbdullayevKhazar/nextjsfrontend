import { Skeleton } from "@/components/shared/Skeleton";

export default function CustomerCardSkeleton() {
  return (
    <div className="flex w-full items-center justify-between rounded-[24px] border border-zinc-100 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-6 w-20" />
    </div>
  );
}
