import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigator = useNavigate();
  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    axios
      .post(import.meta.env.VITE_SERVER_API_URL + "user/signup", {
        email,
        password,
      })
      .then((res) => {
        setIsLoading(false);
        // localStorage.setItem('user',JSON.stringify(res.data))
        // dispatch({type:'login', payload:res.data})
        navigator("/email-sent");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.error);
      });
  };

  return { signup, error, isLoading };
};
