import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";
import useCreateHabitEntry from "../../../../hooks/useCreatHabitEntry";
import { PiCirclesFour } from "react-icons/pi";

export function formatDate(dateString) {
  // Create a Date object from the input date string
  const date = new Date(dateString);

  // Define an array of month abbreviations
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the year, month, and day from the Date object
  const year = date.getUTCFullYear();
  const month = monthAbbreviations[date.getUTCMonth()];
  const day = date.getUTCDate();

  // Return the formatted date string
  return `${String(day).padStart(2, "0")} ${month} ${year}`;
}

const HabitListElement = ({ habit }) => {
  const [amount, setAmount] = useState("");

  const onCreate = () => {
    document.getElementById(habit.habitId).close();

    setAmount("");
  };
  const addHabitEntry = useCreateHabitEntry({
    onCreate,
    habitId: habit.habitId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabitEntry.mutate({
      quantity: amount,
    });
  };

  return (
    <div className="flex w-full p-2 justify-between border-b border-primary-400  items-center bg-base-100  ">
      <Link
        to={`/habits/${habit.habitId}`}
        className="hover:text-lg hover:font-semibold transition-all hover:underline  w-1/2 "
      >
        <div className="flex items-center space-x-2 flex-row">
          <PiCirclesFour />
          <span>{habit.habitName}</span>
        </div>
      </Link>
      <div className="flex justify-between w-full items-center">
        <div>
          <span className=" text-sm font-semibold md:text-base">Added: </span>
          <span className=" text-xs md:text-sm font-light">
            {formatDate(habit.createdAt)}
          </span>
        </div>
        <button
          className=" btn   h-10"
          onClick={() => document.getElementById(habit.habitId).showModal()}
        >
          <FaPenToSquare size={20} />
          <span className="hidden md:block">Add entry</span>
        </button>
      </div>

      <dialog id={habit.habitId} className="modal">
        <div className="modal-box w-max">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {addHabitEntry.error && (
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
              <span>{addHabitEntry.error.message}</span>
            </div>
          )}
          <form
            action=""
            className=" font-medium space-y-3 w-min"
            onSubmit={handleSubmit}
          >
            <div
              className={
                habit.quantifiable ? "flex flex-col space-y-3" : "hidden"
              }
            >
              <label htmlFor="amount">Amount</label>
              <div className="space-x-2 items-center flex">
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  className="input input-bordered input-secondary"
                  id="amount"
                />
                <span>{habit.unit}</span>
              </div>
            </div>
            <button type="submit" className="btn btn-block">
              {addHabitEntry.isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Add"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default HabitListElement;
