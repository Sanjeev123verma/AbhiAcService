// src/context/authContext.js
"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });
  
  const login = () => {
    setIsAdmin(true);
    localStorage.setItem("isAdmin", "true");
  };
  
  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin"); // Remove login state from localStorage
  };

  useEffect(() => {
    const storeAdminStatus = localStorage.getItem("isAdmin") === "true";
    if (storeAdminStatus !== isAdmin){
      setIsAdmin(storeAdminStatus);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
