import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";
import styles from "../styles/applications.module.css";
import useDateFormat from "../hooks/useDates";
import EventCard from "./eventCard";
import Modal from "./modal";

export default function Applications() {
  const { user, loading: userLoading, error: userError } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const { formatDate, formatDateTime } = useDateFormat();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userLoading) return;
    if (!user) return;

    const fetchActivities = async () => {
      setLoading(true);
      try {
        let apiUrl = "";
        if (user.roles !== "Volunteer") {
          apiUrl = `${process.env.REACT_APP_API_URL}/api/activities/organisation/${user.org_id}`;
        } else {
          apiUrl = `${process.env.REACT_APP_API_URL}/api/activities/volunteer/${user.volunteer_id}`;
        }
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        console.log("Applications data:", data.activities);
        setActivities(data.activities);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user, userLoading]);

  const handleViewClick = (activity) => {
    setSelectedEvent(activity);
    setIsModalOpen(true);
  };

  const handleCancelClick = (activityId) => {
    // Implement cancel functionality here
    console.log(`Cancel activity with ID: ${activityId}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  if (userLoading || loading) {
    return <div>Loading...</div>;
  }

  if (userError || error) {
    return <div>Error: {userError || error}</div>;
  }

  return (
    <div className={styles.applicationContainer}>
      <h1 className={styles.title}>Applications</h1>
      <table className={styles.applicationTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.activity_id}>
              <td>{activity.activity_name}</td>
              <td>{formatDateTime(activity.activity_start_date)}</td>
              <td>{formatDateTime(activity.activity_end_date)}</td>
              <td>
                <button
                  className={styles.viewButton}
                  onClick={() => handleViewClick(activity)}
                >
                  View
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => handleCancelClick(activity)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEvent && (
        <div className={styles.overlay}>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <EventCard {...selectedEvent} closeModal={closeModal} />
          </Modal>
        </div>
      )}
    </div>
  );
}
