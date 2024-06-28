import React, { useState } from "react";
import styles from "../styles/registerForms.module.css";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const OrganisationRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    orgName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await doCreateUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      const user = userCredentials.user;
      console.log("Organisation registered successfully:", user);

      // Handle setting authToken in sessionStorage
      const authToken = await user.getIdToken();
      sessionStorage.setItem("authToken", authToken);
      navigate("/volunteer");
    } catch (error) {
      console.error("Error registering organisation:", error.message);
    }
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
        {/* <div className={styles.inputField}>
          <input type="file" name="file" onChange={handleFileChange} />
        </div> */}
        <hr />
        <a href="/login" className={styles.link}>
          Already have an account? Login here
        </a>
      </div>
      <div className={styles.action}>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default OrganisationRegistration;
