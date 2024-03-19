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
import Contact from "./components/Contact";
import ChangePasword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route exact path="/verify/mail/:id" element={<EmailVerify />} />
      <Route exact path="/resend-mail" element={<ResendOtp />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route exact path="/change-password/:id" element={<ChangePasword />} />
      <Route element={<AuthUser />}>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<TransactionRoute />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
