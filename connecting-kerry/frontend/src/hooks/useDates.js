import { useCallback } from "react";

const useDateFormat = () => {
  const formatDateForDB = useCallback((dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = "00"; // Always set to 00

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }, []);

  const formatDateTime = useCallback((dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(dateString)
      .toLocaleString("en-GB", options)
      .replace(",", "");
  }, []);

  const formatDate = useCallback((dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  }, []);

  return { formatDateTime, formatDate, formatDateForDB };
};

export default useDateFormat;
