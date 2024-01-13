// import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

function PrivateRoute() {
  const K = true;
  if (K) {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar />

        <Outlet />
      </div>
    );
  }
  return <Navigate to="/login" />;
}

export default PrivateRoute;
