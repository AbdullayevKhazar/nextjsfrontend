"use client";

import { useQuery } from "@tanstack/react-query";

import { me } from "@/services/auth";

export function useAuth() {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    user: query.data,
    isAuthenticated: !!query.data,
    isLoading: query.isPending,
  };
}
