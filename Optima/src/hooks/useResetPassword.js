import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
  const navigator = useNavigate();
  return useMutation({
    mutationFn: ({ token, newPassword }) =>
      apiClient
        .post(`/user/reset-password?token=${token}`, {
          newPassword,
        })
        .then((res) => res.data),
    onSuccess: () => {
      navigator("/login");
    },
  });
};

export default useResetPassword;
