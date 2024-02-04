import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Formik } from "formik";

import Cookies from "js-cookie";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import "./index.css";

const Login = () => {
  const [errorMessage, setError] = useState("");

  const [isVerifiedUser, setVerifiedUser] = useState(true);

  const [passwordHidden, setPasswordHidden] = useState(true);

  const navigate = useNavigate();

  const onSuccess = (result) => {
    Cookies.set("jwt_token", result.jwtToken, {
      expires: 30,
      path: "/",
    });

    navigate("/", { replace: true });
  };

  const onFailed = (result, response) => {
    if (response.status === 401) {
      setError(result.errMsg);
      setVerifiedUser(false);
    } else {
      setError(result.errMsg);
    }
  };

  const submitForm = async (formValues) => {
    const URL = "https://money-matters-99a1.onrender.com/login";

    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    };

    try {
      const response = await fetch(URL, options);

      const result = await response.json();

      if (response.ok) {
        onSuccess(result);
      } else {
        console.log(response);
        console.log(result);
        onFailed(result, response);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

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
            Login
          </Link>
          <Link to="/register" className="logger-btn inactive-logger">
            Register
          </Link>
        </div>
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) errors.username = "Required*";
            if (!values.password) errors.password = "Required*";

            return errors;
          }}
          onSubmit={(values) => submitForm(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
              onFocus={() => setError("")}
              className="login-form"
            >
              <h1 className="login-heading">Login</h1>
              <div className="login-input-container">
                <label htmlFor="username">USERNAME</label>
                <input
                  className="login-input-element"
                  type="text"
                  placeholder="Enter username"
                  id="username"
                />
                <p className="error-text">
                  {errors.username && touched.username && errors.username}
                </p>
              </div>
              <div className="login-input-container">
                <label htmlFor="password">PASSWORD </label>
                <div className="pass-container">
                  <input
                    className="login-input-element login-input-element-password"
                    type={passwordHidden ? "password" : "text"}
                    placeholder="Password"
                    id="password"
                  />
                  <button
                    className="eye-btn"
                    type="button"
                    onClick={() => setPasswordHidden(!passwordHidden)}
                  >
                    {passwordHidden ? <IoMdEye /> : <IoMdEyeOff />}
                  </button>
                </div>
                <p className="error-text">
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <div className="submit-btn-container">
                {isVerifiedUser ? (
                  <button
                    type="submit"
                    id="login"
                    disabled={isSubmitting}
                    className="submit-btn"
                  >
                    {isSubmitting ? "Logging" : "Log in"}
                  </button>
                ) : (
                  <Link className="link-resend" to="/resend-mail">
                    Resend Mail
                  </Link>
                )}
                <p className="error-text">{errorMessage}</p>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
