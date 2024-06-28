import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doSignOut } from "../../firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser(user);
      sessionStorage.setItem("authToken", await user.getIdToken());
    } else {
      setCurrentUser(null);
      sessionStorage.removeItem("authToken");
    }
    setLoading(false);
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("authToken");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const userLoggedIn = !!sessionStorage.getItem("authToken");

  const logout = async () => {
    try {
      await doSignOut();
      setCurrentUser(null);
      sessionStorage.removeItem("authToken");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
