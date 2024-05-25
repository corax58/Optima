import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useFetchInvites = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchHabit = () =>
    apiClient.get(`/invites/${user.userId}`).then((res) => res.data);

  return useQuery({
    queryKey: ["invites"],
    queryFn: fetchHabit,
  });
};
export default useFetchInvites;
