import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext"; // Import useAuth hook for authentication context
import styles from "../styles/userProfile.module.css";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching user details for:", currentUser);

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api-users-display/${currentUser.email}`
        );
        console.log(process.env.REACT_APP_API_URL);
        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to fetch user details");
        }

        const userData = await response.json();
        console.log("User details fetched successfully:", userData);
        if (userData.user && userData.user.length > 0) {
          setUserDetails(userData.user[0]); // Access the first element of the user array
        } else {
          setError("No user details found.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  // Conditional rendering based on loading state and error
  return (
    <div className={styles.userProfile}>
      <h2 className={styles.title}>User Profile</h2>
      {isLoading ? (
        <p>Loading user details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : userDetails ? (
        <div className={styles.profileDetails}>
          {userDetails.roles === "Volunteer" && (
            <>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>Username:</label>
                <input
                  className={styles.profileInput}
                  type="text"
                  value={userDetails.username}
                  readOnly
                />
              </div>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>Email:</label>
                <input
                  className={styles.profileInput}
                  type="email"
                  value={userDetails.email}
                  readOnly
                />
              </div>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>Date of Birth:</label>
                <input
                  className={styles.profileInput}
                  type="text"
                  value={new Date(userDetails.dob).toLocaleDateString()}
                  readOnly
                />
              </div>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>Forename:</label>
                <input
                  className={styles.profileInput}
                  type="text"
                  value={userDetails.forename}
                  readOnly
                />
              </div>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>Surname:</label>
                <input
                  className={styles.profileInput}
                  type="text"
                  value={userDetails.surname}
                  readOnly
                />
              </div>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>Garda Vetted:</label>
                <input
                  className={styles.profileInput}
                  type="text"
                  value={userDetails.is_garda_vetted}
                  readOnly
                />
              </div>
            </>
          )}
          {userDetails.roles === "Organisation" && (
            <>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>
                  Organisation Name:
                </label>
                <input
                  className={styles.profileInput}
                  type="text"
                  value={userDetails.org_name}
                  readOnly
                />
              </div>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>Email:</label>
                <input
                  className={styles.profileInput}
                  type="email"
                  value={userDetails.email}
                  readOnly
                />
              </div>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>Garda Vetted:</label>
                <input
                  className={styles.profileInput}
                  type="text"
                  value={userDetails.is_garda_vetted}
                  readOnly
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default UserProfile;
