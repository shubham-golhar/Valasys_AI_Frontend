import * as Yup from "yup";

export const registerValidation = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid phone number format")
    .required("Phone number is required"),
  businessEmail: Yup.string()
    .email("Invalid email format")
    .required("Business email is required"),
  companyName: Yup.string().required("Company name is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginValidation = Yup.object({
  businessEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const forgetPasswordValidation = Yup.object({
  businessEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const otpValidation = Yup.object({
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be a 6-digit number")
    .required("OTP is required"),
});
