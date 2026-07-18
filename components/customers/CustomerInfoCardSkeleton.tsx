import { Skeleton } from "@/components/shared/Skeleton";

export default function CustomerInfoCardSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto p-5">
      <div className="flex items-center gap-3.5 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      <div className="flex items-center gap-2.5 px-3.5 py-3 bg-zinc-50 rounded-xl border border-zinc-100/60 mb-5">
        <Skeleton className="h-7 w-7 rounded-lg" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="space-y-2.5">
        <Skeleton className="h-11 w-full rounded-xl" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}
