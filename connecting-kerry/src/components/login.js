import React from 'react';
import styles from '../css/loginPage.module.css';

function Login() {
    return (
        <div className={styles.loginForm}>
            <form>
                <h1>Connecting Kerry</h1>
                <div className={styles.content}>
                    <div className={styles.inputField}>
                        <input type="email" placeholder="Email" autoComplete="nope" />
                    </div>
                    <div className={styles.inputField}>
                        <input type="password" placeholder="Password" autoComplete="new-password" />
                    </div>
                    <a href="#" className={styles.link}>Forgot Your Password?</a>
                </div>
                <div className={styles.action}>
                    <button>Register</button>
                    <button>Sign in</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
