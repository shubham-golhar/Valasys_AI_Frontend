import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LinkedIn } from "react-linkedin-login-oauth2";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginValidation } from "../../validation/Validation";
import { loginUserAsync } from "./LoginSlice";
// import LinkedInAuth from "../../../auth";

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

  // const handleLinkedInLogin = async () => {
  //   try {
  //     const user = await LinkedInAuth.login();
  //     // Handle the user object returned by LinkedIn
  //     console.log(user);
  //   } catch (error) {
  //     console.error("LinkedIn login error", error);
  //   }
  // };
  // LinkedIn login success callback
  const handleLinkedInLogin = (data) => {
    // Handle the LinkedIn login data (e.g., dispatch an action to store the user)
    console.log("LinkedIn login success:", data);
  };

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
            <div>
              <LinkedIn
                clientId="77l6aqdk67rw1w"
                redirectUri="http://localhost:3000/auth/callback"
                onSuccess={handleLinkedInLogin}
              >
                Login with LinkedIn
              </LinkedIn>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
