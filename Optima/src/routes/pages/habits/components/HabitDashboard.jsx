import React, { useState } from "react";
import useFetchHabitEntry from "../../../../hooks/useFetchHabitEntry";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function transformData(entries) {
  // Helper function to format date as 'MMM YY'
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  const result = [];
  entries.forEach((entry) => {
    result.push({
      date: formatDate(entry.createdAt),
      quantity: entry.quantity,
    });
  });

  return result;
}

const HabitDashboard = ({ habitId }) => {
  const { data, error, isLoading } = useFetchHabitEntry({
    habitId: habitId,
  });

  const [month, setMonth] = useState("Jan");

  if (error)
    return (
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
      </div>
    );
  if (isLoading)
    return <span className="loading loading-ring loading-lg"></span>;

  return (
    <div>
      <div className="flex justify-center my-5">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-medium">Month:</span>
          </div>

          <select
            value={month}
            className="select select-primary w-full max-w-xs"
            onChange={(e) => {
              setMonth(e.target.value);
            }}
          >
            <option>Jan</option>
            <option>Feb</option>
            <option>Mar</option>
            <option>Apr</option>
            <option>May</option>
            <option>Jun</option>
            <option>Jul</option>
            <option>Aug</option>
            <option>Sep</option>
            <option>Oct</option>
            <option>Nov</option>
            <option>Dec</option>
          </select>
        </label>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={transformData(data).filter(
            (entry) => entry.date.slice(0, 3) == month
          )}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="quantity"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitDashboard;
