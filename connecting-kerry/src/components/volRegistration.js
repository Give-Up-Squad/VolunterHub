import React from "react";
import styles from "../styles/volRegistration.module.css";

export default function VolunteerRegister() {
  return (
    <div className={styles.registerForm}>
      <form>
        <h1>Volunteer Registration</h1>
        <div className={styles.content}>
          <div className={styles.inputField}>
            <label htmlFor="first_name">First Name</label>
            <input type="text" id="first_name" name="first_name" required />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="last_name">Last Name</label>
            <input type="text" id="last_name" name="last_name" required />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="phone">Phone</label>
            <input type="text" name="phone" id="phone" />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" name="dob" id="dob" required />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="street">Street</label>
            <input type="text" name="street" id="street" required />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" required />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="county">County</label>
            <input type="text" name="county" id="county" required />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="eirCode">Eir Code</label>
            <input type="text" name="eirCode" id="eirCode" required />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              required
            />
          </div>
          <div className={styles.action}>
            <button type="submit">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}
