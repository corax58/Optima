import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useDeleteProject from "../../../../hooks/useDeleteProject";

const DeleteProject = ({ projectId }) => {
  const navigator = useNavigate();
  const onDelete = () => {
    document.getElementById(`delete_${projectId}`).close();
    navigator("/myprojects");
  };
  const deleteProject = useDeleteProject({ onDelete, projectId });

  const handleDelete = () => {
    deleteProject.mutate(projectId);
  };
  return (
    <>
      <button
        onClick={() =>
          document.getElementById(`delete_${projectId}`).showModal()
        }
        className=" btn z-30 btn-error w-max  shadow hover:shadow-md hover:scale-105 transition-all  "
      >
        {" "}
        <RiDeleteBin2Line size={25} />
      </button>
      <dialog id={`delete_${projectId}`} className="modal">
        <div className="modal-box w-max p-8">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="w-max flex flex-col space-y-4 font-medium">
            <p>Are you sure you want to delete this project?</p>
            <div className=" flex justify-center space-x-4">
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="btn "
                onClick={() =>
                  document.getElementById(`delete_${projectId}`).close()
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>{" "}
    </>
  );
};

export default DeleteProject;
