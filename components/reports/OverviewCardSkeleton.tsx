import { Skeleton } from "@/components/shared/Skeleton";

export default function OverviewCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100">
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-5 w-12" />
      </div>
      <Skeleton className="h-4 w-24 mb-1" />
      <Skeleton className="h-7 w-32" />
    </div>
  );
}
