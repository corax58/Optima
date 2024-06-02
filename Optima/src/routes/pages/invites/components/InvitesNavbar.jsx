import React from "react";
import { IoMenuOutline } from "react-icons/io5";

const InvitesNavbar = () => {
  return (
    <div className=" h-1/5 ">
      <div className=" navbar  flex  justify-between items-center pl-4 lg:pl-4 pr-5  w-full flex-row  h-40   shadow  nav-bar-color">
        <div className="flex space-x-1 items-center">
          <label
            htmlFor="my-drawer-2"
            className="text-base-100 items-center flex drawer-button lg:hidden "
          >
            <IoMenuOutline size={28} />
          </label>
          <span className="text-2xl font-extrabold text-base-100">Invites</span>
        </div>
      </div>
    </div>
  );
};

export default InvitesNavbar;
