import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import { MdOutlineViewTimeline } from "react-icons/md";
import AddProject from "./AddProject";

const ProjectsNavbar = () => {
  return (
    <div className="sticky top-0 h-1/5 bg-base-100">
      <div className=" flex  justify-between items-center pl-4 lg:pl-4 pr-5  w-full flex-row  h-full  shadow  nav-bar-color">
        <div className="flex space-x-1">
          <label
            htmlFor="my-drawer-2"
            className="text-base-100 items-center flex drawer-button lg:hidden "
          >
            <IoMenuOutline size={28} />
          </label>
          <span className="text-2xl font-extrabold text-base-100">
            My Projects
          </span>
        </div>
        <div className="flex space-x-3">
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            Add Project
          </button>
        </div>

        <dialog id="my_modal_4" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <AddProject />
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ProjectsNavbar;
