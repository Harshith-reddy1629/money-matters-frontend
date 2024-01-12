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

class Login extends Component {
  state = {
    username: "",
    password: "",
    isAnyFieldEmpty: false,
    isAdminLogging: false,
  };

  render() {
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/reddyimgs/image/upload/v1690551063/Frame_507_ogpjs9.png"
          alt="website logo"
          className="login-logo"
        />
        <div className="login-card-container">
          <div className="logger-btn-container">
            <Link to="/login" className="logger-btn active-logger">
              User
            </Link>
            <Link to="/register" className="logger-btn inactive-logger">
              Register
            </Link>
          </div>
          <Formik></Formik>
          <form className="login-form">
            <h1 className="login-heading">Login</h1>
            <div className="login-input-container">
              <label>USERNAME</label>
              <input
                className="login-input-element"
                type="email"
                placeholder="Enter username"
              />
              {/* <NotificationContainer /> */}
            </div>
            <div className="login-input-container">
              <label>PASSWORD </label>
              <input
                className="login-input-element"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="submit-btn-container">
              <button type="submit" className="submit-btn">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
