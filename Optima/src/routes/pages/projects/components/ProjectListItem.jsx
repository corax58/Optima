import React from "react";
import { PiCirclesFour } from "react-icons/pi";
import { Link } from "react-router-dom";
import { formatDate } from "../../habits/components/HabitListElement";

const ProjectListItem = ({ project }) => {
  return (
    <>
      <div className="flex items-center border-b border-primary-400">
        <Link
          to={`/projects/${project.projectId}`}
          className="flex w-1/2   p-2 font-medium justify-between   items-center h-14 hover:text-lg hover:font-semibold transition-all hover:underline "
        >
          <div className="">
            <div className="flex items-center space-x-2 flex-row">
              <PiCirclesFour />
              <span>{project.projectName}</span>
            </div>
          </div>
        </Link>{" "}
        <div>
          <div>
            <span className=" ">Added: </span>
            <span className=" text-sm font-light">
              {formatDate(project.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectListItem;
