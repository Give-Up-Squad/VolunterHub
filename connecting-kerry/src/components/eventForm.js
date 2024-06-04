import React from "react";
import styles from '../styles/registerForms.module.css';

function EventForm(){
    return(
        <form className={styles.registerForm}>
      <h2>Post a Volunteering Opportunity</h2>
      <div className={styles.content}>
        <div className={styles.inputField}>
        <label for="organisationName">Organisation Name* </label>
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
              placeholder="Contact"
              required
            />
        </div>

        <div className={styles.inputField}>
          <label for="organisationEmail">Contact Email* </label>
            <input
              type="text"
              name="organisationEmail"
              placeholder="Email"
              required
            />
        </div>

        <div className={styles.inputField}>
          <label for="phonePhone">Contact Phone Number</label>
            <input
              type="text"
              name="orgPhone"
              placeholder="Phone Number"
              required
            />
        </div>

        <div className={styles.inputField}>
          <label for="expiryDate">Expiry date of event</label>
            <input
              type="date"
              name="expiryDate"
              placeholder="Expiry Date"
              required
            />
        </div>

        <div className={styles.inputField}>
          <label for="role">Role/Title of the opportunity</label>
            <input
              type="text"
              name="role"
              placeholder="Role"
              required
            />
        </div>

        <div className={styles.inputField}>
          <label for="numOfVolunteers">Number of volunteers required</label>
            <input
              type="number"
              name="numOfVolunteers"
              placeholder="Number of volunteers"
              required
            />
        </div>

        <div className={styles.inputField}>
          <label for="opportunitySummary">Opportunity Summary</label>
            <input
              type="text"
              name="opportunitySummary"
              placeholder="summary"
              required
            />
        </div>

        <div className={styles.inputField}>
          <label for="location">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
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