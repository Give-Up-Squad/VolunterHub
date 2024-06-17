import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/roleChoice.module.css";

export default function RoleChoice() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");

  const handleSelection = (type) => {
    setUserType(type);
  };

  const handleCreateAccount = () => {
    if (userType === "volunteer") {
      navigate("/volRegister");
    } else if (userType === "organisation") {
      navigate("/orgRegister");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Join as a volunteer or organisation</h1>
      <div className={styles.selectionContainer}>
        <div
          className={`${styles.selectionBox} ${
            userType === "volunteer" ? styles.selected : ""
          }`}
          onClick={() => handleSelection("volunteer")}
        >
          <div className={styles.icon}>👤</div>
          <div className={styles.text}>
            I’m a volunteer, looking for volunteering opportunities
          </div>
          <div
            className={`${styles.checkbox} ${
              userType === "volunteer" ? styles.checked : ""
            }`}
          ></div>
        </div>
        <div
          className={`${styles.selectionBox} ${
            userType === "organisation" ? styles.selected : ""
          }`}
          onClick={() => handleSelection("organisation")}
        >
          <div className={styles.icon}>🌱</div>
          <div className={styles.text}>
            As an organisation, request for volunteers
          </div>
          <div
            className={`${styles.checkbox} ${
              userType === "organisation" ? styles.checked : ""
            }`}
          ></div>
        </div>
      </div>
      <button
        className={styles.createAccountBtn}
        disabled={!userType}
        onClick={handleCreateAccount}
      >
        Create Account
      </button>
      <div className={styles.loginLink}>
        Already have an account? <a href="/login">Log In</a>
      </div>
    </div>
  );
}
