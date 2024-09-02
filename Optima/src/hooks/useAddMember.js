import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useAddMember = ({ onAdd, projectId }) => {
  return useMutation({
    mutationFn: ({ userName }) =>
      apiClient
        .post(`/member/${projectId}`, { userName: userName })
        .then((res) => res.data),
    onSuccess: () => {
      onAdd();
    },
  });
};

export default useAddMember;
