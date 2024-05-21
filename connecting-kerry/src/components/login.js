import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/loginPage.module.css";

function Login() {
  const navigate = useNavigate();

  const registerClick = () => {
    navigate("/volRegister");
  };

  return (
    <div className={styles.loginForm}>
      <form>
        <h1>Connecting Kerry</h1>
        <div className={styles.content}>
          <div className={styles.inputField}>
            <input type="email" placeholder="Email" autoComplete="nope" />
          </div>
          <div className={styles.inputField}>
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>
          <a href="#" className={styles.link}>
            Forgot Your Password?
          </a>
        </div>
        <div className={styles.action}>
          <button onClick={registerClick}>Register</button>
          <button>Sign in</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
