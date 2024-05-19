import React from "react";
import { Link } from "react-router-dom";

const ProjectListItem = ({ project }) => {
  return (
    <Link
      to={`/projects/${project.projectId}`}
      className="flex w-full p-2 pl-5 font-medium justify-between border-b border-primary-400  items-center h-14 hover:text-lg hover:font-semibold transition-all hover:underline "
    >
      <div className="">{project.projectName}</div>
    </Link>
  );
};

export default ProjectListItem;
