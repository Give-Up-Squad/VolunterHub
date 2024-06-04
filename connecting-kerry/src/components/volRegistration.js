import React from "react";
import styles from "../styles/registerForms.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const VolunteerRegistration = () => {
  const VolRegisterSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(6, "Username must have at least 6 characters")
      .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must have at least one uppercase letter")
      .matches(/[a-z]/, "Password must have at least one lowercase letter")
      .matches(/[0-9]/, "Password must have at least one number")
      .matches(/[\W_]/, "Password must have at least one special character"),
    gender: yup
      .string()
      .oneOf(["male", "female", "other"], "Invalid gender selection")
      .required("Gender is required"),
    dob: yup
      .date()
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
    forename: yup
      .string()
      .required("Forename is required"),
    surname: yup
      .string()
      .required("Surname is required"),
    file: yup
      .mixed()
      .required("File is required")
      .test("fileSize", "File is too large", (value) => value && value.size <= 1048576)
      .test("fileType", "Unsupported File Format", (value) => {
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
        return value && allowedTypes.includes(value.type);
      })
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(VolRegisterSchema),
    mode: "onTouched"
  });

  const onSubmit = (data) => {
    console.log(data);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
      <h2>Volunteer Registration</h2>
      <div className={styles.content}>
        <div className={styles.inputField}>
          <input
            type="text"
            {...register("username")}
            placeholder="Username"
            required
          />
          {errors.username && <p className={styles.error}>{errors.username.message}</p>}
        </div>
        <div className={styles.inputField}>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            required
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>
        <div className={styles.inputField}>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            required
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        <div className={styles.inputField}>
          <select
            {...register("gender")}
            required
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className={styles.error}>{errors.gender.message}</p>}
        </div>
        <div className={styles.inputField}>
          <input
            type="date"
            {...register("dob")}
            required
          />
          {errors.dob && <p className={styles.error}>{errors.dob.message}</p>}
        </div>
        <div className={styles.inputField}>
          <input
            type="text"
            {...register("forename")}
            placeholder="Forename"
            required
          />
          {errors.forename && <p className={styles.error}>{errors.forename.message}</p>}
        </div>
        <div className={styles.inputField}>
          <input
            type="text"
            {...register("surname")}
            placeholder="Surname"
            required
          />
          {errors.surname && <p className={styles.error}>{errors.surname.message}</p>}
        </div>
        <div className={styles.inputField}>
          <input type="file" {...register("file")} />
          {errors.file && <p className={styles.error}>{errors.file.message}</p>}
        </div>
        <hr />
        <a href="/login" className={styles.link}>
          Already have an account? Login here
        </a>
      </div>
      <div className={styles.action}>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default VolunteerRegistration;
