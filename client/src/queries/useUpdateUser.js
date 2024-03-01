import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateCurrUser } from "../services/apiUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (data) => updateCurrUser(data),
    onSuccess: () => {
      toast.success("User account successfully updated:)");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { updateUser, isUpdating };
}
