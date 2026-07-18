import { Skeleton } from "@/components/shared/Skeleton";

export default function TotalDebtCardSkeleton() {
  return (
    <section className="rounded-[28px] bg-white p-6 shadow-sm border border-zinc-100">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="mt-2 h-9 w-40" />
    </section>
  );
}
