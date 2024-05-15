import React from "react";
import { Link } from "react-router-dom";

const HabitListItem = ({ habit }) => {
  return (
    <div className="flex w-full p-2 justify-between border-b items-center ">
      <Link to={`/habits/${habit.id}`}> Sleeping </Link>
      <div>
        <button
          className=" btn   h-10"
          onClick={() => document.getElementById(habit.id).showModal()}
        >
          {" "}
          Add entry
        </button>
      </div>

      <dialog id={habit.id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{habit.name}</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
};

export default HabitListItem;
