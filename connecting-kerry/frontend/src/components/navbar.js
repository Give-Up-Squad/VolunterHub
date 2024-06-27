import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";

const websiteLinks = [
  { name: "Home", path: "/" },
  { name: "Volunteer", path: "/volunteer" },
  { name: "Calendar", path: "/calendar" },
];

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header>
      <div className={styles.navbarContainer}>
        <div className={styles.menuButton} onClick={toggleDrawer}>
          ☰
        </div>
        <ul className={styles.navbarButtons} style={{ flex: "1" }}>
          {websiteLinks.map((link) => (
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
          <button
            className={styles.loginButton}
            onClick={() => handleNavigation("/login")}
          >
            Login
          </button>
        </div>
      </div>
      <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ""}`}>
        <ul className={styles.drawerButtons}>
          {websiteLinks.map((link) => (
            <li key={link.name} onClick={() => handleNavigation(link.path)}>
              {link.name}
            </li>
          ))}
          <button onClick={() => handleNavigation("/login")}>Login</button>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
