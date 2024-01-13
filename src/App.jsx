// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
