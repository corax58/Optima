import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import useFetchProjects from "../../../hooks/useFetchProjects";
import JoinedProjectList from "./components/JoinedProjectsList";
import JoinedProjectsList from "./components/JoinedProjectsList";

const JoinedProjectsPage = () => {
  const { data, error, isLoading } = useFetchProjects();
  if (data) {
    console.log(data);
  }

  return (
    <div>
      <div className="sticky top-0  bg-base-100">
        <div className=" flex  justify-between items-center pl-4 lg:pl-4 pr-5  w-full flex-row  h-40   shadow  bg-gradient-to-r from-violet-400 to-purple-300">
          <div className="flex space-x-1">
            <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden ">
              <IoMenuOutline size={28} />
            </label>
            <span className="text-2xl font-extrabold text-base-100">
              Joined Projects
            </span>
          </div>
        </div>
      </div>
      <JoinedProjectsList />
    </div>
  );
};

export default JoinedProjectsPage;
