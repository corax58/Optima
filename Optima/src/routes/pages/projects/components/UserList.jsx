import React from "react";
import UserListItem from "./UserListItem";
import useAddMember from "../../../../hooks/useAddMember";
import ErrorElement from "../../../../components/ErrorElement";
import SuccessElement from "../../../../components/SuccessElement";

const UserList = ({ data, projectId }) => {
  console.log(data);
  const onAdd = () => {
    setUserEmail("");
    document.getElementById(`add_${data.projectId}`).close();
  };

  const addMember = useAddMember({ onAdd, projectId });
  const handleAdd = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      {" "}
      <div className="flex justify-between p-2 border-b-2 border-neutral-content">
        <span>{data.email}</span>
        <button
          className="btn btn-sm btn-neutral"
          onClick={(e) => addMember.mutate(data.email)}
        >
          Send Invitation
        </button>
      </div>
      <div className=" bg-base-300 h-64">
        {addMember.isError && (
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
};

export default UserList;
