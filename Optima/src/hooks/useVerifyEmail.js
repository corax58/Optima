import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (token) => {
      axios
        .get(
          `${
            import.meta.env.VITE_SERVER_API_URL
          }user/verify-email?token=${token}`
        )
        .then((res) => {
          setIsLoading(false);
          res.data;
        });
    },
  });
};
