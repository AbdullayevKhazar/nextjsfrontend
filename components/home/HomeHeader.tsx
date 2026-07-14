"use client";

import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/shared/Skeleton";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomeHeader() {
  const { user, isLoading } = useAuth();

  const greeting = getGreeting();
  const firstName = user?.fullName?.split(" ")[0] ?? "";

  return (
    <header className="px-5 pt-4 pb-2">
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-48" />
        </div>
      ) : (
        <>
          <p className="text-sm font-medium text-zinc-500">
            {greeting}
            {firstName ? "," : ""}
          </p>
          <h1 className="text-[22px] font-bold text-zinc-900">
            {firstName || "Welcome back"}
          </h1>
        </>
      )}
    </header>
  );
}
