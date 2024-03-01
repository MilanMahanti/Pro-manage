import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTask as updateTaskApi } from "../services/apiTask";

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: (data) => updateTaskApi(data),
    onSuccess: () => {
      toast.success("Task successfully updated:)", {
        position: "top-right",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { updateTask, isUpdating };
}
