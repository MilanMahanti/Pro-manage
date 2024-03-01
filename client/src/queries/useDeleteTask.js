import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTask as deleteTaskApi } from "../services/apiTask";

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: (params) => deleteTaskApi(params),
    onSuccess: () => {
      toast.success("Task successfully deleted", { position: "top-right" });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { deleteTask, isDeleting };
}
