import React from "react";
import { FiDelete } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import useAssingSubtask from "../../../../hooks/useAssingSubtask";
import useRemoveAssing from "../../../../hooks/useRemoveAssing";
import useRemoveSubtask from "../../../../hooks/useRemoveSubtask";
import { BiTrash } from "react-icons/bi";

const SubtaskCard = ({ Subtask, project }) => {
  const assign = useAssingSubtask({ projectId: project.projectId });
  const unAssign = useRemoveAssing({
    projectId: project.projectId,
  });
  const removeSubtask = useRemoveSubtask({
    projectId: project.projectId,
  });
  if (Subtask) {
    return (
      <div className=" border shadow p-1 rounded-md w-max flex flex-col space-y-3   h">
        <div className="flex justify-between space-x-5 group ">
          <span className=" bg-neutral-content text-neutral rounded-full  px-1 text-sm group-hover:hidden">
            2020-10-12
          </span>
          <div
            className="bg-error rounded-full p-1 hidden group-hover:block hover:scale-125"
            onClick={() => {
              removeSubtask.mutate({ subtaskId: Subtask.subTaskId });
            }}
          >
            <BiTrash />
          </div>
          <span className=" bg-success text-success-content rounded-full px-1 mt-2 text-sm">
            {Subtask.status}
          </span>
        </div>
        <div className=" text-lg px-2">{Subtask.subTaskName}</div>
        <div className="flex-col flex items-center">
          <div className="flex flex-col w-full  items-center  ">
            {Subtask.AssignedSubtask.map((member, index) => (
              <div className="w-max bg-base-100 border-2 rounded-full px-2 group space-x-2 hover:bg-base-200 flex ">
                <span className="">{member.member.member.email}</span>
                <button
                  className="bg-red-300 p-1 rounded-full scale-0 group-hover:scale-100 transition-all"
                  onClick={() =>
                    unAssign.mutate({
                      subtaskId: Subtask.subTaskId,
                      projectMemberId: member.member.projectMemberId,
                    })
                  }
                >
                  <IoMdClose />
                </button>
              </div>
            ))}
          </div>
          <div className="dropdown">
            <summary
              tabIndex={0}
              role="button"
              className="w-full my-3 bg-base-300 border-2 rounded-full px-2 group space-x-2 hover:bg-base-200 flex"
            >
              Add user
            </summary>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {project.ProjectMember.map((member, index) => (
                <li
                  key={index}
                  className="cursor-pointer"
                  onClick={() => {
                    assign.mutate({
                      projectMemberId: member.projectMemberId,
                      subtaskId: Subtask.subTaskId,
                    });
                  }}
                >
                  {member.member.email}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default SubtaskCard;
