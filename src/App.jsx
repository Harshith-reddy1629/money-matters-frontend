// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
// import Accounts from "./components/Home";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      {/* <Route exact path="/home" element={<Accounts />} /> */}
    </Routes>
  );
}

export default App;
