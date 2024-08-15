import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";
import styles from "../styles/usersDisplay.module.css";
import LoadingPage from "./loadingPage";

export default function UsersDisplay() {
  const { user, loading: userLoading, error: userError } = useUser();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("Volunteers");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/display`,
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
          setUsers([]);
        } else if (response.status === 500) {
          throw new Error(response.error || "Failed to fetch users");
        } else {
          throw new Error("Failed to fetch users");
        }
      } else {
        const data = await response.json();
        console.log("Users data:", data);
        setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "Volunteers") {
      return user.roles.includes("Volunteer");
    } else if (filter === "Organisations") {
      return user.roles.includes("Organisation");
    } else if (filter === "Admin") {
      return user.roles.includes("Admin");
    }
    return true;
  });

  useEffect(() => {
    if (userLoading) return;
    if (!user) return;
    fetchUsers();
  }, [user, userLoading]);
  return (
    <div className={styles.applicationContainer}>
      <h1 className={styles.title}>All user details</h1>
      {/* <p>Here displays all users</p> */}
      <div className={styles.filterContainer}>
        <label htmlFor="statusFilter">Filter by role:</label>
        <select
          id="statusFilter"
          value={filter}
          onChange={handleFilterChange}
          className={styles.filterSelect}
        >
          <option value="Volunteers">Volunteers</option>
          <option value="Organisations">Organisations</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      {loading ? (
        <LoadingPage />
      ) : error ? (
        <p>Error: {error}</p>
      ) : filteredUsers.length === 0 ? (
        "No users found"
      ) : (
        <table className={styles.usersTable}>
          <thead>
            <tr>
              {filter === "Volunteers" ? (
                <th>Name</th>
              ) : (
                <th>Organisation Name</th>
              )}
              <th>Email</th>
              <th>Role</th>
              <th>Garda Vetted Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                {filter === "Volunteers" ? (
                  <td data-label="Name">
                    {user.forename + " " + user.surname}
                  </td>
                ) : (
                  <td data-label="Name">{user.org_name}</td>
                )}
                <td data-label="Email">{user.email}</td>
                <td data-label="Roles">{user.roles}</td>
                <td data-label="Garda Vetted Status">{user.is_garda_vetted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
