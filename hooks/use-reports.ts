import { useQuery } from "@tanstack/react-query";

import {
  getOverview,
  getReports,
  OverviewResponse,
  ReportsResponse,
} from "@/services/report";

export function useOverview(params: { from?: string; to?: string }) {
  return useQuery({
    queryKey: ["reports", "overview", params],
    queryFn: () => getOverview(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useReports(params: { from?: string; to?: string }) {
  return useQuery({
    queryKey: ["reports", params],
    queryFn: () => getReports(params),
    staleTime: 1000 * 60 * 5,
  });
}
