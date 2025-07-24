import { useState } from "react";

export default function Budgeting() {
  const [entries, setEntries] = useState([]);
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [note, setNote] = useState("");

  const handleAddEntry = () => {
    if (!income && !expense) return;

    setEntries([
      ...entries,
      {
        income: parseFloat(income) || 0,
        expense: parseFloat(expense) || 0,
        note: note || "—",
        date: new Date().toLocaleDateString(),
      },
    ]);
    setIncome("");
    setExpense("");
    setNote("");
  };

  const totalIncome = entries.reduce((sum, e) => sum + e.income, 0);
  const totalExpense = entries.reduce((sum, e) => sum + e.expense, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Budgeting</h1>

      {/* Entry Form */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-4">
        <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">Add Daily Entry</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Income (₹)"
            className="px-4 py-2 border rounded w-full"
          />
          <input
            type="number"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            placeholder="Expense (₹)"
            className="px-4 py-2 border rounded w-full"
          />
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note (e.g. 'Electricity')"
            className="px-4 py-2 border rounded w-full"
          />
          <button
            onClick={handleAddEntry}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full md:w-auto"
          >
            Add
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 dark:bg-green-700 p-4 rounded text-green-900 dark:text-green-100">
          <p className="font-medium">Total Income</p>
          <h2 className="text-xl font-bold">₹{totalIncome.toFixed(2)}</h2>
        </div>
        <div className="bg-red-100 dark:bg-red-700 p-4 rounded text-red-900 dark:text-red-100">
          <p className="font-medium">Total Expense</p>
          <h2 className="text-xl font-bold">₹{totalExpense.toFixed(2)}</h2>
        </div>
        <div className="bg-blue-100 dark:bg-blue-700 p-4 rounded text-blue-900 dark:text-blue-100">
          <p className="font-medium">Balance</p>
          <h2 className="text-xl font-bold">₹{balance.toFixed(2)}</h2>
        </div>
      </div>

      {/* Budget Table */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Entries</h2>
        {entries.length === 0 ? (
          <p className="text-gray-500">No entries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 dark:text-gray-400 border-b dark:border-gray-700">
                  <th className="py-2">Date</th>
                  <th className="py-2">Income (₹)</th>
                  <th className="py-2">Expense (₹)</th>
                  <th className="py-2">Note</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, idx) => (
                  <tr key={idx} className="border-b dark:border-gray-700">
                    <td className="py-2 text-gray-800 dark:text-gray-200">{e.date}</td>
                    <td className="py-2 text-green-600">₹{e.income}</td>
                    <td className="py-2 text-red-600">₹{e.expense}</td>
                    <td className="py-2 text-gray-700 dark:text-gray-300">{e.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
