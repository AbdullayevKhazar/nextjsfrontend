import { useQuery } from "@tanstack/react-query";

import { getLocations } from "@/services/customer";

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
    staleTime: Infinity,
  });
}