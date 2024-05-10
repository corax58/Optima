import React from "react";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { Logout } = useLogout();
  const navigator = useNavigate();
  const handleLogout = () => {
    Logout();
    navigator("/login");
  };
  return (
    <div>
      <button
        className=" p-2 rounded bg-slate-300 font-bold"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
