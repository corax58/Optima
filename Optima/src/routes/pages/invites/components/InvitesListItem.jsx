import React from "react";
import useAcceptInvites from "../../../../hooks/useAcceptInvites";
import useDeclineInvites from "../../../../hooks/useDeclineInvites";

const InvitesListItem = ({ Invite }) => {
  console.log(Invite);
  const onRes = () => {
    document.getElementById(`Invite_${Invite.id}`).close();
  };
  const acceptInvite = useAcceptInvites({ onRes });
  const declineInvite = useDeclineInvites({ onRes });

  let isDisabled = false;
  if (Invite.state != "waiting") {
    isDisabled = true;
  }
  let bgState = " bg-base-100";
  if (Invite.state == "accepted") {
    bgState = " bg-success text-success-content";
  } else if (Invite.state == "declined") {
    bgState = " bg-error text-error-content";
  }

  return (
    <div>
      <div
        onClick={() =>
          document.getElementById(`Invite_${Invite.id}`).showModal()
        }
        className={
          "flex w-full p-2 pl-5 font-medium justify-between border-b border-primary-400  items-center h-14 hover:text-lg hover:font-semibold transition-all hover:underline " +
          bgState
        }
      >
        <div className="">{Invite.project.projectName}</div>
        <div>
          <span>From: </span>{" "}
          <span className=" font-normal">{Invite.project.admin.email}</span>
        </div>
      </div>
      <dialog id={`Invite_${Invite.id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <table className="table">
              <tbody>
                <tr>
                  <th>Project Name</th>
                  <td>{Invite.project.projectName}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td className=" md:text-justify">
                    {" "}
                    {Invite.project.description}
                  </td>
                </tr>
                <tr>
                  <th>Admin</th>
                  <td>{Invite.project.admin.email}</td>
                </tr>
                <tr>
                  <th>Start Date </th>
                  <td>{Invite.project.startDate.slice(0, 10)}</td>
                </tr>
                <tr>
                  <th>Deadline </th>
                  {Invite.project.hasDeadLine ? (
                    <td>{Invite.project.deadLine.slice(0, 10)}</td>
                  ) : (
                    <td>None</td>
                  )}
                </tr>
                <tr>
                  <th>Status </th>
                  <td>{Invite.project.status}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex  space-x-10  justify-center w-full">
              <button
                disabled={isDisabled}
                className="btn btn-success"
                onClick={() => acceptInvite.mutate(Invite.id)}
              >
                Accept
              </button>
              <button
                disabled={isDisabled}
                className="btn  btn-error"
                onClick={() => declineInvite.mutate(Invite.id)}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default InvitesListItem;
