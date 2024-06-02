import React from "react";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import HomePageNavbar from "./home/components/HomePageNavbar";
import HomePageContent from "./home/components/HomePageContent";

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="">
        <HomePageNavbar />
      </div>
      <div className="    h-4/5">
        <HomePageContent />
      </div>
    </div>
  );
};

export default HomePage;
