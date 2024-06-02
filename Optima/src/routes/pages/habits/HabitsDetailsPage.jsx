import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import HabitDashboard from "./components/HabitDashboard";
import useFetchHabitDetails from "../../../hooks/useFetchHabitDetails";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useDeleteHabit from "../../../hooks/useDeleteHabit";
import { formatDate } from "./components/HabitListElement";
import EditHabit from "./components/EditHabit";
import { MdOutlineEdit } from "react-icons/md";

function convertTo12HourFormat(time24) {
  // Split the time string into hours and minutes
  var timeArray = time24.split(":");
  var hours = parseInt(timeArray[0]);
  var minutes = parseInt(timeArray[1]);

  // Determine AM or PM
  var period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours) as 12 AM

  // Add leading zeros to minutes if needed
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the 12-hour time string
  var time12 = hours + ":" + minutes + " " + period;

  return time12;
}

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
  if (error) {
    return (
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
      </div>
    );
  }

  return (
    <div>
      <div className="navbar bg-base-100 h-40   shadow  nav-bar-color">
        <div className="flex space-x-1 items-center">
          <label
            htmlFor="my-drawer-2"
            className=" drawer-button lg:hidden  text-base-100"
          >
            <IoMenuOutline size={28} />
          </label>
          <span className="text-2xl font-extrabold text-base-100">Details</span>
        </div>
      </div>
      {/* details*/}
      <div className=" flex justify-between  ">
        <table className="table w-max md:w-1/2 ">
          <tbody>
            {" "}
            <tr>
              <th className="">Habit name: </th>
              <td className="">{data.habitName}</td>
            </tr>
            <tr className="">
              <th className="">Habit description: </th>
              <td className="">{data.description}</td>
            </tr>
            <tr className="">
              <th className="">Habit unit: </th>
              <td className="">{data.unit}</td>
            </tr>
            <tr className="">
              <th className="">Date added: </th>
              <td className="">{formatDate(data.createdAt)}</td>
            </tr>
            <tr className="">
              <th className="">Reminder: </th>
              <td className="">{data.remindMe ? "Yes" : "No"}</td>
            </tr>
            <tr className={data.remindMe ? "" : "hidden"}>
              <th className="">Remind Time: </th>
              <td className="">{convertTo12HourFormat(data.remindTime)}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <div
            className=" rounded-md  bg-error text-error-content size-max p-2 m-4 hover:scale-105 transition-all"
            onClick={() =>
              document.getElementById(`${habitId}_delete`).showModal()
            }
          >
            <RiDeleteBin2Line size={25} />
          </div>
          <div
            className=" rounded-md  bg-base-300  text-base-content size-max p-2 m-4 hover:scale-105 transition-all"
            onClick={() =>
              document.getElementById(`edit_${habitId}`).showModal()
            }
          >
            <MdOutlineEdit size={25} />
          </div>
        </div>

        <dialog id={`edit_${habitId}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <EditHabit data={data} />
          </div>
        </dialog>
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
              className="btn btn-neutral"
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
