import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useRemoveMember = ({ projectId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId) => {
      apiClient.delete(`/member/${memberId}`).then((res) => res.data);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [`${projectId}`],
      });
    },
    onMutate: () => {
      queryClient.invalidateQueries({
        queryKey: [`${projectId}`],
      });
    },
  });
};

export default useRemoveMember;
