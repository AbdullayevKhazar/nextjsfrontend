"use client";

import { useQuery } from "@tanstack/react-query";

import { me } from "@/services/auth";

export function useAuth() {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: me,
  });

  return {
    ...query,
    user: query.data,
    isAuthenticated: !!query.data,
  };
}
