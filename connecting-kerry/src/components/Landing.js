import React from "react";
import styles from "../styles/landing.module.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const loginClick = () => {
    navigate("/login");
  };

  const registerClick = () => {
    navigate("/volRegister");
  };

  const aboutUsClick = () => {
    navigate("/about");
  };

  return (
    <React.Fragment>
      <div className={styles.LandingPage}>
        <img
          src="/images/LandingPageBackground.avif"
          className={styles.bg}
          alt="Overlay"
        />
        <div className={styles.overlay}></div>
        <h1 className={styles.title}>
          Welcome to Connecting Kerry! Let's Get Started!
        </h1>
        <div className={styles.buttons}>
          <button type="button" className={styles.LogIn} onClick={loginClick}>
            Log In
          </button>
          <button
            type="button"
            className={styles.SignUp}
            onClick={registerClick}
          >
            Sign Up
          </button>
          <button
            type="button"
            className={styles.AboutUs}
            onClick={aboutUsClick}
          >
            About Us
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
