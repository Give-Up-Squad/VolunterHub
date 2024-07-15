import { React, useEffect } from "react";
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
    setValue,
  } = useForm({
    resolver: yupResolver(VolRegisterSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    setValue("roles", "Volunteer");
  }, [setValue]);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (data) => {
    try {
      const userCredentials = await doCreateUserWithEmailAndPassword(
        data.email,
        data.password
      );
      const user = userCredentials.user;
      console.log("User registered successfully:", user);
      const authToken = await user.getIdToken();
      sessionStorage.setItem("authToken", authToken);

      const backendData = {
        username: data.username,
        email: data.email,
        is_garda_vetted: "Pending",
        roles: data.roles,
        dob: formatDate(data.dob),
        forename: data.forename,
        surname: data.surname,
        org_name: null,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/register`,
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
        throw new Error(errorData.error || "Failed to register volunteer");
      }

      const responseData = await response.json();
      console.log("Backend response:", responseData);

      navigate("/volunteer");
    } catch (error) {
      console.error("Error registering volunteer:", error.message);
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
        <input type="hidden" {...register("roles")} value="Volunteers" />
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
