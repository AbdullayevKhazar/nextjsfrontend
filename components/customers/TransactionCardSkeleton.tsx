import { Skeleton } from "@/components/shared/Skeleton";

export default function TransactionCardSkeleton() {
  return (
    <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-7 w-16 rounded-full" />
        <Skeleton className="h-5 w-24" />
      </div>

      {/* Amount */}
      <div className="mb-3">
        <Skeleton className="h-8 w-32" />
      </div>

      {/* Note */}
      <div className="mb-4">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
