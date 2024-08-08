import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import LoadingPage from "./loadingPage"; // Adjust path if needed

const ProtectedRoute = ({
  children,
  requiredRoles = [],
  requiredStatus = null,
}) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return <LoadingPage loadingText="Loading user data..." />; // Use your loading component
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredStatus && user.is_garda_vetted === requiredStatus) {
    return <Navigate to="/review" replace />;
  }

  if (requiredRoles.length && !requiredRoles.includes(user.role)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
