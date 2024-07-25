import React from "react";
import "./App.css";
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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Disclaimer from "./components/disclaimer";
import RoleChoice from "./components/roleChoice";
import { useAuth } from "./contexts/authContext";
import UserProfile from "./components/userProfile";
import LoadingPage from "./components/loadingPage";
import Approvals from "./components/approvals";

function LoadingRoute() {
  const location = useLocation();
  const { loadingText } = location.state || { loadingText: "Loading..." };

  return <LoadingPage loadingText={loadingText} />;
}

function Content() {
  const { userLoggedIn } = useAuth();
  const location = useLocation();
  const showNavbarAndFooter = location.pathname !== "/register";

  return (
    <div className="App">
      {showNavbarAndFooter && <Navbar />}
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
            userLoggedIn ? (
              <VolEventsDisplay />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/calendar"
          element={
            userLoggedIn ? <Calendar /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/profile"
          element={
            userLoggedIn ? <UserProfile /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/applications"
          element={
            userLoggedIn ? <Applications /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/approvals"
          element={
            userLoggedIn ? <Approvals /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {showNavbarAndFooter && <Footer />}
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
