import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";

import { BASEURL_ENDPOINT, USER } from "./constant";

const COLORS = [
  "#3B82F6", // Blue
  "#8B5CF6", // Purple
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
];

export default function Budgeting() {
  const [summary, setSummary] = useState({});
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [revenueBreakdown, setRevenueBreakdown] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [filterType, setFilterType] = useState("Inflow");
  const [selectedMonth, setSelectedMonth] = useState("monthly");
  const [loading, setLoading] = useState(false);

  const dropvalues = ["monthly", "quarterly", "half-yearly", "yearly"];
  const monthOptions = useMemo(() => {
    return dropvalues.map((val) => ({ label: val, value: val }));
  }, []);

  useEffect(() => {


    const lang = "english";
    const user_id = USER;
    const timeframe = selectedMonth;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          summaryRes,
          expenseRes,
          revenueRes,
          transactionRes,
          aiRes,
        ] = await Promise.all([
          fetch(
            `${BASEURL_ENDPOINT}/budget/summary?user_id=${user_id}&lang=${lang}&timeframe=${timeframe}`
          ).then((res) => res.json()),
          fetch(
            `${BASEURL_ENDPOINT}/budget/expense-by-category?user_id=${user_id}&lang=${lang}&timeframe=${timeframe}`
          ).then((res) => res.json()),
          fetch(
            `${BASEURL_ENDPOINT}/budget/revenue-by-category?user_id=${user_id}&lang=${lang}&timeframe=${timeframe}`
          ).then((res) => res.json()),
          fetch(
            `${BASEURL_ENDPOINT}/budget/transaction-history?user_id=${user_id}&lang=${lang}&timeframe=${timeframe}&page_size=100&page_number=1`
          ).then((res) => res.json()),
          fetch(
            `${BASEURL_ENDPOINT}/budget/budget-summary?user_id=${user_id}&lang=${lang}&timeframe=${timeframe}`
          ).then((res) => res.json()),
        ]);

        setSummary(summaryRes);
        setExpenseBreakdown(expenseRes || []);
        setRevenueBreakdown(revenueRes || []);
        setTransactions(transactionRes.transactions || []);
        setAiInsights(aiRes?.insights || []);
      } catch (error) {
        console.error("Error fetching budgeting data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => t.transaction_type === filterType);
  }, [transactions, filterType]);

  const purchaseData = expenseBreakdown.map((item) => ({
    name: item.category,
    value: item.expense_amount,
  }));

  const totalRevenue = summary?.total_revenew || 0;
  const totalExpense = summary?.total_expense || 0;
  const balance = totalRevenue - totalExpense;

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Budgeting
      </h1>

      {/* Month Selector */}
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

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Loading data...
        </p>
      ) : (
        <>
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
              <p className="font-medium">Profit / Loss</p>
              <h2 className="text-xl font-bold">₹{balance.toFixed(2)}</h2>
            </div>
          </div>

          {/* Charts & Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-4">
            {/* Expense Breakdown */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Expense Breakdown
              </h2>
              <ul className="space-y-3">
                {expenseBreakdown.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between border-l-4 pl-4 py-2 rounded bg-gray-50 dark:bg-gray-900"
                  >
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {item.category}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">
                      ₹{item.expense_amount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Purchase Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b pb-2">
                🛍️ Purchase Breakdown
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                <div className="w-full md:w-1/2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={purchaseData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        innerRadius={50}
                        paddingAngle={2}
                        label
                      >
                        {purchaseData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
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
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
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

          {/* AI Insights */}
          {aiInsights.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-600 p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex gap-2 items-center">
                <span className="text-yellow-500 text-2xl">💡</span>
                AI Suggestions
              </h2>
              <ul className="space-y-3 text-gray-800 dark:text-gray-200 text-sm">
                {aiInsights.map((insight, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <span className="mt-1 text-yellow-500">✔️</span>
                    <div>
                      <strong>{insight.heading}</strong>
                      <p>{insight.summary}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Transactions Table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mt-4 overflow-x-auto max-h-80 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Transactions
              </h2>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded text-sm ${
                    filterType === "Inflow"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  }`}
                  onClick={() => setFilterType("Inflow")}
                >
                  Inflows
                </button>
                <button
                  className={`px-3 py-1 rounded text-sm ${
                    filterType === "Outflow"
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  }`}
                  onClick={() => setFilterType("Outflow")}
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
                    <th className="py-2 pr-4">Party</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t, idx) => {
                    const [date, time] = t.timestamp.split(" ");
                    return (
                      <tr
                        key={idx}
                        className={`border-b dark:border-gray-700 text-gray-800 dark:text-gray-200 ${
                          t.transaction_type === "Inflow"
                            ? "bg-green-50 dark:bg-green-900"
                            : "bg-red-50 dark:bg-red-900"
                        }`}
                      >
                        <td className="py-2 pr-4">{date}</td>
                        <td className="py-2 pr-4">{time}</td>
                        <td className="py-2 pr-4">{t.category}</td>
                        <td className="py-2 pr-4">{t.description}</td>
                        <td className="py-2 pr-4">₹{t.amount}</td>
                        <td className="py-2 pr-4">{t.party_involved}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
