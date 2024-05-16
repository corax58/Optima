import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

export const useCreateHabit = ({ onCreate }) => {
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user"));

  return useMutation({
    mutationFn: (habit) =>
      apiClient.post(`/habit/${user.userId}`, habit).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });
      onCreate();
    },
  });
};
