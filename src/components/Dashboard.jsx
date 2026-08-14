import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductivityHub from "./ProductivityHub";
import IslamicCenter from "./IslamicCenter";
import CreativeStudio from "./CreativeStudio";

export default function Dashboard({ toggleTheme, onLogout }) {
  const [activeTab, setActiveTab] = useState("productivity");
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <aside className="sidebar glass">
        <div className="sidebar-brand">
          <h2>AMEEN.IN</h2>
          <span>Personal Cloud</span>
        </div>

        <nav className="nav-list">
          <button
            className={activeTab === "productivity" ? "nav-btn active-blue" : "nav-btn"}
            onClick={() => setActiveTab("productivity")}
          >
            📊 Productivity Hub
          </button>
          <button
            className={activeTab === "islamic" ? "nav-btn active-green" : "nav-btn"}
            onClick={() => setActiveTab("islamic")}
          >
            🕌 Islamic Center
          </button>
          <button
            className={activeTab === "creative" ? "nav-btn active-purple" : "nav-btn"}
            onClick={() => setActiveTab("creative")}
          >
            🎨 Creative Studio
          </button>
          <button className="nav-btn" onClick={() => navigate("/best-friends")}>
            👥 Best Friends Portal
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="secondary-btn" onClick={toggleTheme}>
            Toggle Dark/Light Mode
          </button>
          <button className="danger-btn" onClick={onLogout}>
            Lock Screen
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="content-panel glass">
          {activeTab === "productivity" && <ProductivityHub />}
          {activeTab === "islamic" && <IslamicCenter />}
          {activeTab === "creative" && <CreativeStudio />}
        </div>
      </main>
    </div>
  );
}