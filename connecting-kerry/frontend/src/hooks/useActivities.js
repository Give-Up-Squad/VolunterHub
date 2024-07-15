import { useState, useEffect } from "react";
import { useUser } from "../contexts/userContext";

const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: userLoading, error: userError } = useUser();

  useEffect(() => {
    if (userLoading) return;

    const fetchActivities = async () => {
      try {
        let apiUrl = `${process.env.REACT_APP_API_URL}/api/activities/display`;
        if (user.roles === "Volunteer") {
          apiUrl = `${process.env.REACT_APP_API_URL}/api/activities/display/${user.volunteer_id}`;
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data = await response.json();
        console.log("Activities data:", data);
        setActivities(data.activities);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user, userLoading]);

  return { activities, loading, error };
};

export default useActivities;
