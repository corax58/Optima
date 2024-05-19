import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useAssingSubtask = ({ projectId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assign) =>
      apiClient.post(`/assign/`, assign).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${projectId}`],
      });
    },
  });
};

export default useAssingSubtask;
