import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import useFetchProjects from "../../../hooks/useFetchProjects";
import JoinedProjectsList from "./components/JoinedProjectsList";
import GridLines from "react-gridlines";

const JoinedProjectsPage = () => {
  const { data, error, isLoading } = useFetchProjects();
  if (data) {
    console.log(data);
  }

  return (
    <div className="h-screen">
      <div className="sticky top-0 h-1/5 bg-base-100">
        <div className=" flex  justify-between items-center pl-4 lg:pl-4 pr-5  w-full flex-row  h-full   shadow  nav-bar-color">
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
      <div className=" h-4/5 overflow-y-scroll ">
        <GridLines
          className="grid-area h-full "
          cellWidth={60}
          strokeWidth={1}
          cellWidth2={20}
          lineColor={"gray"}
          lineColor2={""}
        >
          {" "}
          <JoinedProjectsList />{" "}
        </GridLines>{" "}
      </div>{" "}
    </div>
  );
};

export default JoinedProjectsPage;
