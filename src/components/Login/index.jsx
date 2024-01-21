import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Formik } from "formik";

import Cookies from "js-cookie";

import "./index.css";

const Login = () => {
  const [errorMessage, setError] = useState("");

  const navigate = useNavigate();

  const onSuccess = (result) => {
    Cookies.set("jwt_token", result.jwtToken, {
      expires: 30,
      path: "/",
    });

    navigate("/", { replace: true });
  };

  const onFailed = (result) => {
    setError(result.errMsg);
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
        onFailed(result);
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
                <label>USERNAME</label>
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
                <label>PASSWORD </label>
                <input
                  className="login-input-element"
                  type="password"
                  placeholder="Password"
                  id="password"
                />
                <p className="error-text">
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <div className="submit-btn-container">
                <button type="submit" id="login" className="submit-btn">
                  Log in
                </button>
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
