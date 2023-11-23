import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LinkedIn } from "react-linkedin-login-oauth2";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginValidation } from "../../validation/Validation";
import { loginUserAsync } from "./LoginSlice";

function Login() {
  const dispatch = useDispatch();
  const initialValues = {
    businessEmail: "",
    password: "",
  };

  const onSubmit = (values) => {
    dispatch(loginUserAsync(values));
    console.log("you are logged in ");
  };
  function handleFailure(error) {
    console.error("LinkedIn authentication failed:", error);
    // Add your custom error handling logic here, such as displaying a user-friendly error message.
  }
  function handleSuccess(e) {
    fetch("http://127.0.0.1:8000/linkedin/", {
      method: "POST",
      body: JSON.stringify({ auth_token: e }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        document.getElementById("email_id").innerText = res["email"];
        document.getElementById("Auth_token").innerText = res["tokens"];
      });
  }
  return (
    <div className="registration-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidation}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div className="form-field">
              <label htmlFor="businessEmail">Business Email</label>
              <Field
                type="email"
                id="businessEmail"
                name="businessEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.businessEmail}
              />
              <ErrorMessage
                name="businessEmail"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <button type="submit">Login</button>
            <div>
              <Link to="/forgot-password">Forget password</Link>
            </div>
            {console.log(window.location.origin)}
            <LinkedIn
              clientId="77l6aqdk67rw1w"
              // redirectUri={`${window.location.origin}/inkedin-oauth2/callback`}
              redirectUri={`http://localhost:3000/linkedin-oauth2/callback`}
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              className="linkedin"
            >
              {({ linkedInLogin }) => (
                <button
                  className="linkedin"
                  onClick={linkedInLogin}
                  type="submit"
                >
                  Sign in with Linked In
                </button>
              )}
            </LinkedIn>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
