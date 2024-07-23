import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/loadingPage.module.css";

const LoadingPage = ({ loadingText }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>{loadingText}</p>
    </div>
  );
};

LoadingPage.propTypes = {
  loadingText: PropTypes.string,
};

LoadingPage.defaultProps = {
  loadingText: "Loading...",
};

export default LoadingPage;
