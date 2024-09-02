import React, { useState } from "react";
import { useCreateProject } from "../../../../hooks/useCreateProject";
import WarningElement from "../../../../components/WarningElement";

const AddProject = () => {
  const [hasDeadline, setHasDeadline] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [error, setError] = useState();

  const onCreate = () => {
    setProjectName("");
    setProjectDescription("");
    setProjectStartDate("");
    setProjectDeadline("");
    setHasDeadline(false);
    document.getElementById("my_modal_4").close();
  };

  const addProject = useCreateProject({ onCreate });

  const handleSubmit = (e) => {
    e.preventDefault();

    let startDate = "";
    if (projectStartDate != "") {
      startDate = projectStartDate + "T16:32:29.543Z";
    } else {
      startDate = new Date();
    }
    let deadLine = "";
    if (hasDeadline) {
      deadLine = projectDeadline + "T16:32:29.543Z";
    }

    addProject.mutate({
      projectName: projectName,
      projectDescription: projectDescription,
      hasDeadLine: hasDeadline,
      deadLine,
      startDate,
    });
  };

  return (
    <>
      {addProject.isError && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{addProject.error.response.data.error}</span>
        </div>
      )}
      <form
        action=""
        className="flex flex-col space-y-2 font-medium form-control "
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="label ">
          Project Name
        </label>
        <input
          required
          type="text"
          name=""
          id="name"
          className="input input-bordered"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          type="text"
          name=""
          id="description"
          className="textarea textarea-bordered"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />

        <div className="flex">
          <label htmlFor="StartDate" className="label">
            Start date
          </label>
          <input
            className="input input-bordered"
            type="date"
            name=""
            id="StartDate"
            value={projectStartDate}
            onChange={(e) => setProjectStartDate(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 items-center">
          <input
            className="checkbox"
            type="checkbox"
            name="hasDeadline"
            id=""
            checked={hasDeadline}
            onChange={(e) => setHasDeadline(e.target.checked)}
          />
          <label htmlFor="hasDeadline"> Has dead line</label>
        </div>

        <div className="flex space-x-2 items-center">
          <label htmlFor="deadline">Deadline</label>
          <input
            required={hasDeadline}
            disabled={!hasDeadline}
            className="input input-bordered"
            type="date"
            name="deadline"
            id=""
            value={projectDeadline}
            onChange={(e) => setProjectDeadline(e.target.value)}
          />
        </div>
        {error && <WarningElement message={error} />}
        <button type="submit" className="btn btn-accent">
          {addProject.isPending ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Create Project"
          )}
        </button>
      </form>{" "}
    </>
  );
};

export default AddProject;
