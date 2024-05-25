import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useRemoveAssing = ({ projectId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assign) => {
      apiClient
        .delete(`/assign/${assign.subtaskId}/${assign.projectMemberId}`, assign)
        .then((res) => res.data);
    },
    onSettled: () => {
      console.log("rrm");
      queryClient.invalidateQueries({
        queryKey: [`${projectId}`],
      });
    },
  });
};

export default useRemoveAssing;
