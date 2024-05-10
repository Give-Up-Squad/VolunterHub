import React from "react";
import styles from "../styles/Landing.module.css";

export default function Landing() {
  return (
    <React.Fragment>
      <div className={styles.LandingPage}>
        <img
          src="../../public/images/LandingPageBackground.avif"
          alt="Connecting Kerry Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>
          Welcome to Connecting Kerry! Let's Get Started!
        </h1>
        <div className={styles.buttons}>
          <button type="button" className={styles.LogIn}>
            Log In
          </button>
          <button type="button" className={styles.SignUp}>
            Sign Up
          </button>
          <button type="button" className={styles.AboutUs}>
            About Us
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
