import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useFetchReport = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchReport = () =>
    apiClient.get(`/project/report/${user.userId}`).then((res) => res.data);

  return useQuery({
    queryKey: ["report"],
    queryFn: fetchReport,
  });
};
export default useFetchReport;
