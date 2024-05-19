import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useCreateSubtask = ({ onCreate, projectId }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subtask) =>
      apiClient.post(`/subtask/${projectId}`, subtask).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${projectId}`] });
      onCreate();
    },
  });
};

export default useCreateSubtask;
