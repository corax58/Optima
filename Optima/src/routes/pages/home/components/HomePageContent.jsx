import React from "react";
import GridLines from "react-gridlines";
import welcome from "./../../../../assets/Images/welcome.png";
import { LiaLightbulb } from "react-icons/lia";

const tips = [
  "Try setting a remind time to get a notification",
  "Set a habit to track progress",
  "You can see your joined projects in the joined projects section",
  "Only the project admin can delete or edit projects",
  "Protect your eyes by using the dark mode at night",
];
const HomePageContent = () => {
  return (
    <div className="h-full">
      <GridLines
        className="grid-area h-full "
        cellWidth={60}
        strokeWidth={1}
        cellWidth2={20}
        lineColor={"gray"}
        lineColor2={""}
      >
        {" "}
        <div className="group m-5 absolute group">
          <div className="bg-base-200  size-fit p-2 border-4 border-neutral-content rounded-full">
            <LiaLightbulb size={25} />
          </div>
          <div className=" scale-0  flex-col group-hover:flex  origin-top-left from transition-all ease-in-out duration-300 group-hover:scale-100  h-max p-6   space-y-3  bg-base-200 border-4 border-base-300 rounded-lg">
            <span className="font-medium underline ">Tip</span>
            <p>{tips[Math.floor(Math.random() * tips.length)]}</p>
          </div>
        </div>
        <div className="h-full flex items-center justify-center p-10">
          <img src={welcome} alt="" className=" object-contain h-full " />
        </div>
      </GridLines>
    </div>
  );
};

export default HomePageContent;
