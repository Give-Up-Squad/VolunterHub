import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/loginPage.module.css";
import { LoginSchema } from "../validations/loginValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { doSignInWithEmailAndPassword } from "../firebase/auth";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User logged in successfully", result);
        navigate("/volunteer");
      } else {
        console.log("Failed to log in user");
      }
    } catch (error) {
      console.log("Error logging in user", error);
    }
  };

  const registerClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Connecting Kerry</h1>
        <div className={styles.content}>
          <div className={styles.inputField}>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              autoComplete="off"
            />
            {errors.email && (
              <div className={styles.error}>{errors.email.message}</div>
            )}
          </div>
          <div className={styles.inputField}>
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              {...register("password")}
            />
            {errors.password && (
              <div className={styles.error}>{errors.password.message}</div>
            )}
          </div>
          <a href="#" className={styles.link}>
            Forgot Your Password?
          </a>
        </div>
        <div className={styles.action}>
          <button type="submit">Sign in</button>
          <button onClick={registerClick}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
