import React from "react";
import styles from '../styles/registerForms.module.css';

function EventForm(){
    return(
        <form className={styles.registerForm}>
      <h2>Organisation Registration</h2>
      <div className={styles.content}>
        <div className={styles.inputField}>
        <label for="organisationName">Organisation Name </label>
          <input
            type="text"
            name="organisationName"
            placeholder=""
            required
          />
        </div>
        <div className={styles.inputField}>
        <label for="contact">Name of contact person for this role* </label>
          <input
            type="email"
            name="contact"
            placeholder=""
            required
          />
        </div>
        <div className={styles.inputField}>
            <label for="organisationEmail">Organisation Email * </label>
          <input
            type="text"
            name="organisationEmail"
            placeholder=""
            required
          />
        </div>
        <div className={styles.inputField}>
            <label for="phoneNumber">Organisation Phone Number</label>
          <input
            type="text"
            name="orgName"
            placeholder="phoneNumber"
            required
          />
        </div>
        <div className={styles.inputField}>
            <label for="phoneNumber">Organisation Phone Number</label>
          <input
            type="text"
            name="orgName"
            placeholder="phoneNumber"
            required
          />
        </div>
      </div>
      <div className={styles.action}>
        <button type="submit">Register Opportunity</button>
      </div>
    </form>
    )
}

export default EventForm;