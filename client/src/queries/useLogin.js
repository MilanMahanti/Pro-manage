import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiUser";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      navigate("/dashboard", { replace: true });
      queryClient.setQueryData(["user", user]);
    },
    onError: () => {
      toast.error("Provided email or password are incorrect!");
    },
  });
  return { login, isLoading };
}
