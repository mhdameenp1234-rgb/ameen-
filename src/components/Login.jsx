import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // DEMO ONLY: this is client-side authentication and is not secure for real secrets.
  const DEMO_PASSWORD = "9495512251";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === DEMO_PASSWORD) {
      setError("");
      onLogin();
    } else {
      setError("Invalid password. Try again.");
    }
  };

  return (
    <main className="login-page">
      <div className="login-card glass">
        <div className="brand-mark">A</div>
        <h1>AMEEN.IN</h1>
        <p className="muted">Premium Personal Cloud</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="password-wrap">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Master Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              aria-label="Master Password"
            />
            <button
              type="button"
              className="show-btn"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p className="error-text">{error}</p>}

          <label className="remember">
            <input type="checkbox" />
            <span>Remember Device</span>
          </label>

          <button className="primary-btn" type="submit">
            Unlock Dashboard
          </button>
        </form>

        <p className="security-note">
          Demo login: this frontend password is visible in the published code.
          Use real authentication before storing private information.
        </p>
      </div>
    </main>
  );
}