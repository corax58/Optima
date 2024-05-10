import React from "react";
import { TbReportAnalytics } from "react-icons/tb";

const HabitsNavbar = () => {
  return (
    <div className=" flex  justify-between items-center pl-9 lg:pl-4 pr-5  w-full flex-row  h-16 shadow-md">
      <div className="flex">Habits</div>
      <div className="flex space-x-3">
        <button
          className=""
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add habit
        </button>
        <div>
          <TbReportAnalytics size={25} className=" md:hidden" />
          <span className="hidden md:block">view report </span>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
};

export default HabitsNavbar;
