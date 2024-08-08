import React from "react";
import styles from "../styles/registerForms.module.css";

const BaseRegistrationForm = ({
  formData,
  handleChange,
  handleSubmit,
  title,
  additionalFields,
}) => (
  <form onSubmit={handleSubmit} className={styles.registerForm}>
    <h2>{title}</h2>
    <div className={styles.content}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className={styles.inputField}
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className={styles.inputField}
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className={styles.inputField}
        required
      />
      {additionalFields}
      <a href="/login" className={styles.link}>
        Already have an account? Login here
      </a>
    </div>
    <div className={styles.action}>
      <button type="submit">Register</button>
    </div>
  </form>
);

export default BaseRegistrationForm;
