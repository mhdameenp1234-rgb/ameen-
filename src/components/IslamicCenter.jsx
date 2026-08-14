import React, { useEffect, useState } from "react";

export default function IslamicCenter() {
  const [quranNote, setQuranNote] = useState(
    () => localStorage.getItem("quran_notes") || ""
  );
  const [saveStatus, setSaveStatus] = useState("🟢 Saved");

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("quran_notes", quranNote);
      setSaveStatus("🟢 Saved Automatically");
    }, 700);
    return () => clearTimeout(timer);
  }, [quranNote]);

  return (
    <section>
      <div className="section-heading">
        <h2 className="green-title">Islamic Center</h2>
      </div>

      <div className="feature-grid">
        <div className="glass feature-card">
          <span>📖</span>
          <h3>Read Quran</h3>
        </div>
        <div className="glass feature-card">
          <span>📚</span>
          <h3>Hadith Collection</h3>
        </div>
        <div className="glass feature-card">
          <span>🤲</span>
          <h3>Daily Duas & Azkar</h3>
        </div>
      </div>

      <div className="glass card green-card">
        <div className="card-heading">
          <h3>Private Quran Notes</h3>
          <span className="status-pill">{saveStatus}</span>
        </div>
        <p className="muted">
          These notes are saved only in this browser.
        </p>
        <textarea
          value={quranNote}
          onChange={(e) => {
            setQuranNote(e.target.value);
            setSaveStatus("🟡 Saving...");
          }}
          placeholder="Write reflections, Tafsir notes, or memorization progress here..."
        />
      </div>
    </section>
  );
}