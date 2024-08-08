import * as yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const OrgRegistrationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(emailRegex, "Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must have at least one uppercase letter")
    .matches(/[a-z]/, "Password must have at least one lowercase letter")
    .matches(/[0-9]/, "Password must have at least one number")
    .matches(/[\W_]/, "Password must have at least one special character"),
  confirmTerms: yup
    .bool()
    .oneOf([true], "You must accept the terms and conditions"),
});
