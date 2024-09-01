import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useFetchUsers = () => {
  const fetchUsers = (userName) =>
    apiClient.post(`/user/search`, { userName }).then((res) => res.data);

  return useMutation({
    mutationFn: fetchUsers,

    mutationKey: ["memberInfo"],
  });
};

export default useFetchUsers;
