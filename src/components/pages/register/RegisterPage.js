import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./Registration.css"; // Import your CSS file
import { registerValidation } from "../../validation/Validation";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "./RegisterSlice";
// import { useNavigate } from "react-router-dom";
import OtpVerification from "../otpVerification/OtpVerification";

function Registration() {
  const [loginStep, setLoginStep] = useState("/");
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    businessEmail: "",
    companyName: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    dispatch(registerUserAsync(values));
    setLoginStep("otp");
    // navigate("/login");
  };
  // console.log("saddsad", formData);
  return (
    <div className="registration-container">
      <h2>{loginStep === "/" ? `Register` : null}</h2>
      {loginStep === "/" && (
        <Formik
          initialValues={initialValues}
          validationSchema={registerValidation}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <div className="form-field">
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-field">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-field">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="error-message"
                />
              </div>
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
                <label htmlFor="companyName">Company Name</label>
                <Field
                  type="text"
                  id="companyName"
                  name="companyName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyName}
                />
                <ErrorMessage
                  name="companyName"
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
              <div className="form-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
              </div>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      )}
      {loginStep === "otp" && <OtpVerification />}
    </div>
  );
}

export default Registration;
