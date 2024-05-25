import React, { useRef, useState } from "react";
import { TbReportAnalytics } from "react-icons/tb";
import { BiPlusCircle } from "react-icons/bi";
import AddHabit from "./AddHabit";
import { IoMenuOutline } from "react-icons/io5";

const HabitsNavbar = () => {
  return (
    <div className=" sticky top-0  ">
      <div className=" flex  justify-between items-center pl-4 lg:pl-4 pr-5  w-full flex-row  h-40   shadow  bg-gradient-to-r from-violet-400 to-purple-300">
        <div className="flex space-x-1">
          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden ">
            <IoMenuOutline size={28} className="text-white" />
          </label>
          <span className="text-2xl font-extrabold text-base-100">Habits</span>
        </div>
        <div className="flex space-x-3">
          <button
            className="btn "
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <BiPlusCircle size={25} />
            <span className="hidden md:block">Add habit</span>
          </button>
        </div>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <AddHabit />
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default HabitsNavbar;
