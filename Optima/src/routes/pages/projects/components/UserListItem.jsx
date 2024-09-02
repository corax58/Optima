import React from "react";
import { calculatePercentage } from "./ProjectDetails";

const calculateAverage = (entries) => {
  let total = 0;
  for (let entry of entries) {
    total += entry.quantity;
  }
  const average = Math.floor(total / entries.length);
  return average;
};

const count = (entries) => {
  let total = 0;
  for (let entry of entries) {
    if (entry.quantity == 1) {
      total += 1;
    }
  }
  return total;
};

const UserListItem = ({ habit }) => {
  return (
    <div className="flex justify-between p-2 border-b border-neutral-content bg-base-200">
      <div>
        <span>{habit.habitName}</span>
      </div>
      <div>
        {habit.quantifiable ? (
          <>
            <span>Average:</span>
            <span>{calculateAverage(habit.HabitEntry)}</span>
          </>
        ) : (
          <div>
            {" "}
            <span>Done: </span>{" "}
            <span>
              {calculatePercentage(
                habit.HabitEntry.length,
                count(habit.HabitEntry)
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListItem;
