import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LinkedIn } from "react-linkedin-login-oauth2";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginValidation } from "../../validation/Validation";
import { loginUserAsync } from "./LoginSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    dispatch(loginUserAsync(values));
    navigate("/dashboard");
  };
  function handleFailure(error) {
    console.error("LinkedIn authentication failed:", error);
    // Add your custom error handling logic here, such as displaying a user-friendly error message.
  }
  function handleSuccess(data) {
    console.log(data);
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
                value={values.username}
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
              scope="r_liteprofile r_emailaddress"
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
