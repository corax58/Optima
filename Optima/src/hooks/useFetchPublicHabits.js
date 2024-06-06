import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useFetchPublicHabits = () => {
  const fetchHabit = (email) =>
    apiClient.post(`/habit/public`, { email }).then((res) => res.data);

  return useMutation({
    mutationFn: fetchHabit,

    mutationKey: ["memberInfo"],
  });
};

export default useFetchPublicHabits;
