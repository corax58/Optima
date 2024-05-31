import React, { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import useAssingSubtask from "../../../../hooks/useAssingSubtask";
import useRemoveAssing from "../../../../hooks/useRemoveAssing";
import useRemoveSubtask from "../../../../hooks/useRemoveSubtask";
import { BiTrash } from "react-icons/bi";
import useUpdateSubtask from "../../../../hooks/useUpdateSubtask";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const SubtaskCard = ({ Subtask, project }) => {
  const { state } = useAuthContext();
  console.log(state.user.userId);
  const [canChangeStatu, setCanChangeStatus] = useState(false);

  useEffect(() => {
    if (Subtask) {
      console.log(Subtask.AssignedSubtask[0]);
      for (let member of Subtask.AssignedSubtask) {
        if (member.member.member.userId == state.user.userId) {
          setCanChangeStatus(true);
        }
      }
    }
  }, [project]);

  const assign = useAssingSubtask({ projectId: project.projectId });
  const unAssign = useRemoveAssing({
    projectId: project.projectId,
  });
  const removeSubtask = useRemoveSubtask({
    projectId: project.projectId,
  });

  const updateStatus = useUpdateSubtask({
    projectId: project.projectId,
    subtaskId: Subtask.subTaskId,
  });

  if (Subtask) {
    return (
      <div className="break-inside-avoid-column mb-5	 border border-base-300 shadow  rounded-lg  w-60 flex flex-col space-y-3  bg-base-200 h">
        <div className="flex justify-between space-x-5 bg-base-300  border-b-2 border-neutral-content p-2 px-1 rounded-t-md ">
          <button
            className=" hover:bg-error group  rounded-full border-2 border-error px-2 bg-base-100"
            onClick={() => {
              removeSubtask.mutate({ subtaskId: Subtask.subTaskId });
            }}
          >
            <span className="text-error group-hover:text-error-content font-medium">
              Delete
            </span>
          </button>
          <select
            disabled={!canChangeStatu}
            className="select select-bordered border-2 w-max select-sm  rounded-full"
            onChange={(e) => updateStatus.mutate({ status: e.target.value })}
            value={Subtask.status}
          >
            <option> New</option>
            <option>On Progress</option>
            <option>Compeleted</option>
          </select>
        </div>
        <div className=" text-lg font-semibold px-2">{Subtask.subTaskName}</div>
        <div className="flex-col flex items-center">
          <div className="flex flex-col w-full  items-center  ">
            {Subtask.AssignedSubtask.map((member, index) => (
              <div className="w-max bg-base-100 border-2 rounded-full px-2 group space-x-2 hover:bg-base-300 flex cursor-pointer ">
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
