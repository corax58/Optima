import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useFetchHabitDetails = ({ habitId }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchHabit = () =>
    apiClient.get(`/habit/${user.userId}/${habitId}`).then((res) => res.data);

  return useQuery({
    queryFn: fetchHabit,
    queryKey: [`${habitId}`],
  });
};

export default useFetchHabitDetails;
