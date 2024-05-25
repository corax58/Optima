import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { state } = useAuthContext();

  const user = localStorage.getItem("user");
  if (!user) return <Navigate to={"/login"} />;
  return <Outlet />;
};

export default PrivateRoutes;
