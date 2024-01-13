// import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Cookies from "js-cookie";

function PrivateRoute() {
  const isAuth = !Cookies.get("jwt_token");

  if (!isAuth) {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flexGrow: 1 }}>
          <Navbar />
          <Outlet />
        </div>
      </div>
    );
  }
  return <Navigate to="/login" />;
}

export default PrivateRoute;
