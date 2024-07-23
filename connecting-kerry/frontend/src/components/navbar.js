import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useUser } from "../contexts/userContext";

const websiteLinks = [
  { name: "Home", path: "/" },
  { name: "Volunteer", path: "/volunteer" },
  { name: "Calendar", path: "/calendar" },
  { name: "Profile", path: "/profile" },
  { name: "Applications", path: "/applications" },
];

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { userLoggedIn, logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <header>
      <div className={styles.navbarContainer}>
        <div className={styles.menuButton} onClick={toggleDrawer}>
          ☰
        </div>
        <ul className={styles.navbarButtons}>
          <img
            src="/images/logo-no-background.png"
            height={100}
            alt="Connecting Kerry"
            onClick={() => handleNavigation("/")}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
          {userLoggedIn && (
            <>
              {user && user.roles === "Volunteer" && (
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/volunteer");
                  }}
                >
                  Volunteer
                </li>
              )}
              {user && user.roles === "Admin" && (
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/approvals");
                  }}
                >
                  Approvals
                </li>
              )}
              <li
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/calendar");
                }}
              >
                Calendar
              </li>
              <li
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/profile");
                }}
              >
                My Account
              </li>
              <li
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/applications");
                }}
              >
                {user && user.roles === "Volunteer"
                  ? "My Applications"
                  : "My Events"}
              </li>
            </>
          )}
        </ul>
        <div style={{ margin: "20px" }}>
          {!userLoggedIn ? (
            <button
              className={styles.loginButton}
              onClick={() => handleNavigation("/login")}
            >
              Login
            </button>
          ) : (
            <button className={styles.loginButton} onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
      <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ""}`}>
        <ul className={styles.drawerButtons}>
          <li onClick={() => handleNavigation("/")}>Home</li>
          {userLoggedIn &&
            websiteLinks.slice(1).map((link) => (
              <li key={link.name} onClick={() => handleNavigation(link.path)}>
                {link.name === "Applications"
                  ? user && user.roles === "Volunteer"
                    ? "My Applications"
                    : "My Events"
                  : link.name}
              </li>
            ))}
          {!userLoggedIn ? (
            <li onClick={() => handleNavigation("/login")}>Login</li>
          ) : (
            <li onClick={handleLogout}>Logout</li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
