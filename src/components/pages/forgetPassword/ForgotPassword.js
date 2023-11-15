import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./ForgotPassword.css";
import { forgetPasswordValidation } from "../../validation/Validation";

function ForgotPassword() {
  const initialValues = {
    businessEmail: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="registration-container">
      <h2>Forgot Password </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={forgetPasswordValidation}
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

            <button type="submit">Reset Password</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPassword;
