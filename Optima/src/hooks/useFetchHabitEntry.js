import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useFetchHabitEntry = ({ habitId }) => {
  const fetchHabitEntry = () =>
    apiClient.get(`/habitEntry/${habitId}`).then((res) => res.data);

  return useQuery({
    queryFn: fetchHabitEntry,
    queryKey: [`${habitId}-entries`],
  });
};

export default useFetchHabitEntry;
