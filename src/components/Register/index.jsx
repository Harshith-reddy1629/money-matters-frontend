import { useState } from "react";
import "./index.css";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [registered, setRegister] = useState(false);
  const [errorMessage, setError] = useState({});

  const navigate = useNavigate();

  const onSuccess = (result) => {
    setRegister(true);
  };

  const onFailed = (result) => {
    setError(result);
  };

  const submitForm = async (formValues) => {
    const URL = "https://money-matters-99a1.onrender.com/register/";

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
    <div className="register-container">
      <img
        src="https://res.cloudinary.com/reddyimgs/image/upload/v1690551063/Frame_507_ogpjs9.png"
        alt="website logo"
        className="login-logo"
      />
      <div className="register-card-container">
        <div className="register-btn-container">
          <Link to="/login" className="logger-btn inactive-logger">
            Login
          </Link>
          <Link to="/register" className="logger-btn active-logger">
            Register
          </Link>
        </div>
        {!registered && (
          <Formik
            initialValues={{
              name: "",
              username: "",
              email: "",
              password: "",
              confirmpassword: "",
              date: "2000-01-01",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required*";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.username) errors.username = "Required*";
              if (!values.name) errors.name = "Required*";
              if (!values.password) {
                errors.password = "Required*";
              } else if (8 > values.password.length) {
                errors.password = "Minimum 8 characters";
              } else if (16 < values.password.length) {
                errors.password = "Maximum 16 characters";
              }
              if (!values.confirmpassword) {
                errors.confirmpassword = "Required*";
              } else if (values.password !== values.confirmpassword) {
                errors.confirmpassword = "Password is not matching";
              }
              if (!values.date) errors.date = "Required*";
              return errors;
            }}
            // onSubmit={(values) => SubmitForm(values)}
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
                onBlur={handleBlur}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onFocus={() => setError({})}
                className="register-form"
              >
                <h1 className="login-heading">Register</h1>
                <div className="register-input-container">
                  <label>NAME</label>
                  <input
                    id="name"
                    className="register-input-element"
                    type="text"
                    placeholder="Enter Name"
                  />
                  <p className="error-text">
                    {errors.name && touched.name && errors.name}
                  </p>
                </div>
                <div className="register-input-container">
                  <label>USERNAME</label>
                  <input
                    className="register-input-element"
                    type="text"
                    placeholder="Enter username"
                    id="username"
                  />
                  <p className="error-text">
                    {(errors.username && touched.username && errors.username) ||
                      errorMessage.usernameError}
                  </p>
                </div>
                <div className="register-input-container">
                  <label>Email </label>
                  <input
                    className="register-input-element"
                    type="email"
                    placeholder="Enter mail"
                    id="email"
                  />
                  <p className="error-text">
                    {(errors.email && touched.email && errors.email) ||
                      errorMessage.mailError}
                  </p>
                </div>
                <div className="register-input-container">
                  <label>DOB</label>
                  <input
                    id="date"
                    className="register-input-element"
                    type="Date"
                    placeholder="D.O.B"
                    defaultValue="2000-01-01"
                  />
                  <p className="error-text">
                    {errors.date && touched.date && errors.date}
                  </p>
                </div>
                <div className="register-input-container">
                  <label>PASSWORD </label>
                  <input
                    className="register-input-element"
                    type="password"
                    placeholder="Password"
                    id="password"
                  />
                  <p className="error-text">
                    {(errors.password && touched.password && errors.password) ||
                      errorMessage.passwordError}
                  </p>
                </div>
                <div className="register-input-container">
                  <label>CONFIRM PASSWORD </label>
                  <input
                    onFocus={() => (touched.confirmpassword = true)}
                    id="confirmpassword"
                    className="register-input-element"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <p className="error-text">
                    {errors.confirmpassword &&
                      touched.confirmpassword &&
                      errors.confirmpassword}
                  </p>
                </div>
                <div className="register-submit-btn-container">
                  <button
                    type="submit"
                    id="submit"
                    disabled={isSubmitting}
                    className="submit-btn"
                  >
                    {isSubmitting ? "Registering" : "Register"}
                  </button>
                  <p className="error-text">{errorMessage.errMsg}</p>
                </div>
              </form>
            )}
          </Formik>
        )}
        {registered && (
          <div className="success-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7518/7518748.png"
              alt="success"
              height="90"
            />
            <p>SUCCESSFULLY REGISTERED</p>

            <p>verification link sent to your mail</p>

            <button
              onClick={() => navigate("/login")}
              className="successful-reg-btn"
              type="button"
            >
              LOGIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
