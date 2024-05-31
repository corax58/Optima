import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

export const useEditProject = ({ onEdit, projectId }) => {
  const queryClient = useQueryClient();

  console.log(projectId);
  return useMutation({
    mutationFn: (project) =>
      apiClient.patch(`/project/${projectId}`, project).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${projectId}`],
      });
      onEdit();
    },
  });
};
