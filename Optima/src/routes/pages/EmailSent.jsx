import React from "react";
import { IoMailUnreadOutline } from "react-icons/io5";
const EmailSent = () => {
  return (
    <div className="flex justify-center bg-base-200 items-center h-screen">
      {" "}
      <div className=" w-96 bg-base-100 shadow-2xl rounded-lg">
        <div className=" justify-center flex">
          <IoMailUnreadOutline size={100} />
        </div>
        <div className="p-5 w-full flex justify-center">
          <p>Verification Email Sent, Check Your Email 😃</p>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
