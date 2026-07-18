import { Skeleton } from "@/components/shared/Skeleton";

export default function CustomerBalanceCardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-5 w-40" />
      </div>
    </div>
  );
}
