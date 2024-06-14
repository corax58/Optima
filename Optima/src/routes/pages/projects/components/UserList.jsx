import React, { useState } from "react";
import UserListItem from "./UserListItem";
import useAddMember from "../../../../hooks/useAddMember";
import ErrorElement from "../../../../components/ErrorElement";
import SuccessElement from "../../../../components/SuccessElement";

const UserList = ({ data, projectId }) => {
  const [userEmail, setUserEmail] = useState("");
  console.log(data);
  const onAdd = () => {
    setUserEmail("");
    document.getElementById(`add_user`).close();
  };

  const addMember = useAddMember({ onAdd, projectId });
  const handleAdd = (e) => {
    e.preventDefault();
  };

  console.log(addMember);
  if (data) {
    return (
      <div>
        {" "}
        <div className="flex justify-between p-2 border-b-2 border-neutral-content">
          <span>{data.email}</span>
          <button
            className="btn btn-sm btn-neutral"
            onClick={(e) => addMember.mutate({ email: data.email })}
          >
            Send Invitation
          </button>
        </div>
        <div className=" bg-base-300 h-64">
          {addMember.error && (
            <ErrorElement message={addMember.error.response.data.error} />
          )}

          <ul className=" h-full  overflow-y-scroll s">
            {data.Habits.map((habit) => (
              <li className="shadow-md">
                <UserListItem habit={habit} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default UserList;
