import { Skeleton } from "@/components/shared/Skeleton";

export default function SummaryCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-zinc-100">
      <Skeleton className="h-5 w-32 mb-4" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-zinc-50"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-xl" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
