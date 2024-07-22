import React, { useEffect, useState } from "react";
import styles from "../styles/eventCard.module.css";
import useDateFormat from "../hooks/useDates";
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import useActivities from "../hooks/useActivities";
import LoadingPage from "./loadingPage";

export default function EventCard({ activity, closeModal, refetchActivities }) {
  const {
    activity_id,
    activity_name,
    activity_description,
    activity_start_date,
    activity_end_date,
    activity_deadline,
    activity_status,
    max_participants,
    min_participants,
    available_participants,
    org_id,
    activity_approval_status,
    type,
  } = activity;

  const { user } = useUser();
  const { formatDateTime } = useDateFormat();
  const navigate = useNavigate();
  const { cancelActivity } = useActivities();
  const [loading, setLoading] = useState(false);

  const handleApplyClick = async () => {
    try {
      const backendData = {
        volunteer_id: user.volunteer_id,
        activity_id: activity_id,
      };
      console.log("Applying for event:", backendData);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/activities/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backendData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to apply event");
      }

      const responseData = await response.json();
      console.log("Backend response:", responseData);
      closeModal();
      navigate("/loading", {
        state: { loadingText: "Applying activity..." },
      });

      setTimeout(() => {
        navigate("/applications", { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Error registering volunteer:", error.message);
    }
  };

  const handleCancelClick = async () => {
    console.log(
      `Cancel activity with ID: ${activity_id} for volunteer ID: ${user.volunteer_id}`
    );

    try {
      await cancelActivity(user.volunteer_id, activity_id);
    } catch (error) {
      console.error("Error cancelling activity:", error.message);
    }
    closeModal();
    navigate("/loading", { state: { loadingText: "Cancelling activity..." } });

    setTimeout(() => {
      navigate("/calendar", { replace: true });
    }, 1000);
  };

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
        {user.roles === "Volunteer" && type === "blue" && (
          <button
            type="button"
            className={styles.applyButton}
            onClick={handleApplyClick}
          >
            Apply
          </button>
        )}
        {type === "green" && (
          <button
            type="button"
            className={styles.applyButton}
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        )}
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}
