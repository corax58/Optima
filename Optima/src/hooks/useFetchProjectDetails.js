import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useFetchProjectDetails = ({ projectId }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchProject = () =>
    apiClient
      .get(`/project/${user.userId}/${projectId}`)
      .then((res) => res.data);

  return useQuery({
    queryFn: fetchProject,
    queryKey: [`${projectId}`],
  });
};

export default useFetchProjectDetails;
