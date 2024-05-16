import React from "react";
import { Link, Outlet } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";
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
          >
            {" "}
          </label>

          <ul className="menu p-4   w-64 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to={"/"}>Home</Link>{" "}
            </li>
            <li>
              <Link to={"/habits"}>Habits</Link>{" "}
            </li>
            <li>
              <Link to={"/projects"}>Projects</Link>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavLayout;
