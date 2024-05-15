import React, { useRef, useState } from "react";
import { TbReportAnalytics } from "react-icons/tb";

const HabitsNavbar = () => {
  return (
    <div className=" flex  justify-between items-center pl-9 lg:pl-4 pr-5  w-full flex-row  h-16 shadow">
      <div className="flex">Habits</div>
      <div className="flex space-x-3">
        <button
          className="btn "
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add habit
        </button>
        <div className=" items-center flex">
          <TbReportAnalytics size={25} className=" md:hidden" />
          <span className="hidden md:block hover:underline">View report </span>
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
          <AddHabit />
        </div>
      </dialog>
    </div>
  );
};

const AddHabit = () => {
  const [quantifiable, setQuatifieble] = useState(true);
  const [remindMe, setRemindMe] = useState(true);
  const checkref = useRef();

  const toggleUnit = () => {
    setQuatifieble(!quantifiable);
    console.log(checkref.current.checked);
  };
  const toggleRemindMe = () => {
    setRemindMe(!remindMe);
  };

  return (
    <form className="flex flex-col space-y-3 font-medium">
      <label htmlFor="name">Habit name</label>
      <input
        type="text"
        name=""
        id="name"
        className="input input-bordered w-full max-w-xs"
      />
      <label htmlFor="description">Habit description</label>
      <textarea
        name=""
        id="description"
        className="textarea textarea-bordered"
      ></textarea>
      <div className="space-x-2 flex items-center">
        <input
          ref={checkref}
          type="checkbox"
          name=""
          className="checkbox"
          id="quantifiable"
          onChange={toggleUnit}
        />
        <label htmlFor="quantifiable">Quantifiable</label>
      </div>
      <div className="flex space-x-2 items-center">
        <label htmlFor="unit">Unit</label>
        <input
          type="text"
          id="unit"
          className="input input-bordered w-full max-w-xs"
          disabled={quantifiable}
        />
      </div>
      <div className="space-x-2 flex items-center">
        <input
          type="checkbox"
          name=""
          className="checkbox"
          id="remindMe"
          onChange={toggleRemindMe}
        />
        <label htmlFor="remindMe">RemindMe</label>
      </div>
      <div className="flex space-x-2 items-center">
        <label htmlFor="unit">Remind time</label>
        <input
          disabled={remindMe}
          type="time"
          id="unit"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <button type="submit" className="btn font-bold">
        Submit
      </button>
    </form>
  );
};

export default HabitsNavbar;
