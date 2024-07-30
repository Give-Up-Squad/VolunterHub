import React, { useEffect, useContext, useState } from "react";
import { useAuth } from "../authContext";
import LoadingPage from "../../components/loadingPage";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const { currentUser, userLoggedIn } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser) return;

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/users/display/${currentUser.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          }
        );

        console.log("Response:", response);
        if (!response.ok) {
          if (response.status === 404) {
            console.log("User not found");
            setUser(null);
          } else {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch user");
          }
        } else {
          const data = await response.json();
          console.log("Fetched user data:", data);
          setUser(data.user[0]);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userLoggedIn) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [currentUser, userLoggedIn]);

  useEffect(() => {
    console.log("User data:", user); // This will log whenever user state changes
  }, [user]);

  const value = {
    user,
    loading,
    error,
  };

  return (
    <UserContext.Provider value={value}>
      {loading ? <LoadingPage loadingText="Loading user data..." /> : children}
    </UserContext.Provider>
  );
};
