import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

export const useCreateProject = ({ onCreate }) => {
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user"));

  return useMutation({
    mutationFn: (project) =>
      apiClient
        .post(`/project/${user.userId}`, project)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      onCreate();
    },
  });
};
