import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useCreateHabitEntry = ({ onCreate, habitId }) => {
  return useMutation({
    mutationFn: (habitEntry) =>
      apiClient
        .post(`/habitEntry/${habitId}`, {
          quantity: habitEntry.quantity,
        })
        .then((res) => res.data),
    onSuccess: () => onCreate(),
  });
};

export default useCreateHabitEntry;
