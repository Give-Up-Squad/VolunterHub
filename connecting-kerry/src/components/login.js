import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/loginPage.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function Login() {
  const onSubmit = (data) => {
    console.log(data);
  };

  const LoginSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").max(14, "Password cannot exceed 14 characters").required("Password is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const navigate = useNavigate();

  const registerClick = (e) => {
    e.preventDefault();
    navigate("/volRegister");
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
            {errors.email && <div className={styles.error}>{errors.email.message}</div>}
          </div>
          <div className={styles.inputField}>
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              {...register("password")}
            />
            {errors.password && <div className={styles.error}>{errors.password.message}</div>}
          </div>
          <a href="#" className={styles.link}>
            Forgot Your Password?
          </a>
        </div>
        <div className={styles.action}>
          <button onClick={registerClick}>Register</button>
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
