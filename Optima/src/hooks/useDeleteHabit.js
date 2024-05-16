import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useDeleteHabit = ({ onDelete }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId) =>
      apiClient.delete(`/habit/${habitId}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });
      onDelete();
    },
  });
};

export default useDeleteHabit;
