import React from "react";
import HabitListItem from "./habitListItem";

const HabitsList = () => {
  const habit = {
    name: "sleep",
    id: "abk",
  };
  const habit2 = {
    name: "life",
    id: "exist",
  };
  return (
    <div>
      <ul>
        <li>
          <HabitListItem habit={habit} />
        </li>
        <li>
          <HabitListItem habit={habit2} />
        </li>
      </ul>
    </div>
  );
};

export default HabitsList;
