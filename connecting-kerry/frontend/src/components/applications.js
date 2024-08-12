import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";
import styles from "../styles/applications.module.css";
import useDateFormat from "../hooks/useDates";
import EventCard from "./eventCard";
import Modal from "./modal";
import useActivities from "../hooks/useActivities";
import { useNavigate } from "react-router-dom";

export default function Applications() {
  const { user, loading: userLoading, error: userError } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const { formatDateTime } = useDateFormat();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("Upcoming");
  const { cancelActivityVol, cancelActivityOrg } = useActivities();
  const navigate = useNavigate();

  // State for confirmation modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [activityToCancel, setActivityToCancel] = useState(null);

  const fetchActivities = async (status) => {
    setLoading(true);
    try {
      let apiUrl = "";
      if (user.roles !== "Volunteer") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/activities/organisation/${user.org_id}`;
      } else {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/activities/volunteer/${user.volunteer_id}?status=${status}`;
      }
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      console.log("Response:", response);
      if (!response.ok) {
        if (response.status === 404) {
          console.log("No activities found");
          setActivities([]);
        } else {
          throw new Error(response.error || "Failed to fetch applications");
        }
      } else {
        const data = await response.json();
        console.log("Applications data:", data.activities);

        const sortedActivities = data.activities.sort((a, b) => {
          if (
            a.activity_status === "Cancelled" &&
            b.activity_status !== "Cancelled"
          ) {
            return -1;
          } else if (
            a.activity_status !== "Cancelled" &&
            b.activity_status === "Cancelled"
          ) {
            return 1;
          }
          return 0;
        });

        setActivities(sortedActivities);
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

    fetchActivities(filter);
  }, [user, userLoading, filter]);

  const handleViewClick = (activity) => {
    console.log("View activity:", activity);
    setSelectedEvent(activity);
    setIsModalOpen(true);
  };

  const handleCancelClickVol = (volunteer_id, activity_id) => {
    // Set the activity to be canceled and open the confirmation modal
    setActivityToCancel({ type: "volunteer", volunteer_id, activity_id });
    setIsConfirmModalOpen(true);
  };

  const handleCancelClickOrg = (org_id, activity_id) => {
    // Set the activity to be canceled and open the confirmation modal
    setActivityToCancel({ type: "organisation", org_id, activity_id });
    setIsConfirmModalOpen(true);
  };

  const confirmCancelActivity = async () => {
    const { type, volunteer_id, activity_id, org_id } = activityToCancel;

    try {
      if (type === "volunteer") {
        await cancelActivityVol(volunteer_id, activity_id);
      } else {
        await cancelActivityOrg(org_id, activity_id);
      }

      navigate("/loading", {
        state: { loadingText: "Cancelling activity..." },
      });

      setTimeout(() => {
        navigate("/applications", { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Error cancelling activity:", error.message);

      if (error.response && error.response.data && error.response.data.error) {
        const backendError = error.response.data.error;
        console.log("Caught backend error:", backendError);

        if (backendError.includes("48 hours")) {
          alert("Cannot cancel activity within 48 hours.");
        } else {
          alert("Failed to cancel activity.");
        }
      } else {
        console.log("Caught error:", error.message);
        alert("Failed to cancel activity.");
      }
    } finally {
      setIsConfirmModalOpen(false); // Close the confirmation modal after the process
      setActivityToCancel(null); // Reset the activity to cancel
    }
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setActivityToCancel(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  if (userLoading || loading) {
    return <div>Loading...</div>;
  }

  if (userError || (error && activities.length === 0)) {
    return <div>Error: {userError || error}</div>;
  }

  return (
    <div className={styles.applicationContainer}>
      <h1 className={styles.title}>
        {user.roles === "Volunteer" ? "Applications" : "Events"}
      </h1>
      <p>List of all the events you have applied for. </p>

      {user.roles === "Volunteer" && (
        <div className={styles.filterContainer}>
          <label htmlFor="statusFilter">Filter by status:</label>
          <select
            id="statusFilter"
            value={filter}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      )}

      {activities.length === 0 ? (
        <p>
          {user.roles !== "Volunteer"
            ? "You have not created any events."
            : "You have not joined any events."}
        </p>
      ) : (
        <table className={styles.applicationTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              {user.roles === "Organisation" && (
                <>
                  <th>Approval Status</th>
                  <th>Activity Status</th>
                </>
              )}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.activity_id}>
                <td data-label="Activity Name">{activity.activity_name}</td>
                <td data-label="Start Date">
                  {formatDateTime(activity.activity_start_date)}
                </td>
                <td data-label="End Date">
                  {formatDateTime(activity.activity_end_date)}
                </td>
                {user.roles === "Organisation" && (
                  <>
                    <td>{activity.activity_approval_status}</td>
                    <td>{activity.activity_status}</td>
                  </>
                )}
                <td>
                  <button
                    className={styles.viewButton}
                    onClick={() => handleViewClick(activity)}
                  >
                    View
                  </button>
                  {user.roles === "Volunteer" && filter !== "Cancelled" && (
                    <button
                      className={styles.cancelButton}
                      onClick={() =>
                        handleCancelClickVol(
                          user.volunteer_id,
                          activity.activity_id
                        )
                      }
                    >
                      Cancel
                    </button>
                  )}
                  {user.roles !== "Volunteer" &&
                    activity.activity_status === "Upcoming" && (
                      <button
                        className={styles.cancelButton}
                        onClick={() =>
                          handleCancelClickOrg(
                            activity.org_id,
                            activity.activity_id
                          )
                        }
                      >
                        Cancel
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <Modal isOpen={isConfirmModalOpen} onClose={closeConfirmModal}>
          <div className={styles.confirmationModalContent}>
            <h2>Are you sure you want to cancel this activity?</h2>
            <div className={styles.modalButtons}>
              <button
                onClick={confirmCancelActivity}
                className={styles.confirmButton}
              >
                Yes, Cancel
              </button>
              <button
                onClick={closeConfirmModal}
                className={styles.cancelButton}
              >
                No, Go Back
              </button>
            </div>
          </div>
        </Modal>
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
