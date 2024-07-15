import React from "react";
import styles from "../styles/landing.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Landing() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const joinUsClick = () => {
    navigate("/register");
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
          {!userLoggedIn && (
            <button
              type="button"
              className={styles.SignUp}
              onClick={joinUsClick}
            >
              Join Us
            </button>
          )}
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
