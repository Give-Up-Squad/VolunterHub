import React, { useState } from "react";
import styles from "../styles/registerForms.module.css";

const OrganisationRegistration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    orgName: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <h2>Organisation Registration</h2>
      <div className={styles.content}>
        <div className={styles.inputField}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div className={styles.inputField}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.inputField}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className={styles.inputField}>
          <input
            type="text"
            name="orgName"
            value={formData.orgName}
            onChange={handleChange}
            placeholder="Organisation Name"
            required
          />
        </div>
        <div className={styles.inputField}>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>
      </div>
      <div className={styles.action}>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default OrganisationRegistration;
