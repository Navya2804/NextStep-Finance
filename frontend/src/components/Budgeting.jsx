import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";

export default function Budgeting() {
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("inflow");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    // Simulated expense breakdown
    setExpenseBreakdown([
      { category: "Logistics", amount: 3000 },
      { category: "Rent", amount: 10000 },
      { category: "Salaries", amount: 15000 },
      { category: "Utility Bills", amount: 2000 },
      { category: "Personal", amount: 3000 },
      { category: "Other", amount: 5000 },
    ]);

    // Simulated transaction history
    setTransactions([
      {
        date: "2025-07-21",
        time: "10:30 AM",
        category: "Salary",
        description: "July Salary Credited",
        amount: 30000,
        party: "HR Dept",
        transactionType: "inflow",
      },
      {
        date: "2025-07-22",
        time: "03:45 PM",
        category: "Rent",
        description: "Office Rent Payment",
        amount: 10000,
        party: "Landlord",
        transactionType: "outflow",
      },
      {
        date: "2025-07-23",
        time: "01:00 PM",
        category: "Utility Bills",
        description: "Electricity",
        amount: 2500,
        party: "MSEB",
        transactionType: "outflow",
      },
      {
        date: "2025-07-24",
        time: "09:15 AM",
        category: "Consulting",
        description: "Payment from Client",
        amount: 15000,
        party: "Client A",
        transactionType: "inflow",
      },
    ]);
  }, []);

  const purchaseData = [
    { name: "Small Purchases", value: 1200 },
    { name: "Medium Purchases", value: 4500 },
    { name: "Online", value: 3000 },
    { name: "Store", value: 6800 },
    { name: "Seasonal", value: 2000 },
  ];

  const COLORS = [
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
  ];

  // Generate month options (last 12 months)
  const monthOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
        label: date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`,
      };
    });
  }, []);

  const totalRevenue = 50000;
  const totalExpense = useMemo(() => {
    return expenseBreakdown.reduce((sum, e) => sum + e.amount, 0);
  }, [expenseBreakdown]);
  const balance = totalRevenue - totalExpense;

  // Filtered transactions by type
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => t.transactionType === filterType);
  }, [transactions, filterType]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Budgeting
      </h1>

      {/* Month Filter */}
      <div className="flex justify-end">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-48 px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        >
          <option value="">Select Month</option>
          {monthOptions.map((m, i) => (
            <option key={i} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 dark:bg-green-700 p-4 rounded text-green-900 dark:text-green-100">
          <p className="font-medium">Total Revenue</p>
          <h2 className="text-xl font-bold">₹{totalRevenue.toFixed(2)}</h2>
        </div>
        <div className="bg-red-100 dark:bg-red-700 p-4 rounded text-red-900 dark:text-red-100">
          <p className="font-medium">Total Expense</p>
          <h2 className="text-xl font-bold">₹{totalExpense.toFixed(2)}</h2>
        </div>
        <div className="bg-blue-100 dark:bg-blue-700 p-4 rounded text-blue-900 dark:text-blue-100">
          <p className="font-medium">Profit/Loss</p>
          <h2 className="text-xl font-bold">₹{balance.toFixed(2)}</h2>
        </div>
      </div>

      {/* Expense + Purchases */}
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-4">
        {/* Expense Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-3 rounded shadow">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
            Expense Breakdown
          </h2>
          <ul className="space-y-3">
            {expenseBreakdown.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between border-l-4 pl-4 py-2 rounded bg-gray-50 dark:bg-gray-900"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {item.category === "Rent"
                      ? "🏠"
                      : item.category === "Logistics"
                      ? "🚚"
                      : item.category === "Salaries"
                      ? "💼"
                      : item.category === "Utility Bills"
                      ? "💡"
                      : "💸"}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {item.category}
                  </span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                  ₹{item.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Purchase Details with Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mr-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
            🛍️ Purchase Breakdown
          </h2>

          <div className="flex flex-col md:flex-row md:items-start items-center gap-6 w-full overflow-hidden">
            {/* Pie Chart */}
            <div className="w-full md:w-1/2 h-64 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={purchaseData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={3}
                    label
                  >
                    {purchaseData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      padding: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm w-full md:w-1/2">
              {purchaseData.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></span>
                    {entry.name}
                  </span>
                  <span className="font-medium">
                    ₹{entry.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-600 p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500 text-2xl">💡</span>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            AI Suggestions
          </h2>
        </div>
        <ul className="space-y-3 text-gray-800 dark:text-gray-200 text-sm pl-1">
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 mt-1">✔️</span>
            <span>
              Your utility bill is higher than average — consider checking
              unnecessary consumption.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 mt-1">✔️</span>
            <span>
              Online purchases have increased this month — try setting a monthly
              cap.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-400 mt-1">✔️</span>
            <span>
              Logistics cost seems significant — check for optimization or
              vendor alternatives.
            </span>
          </li>
        </ul>
      </div>

      {/* Transaction Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mt-4 overflow-x-auto max-h-80 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Transactions
          </h2>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded text-sm ${
                filterType === "inflow"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              }`}
              onClick={() => setFilterType("inflow")}
            >
              Inflows
            </button>
            <button
              className={`px-3 py-1 rounded text-sm ${
                filterType === "outflow"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              }`}
              onClick={() => setFilterType("outflow")}
            >
              Outflows
            </button>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No {filterType} transactions found.
          </p>
        ) : (
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-600 dark:text-gray-400 border-b dark:border-gray-700">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Time</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Description</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Party Involved</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t, idx) => (
                <tr
                  key={idx}
                  className={`border-b dark:border-gray-700 text-gray-800 dark:text-gray-200 ${
                    t.transactionType === "inflow"
                      ? "bg-green-50 dark:bg-green-900"
                      : "bg-red-50 dark:bg-red-900"
                  }`}
                >
                  <td className="py-2 pr-4">{t.date}</td>
                  <td className="py-2 pr-4">{t.time}</td>
                  <td className="py-2 pr-4">{t.category}</td>
                  <td className="py-2 pr-4">{t.description}</td>
                  <td className="py-2 pr-4">₹{t.amount}</td>
                  <td className="py-2 pr-4">{t.party}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
