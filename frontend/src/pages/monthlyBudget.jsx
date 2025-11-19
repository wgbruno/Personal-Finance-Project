import { useState, useEffect } from "react";
import axios from "axios";

export default function MonthlyBudget() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ label: "", amount: "", type: "income" });

  // Fetch entries on load
  useEffect(() => {
    axios.get("http://localhost:3001/api/entries")
      .then((res) => setEntries(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.label || !form.amount) return;

    try {
      const res = await axios.post("http://localhost:3001/api/entries", {
        label: form.label,
        amount: Number(form.amount),
        type: form.type,
      });
      setEntries([res.data, ...entries]);
      setForm({ label: "", amount: "", type: "income" });
    } catch (err) {
      console.error("Error adding entry:", err);
      alert("Failed to add entry. Check console for details.");
    }
  };

  const totalIncome = entries.filter(e => e.type === "income").reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = entries.filter(e => e.type === "expense").reduce((sum, e) => sum + e.amount, 0);
  const remaining = totalIncome - totalExpenses;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Monthly Budget</h1>

      {/* Totals Summary */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 p-4 bg-green-50 border border-green-300 rounded-lg text-center">
          <p className="text-gray-600">Income</p>
          <p className="text-xl font-bold">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="flex-1 p-4 bg-red-50 border border-red-300 rounded-lg text-center">
          <p className="text-gray-600">Expenses</p>
          <p className="text-xl font-bold">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="flex-1 p-4 bg-blue-50 border border-blue-300 rounded-lg text-center">
          <p className="text-gray-600">Remaining</p>
          <p className="text-xl font-bold">${remaining.toFixed(2)}</p>
        </div>
      </div>

      {/* Entry Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name (e.g., Rent, Paycheck)"
            className="border p-2 rounded"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 rounded"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Entry</button>
        </div>
      </form>

      {/* Entries List */}
      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={`p-4 rounded-lg shadow flex justify-between ${
              entry.type === "income" ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
            } border`}
          >
            <div>
              <h2 className="font-semibold">{entry.label}</h2>
              <p className="text-sm text-gray-600">{entry.type}</p>
            </div>
            <div className="text-lg font-bold">${entry.amount.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
