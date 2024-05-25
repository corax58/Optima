import React from "react";
import { Link, Outlet } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";
import NabBar from "./NabBar";

const NavLayout = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  ">
          <Outlet />
        </div>

        <div className="drawer-side m">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="menu p-4 h-full  w-64 min-h-full bg-base-200 text-base-content">
            <NabBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavLayout;
