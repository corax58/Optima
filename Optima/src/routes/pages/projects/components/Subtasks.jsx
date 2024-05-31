import React, { useState } from "react";
import useAssingSubtask from "../../../../hooks/useAssingSubtask";
import { IoMdClose } from "react-icons/io";
import useRemoveAssing from "../../../../hooks/useRemoveAssing";
import useRemoveSubtask from "../../../../hooks/useRemoveSubtask";
import SubtaskCard from "./SubtaskCard";

const Subtasks = ({ project }) => {
  const assign = useAssingSubtask({ projectId: project.projectId });
  const unAssign = useRemoveAssing({
    projectId: project.projectId,
  });
  const removeSubtask = useRemoveSubtask({
    projectId: project.projectId,
  });
  return (
    <div className="p-4  ">
      {assign.error && (
        <div className="p-1 rounded-md text-base-100 bg-red-300">
          {assign.error.response.data.error}
        </div>
      )}
      <div className="container mx-auto p-4">
        <div className=" columns-1 md:columns-2  xl:columns-4 gap-5 gap-y-4   gap-x-3">
          {project.SubTask.map((subtask) => {
            return (
              <SubtaskCard
                Subtask={subtask}
                key={subtask.subTaskId}
                project={project}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Subtasks;
