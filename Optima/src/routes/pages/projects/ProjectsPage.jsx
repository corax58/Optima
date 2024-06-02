import React from "react";
import ProjectsNavbar from "./components/ProjectsNavbar";
import ProjectList from "./components/ProjectList";
import GridLines from "react-gridlines";

const ProjectsPage = () => {
  return (
    <div className="h-screen">
      <ProjectsNavbar />
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
          <ProjectList />
        </GridLines>{" "}
      </div>{" "}
    </div>
  );
};

export default ProjectsPage;
