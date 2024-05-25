import React from "react";
import useFetchReport from "../../../../hooks/useFetchReport";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 128 + 128);
  const g = Math.floor(Math.random() * 128 + 128);
  const b = Math.floor(Math.random() * 128 + 128);

  const color = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return color;
};
const reformatReport = (data) => {
  let report = [];
  data.map((element) => {
    report.push({
      title: element.projectName,
      start: element.startDate,
      end: element.deadLine,
      allDay: true,
      backgroundColor: getRandomColor(),
      textColor: "#000000",
      bold: true,
      textWeight: 2,
    });
  });

  return report;
};

const Calander = () => {
  const { data, error, isLoading } = useFetchReport();
  let events = [];

  if (data) {
    events = reformatReport(data);
  }
  if (isLoading)
    return <span className="loading loading-ring loading-lg mx-auto"></span>;
  if (error)
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
      <span>{error.message}</span>
    </div>;
  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventInteractive={true}
      />
    </div>
  );
};

export default Calander;
