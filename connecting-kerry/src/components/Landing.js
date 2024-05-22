import React from "react";
import Navbar from "./navbar";
import styles from "../styles/landing.module.css";

export default function Landing() {
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
