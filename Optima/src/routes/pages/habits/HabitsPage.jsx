import React from "react";
import HabitsNavbar from "./components/HabitsNavbar";
import HabitsList from "./components/HabitList";
import { BiPlusCircle } from "react-icons/bi";

const HabitsPage = () => {
  return (
    <div className="   ">
      <HabitsNavbar />

      <HabitsList />
    </div>
  );
};

export default HabitsPage;
