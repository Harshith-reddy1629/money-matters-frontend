// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import TransactionRoute from "./components/TranscationRoute";
import Profile from "./components/Profile";
import AuthUser from "./components/AuthUser";
import "./App.css";
import NotFound from "./components/NotFound";
import EmailVerify from "./components/EmailVerify";
import ResendOtp from "./components/ResendOtp";

function App() {
  return (
    <Routes>
      <Route exact path="/verify/mail/:id" element={<EmailVerify />} />
      <Route exact path="/resend-mail" element={<ResendOtp />} />
      <Route element={<AuthUser />}>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<TransactionRoute />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
