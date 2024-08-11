import React, { useState, useEffect } from "react";
import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useUser } from "../contexts/userContext";
import LoadingPage from "./loadingPage";

const websiteLinks = [
  { name: "Home", path: "/" },
  { name: "Approvals", path: "/approvals", role: "Admin" },
  { name: "Volunteer", path: "/volunteer", role: "Volunteer" },
  { name: "Calendar", path: "/calendar", role: "Approved" },
  { name: "Profile", path: "/profile", role: "Any" },
  { name: "Applications", path: "/applications", role: "Approved" },
  { name: "Users", path: "/users", role: "Admin" },
];

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { userLoggedIn, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

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

  const filteredLinks = () => {
    if (!userLoggedIn)
      return websiteLinks.filter((link) => link.name === "Home");

    return websiteLinks.filter((link) => {
      if (link.role === "Volunteer") {
        return (
          user.roles === "Volunteer" && user.is_garda_vetted === "Approved"
        );
      }
      if (link.role === "Admin") {
        return user.roles === "Admin";
      }
      if (link.role === "Approved") {
        return user.is_garda_vetted === "Approved";
      }
      if (link.role === "Any") {
        return true;
      }
      return false;
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

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
          {filteredLinks().map((link) => (
            <li key={link.name} onClick={() => handleNavigation(link.path)}>
              {link.name === "Applications"
                ? user && user.roles === "Volunteer"
                  ? "My Applications"
                  : "My Events"
                : link.name}
            </li>
          ))}
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
          {filteredLinks().map((link) => (
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
