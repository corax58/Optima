import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import HabitDashboard from "./components/HabitDashboard";
import useFetchHabitDetails from "../../../hooks/useFetchHabitDetails";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useDeleteHabit from "../../../hooks/useDeleteHabit";

const HabitsDetailsPage = () => {
  const { habitId } = useParams();
  const { data, isLoading, error } = useFetchHabitDetails({
    habitId: habitId,
  });
  const onDelete = () => {
    navigator("/habits");
  };
  const deleteHabit = useDeleteHabit({ onDelete: onDelete });
  const navigator = useNavigate();

  const handleDelete = () => {
    deleteHabit.mutate(habitId);
  };
  const handleCancel = () => {
    document.getElementById(`${habitId}_delete`).close();
  };

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
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex space-x-1 items-center">
          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden ">
            <IoMenuOutline size={28} />
          </label>
          <span className="text-xl font-medium">Details</span>
        </div>
      </div>
      {/* details*/}
      <div className=" flex justify-between  ">
        <div className="flex flex-col space-y-5 p-5">
          <div>
            <span className="habit-info-title">Habit name: </span>
            <span className="habit-info">{data.habitName}</span>
          </div>
          <div className="flex">
            <span className="habit-info-title">Habit description: </span>
            <span className="habit-info">{data.description}</span>
          </div>
          <div className="flex">
            <span className="habit-info-title">Habit unit: </span>
            <span className="habit-info">{data.unit}</span>
          </div>
          <div className="flex">
            <span className="habit-info-title">Reminder: </span>
            <span className="habit-info">{data.habitName}</span>
          </div>
          <div className={data.remindMe ? "flex" : "hidden"}>
            <span className="habit-info-title">Remind Time: </span>
            <span className="habit-info">{data.remindTime}</span>
          </div>
        </div>{" "}
        <div
          className=" rounded-md  bg-error size-max p-2 m-4 hover:bg-red-500"
          onClick={() =>
            document.getElementById(`${habitId}_delete`).showModal()
          }
        >
          <RiDeleteBin2Line size={25} />
        </div>
      </div>
      <dialog id={`${habitId}_delete`} className="modal">
        <div className="modal-box w-max">
          <h3 className="font-bold text-lg">Warning</h3>
          <p className="py-4">Confirm delete</p>
          <div className="flex space-x-4 ">
            <button
              className="btn btn-error "
              onClick={handleDelete}
              disabled={deleteHabit.isPending}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={deleteHabit.isPending}
            >
              Cancel
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <HabitDashboard habitId={habitId} />
    </div>
  );
};

export default HabitsDetailsPage;
