"use client";

import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/shared/Skeleton";

function getGreeting(t: any): string {
  const hour = new Date().getHours();
  if (hour < 12) return t("goodMorning");
  if (hour < 18) return t("goodAfternoon");
  return t("goodEvening");
}

export default function HomeHeader() {
  const { user, isLoading } = useAuth();
  const { t } = useTranslation("greetings");

  const greeting = getGreeting(t);
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
            {firstName || t("welcomeBack", { ns: "greetings" })}
          </h1>
        </>
      )}
    </header>
  );
}
