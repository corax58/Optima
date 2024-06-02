import React from "react";
import InvitesNavbar from "./components/InvitesNavbar";
import InvitesList from "./components/InvitesList";
import GridLines from "react-gridlines";

const Invites = () => {
  return (
    <div className=" h-screen">
      <InvitesNavbar />

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
          <InvitesList />{" "}
        </GridLines>{" "}
      </div>
    </div>
  );
};

export default Invites;
