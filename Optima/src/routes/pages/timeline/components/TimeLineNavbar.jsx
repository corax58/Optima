import React from "react";
import { IoMenuOutline } from "react-icons/io5";

const TimeLineNavbar = () => {
  return (
    <div className="">
      <div className="navbar  flex  justify-between items-center pl-4 lg:pl-4 pr-5  w-full flex-row  h-40   shadow opacity-100  bg-gradient-to-r from-violet-400 to-purple-300">
        <div className="flex space-x-1 items-center">
          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden ">
            <IoMenuOutline size={28} />
          </label>
          <span className="text-2xl font-extrabold text-base-100">
            Projects Timeline
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeLineNavbar;
