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
      <div className=" space-y-5  justify-evenly flex-wrap flex break-before-column      p-5 ">
        {project.SubTask.map((subtask) => {
          return <SubtaskCard Subtask={subtask} project={project} />;
        })}
      </div>
    </div>
  );
};

export default Subtasks;
