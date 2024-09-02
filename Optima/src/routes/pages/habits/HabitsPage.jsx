import React from "react";
import GridLines from "react-gridlines";
import HabitsList from "./components/HabitList";
import HabitsNavbar from "./components/HabitsNavbar";

const HabitsPage = () => {
  return (
    <div className="  h-screen ">
      <HabitsNavbar />
      <div className=" h-4/5 overflow-y-scroll ">
        <GridLines
          className="grid-area h-full "
          cellWidth={60}
          strokeWidth={1}
          cellWidth2={20}
          lineColor={"gray"}
          lineColor2={""}
        >
          {" "}
          <HabitsList />{" "}
        </GridLines>{" "}
      </div>
    </div>
  );
};

export default HabitsPage;
