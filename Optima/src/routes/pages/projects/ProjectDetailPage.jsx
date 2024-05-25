import React, { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import useFetchProjectDetails from "../../../hooks/useFetchProjectDetails";
import useCreateSubtask from "../../../hooks/useCreateSubtask";
import useAssingSubtask from "../../../hooks/useAssingSubtask";
import Subtasks from "./components/Subtasks";
import ProjectDetails from "./components/ProjectDetails";
import { useQueryClient } from "@tanstack/react-query";
import useAddMember from "../../../hooks/useAddMember";
import ErrorElement from "../../../components/ErrorElement";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import DeleteProject from "./components/DeleteProject";

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [userEmail, setUserEmail] = useState("");
  const [subtaskName, setSubtaskName] = useState("");

  const { data, isLoading, error } = useFetchProjectDetails({
    projectId,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  let isDisabled = false;

  const onAdd = () => {
    setUserEmail("");
  };
  const addMember = useAddMember({ onAdd, projectId });
  const handleAddMember = () => {
    addMember.mutate({ userEmail });
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

  if (data) {
    console.log(data);
    if (data.admin.userId != user.userId) {
      isDisabled = true;
    }
  }

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
      <div className="navbar  flex  justify-between items-center pl-4 lg:pl-4 pr-5  w-full flex-row  h-40   shadow  bg-gradient-to-r from-violet-400 to-purple-300">
        <div className="flex space-x-1 items-center">
          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden ">
            <IoMenuOutline size={28} />
          </label>
          <span className="text-2xl font-extrabold text-base-100">Details</span>
        </div>
      </div>
      {/* details */}
      <div className="flex flex-col pr-10">
        {/* detail*/}
        <div className="flex   justify-between">
          <ProjectDetails data={data} isDisabled={isDisabled} />
          {!isDisabled && <DeleteProject projectId={projectId} />}
        </div>

        <div className="">
          {" "}
          <div className="p-2">
            {addMember.isError && (
              <ErrorElement message={addMember.error.response.data.error} />
            )}
          </div>
          {!isDisabled ? (
            <div className="space-x-3 m-5 font-medium  flex items-center flex-col space-y-2 md:flex-row">
              <div>Add Members</div>
              <input
                type="text"
                className="input  input-bordered"
                placeholder="User Email"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
              />
              <button
                disabled={isDisabled}
                className=" btn"
                onClick={handleAddMember}
              >
                Add User
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="m-5">
          <div className="flex items-center space-x-3 flex-col md:flex-row">
            <span className="font-medium text-2xl mb-3">Subtasks</span>
            {!isDisabled && (
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
            )}
          </div>

          {/* subtasks */}
          <Subtasks project={data} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
