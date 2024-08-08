import React from "react";
import styles from "../styles/registrationSuccess.module.css";

const RegistrationSuccess = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.reviewHeading}>Garda Vetting Status</h1>
      <p className={styles.reviewText}>
        After you are garda vetted, you will be able to use all the features!
        <br></br>
        Please wait patiently for the approval process to be completed.
        <br></br>
        <br></br>
        <a href="/">Click to go back to main page</a>
      </p>
    </div>
  );
};

export default RegistrationSuccess;
