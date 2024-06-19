import React from "react";
import styles from "../styles/error404.module.css";

function Error404() {
  return (
    <div>
      <h1>404 Error</h1>
      <section className={styles["error-container"]}>
        <span className={`${styles["digit"]} ${styles["four"]}`}>
          <span className={styles["screen-reader-text"]}>4</span>
        </span>
        <span className={`${styles["digit"]} ${styles["zero"]}`}>
          <span className={styles["screen-reader-text"]}>0</span>
        </span>
        <span className={`${styles["digit"]} ${styles["four"]}`}>
          <span className={styles["screen-reader-text"]}>4</span>
        </span>
      </section>
      <div className={styles["link-container"]}>
        <a href="/" className={styles["more-link"]}>
          Home Page
        </a>
      </div>
    </div>
  );
}

export default Error404;
