import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";
import styles from "../styles/approvals.module.css";
import Modal from "./modal";
import EventCard from "./eventCard";

export default function Approvals() {
  const { user, loading: userLoading, error: userError } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvals, setApprovals] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPendingActivities = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/activities/pending`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setApprovals([]);
        } else {
          throw new Error("Failed to fetch pending activities");
        }
      } else {
        const data = await response.json();
        console.log("Pending activities data:", data.activities);
        setApprovals(data.activities);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLoading) return;
    if (!user) return;

    fetchPendingActivities();
  }, [user, userLoading]);

  const handleApproveClick = async (activity_id) => {
    console.log(`Approve activity with ID: ${activity_id}`);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/activities/approve/${activity_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve activity");
      }

      fetchPendingActivities();
    } catch (error) {
      console.error("Error approving activity:", error.message);
    }
  };

  const handleRejectClick = async (activity_id) => {
    console.log(`Reject activity with ID: ${activity_id}`);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/activities/reject/${activity_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reject activity");
      }

      fetchPendingActivities();
    } catch (error) {
      console.error("Error rejecting activity:", error.message);
    }
  };

  const handleViewClick = (activity) => {
    console.log("View activity:", activity);
    setSelectedEvent(activity);
    setIsModalOpen(true);
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
    <div className={styles.approvalsContainer}>
      <h1 className={styles.title}>Pending Approvals</h1>
      {approvals.length === 0 ? (
        <p>There's no pending activities.</p>
      ) : (
        <table className={styles.approvalsTable}>
          <thead>
            <tr>
              <th>Organisation Name</th>
              <th>Activity Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((activity) => (
              <tr key={activity.activity_id}>
                <td>{activity.org_name}</td>
                <td>{activity.activity_name}</td>
                <td>
                  <button
                    className={styles.viewButton}
                    onClick={() => handleViewClick(activity)}
                  >
                    View Details
                  </button>
                  <button
                    className={styles.approveButton}
                    onClick={() => handleApproveClick(activity.activity_id)}
                  >
                    Approve
                  </button>
                  <button
                    className={styles.rejectButton}
                    onClick={() => handleRejectClick(activity.activity_id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedEvent && (
        <div className={styles.overlay}>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <EventCard activity={selectedEvent} closeModal={closeModal} />
          </Modal>
        </div>
      )}
    </div>
  );
}
