import { React, useEffect } from "react";
import styles from "../styles/registerForms.module.css";
import { useForm } from "react-hook-form";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const OrganisationRegistration = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    setValue("roles", "Organisation");
  }, [setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userCredentials = await doCreateUserWithEmailAndPassword(
        data.email,
        data.password
      );
      const user = userCredentials.user;
      console.log("Organisation registered successfully:", user);

      const authToken = await user.getIdToken();
      sessionStorage.setItem("authToken", authToken);

      const backendData = {
        username: null,
        email: data.email,
        is_garda_vetted: "Pending",
        roles: data.roles,
        dob: null,
        forename: null,
        surname: null,
        org_name: data.orgName,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api-users-register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backendData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to register organisation");
      }

      const responseData = await response.json();
      console.log("Backend response:", responseData);

      navigate("/volunteer");
    } catch (error) {
      console.error("Error registering organisation:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
      <h2>Organisation Registration</h2>
      <div className={styles.content}>
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
          <input
            type="text"
            {...register("orgName")}
            placeholder="Organisation Name"
            required
          />
          {errors.orgName && (
            <p className={styles.error}>{errors.orgName.message}</p>
          )}
        </div>
        <input type="hidden" {...register("roles")} value="Organisation" />

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

export default OrganisationRegistration;
