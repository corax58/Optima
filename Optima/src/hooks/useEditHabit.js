import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

export const useEditHabit = ({ onEdit, habitId }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habit) =>
      apiClient.patch(`/habit/${habitId}`, habit).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${habitId}`],
      });
      onEdit();
    },
  });
};
