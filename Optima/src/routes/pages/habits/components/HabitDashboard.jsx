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
function calculateAverage(data, month) {
  const entries = transformData(data).filter(
    (entry) => entry.date.slice(0, 3) == month
  );
  const sum = entries.reduce((acc, entry) => acc + entry.quantity, 0);
  const average = sum / entries.length;
  if (!average) {
    return 0;
  }
  return Math.floor(average);
}

function calculateTotal(data, month) {
  if (!data) {
    return 0;
  }

  const entries = transformData(data).filter(
    (entry) => entry.date.slice(0, 3) == month
  );

  return entries.reduce((acc, entry) => acc + entry.quantity, 0);
}
function getCurrentMonthAbbreviation() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth(); // getMonth() returns a zero-based index (0 for January, 11 for December)
  return months[currentMonthIndex];
}

const HabitDashboard = ({ habitId }) => {
  const { data, error, isLoading } = useFetchHabitEntry({
    habitId: habitId,
  });

  const currentMonth = getCurrentMonthAbbreviation();

  const [month, setMonth] = useState(currentMonth);

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
        <label className="form-control w-full max-w-xs p-2">
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
      <div className="flex flex-col md:flex-row  w-full">
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
        <div className="flex flex-row md:flex-col">
          <div className="border-2 m-3  h-max p-5 rounded-md bg-base-200">
            <div className="font-bold text-lg w-max">{month + " "}Total</div>
            <div className="flex text-3xl justify-center items-center">
              <span>{calculateTotal(data, month)}</span>
            </div>
          </div>
          <div className="border-2 m-3  h-max p-5 rounded-md bg-base-200 shadow">
            <div className="font-bold text-lg w-max">{month + " "}Average</div>
            <div className="flex text-3xl justify-center items-center">
              <span>{calculateAverage(data, month)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDashboard;
