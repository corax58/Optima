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
import EditProject from "./components/EditProject";
import { MdOutlineEdit } from "react-icons/md";
import { PiPlus } from "react-icons/pi";
import SuccessElement from "../../../components/SuccessElement";

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
  const handleAdd = (e) => {
    e.preventDefault();
    addMember.mutate({ userEmail });
  };

  const onCreate = () => {
    setSubtaskName("");
  };

  const createSubtask = useCreateSubtask({ onCreate, projectId });

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
      <div className="navbar  flex  justify-between items-center pl-4 lg:pl-4 pr-5  w-full flex-row  h-40   shadow  nav-bar-color">
        <div className="flex space-x-1 items-center">
          <label
            htmlFor="my-drawer-2"
            className="text-base-100 items-center flex drawer-button lg:hidden "
          >
            <IoMenuOutline size={28} />
          </label>
          <span className="text-2xl font-extrabold text-base-100">Details</span>
        </div>
      </div>
      {/* details */}
      <div className="flex flex-col ">
        {/* detail*/}
        <div className="flex  mr-10 justify-between">
          <ProjectDetails data={data} isDisabled={isDisabled} />
          {!isDisabled && (
            <div className="flex -ml-20 mt-3 flex-col space-y-3">
              <DeleteProject projectId={projectId} />
              <button
                onClick={() =>
                  document.getElementById(`edit_${projectId}`).showModal()
                }
                className="btn  z-30 btn-neutral  shadow hover:shadow-md hover:scale-105 transition-all "
              >
                <MdOutlineEdit size={20} />
              </button>
            </div>
          )}
        </div>
        <dialog id={`edit_${projectId}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <EditProject project={data} />
          </div>
        </dialog>
        <div className="">
          {" "}
          <div className=" px-4">
            {addMember.isError && (
              <ErrorElement message={addMember.error.response.data.error} />
            )}
            {addMember.isSuccess && (
              <SuccessElement message="Invitation Sent Successfully" />
            )}
          </div>
          {!isDisabled ? (
            <form
              className="space-x-3 mx-3 mb-3 font-medium  flex items-center  space-y-2 md:flex-row"
              onSubmit={handleAdd}
            >
              <input
                required
                type="text"
                className="input input-sm input-bordered w-full md:w-max"
                placeholder="User Email"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
              />
              <button
                type="submit"
                disabled={isDisabled}
                className=" btn btn-sm "
              >
                Send Invitation
              </button>
            </form>
          ) : (
            <></>
          )}
        </div>
        <div className="   border-neutral rounded-md">
          <div className="flex items-center space-x-3  justify-between bg-base-300 p-2 border-y-2 border-neutral-content shadow-sm ">
            <span className="font-medium text-2xl mb-3">Subtasks</span>
            <div>
              {!isDisabled && (
                <form
                  action=""
                  className="flex items-center space-x-3"
                  onSubmit={handleAddSubtask}
                >
                  <input
                    required
                    type="text"
                    name=""
                    id=""
                    placeholder="Subtask title"
                    className="input input-bordered input-sm w-full"
                    onChange={(e) => setSubtaskName(e.target.value)}
                    value={subtaskName}
                  />
                  <button className="btn btn-sm">
                    <PiPlus />
                    <span className="hidden md:block"> Add Subtask</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* subtasks */}
          <Subtasks project={data} isDisabled={isDisabled} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
