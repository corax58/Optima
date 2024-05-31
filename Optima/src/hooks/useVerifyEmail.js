import { useState } from "react";
import axios from "axios";

export const useVerifyEmail = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const Verify = async (token) => {
    setIsLoading(true);
    setError(null);
    axios
      .get(`${import.meta.env.VITE_SERVER_API_URL}verify-email?token=${token}`)
      .then((res) => {
        setIsLoading(false);
        res.data;
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.error);
      });
  };

  return { Verify, error, isLoading };
};
