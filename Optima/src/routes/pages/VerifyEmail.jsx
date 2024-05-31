import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import axios from "axios";
import apiClient from "../../services/apiClient";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";
const VerifyEmail = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { Verify, error, isLoading } = useVerifyEmail();

  Verify(token);

  if (isLoading) {
    return (
      <div className="flex justify-center bg-base-200 items-center h-screen p-5">
        {" "}
        <div className=" w-96 bg-base-100 shadow-2xl rounded-lg p-5">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center bg-base-200 items-center h-screen p-5">
        {" "}
        <div className=" w-96 bg-base-100 shadow-2xl rounded-lg p-5">
          <div className=" justify-center flex">
            <MdErrorOutline size={100} />
          </div>
          <div className="p-5 pb-0 w-full flex justify-center flex-col items-center">
            <p>Email Verified Failed</p>
            <p>
              <Link to={"/login"} className=" underline text-lg text-blue-600">
                Sign up
              </Link>{" "}
              again
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center bg-base-200 items-center h-screen p-5">
      {" "}
      <div className=" w-96 bg-base-100 shadow-2xl rounded-lg p-5">
        <div className=" justify-center flex">
          <BsCheckCircle size={100} />
        </div>
        <div className="p-5 pb-0 w-full flex justify-center flex-col items-center">
          <p>Email Verified Successfully</p>
          <p>
            Click here to{" "}
            <Link to={"/login"} className=" underline text-lg text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
