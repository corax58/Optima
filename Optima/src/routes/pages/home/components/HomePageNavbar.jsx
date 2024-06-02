import React from "react";
import { IoMenuOutline } from "react-icons/io5";

const HomePageNavbar = () => {
  return (
    <div>
      <div className=" sticky top-0  ">
        <div className=" nav-bar-color flex  justify-between items-center pl-4 lg:pl-4 pr-5   w-full flex-row  h-40   shadow  ">
          <div className="flex space-x-1">
            <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden ">
              <IoMenuOutline size={28} className="text-white" />
            </label>
            <span className="text-2xl font-extrabold text-base-100">Home</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageNavbar;
