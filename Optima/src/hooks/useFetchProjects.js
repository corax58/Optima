import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useFetchProjects = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProjects = () =>
    apiClient.get(`/project/${user.userId}`).then((res) => res.data);

  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
};
export default useFetchProjects;
