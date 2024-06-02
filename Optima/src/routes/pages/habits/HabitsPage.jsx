import React from "react";
import HabitsNavbar from "./components/HabitsNavbar";
import HabitsList from "./components/HabitList";
import { BiPlusCircle } from "react-icons/bi";
import GridLines from "react-gridlines";

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
