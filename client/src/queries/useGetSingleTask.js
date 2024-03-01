import { useQuery } from "@tanstack/react-query";
import { getSingleTask } from "../services/apiTask";

export function useGetSingleTask(param) {
  const {
    isLoading: isGettingTask,
    data: task,
    error,
  } = useQuery({
    queryKey: ["task", param],
    queryFn: () => getSingleTask(param),
  });
  return { isGettingTask, task, error };
}
