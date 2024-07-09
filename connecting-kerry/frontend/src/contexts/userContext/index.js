import React, { useEffect, useContext, useState } from "react";
import { useAuth } from "../authContext";

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

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        console.log("data:", data);
        setUser(data.user[0]);
      } catch (err) {
        console.error(err);
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
  }, [userLoggedIn]);

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
      {!loading && children}
    </UserContext.Provider>
  );
};
