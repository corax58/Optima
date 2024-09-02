import React, { useState } from "react";
import useAssingSubtask from "../../../../hooks/useAssingSubtask";
import SubtaskCard from "./SubtaskCard";

const Subtasks = ({ project, isDisabled }) => {
  const assign = useAssingSubtask({ projectId: project.projectId });
  const [filter, setFilter] = useState("All");

  const filteredSubtasks = project.SubTask.filter((subtask) => {
    if (filter === "All") {
      return true;
    } else if (filter === "New") {
      return subtask.status === "New";
    } else if (filter === "on progress") {
      return subtask.status === "On Progress";
    } else if (filter === "completed") {
      return subtask.status === "Compeleted";
    }
  });

  return (
    <div className="  ">
      {assign.error && (
        <div className="p-1 rounded-md text-base-100 bg-red-300">
          {assign.error.response.data.error}
        </div>
      )}

      <div>
        <div className="container mx-auto p-2 mb-5">
          <div className="label">
            <span className="label-text">Filter</span>
          </div>
          <select
            className="select select-bordered"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>New</option>
            <option>on progress</option>
            <option>completed</option>
          </select>
        </div>

        <div className=" columns-1 md:columns-2  xl:columns-4 gap-5 gap-y-4 px-3  gap-x-3">
          {filteredSubtasks.map((subtask) => {
            return (
              <SubtaskCard
                Subtask={subtask}
                key={subtask.subTaskId}
                project={project}
                isDisabled={isDisabled}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Subtasks;
