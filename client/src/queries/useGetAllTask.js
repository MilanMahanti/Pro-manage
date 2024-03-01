import { useQuery } from "@tanstack/react-query";
import { getAllTask } from "../services/apiTask";

export function useGetAllTask(filter) {
  const {
    isLoading: isGettingTasks,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["tasks", filter],
    queryFn: () => getAllTask(filter),
  });
  return { isGettingTasks, tasks, error };
}
