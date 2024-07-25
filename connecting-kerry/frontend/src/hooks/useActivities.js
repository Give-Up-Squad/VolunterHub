import { useState, useEffect } from "react";
import { useUser } from "../contexts/userContext";

const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: userLoading } = useUser();

  const fetchActivities = async () => {
    setLoading(true);
    try {
      let apiUrl = "";
      if (user) {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/activities/organisation/display/${user.org_id}`;
        if (user.roles === "Volunteer") {
          apiUrl = `${process.env.REACT_APP_API_URL}/api/activities/volunteer/display/${user.volunteer_id}`;
        }
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

  useEffect(() => {
    fetchActivities();
  }, [user, userLoading]);

  const refetchActivities = () => {
    fetchActivities();
  };

  const cancelActivityVol = async (volunteer_id, activity_id) => {
    try {
      const backendData = {
        volunteer_id,
        activity_id,
      };
      console.log("Cancelling activity:", backendData);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/activities/volunteer/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(backendData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to cancel activity");
      }

      const responseData = await response.json();
      console.log("Backend response:", responseData);
      refetchActivities();
    } catch (error) {
      console.error("Error cancelling activity:", error.message);
      // Rethrow the error to let the calling function handle it
      throw error;
    }
  };

  return { activities, loading, error, refetchActivities, cancelActivityVol };
};

export default useActivities;
