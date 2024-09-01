import React, { useState } from "react";
import UserListItem from "./UserListItem";
import useAddMember from "../../../../hooks/useAddMember";
import ErrorElement from "../../../../components/ErrorElement";
import SuccessElement from "../../../../components/SuccessElement";

const UserList = ({ data, projectId }) => {
  const [userName, setUserName] = useState("");
  console.log(data);
  const onAdd = () => {
    setUserName("");
    document.getElementById(`add_user`).close();
  };

  const addMember = useAddMember({ onAdd, projectId });
  const handleAdd = (e) => {
    e.preventDefault();
  };

  console.log(addMember);
  if (data.userName) {
    return (
      <div>
        {" "}
        <div className="flex justify-between p-2 border-b-2 border-neutral-content">
          <span>{data.userName}</span>
          <button
            className="btn btn-sm btn-neutral"
            onClick={(e) => addMember.mutate({ userName: data.userName })}
          >
            Send Invitation
          </button>
        </div>
        <div className=" bg-base-300 p-2 h-64">
          {addMember.error && (
            <ErrorElement message={addMember.error.response.data.error} />
          )}
        </div>
      </div>
    );
  }
};

export default UserList;
