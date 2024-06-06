import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useAddMember = ({ onAdd, projectId }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user) =>
      apiClient.post(`/member/${projectId}`, user).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${projectId}`] });
      console.log("use addmember susces");
      onAdd();
    },
  });
};

export default useAddMember;
