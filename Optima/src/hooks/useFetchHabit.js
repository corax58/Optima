import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useFetchHabit = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchHabit = () =>
    apiClient.get(`/habit/${user.userId}`).then((res) => res.data);

  return useQuery({
    queryKey: ["habits"],
    queryFn: fetchHabit,
  });
};
export default useFetchHabit;
