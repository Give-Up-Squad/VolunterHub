import React from "react";
import { useState } from "react";
import styles from "../styles/volEventsDisplay.module.css";
import EventCard from "./eventCard";

const activitiesDummy = [
  {
    Activity_ID: 1,
    Activity_name: "Beach Cleanup",
    Activity_description: "A community effort to clean up the local beach.",
    Activity_start_date: "2024-06-01T08:00:00",
    Activity_end_date: "2024-06-01T12:00:00",
    Application_deadline: "2024-05-25",
    status: "Open",
  },
  {
    Activity_ID: 2,
    Activity_name: "Tree Planting",
    Activity_description: "Help us plant trees in the local park.",
    Activity_start_date: "2024-07-15T09:00:00",
    Activity_end_date: "2024-07-15T13:00:00",
    Application_deadline: "2024-07-10",
    status: "Open",
  },
];

export default function VolEventsDisplay() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleViewClick = (activity) => {
    setSelectedEvent(activity);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className={styles.volEventsDisplay}>
      <h1>Volunteering Events</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Activity Name</th>
            <th>Activity Description</th>
            <th>Activity Start Date</th>
            <th>Activity End Date</th>
            <th>Application Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activitiesDummy.map((activity) => (
            <tr key={activity.Activity_ID}>
              <td>{activity.Activity_name}</td>
              <td>{activity.Activity_description}</td>
              <td>{activity.Activity_start_date}</td>
              <td>{activity.Activity_end_date}</td>
              <td>{activity.Application_deadline}</td>
              <td>{activity.status}</td>
              <td>
                <button
                  className={styles.viewButton}
                  onClick={() => handleViewClick(activity)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEvent && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <EventCard {...selectedEvent} />
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
