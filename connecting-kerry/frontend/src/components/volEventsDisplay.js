import React, { useState } from "react";
import styles from "../styles/volEventsDisplay.module.css";
import EventCard from "./eventCard";
import useActivities from "../hooks/useActivities";
import { useUser } from "../contexts/userContext";
import Modal from "./modal.js";
import useDateFormat from "../hooks/useDates.js";

export default function VolEventsDisplay() {
  const { user, loading: userLoading, error: userError } = useUser();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { activities, loading, error, refetchActivities } = useActivities();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { formatDate, formatDateTime } = useDateFormat();
  const defaultImageUrl = "https://via.placeholder.com/150";

  const handleApplyClick = (activity) => {
    setSelectedEvent({ ...activity, type: "blue" });
    setIsModalOpen(true);
  };

  const handleViewClick = (activity) => {
    setSelectedEvent({ ...activity, type: "blue" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.volEventsDisplay}>
        <h1>
          <strong>Volunteering Events</strong>
          <p className={styles.description}>Here you can find all the events that are currently looking for volunteers.</p>
        </h1>
        
        {activities.map((activity) => (
          <div key={activity.activity_id} className={styles.activityCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardSection}>
                <img
                  src={activity.activity_image || defaultImageUrl}
                  alt="Event"
                  className={styles.eventImage}
                />
              </div>
              <div className={styles.cardSection}>
                <label>Name:</label>
                <p>{activity.activity_name}</p>
                <label>Start Date:</label>
                <p>{formatDateTime(activity.activity_start_date)}</p>
                <label>End Date:</label>
                <p>{formatDateTime(activity.activity_end_date)}</p>
              </div>
              <div className={styles.cardSection}>
                <label>Deadline:</label>
                <p>{formatDate(activity.activity_deadline)}</p>
                <label>Location:</label>
                <p>{activity.activity_status}</p>
                <label>Available Participants:</label>
                <p>{activity.available_participants}</p>
              </div>
              <div className={styles.volButtons}>
              {user.roles !== "Organisation" && (
                <button
                  type="button"
                  className={styles.applyButton}
                  onClick={() => handleApplyClick(activity)}
                >
                  Apply
                </button>
              )}
              <button
                className={styles.viewButton}
                onClick={() => handleViewClick(activity)}
              >
                View
              </button>
            </div>
            </div>
            
          </div>
        ))}
        {selectedEvent && (
          <div className={styles.overlay}>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <EventCard
                activity={selectedEvent}
                closeModal={closeModal}
                refetchActivities={refetchActivities}
              />
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}
