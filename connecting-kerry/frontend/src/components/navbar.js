import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const websiteLinks = [
  { name: "Home", path: "/" },
  { name: "Volunteer", path: "/volunteer" },
  { name: "Calendar", path: "/calendar" },
  { name: "Profile", path: "/profile" },
  { name: "Applications", path: "/applications" }, // Common path for both roles
];

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const navigate = useNavigate();
  const { user, userLoggedIn, logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
    setSelectValue("");
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
          <li onClick={() => handleNavigation("/")}>Home</li>
          {userLoggedIn && (
            <>
              {websiteLinks
                .filter(
                  (link) =>
                    link.name === "Volunteer" || link.name === "Calendar"
                )
                .map((link) => (
                  <li
                    key={link.name}
                    onClick={() => handleNavigation(link.path)}
                  >
                    {link.name}
                  </li>
                ))}
              <li>
                <select
                  className={styles.navSelect}
                  value={selectValue}
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                    handleNavigation(e.target.value);
                  }}
                >
                  <option value="">Menu</option>
                  <option value="/profile">My Account</option>
                  <option value="/applications">
                    {user && user.roles === "Volunteer"
                      ? "My Applications"
                      : "My Events"}
                  </option>
                </select>
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
