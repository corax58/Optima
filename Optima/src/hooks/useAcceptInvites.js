import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useAcceptInvites = ({ onRes }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      apiClient.post(`/invites/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invites"] });
      onRes();
    },
  });
};

export default useAcceptInvites;
