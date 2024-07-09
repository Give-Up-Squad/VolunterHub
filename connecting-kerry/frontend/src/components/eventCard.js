import React from "react";
import styles from "../styles/eventCard.module.css";
import useDateFormat from "../hooks/useDates";

export default function EventCard({
  activity_name,
  activity_description,
  activity_start_date,
  activity_end_date,
  activity_deadline,
  activity_status,
  max_participants,
  min_participants,
  available_participants,
  closeModal,
}) {
  const { formatDate, formatDateTime } = useDateFormat();
  return (
    <div className={styles.eventCard}>
      <h1>
        <strong>{activity_name}</strong>
      </h1>
      <p>Description: {activity_description}</p>
      <p>Start Date: {formatDateTime(activity_start_date)}</p>
      <p>End Date: {formatDateTime(activity_end_date)}</p>
      <p>Deadline: {formatDateTime(activity_deadline)}</p>
      <p>Status: {activity_status}</p>
      <hr />
      <h2>Participant Details</h2>
      <p>Maximum Participants: {max_participants}</p>
      <p>Minimum Participants: {min_participants}</p>
      <p>Available Participants: {available_participants}</p>
      <div className={styles.eventCardButtons}>
        <button type="button" className={styles.applyButton}>
          Apply
        </button>
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}
