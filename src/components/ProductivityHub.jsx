import React, { useEffect, useState } from "react";

export default function ProductivityHub() {
  const [note, setNote] = useState(
    () => localStorage.getItem("general_notes") || ""
  );
  const [saveStatus, setSaveStatus] = useState("🟢 Saved");
  const [expenses, setExpenses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("expenses") || "[]");
    } catch {
      return [];
    }
  });
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("expense");

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("general_notes", note);
      setSaveStatus("🟢 Saved Automatically");
    }, 700);
    return () => clearTimeout(timer);
  }, [note]);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
    setSaveStatus("🟡 Saving...");
  };

  const addTransaction = (e) => {
    e.preventDefault();
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0 || !desc.trim()) return;

    const newTx = {
      id: Date.now(),
      amount: numericAmount,
      desc: desc.trim(),
      type
    };
    const updated = [newTx, ...expenses];
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
    setAmount("");
    setDesc("");
  };

  const deleteTransaction = (id) => {
    const updated = expenses.filter((tx) => tx.id !== id);
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  };

  const totalIncome = expenses
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = expenses
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <section>
      <div className="section-heading">
        <h2>Productivity Hub</h2>
        <span className="pill">Local storage</span>
      </div>

      <div className="glass card">
        <div className="card-heading">
          <h3>General Notes</h3>
          <span className="status-pill">{saveStatus}</span>
        </div>
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Start typing... everything is saved automatically."
        />
      </div>

      <div className="glass card">
        <h3>Expense Tracker</h3>

        <div className="stats-grid">
          <div className="stat income">Income: ₹{totalIncome.toFixed(2)}</div>
          <div className="stat expense">Expense: ₹{totalExpense.toFixed(2)}</div>
          <div className="stat balance">
            Balance: ₹{(totalIncome - totalExpense).toFixed(2)}
          </div>
        </div>

        <form onSubmit={addTransaction} className="transaction-form">
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <button className="primary-btn" type="submit">Add</button>
        </form>

        <div className="transaction-list">
          {expenses.length === 0 ? (
            <p className="muted">No transactions yet.</p>
          ) : (
            expenses.map((tx) => (
              <div className="transaction-row" key={tx.id}>
                <span>{tx.desc}</span>
                <span className={tx.type === "income" ? "money-green" : "money-red"}>
                  {tx.type === "income" ? "+" : "-"}₹{tx.amount.toFixed(2)}
                </span>
                <button
                  className="icon-btn"
                  type="button"
                  onClick={() => deleteTransaction(tx.id)}
                  aria-label="Delete transaction"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}