import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Login from "./components/login";
import About from "./components/about";
import VolunteerRegistration from "./components/volRegistration";
import OrganisationRegistration from "./components/orgRegistration";
import VolEventsDisplay from "./components/volEventsDisplay";
import Calendar from "./components/calendar";
import Footer from "./components/footer";
import Error404 from "./components/error404";
import Applications from "./components/applications";
import Privacy from "./components/privacy";
import AccountReview from "./components/accountReview";
import Disclaimer from "./components/disclaimer";
import RoleChoice from "./components/roleChoice";
import UserProfile from "./components/userProfile";
import LoadingPage from "./components/loadingPage";
import Approvals from "./components/approvals";
import { useAuth } from "./contexts/authContext";
import { useUser } from "./contexts/userContext";

function LoadingRoute() {
  const location = useLocation();
  const { loadingText } = location.state || { loadingText: "Loading..." };
  return <LoadingPage loadingText={loadingText} />;
}

function Content() {
  const { userLoggedIn } = useAuth();
  const { user, loading } = useUser();
  const location = useLocation();

  // Check if user is loading
  if (loading) {
    return <LoadingRoute />;
  }

  // Function to check user access
  const checkAccess = (allowedRoles = [], requiredStatus = null) => {
    // Check if user is logged in
    if (!userLoggedIn) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Ensure allowedRoles is always an array
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [];

    // Check if user is an admin or has one of the allowed roles
    if (
      !user.roles.includes("Admin") &&
      roles.length &&
      !roles.some((role) => user.roles.includes(role))
    ) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user's Garda vetting status requires review
    if (requiredStatus && user.is_garda_vetted === requiredStatus) {
      return <Navigate to="/review" replace />;
    }

    return null; // User has access
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<RoleChoice />} />
        <Route
          path="/login"
          element={
            userLoggedIn ? <Navigate to="/calendar" replace /> : <Login />
          }
        />
        <Route path="/volRegister" element={<VolunteerRegistration />} />
        <Route path="/orgRegister" element={<OrganisationRegistration />} />
        <Route path="/loading" element={<LoadingRoute />} />
        <Route path="/privacy" element={<Privacy />} />
        {/* Protected Routes */}
        <Route
          path="/volunteer"
          element={
            checkAccess(["Volunteer"], "Pending") || <VolEventsDisplay />
          }
        />
        <Route
          path="/calendar"
          element={checkAccess([], "Pending") || <Calendar />}
        />
        <Route path="/profile" element={<UserProfile />} />
        <Route
          path="/applications"
          element={checkAccess([], "Pending") || <Applications />}
        />
        <Route
          path="/approvals"
          element={checkAccess(["Admin"]) || <Approvals />}
        />
        <Route
          path="/review"
          element={
            user.is_garda_vetted === "Pending" ? (
              <AccountReview />
            ) : (
              <Navigate to="/calendar" replace />
            )
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

export default App;
