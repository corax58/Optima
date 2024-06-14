import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useAddMember = ({ onAdd, projectId }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email }) =>
      apiClient
        .post(`/member/${projectId}`, { userEmail: email })
        .then((res) => res.data),
    onSuccess: () => {
      onAdd();
    },
  });
};

export default useAddMember;
