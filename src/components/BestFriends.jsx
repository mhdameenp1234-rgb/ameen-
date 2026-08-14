import React, { useState } from "react";
import { Link } from "react-router-dom";

const STUDENTS = [
  { id: 427, name: "MUHAMMAD T" },
  { id: 428, name: "MUHAMMAD RAFNAS B.C" },
  { id: 430, name: "MUHAMMED YASIR B.A" },
  { id: 453, name: "MUHAMMAD AMEEN P" }
  // Add the remaining students here when you have their details.
];

const ADMIN_PASSWORD = "9495512251";
const STUDENT_PASSWORD = "123456";

export default function BestFriends() {
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [coins, setCoins] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("best_friends_coins") || "{}");
    } catch {
      return {};
    }
  });

  const handlePortalLogin = (e) => {
    e.preventDefault();

    if (username.trim().toLowerCase() === "admin" && password === ADMIN_PASSWORD) {
      setRole("admin");
    } else if (
      password === STUDENT_PASSWORD &&
      STUDENTS.some((s) => String(s.id) === username.trim())
    ) {
      setRole("student");
    } else {
      alert("Invalid credentials");
    }
  };

  const addCoin = (studentId, type) => {
    setCoins((previous) => {
      const updated = {
        ...previous,
        [studentId]: {
          ...previous[studentId],
          [type]: (previous[studentId]?.[type] || 0) + 1
        }
      };
      localStorage.setItem("best_friends_coins", JSON.stringify(updated));
      return updated;
    });
  };

  if (!role) {
    return (
      <main className="portal-page">
        <div className="glass portal-login">
          <Link to="/" className="back-link">← Back</Link>
          <h2>Best Friends Portal</h2>
          <p className="muted">Admin or student login</p>
          <form onSubmit={handlePortalLogin} className="login-form">
            <input
              type="text"
              placeholder="Username (Admin or Reg No)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary-btn" type="submit">Login to Portal</button>
          </form>
          <p className="security-note">
            This portal stores its demo data in this browser only.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="portal-page portal-wide">
      <div className="portal-header">
        <div>
          <Link to="/dashboard" className="back-link">← Dashboard</Link>
          <h1>Best Friends {role === "admin" ? "Admin Dashboard" : "Student View"}</h1>
        </div>
        <button className="secondary-btn" onClick={() => setRole(null)}>Logout</button>
      </div>

      <div className="student-grid">
        {STUDENTS.map((student) => (
          <div className="glass student-card" key={student.id}>
            <div>
              <h3>{student.name}</h3>
              <p className="muted">Reg: {student.id}</p>
            </div>
            <div className="coin-row">
              <button onClick={() => addCoin(student.id, "yes")}>
                ✅ {coins[student.id]?.yes || 0}
              </button>
              <button onClick={() => addCoin(student.id, "no")}>
                ❌ {coins[student.id]?.no || 0}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}