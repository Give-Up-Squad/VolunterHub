import React from "react";
import styles from "../styles/eventCard.module.css";

export default function EventCard({
  Activity_name,
  Activity_description,
  Activity_start_date,
  Activity_end_date,
  Application_deadline,
  status,
}) {
  return (
    <div className={styles.eventCard}>
      <h1>{Activity_name}</h1>
      <p>Description: {Activity_description}</p>
      <p>Start Date: {Activity_start_date}</p>
      <p>End Date: {Activity_end_date}</p>
      <p>Application Deadline: {Application_deadline}</p>
      <p>Status: {status}</p>
    </div>
  );
}
