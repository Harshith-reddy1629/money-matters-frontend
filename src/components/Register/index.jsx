import { Component } from "react";

// import { Navigate } from "react-router-dom";

// import Cookies from "js-cookie";

// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";

import "./index.css";
import { Formik } from "formik";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    username: "",
    password: "",
    isAnyFieldEmpty: false,
    isAdminLogging: false,
  };

  render() {
    return (
      <div className="register-container">
        <img
          src="https://res.cloudinary.com/reddyimgs/image/upload/v1690551063/Frame_507_ogpjs9.png"
          alt="website logo"
          className="login-logo"
        />
        <div className="register-card-container">
          <div className="logger-btn-container">
            <Link to="/login" className="logger-btn inactive-logger">
              User
            </Link>
            <Link to="/register" className="logger-btn active-logger">
              Register
            </Link>
          </div>
          <Formik></Formik>
          <form className="login-form">
            <h1 className="login-heading">Register</h1>
            <div className="register-input-container">
              <label>NAME</label>
              <input
                className="register-input-element"
                type="text"
                placeholder="Enter Name"
              />
              {/* <NotificationContainer /> */}
            </div>
            <div className="register-input-container">
              <label>USERNAME</label>
              <input
                className="register-input-element"
                type="text"
                placeholder="Enter username"
              />
              {/* <NotificationContainer /> */}
            </div>
            <div className="register-input-container">
              <label>Email </label>
              <input
                className="register-input-element"
                type="email"
                placeholder="enter mail"
              />
            </div>
            <div className="register-input-container">
              <label>DOB</label>
              <input
                className="register-input-element"
                type="Date"
                placeholder="D.O.B"
                defaultValue="2000-01-01"
              />
            </div>
            <div className="register-input-container">
              <label>PASSWORD </label>
              <input
                className="register-input-element"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="register-input-container">
              <label>CONFIRM PASSWORD </label>
              <input
                className="register-input-element"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="submit-btn-container">
              <button type="submit" className="submit-btn">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
