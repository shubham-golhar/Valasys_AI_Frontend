import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { otpValidation } from "../../validation/Validation";
import { useNavigate } from "react-router-dom";

function OtpVerification() {
  const navigate = useNavigate();
  const initialValues = {
    otp: "",
  };

  const onSubmit = (values) => {
    // Implement your OTP verification logic here.
    console.log("OTP submitted:", values.otp);
    navigate("/login");
  };

  return (
    <div className="otp-verification-container">
      <h2>Email Verification</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={otpValidation}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form>
            <div className="form-field">
              <label htmlFor="otp">Enter OTP</label>
              <Field
                type="text"
                id="otp"
                name="otp"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.otp}
              />
              <ErrorMessage
                name="otp"
                component="div"
                className="error-message"
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              Verify OTP
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default OtpVerification;
