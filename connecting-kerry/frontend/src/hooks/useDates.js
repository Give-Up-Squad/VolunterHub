import { useCallback } from "react";

const useDateFormat = () => {
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

  return { formatDateTime, formatDate };
};

export default useDateFormat;
