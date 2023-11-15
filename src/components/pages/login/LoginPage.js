import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
