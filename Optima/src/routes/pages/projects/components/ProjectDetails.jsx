import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useRemoveMember from "../../../../hooks/useRemoveMember";

function CalculateProgress(subtasks) {
  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.status == "Compeleted") {
      completed++;
    }
  });
  return completed;
}
export function calculatePercentage(total, value) {
  if (total === 0) {
    return "No Subtasks";
  }

  if (value === 0) {
    return "0%";
  }

  let percentage = (value / total) * 100;
  return percentage.toFixed(2) + "%";
}

const ProjectDetails = ({ data, isDisabled }) => {
  const removeMember = useRemoveMember({ projectId: data.projectId });

  // const [completion, setCompletion] = useState("On Going");

  let subtasks = data.SubTask;
  console.log(
    calculatePercentage(subtasks.length, CalculateProgress(subtasks))
  );
  // console.log(subtasks);

  return (
    <table className=" table w-max md:w-1/2   ">
      <tbody>
        <tr>
          <th>Project Name</th>
          <td>{data.projectName}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td>{data.description}</td>
        </tr>
        <tr>
          <th>Admin</th>
          <td>{data.admin.email}</td>
        </tr>
        <tr>
          <th>Start Date</th>
          <td>{data.startDate.slice(0, 10)}</td>
        </tr>
        <tr>
          <th>Has dead line </th>
          <td>{data.hasDeadLine ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <th>Complition </th>
          <td>
            {calculatePercentage(subtasks.length, CalculateProgress(subtasks))}
          </td>
        </tr>
        {data.hasDeadLine && (
          <tr>
            <th>DeadLine</th>
            <td>{data.deadLine.slice(0, 10)}</td>
          </tr>
        )}
        <tr>
          <th>Members</th>
          <td>
            {data.ProjectMember.map((member, index) => {
              return (
                <table key={index}>
                  <tbody>
                    <tr>
                      <td>
                        <div className="p-1 flex space-x-1   hover:bg-base-300 bg-base-200 group transition-all  rounded-md">
                          <span> {member.member.email}</span>

                          <button
                            disabled={
                              isDisabled ||
                              member.member.userId === data.admin.userId
                            }
                            className={
                              "bg-error text-error-content p-1 transition-all rounded-full scale-0 group-hover:scale-100 " +
                              (isDisabled ||
                              member.member.userId === data.admin.userId
                                ? "hidden"
                                : "")
                            }
                            onClick={() => {
                              console.log(member);
                              removeMember.mutate(member.projectMemberId);
                            }}
                          >
                            <IoMdClose />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProjectDetails;
