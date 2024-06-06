import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const useForgotPassword = () => {
  const navigator = useNavigate();
  return useMutation({
    mutationFn: (email) =>
      apiClient
        .post(`/user/forgot-password`, { email: email.email })
        .then((res) => res.data),
    onSuccess: () => {
      navigator("/email-sent");
    },
  });
};

export default useForgotPassword;
