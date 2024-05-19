import React, { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import useFetchProjectDetails from "../../../hooks/useFetchProjectDetails";
import useCreateSubtask from "../../../hooks/useCreateSubtask";
import useAssingSubtask from "../../../hooks/useAssingSubtask";

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const [subtaskName, setSubtaskName] = useState("");

  const { data, isLoading, error } = useFetchProjectDetails({
    projectId,
  });
  const assign = useAssingSubtask({ projectId });
  const onDelete = () => {
    navigator("/projects");
  };
  const onCreate = () => {
    setSubtaskName("");
  };

  const createSubtask = useCreateSubtask({ onCreate, projectId });
  const navigator = useNavigate();

  const handleAddSubtask = (e) => {
    e.preventDefault();

    createSubtask.mutate({ subtaskName });
  };
  const handleAssign = ({ e, id }) => {
    e.preventDefault();
    console.log(id);
  };
  console.log(data);
  if (isLoading)
    return <span className="loading loading-ring loading-lg mx-auto"></span>;
  if (error)
    <div role="alert" className="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{error.message}</span>
    </div>;
  return (
    <div>
      {" "}
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex space-x-1 items-center">
          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden ">
            <IoMenuOutline size={28} />
          </label>
          <span className="text-xl font-medium">Details</span>
        </div>
      </div>
      {/* details */}
      <div className="flex flex-col pr-10">
        <table className=" table w-full md:w-1/2  border-2  m-2">
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
            {data.hasDeadLine && (
              <tr>
                <th>DeadLine</th>
                <td>{data.deadLine.slice(0, 10)}</td>
              </tr>
            )}
            <tr>
              <th>Members</th>
              <td>
                {data.ProjectMember.map((member) => {
                  return (
                    <tr key={member.userId}>
                      <td>{member.member.email}</td>
                    </tr>
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="">
          <div className="space-x-3 m-5 font-medium  flex items-center">
            <div>Add Members</div>
            <input
              type="text"
              className="input  input-bordered"
              placeholder="User Email"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
            />
            <button className=" btn">Add User</button>
          </div>
        </div>
        <div className="m-5">
          <div className="flex items-center space-x-3">
            <span className="font-medium text-2xl">Subtasks</span>
            <form
              action=""
              className="flex items-center space-x-3"
              onSubmit={handleAddSubtask}
            >
              <input
                type="text"
                name=""
                id=""
                placeholder="Subtask title"
                className="input input-bordered"
                onChange={(e) => setSubtaskName(e.target.value)}
                value={subtaskName}
              />
              <button className="btn">Add Subtask</button>
            </form>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Subtask Name</th>
                  <th>Assigned users</th>
                </tr>
              </thead>
              <tbody>
                {data.SubTask.map((subtask) => {
                  return (
                    <tr>
                      <td>{subtask.subTaskName} </td>
                      <td>
                        <tr>
                          <td>
                            {subtask.AssignedSubtask.map((user) => (
                              <tr>
                                <td>{user.email}</td>
                              </tr>
                            ))}
                          </td>
                          <td>
                            <div>
                              <details className="dropdown">
                                <summary className="m-1 btn">Add user</summary>
                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                  {data.ProjectMember.map((member) => (
                                    <li
                                      key={member.userId}
                                      className="cursor-pointer"
                                      onClick={() => {
                                        assign.mutate({
                                          projectMemberId:
                                            member.projectMemberId,
                                          subtaskId: subtask.subTaskId,
                                        });
                                      }}
                                    >
                                      {member.member.email}
                                    </li>
                                  ))}
                                </ul>
                              </details>
                            </div>
                          </td>
                        </tr>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
