import React from "react";
import styles from "../styles/registerForms.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { VolRegisterSchema } from "../validations/volRegValidation";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
const VolunteerRegistration = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VolRegisterSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userCredentials = await doCreateUserWithEmailAndPassword(
        data.email,
        data.password
      );
      const user = userCredentials.user;
      console.log("User registered successfully:", user);

      const authToken = await user.getIdToken();
      sessionStorage.setItem("authToken", authToken);
      navigate("/volunteer");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
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
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>
        <div className={styles.inputField}>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            required
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.inputField}>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            required
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.inputField}>
          <select {...register("gender")} required>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className={styles.error}>{errors.gender.message}</p>
          )}
        </div>
        <div className={styles.inputField}>
          <input type="date" {...register("dob")} required />
          {errors.dob && <p className={styles.error}>{errors.dob.message}</p>}
        </div>
        <div className={styles.inputField}>
          <input
            type="text"
            {...register("forename")}
            placeholder="Forename"
            required
          />
          {errors.forename && (
            <p className={styles.error}>{errors.forename.message}</p>
          )}
        </div>
        <div className={styles.inputField}>
          <input
            type="text"
            {...register("surname")}
            placeholder="Surname"
            required
          />
          {errors.surname && (
            <p className={styles.error}>{errors.surname.message}</p>
          )}
        </div>
        {/* <div className={styles.inputField}>
          <input type="file" {...register("file")} />
          {errors.file && <p className={styles.error}>{errors.file.message}</p>}
        </div> */}
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
