import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useUpdateSubtask = ({ projectId, subtaskId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status) =>
      apiClient
        .patch(`/subtask/${projectId}/${subtaskId}`, status)
        .then((res) => res.data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`${projectId}`] });
    },
  });
};

export default useUpdateSubtask;
