import React from "react";
import Styles from "../styles/reviewPage.module.css";
export default function AccountReview() {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.reviewHeading}>Garda Vetting Status</h1>
      <p className={Styles.reviewText}>
        After you are garda vetted, you will be able to use all the features!
        <br></br>
        Please wait patiently for the approval process to be completed.
        <br></br>
        <br></br>
        <a href="/">Click to go back to main page</a>
      </p>
    </div>
  );
}
