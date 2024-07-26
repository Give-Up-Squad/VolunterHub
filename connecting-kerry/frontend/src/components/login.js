import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/loginPage.module.css";
import { LoginSchema } from "../validations/loginValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/authContext"; // Import useAuth hook
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useUser } from "../contexts/userContext";

function Login() {
  const navigate = useNavigate();
  const { currentUser, userLoggedIn } = useAuth(); // Access userLoggedIn from AuthContext
  const { user, loading } = useUser();
  const [error, setError] = useState(null); // State to hold error message

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
      const userCredential = await doSignInWithEmailAndPassword(
        data.email,
        data.password
      );
      console.log("User logged in successfully:", userCredential.user);
      const checkUserLoaded = (callback) => {
        const interval = setInterval(() => {
          if (!loading && user) {
            clearInterval(interval);
            callback(user);
          }
        }, 100);
      };

      checkUserLoaded((user) => {
        if (user.is_garda_vetted === "Pending") {
          console.log("User is Garda vetted pending");

          navigate("/loading", {
            state: { loadingText: "Checking Garda Vetting Status..." },
          });

          setTimeout(() => {
            navigate("/review", { replace: true });
          }, 900);
        } else {
          console.log("User is Garda vetted");

          navigate("/loading", {
            state: { loadingText: "Loading user data..." },
          });

          setTimeout(() => {
            navigate("/calendar", { replace: true });
          }, 1000);
        }
      });
    } catch (error) {
      console.error("Error logging in user", error.message);
      setError("Failed to login. Please check your email and password.");
    }
  };

  const registerClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  // Redirect if user is already logged in
  if (userLoggedIn) {
    console.log("User already logged in:", currentUser);
    navigate("/volunteer");
    return null; // Or loading indicator if needed
  }

  return (
    <div className={styles.container}>
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
              {error && <div className={styles.error}>{error}</div>}{" "}
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
    </div>
  );
}

export default Login;
