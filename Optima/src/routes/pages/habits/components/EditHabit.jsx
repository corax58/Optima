import React, { useRef, useState } from "react";
import { useEditHabit } from "../../../../hooks/useEditHabit";

function isWhitespaceOrNumbers(str) {
  if (str.trim() === "") {
    return true;
  }
  // regular expression to check if the str has numbers or is whitespace
  const numberPattern = /^[0-9\s]+$/;

  return numberPattern.test(str);
}

const EditHabit = ({ data }) => {
  const [quantifiable, setQuatifieble] = useState(data.quantifiable);
  const [remindMe, setRemindMe] = useState(data.remindMe);
  const [habitName, setHabitname] = useState(data.habitName);
  const [habitDescription, setHabitDescription] = useState(data.description);
  const [Unit, setUnit] = useState(data.unit);
  const [time, setTime] = useState(data.remindTime);
  const [nameError, setNameError] = useState();

  const onEdit = () => {
    setHabitDescription(data.description);
    setHabitname(data.habitName);
    setUnit(data.unit);
    setRemindMe(data.remindMe);
    setTime(data.remindTime);
    setQuatifieble(data.quantifiable);

    document.getElementById(`edit_${data.habitId}`).close();
  };

  const editHabit = useEditHabit({ onEdit, habitId: data.habitId });

  const toggleUnit = () => {
    setQuatifieble(!quantifiable);
  };
  const toggleRemindMe = () => {
    setRemindMe(!remindMe);
  };

  const handleSubmit = (e) => {
    console.log();

    e.preventDefault();
    if (isWhitespaceOrNumbers(habitName)) {
      setNameError("Invalid habit name");
      return;
    }
    const habit = {
      habitName: habitName,
      habitDescription: habitDescription,
      quantifiable: quantifiable,
      unit: Unit,
      remindMe: remindMe,
      remindTime: time,
    };
    console.log(habit);
    editHabit.mutate({
      habitName: habitName,
      description: habitDescription,
      quantifiable: quantifiable,
      unit: Unit,
      remindMe: remindMe,
      remindTime: time,
    });
  };

  return (
    <>
      {editHabit.error && (
        <div role="alert" className="alert alert-error ">
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
          <span>{editHabit.error.message}</span>
        </div>
      )}
      <form
        className="flex flex-col space-y-3 font-medium"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Habit name</label>
        <input
          required
          value={habitName}
          onChange={(e) => {
            setHabitname(e.target.value);
            if (isWhitespaceOrNumbers(habitName)) {
              setNameError("Invalid habit name");
            } else {
              setNameError("");
            }
          }}
          type="text"
          name=""
          id="name"
          className="input input-bordered w-full max-w-xs"
        />
        {nameError && (
          <div role="alert" className="alert alert-warning p-1">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{nameError}</span>
          </div>
        )}
        <label htmlFor="description">Habit description</label>
        <textarea
          value={habitDescription}
          onChange={(e) => setHabitDescription(e.target.value)}
          name=""
          id="description"
          className="textarea textarea-bordered"
        ></textarea>
        <div className="space-x-2 flex items-center">
          <input
            checked={quantifiable}
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
            value={Unit}
            onChange={(e) => setUnit(e.target.value)}
            type="text"
            id="unit"
            className="input input-bordered w-full max-w-xs"
            disabled={!quantifiable}
          />
        </div>
        <div className="space-x-2 flex items-center">
          <input
            checked={remindMe}
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
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!remindMe}
            type="time"
            id="unit"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button
          type="submit"
          className="btn font-bold"
          disabled={editHabit.isPending}
        >
          {editHabit.isPending ? "loading" : "Edit habit"}
        </button>
      </form>
    </>
  );
};

export default EditHabit;
