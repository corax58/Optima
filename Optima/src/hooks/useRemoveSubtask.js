import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useRemoveSubtask = ({ projectId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (subtask) => {
      apiClient
        .delete(`/subtask/${projectId}/${subtask.subtaskId}`)
        .then((res) => res.data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`${projectId}`] });
    },
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: [`${projectId}`] });
    },
  });
};

export default useRemoveSubtask;
