import React from "react";
import { useParams } from "react-router-dom";

const HabitsDetailsPage = () => {
  const { habitId } = useParams();
  return <div>habit {habitId}</div>;
};

export default HabitsDetailsPage;
