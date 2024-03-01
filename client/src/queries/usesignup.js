import { useMutation } from "@tanstack/react-query";
import { register as signupApi } from "../services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signUp, isPending: isLoading } = useMutation({
    mutationFn: (data) => signupApi(data),
    onSuccess: () => {
      navigate("/login");
      toast.success("Account successfully created");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { signUp, isLoading };
}
