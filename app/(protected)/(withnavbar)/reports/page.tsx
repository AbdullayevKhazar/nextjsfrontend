"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PeriodSelector from "@/components/reports/PeriodSelector";
import OverviewGrid from "@/components/reports/OverviewGrid";
import SummaryCard from "@/components/reports/SummaryCard";
import DebtPaymentChart from "@/components/reports/DebtPaymentChart";
import CustomerReportCard from "@/components/reports/CustomerReportCard";
import ReportsEmptyState from "@/components/reports/ReportsEmptyState";
import OverviewCardSkeleton from "@/components/reports/OverviewCardSkeleton";
import SummaryCardSkeleton from "@/components/reports/SummaryCardSkeleton";
import CustomerReportCardSkeleton from "@/components/reports/CustomerReportCardSkeleton";

import { useOverview, useReports } from "@/hooks/use-reports";

type Period = "today" | "thisWeek" | "thisMonth" | "thisYear" | "custom";

export default function ReportsPage() {
  const { t } = useTranslation("reports");
  const [period, setPeriod] = useState<Period>("today");
  const [dateRange, setDateRange] = useState<{
    from?: string;
    to?: string;
  }>({});

  const handlePeriodChange = (
    selectedPeriod: Period,
    startDate?: string,
    endDate?: string,
  ) => {
    setPeriod(selectedPeriod);
    if (startDate && endDate) {
      setDateRange({ from: startDate, to: endDate });
    } else {
      setDateRange({});
    }
  };

  const queryParams = useMemo(() => {
    if (dateRange.from && dateRange.to) {
      return { from: dateRange.from, to: dateRange.to };
    }
    return {};
  }, [dateRange]);

  const {
    data: overview,
    isLoading: isOverviewLoading,
    isError: isOverviewError,
  } = useOverview(queryParams);

  const {
    data: report,
    isLoading: isReportLoading,
    isError: isReportError,
  } = useReports(queryParams);

  const isLoading = isOverviewLoading || isReportLoading;
  const isError = isOverviewError || isReportError;

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-28">
      <section className="mx-auto flex w-full max-w-md flex-col gap-5 px-5 pb-6 pt-6">
        <h1 className="text-2xl font-bold text-zinc-900">
          {t("reportsTitle")}
        </h1>

        <PeriodSelector value={period} onChange={handlePeriodChange} />

        {isLoading && (
          <>
            <SummaryCardSkeleton />
            <CustomerReportCardSkeleton />
          </>
        )}

        {isError && (
          <div className="rounded-3xl bg-white p-8 text-center">
            <p className="text-sm text-zinc-500">{t("failedLoadReports")}</p>
          </div>
        )}

        {!isLoading && !isError && report && (
          <>
            <SummaryCard data={report.summary} />
            <DebtPaymentChart data={report.summary} />

            {report.customers.length === 0 ? (
              <ReportsEmptyState />
            ) : (
              <div className="space-y-3">
                {report.customers.map((customer) => (
                  <CustomerReportCard
                    key={customer.customerId}
                    customer={customer}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
