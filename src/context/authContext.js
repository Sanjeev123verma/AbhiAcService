
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // To avoid rendering issues

  useEffect(() => {
    // Access localStorage only after the component has mounted
    const storeAdminStatus =
      typeof window !== "undefined" &&
      localStorage.getItem("isAdmin") === "true";
    setIsAdmin(storeAdminStatus);
    setIsInitialized(true); // Indicates initialization is complete
  }, []);

  const login = () => {
    setIsAdmin(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("isAdmin", "true");
    }
  };

  const logout = () => {
    setIsAdmin(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAdmin");
    }
  };

  if (!isInitialized) {
    // Prevent rendering children until initialization is complete
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
