import { useQuery } from "@tanstack/react-query";
import { getStats } from "../services/apiTask";

export function useGetStats() {
  const {
    isLoading: isGettingStats,
    data: stats,
    error,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
  return { isGettingStats, stats, error };
}
