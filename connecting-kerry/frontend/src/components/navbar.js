import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const websiteLinks = [
  { name: "Home", path: "/" },
  { name: "Volunteer", path: "/volunteer" },
  { name: "Calendar", path: "/calendar" },
  { name: "Profile", path: "/profile" },
];

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { userLoggedIn, logout } = useAuth(); // Use useAuth hook to get logout function

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
        <ul className={styles.navbarButtons} style={{ flex: "1" }}>
          <li onClick={() => handleNavigation("/")}>Home</li>
          {userLoggedIn &&
            websiteLinks.slice(1).map((link) => (
              <li key={link.name} onClick={() => handleNavigation(link.path)}>
                {link.name}
              </li>
            ))}
        </ul>
        <div id={styles.navbarTitle} style={{ flex: "3" }}>
          <img
            src="/images/logo-no-background.png"
            height={100}
            alt="Connecting Kerry"
            onClick={() => handleNavigation("/")}
          />
        </div>
        <div style={{ flex: "3", margin: "10px" }}>
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
                {link.name}
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
