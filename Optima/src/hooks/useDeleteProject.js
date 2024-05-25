import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useDeleteProject = ({ onDelete, projectId }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient.delete(`/project/${projectId}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      onDelete();
    },
  });
};

export default useDeleteProject;
