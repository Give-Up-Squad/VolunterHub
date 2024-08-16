import * as yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const VolRegisterSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(6, "Username must have at least 6 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
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
  dob: yup
    .date()
    .typeError("Invalid date") // Custom error message for invalid date
    .required("Date of Birth is required")
    .test("age", "You must be at least 18 years old", (value) => {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }),
  forename: yup.string().required("Forename is required"),
  surname: yup.string().required("Surname is required"),
  confirmTerms: yup
    .bool()
    .oneOf([true], "You must accept the terms and conditions"),
});
