import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTask as createTaskApi } from "../services/apiTask";

export function useCreateTask() {
  const queryClient = useQueryClient();
  const { mutate: createTask, isPending: isCreating } = useMutation({
    mutationFn: (data) => createTaskApi(data),
    onSuccess: () => {
      toast.success("Task created Successfully:)", {
        position: "top-right",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { createTask, isCreating };
}
