import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import BestFriends from "./components/BestFriends";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("ameen_authenticated") === "true"
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("ameen_dark_mode") !== "false"
  );

  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("ameen_authenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("ameen_authenticated");
  };

  const toggleTheme = () => {
    setDarkMode((current) => {
      const next = !current;
      localStorage.setItem("ameen_dark_mode", String(next));
      return next;
    });
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={login} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard toggleTheme={toggleTheme} onLogout={logout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/best-friends" element={<BestFriends />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}