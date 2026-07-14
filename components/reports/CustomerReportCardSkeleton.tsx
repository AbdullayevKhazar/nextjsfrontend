import { Skeleton } from "@/components/shared/Skeleton";

export default function CustomerReportCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-1" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
