import React, { useState } from "react";
import useAddMember from "../../../../hooks/useAddMember";
import useFetchPublicHabits from "../../../../hooks/useFetchPublicHabits";
import ErrorElement from "../../../../components/ErrorElement";
import UserList from "./UserList";

const SendInvitation = ({ projectId }) => {
  const [userEmail, setUserEmail] = useState("");
  const search = useFetchPublicHabits();

  const handleSeach = (e) => {
    e.preventDefault();
    search.mutate(userEmail);
  };

  return (
    <div>
      <div className=" items-center justify-center flex ">
        <form action="" onSubmit={handleSeach} className="flex space-x-3 ">
          <input
            required
            placeholder="Enter Email"
            className="input input-sm input-bordered"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button className="btn btn-sm " type="submit">
            Search
          </button>
        </form>
      </div>
      <div className=" -m-2 bg-base-200 mt-3 rounded-md h-80">
        {search.isPending && (
          <div className="h-full w-full flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {search.isError && (
          <ErrorElement message={search.error.response.data.error} />
        )}
        {search.isSuccess && (
          <UserList data={search.data} projectId={projectId} />
        )}
      </div>
    </div>
  );
};

export default SendInvitation;
