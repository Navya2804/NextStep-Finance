import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

// Generate 30 days mock data
const generateDailyData = () => {
  const inflow = [];
  const outflow = [];
  for (let i = 0; i < 30; i++) {
    const date = dayjs().subtract(29 - i, "day").format("MMM D");
    const inflowVal = 3000 + Math.floor(Math.random() * 2000); // 3000–5000
    const outflowVal = 2000 + Math.floor(Math.random() * 1500); // 2000–3500
    inflow.push({ date, value: inflowVal });
    outflow.push({ date, value: outflowVal });
  }
  return { inflow, outflow };
};

const { inflow, outflow } = generateDailyData();

const Planning = () => {
  const [timeRange, setTimeRange] = useState("past_month");

  const timeOptions = [
    { value: "past_week", label: "Past Week" },
    { value: "past_month", label: "Past Month" },
    { value: "past_quarter", label: "Past Quarter" },
    { value: "past_6_months", label: "Past 6 Months" },
    { value: "past_year", label: "Past Year" },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header with dropdown */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Planning & Suggestions</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm p-2 rounded"
        >
          {timeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cash Inflow */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <h3 className="font-medium mb-2">Cash Inflow (Revenue)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inflow}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6" // blue
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-sm p-2 bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
            Daily revenue trends observed over the past month.
          </div>
        </div>

        {/* Cash Outflow */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <h3 className="font-medium mb-2">Cash Outflow (Expenditure)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={outflow}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f59e0b" // amber
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-sm p-2 bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded">
            Daily operational and fixed costs tracked across 30 days.
          </div>
        </div>
      </div>

      {/* Insight Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-sm">
          <h4 className="font-semibold text-blue-600 dark:text-blue-300 mb-1">
            Next Month Expectations
          </h4>
          <p>Increase in utility bills and moderate sales expected.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-sm">
          <h4 className="font-semibold text-orange-600 dark:text-orange-300 mb-1">
            Inflation
          </h4>
          <p>Stable but food and fuel prices may slightly rise.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-sm">
          <h4 className="font-semibold text-green-600 dark:text-green-300 mb-1">
            Credit / Invest
          </h4>
          <p>Consider short-term bonds or emergency fund top-up.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-sm">
          <h4 className="font-semibold text-purple-600 dark:text-purple-300 mb-1">
            Market & Govt
          </h4>
          <p>New MSME subsidies expected in the upcoming policy review.</p>
        </div>
      </div>
    </div>
  );
};

export default Planning;
