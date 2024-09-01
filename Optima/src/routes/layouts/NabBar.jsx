import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/optimaLogo.png";
import { CiViewList } from "react-icons/ci";
import { FaProjectDiagram } from "react-icons/fa";
import { RiTimelineView } from "react-icons/ri";
import { SlEnvolopeLetter } from "react-icons/sl";
import { GoHome } from "react-icons/go";
import { FaUser, FaUserGroup } from "react-icons/fa6";
import { useLogout } from "../../hooks/useLogout";
import { TbLogout2 } from "react-icons/tb";
import useFetchInvites from "../../hooks/useFetchInvites";
import ThemeSwitcher from "../../components/ThemeSwitch";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const NabBar = () => {
  const { data, isLoading, error } = useFetchInvites();
  let newInvitations = 0;
  if (data) {
    newInvitations = data?.filter(
      (invitation) => invitation.state === "waiting"
    ).length;
  }

  const { Logout } = useLogout();
  const navigator = useNavigate();
  const [openProjects, setOpenProjects] = useState(false);
  const handleLogout = () => {
    Logout();
    navigator("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex  flex-col justify-between    h-full">
      <div className=" flex space-y-4 flex-col">
        <img
          src={logo}
          alt="logo"
          className="bg-base-100 rounded-lg p-2 border"
        />
        <div className=" border p-1 rounded-md bg-base-100 font-medium">
          <span>{user.userName}</span>
        </div>
        <div className="flex flex-col bg-base-100 border rounded-md ">
          <Link to={"/"} className="nav-element">
            <GoHome size={20} />
            <span>Home</span>
          </Link>
          <Link to={"/habits"} className="nav-element">
            <CiViewList size={20} />
            <span>Habits</span>
          </Link>{" "}
          <div className="flex items-center space-x-2 text-base font-medium rounded-md m-2 ">
            <div className="w-full">
              <div
                className="flex space-x-2 justify-between w-full hover:bg-info hover:text-info-content hover:rounded-md p-1 cursor-pointer hover:shadow-md  hover:scale-105 transition-all hover:font-semibold"
                onClick={() => setOpenProjects(!openProjects)}
              >
                <div className="flex space-x-2">
                  <FaProjectDiagram size={20} />
                  <span>Projects</span>
                </div>
                <div>
                  {openProjects ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
              </div>
              <div
                className={`flex flex-col  pl-8 overflow-hidden transition-all ease-in-out transform duration-500 ${
                  openProjects
                    ? "h-max  opacity-100 scale-100"
                    : "h-0 opacity-0 scale-95"
                } `}
              >
                <Link to={"/myprojects"} className="nav-element">
                  <FaUser />

                  <span>My Projects</span>
                </Link>{" "}
                <Link to={"/joinedprojects"} className="nav-element">
                  <FaUserGroup size={20} />
                  <span>Joined Projects</span>
                </Link>{" "}
              </div>
            </div>
          </div>{" "}
          <Link className="nav-element" to={"/timeline"}>
            <RiTimelineView size={20} />
            <span>Time line </span>
          </Link>
          <Link className="nav-element flex justify-between" to={"/invites"}>
            <div className="flex space-x-2">
              <SlEnvolopeLetter size={20} />
              <span>Invitations</span>
            </div>
            <div
              className={
                " bg-warning text-warning-content  rounded-full size-5 flex items-center justify-center" +
                (newInvitations === 0 ? " hidden" : " ")
              }
            >
              <span> {newInvitations === 0 ? "" : newInvitations}</span>
            </div>
          </Link>
          {/* <Link className="nav-element" to={"/invites"}></Link> */}
        </div>
      </div>
      <div className="border p-3 rounded-md bg-base-100 ">
        <div className="mb-3">
          <ThemeSwitcher />
        </div>

        <div
          onClick={() => document.getElementById("logout").showModal()}
          className=" bg-base-300 flex items-center space-x-2 text-lg text-neutral  font-medium  p-1 w-max rounded-md shadow hover:shadow-xl hover:scale-105  transition-all cursor-pointer hover:bg-neutral hover:text-neutral-content"
        >
          <TbLogout2 /> <span>Logout</span>
        </div>
      </div>

      <dialog id="logout" className="modal">
        <div className="modal-box w-max p-7">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className=" flex  space-y-3 flex-col justify-center">
            <div className=" w-max text-lg font-medium font-mono">
              <span>Are you sure you want to logout?</span>
            </div>
            <div className="flex space-x-2 justify-center">
              <button className="btn btn-error " onClick={handleLogout}>
                Logout
              </button>
              <button
                className="btn btn-neutral"
                onClick={() => document.getElementById("logout").close()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NabBar;
