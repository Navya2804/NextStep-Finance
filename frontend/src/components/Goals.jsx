import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BASEURL_ENDPOINT, USER } from "./constant";
 
export default function GoalsDashboard() {
  const [timeline, setTimeline] = useState("monthly");
  const [chartData, setChartData] = useState([]);
  const [goalAmount, setGoalAmount] = useState(0);
  const [reasons, setReasons] = useState([]);
  const [improvements, setImprovements] = useState([]);
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = USER;
  const lang = "english";
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [profitRes, reasonRes, improvementRes] = await Promise.all([
          fetch(`${BASEURL_ENDPOINT}/goals/get-daily-profit?user_id=${userId}&lang=${lang}&timeframe=${timeline}`),
          fetch(`${BASEURL_ENDPOINT}/goals/trend-reason?user_id=${userId}&lang=${lang}&timeframe=${timeline}`),
          fetch(`${BASEURL_ENDPOINT}/goals/trend-improvement?user_id=${userId}&lang=${lang}&timeframe=${timeline}`)
          // fetch(`/summary?user_id=${userId}&timeframe=${timeline}`), // optional
          // fetch(`/transactions?user_id=${userId}&timeframe=${timeline}&page_number=1&page_size=5`)
        ]);
 
        const profitData = await profitRes.json();
        const reasonData = await reasonRes.json();
        const improvementData = await improvementRes.json();
        // const summaryData = await summaryRes.json();
        // const txData = await txRes.json();
 
        setGoalAmount(profitData.goal_amount);
        setChartData(profitData.profit_datewise.map(p => ({
          date: p.timestamp,
          profit: p.profit,
          goal: profitData.goal_amount
        })));
 
        setReasons(reasonData.insights);
        setImprovements(improvementData.insights);
        // setSummary(summaryData);
        // setTransactions(txData.transactions);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchData();
  }, [timeline]);
 
  return (
<div className="p-6 space-y-10 text-gray-900 dark:text-white">
<div className="flex justify-between items-center">
<h1 className="text-3xl font-bold">Goals Dashboard</h1>
<select
          className="p-2 border dark:bg-gray-800 dark:text-white rounded"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
>
<option value="monthly">Monthly</option>
<option value="quarterly">Quarterly</option>
<option value="half-yearly">Half-Yearly</option>
<option value="yearly">Yearly</option>
</select>
</div>
 
      {/* Summary Cards */}
      {summary && (
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<StatCard title="Revenue" value={`₹${summary.total_revenew}`} />
<StatCard title="Expenses" value={`₹${summary.total_expense}`} />
<StatCard title="Profit/Loss" value={`₹${summary.profit_loss}`} />
<StatCard title="Closing Balance" value={`₹${summary.closing_balance}`} />
</div>
      )}
 
      {/* Line Chart */}
<ResponsiveContainer width="100%" height={400}>
<LineChart data={chartData}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="date" />
<YAxis label={{ value: "INR", angle: -90, position: "insideLeft" }} />
<Tooltip />
<Legend />
<Line type="monotone" dataKey="profit" stroke="#3b82f6" name="Profit" />
<Line type="monotone" dataKey="goal" stroke="#10b981" name="Goal" strokeDasharray="5 5" />
</LineChart>
</ResponsiveContainer>
 
      {/* Reason Section */}
<Section title="Why this happened?" items={reasons} />
 
      {/* Improvement Section */}
<Section title="What can be improved?" items={improvements} />
      {loading && <p className="text-center">Loading...</p>}
</div>
  );
}
 
function StatCard({ title, value }) {
  return (
<div className="p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 shadow">
<h3 className="text-md font-medium">{title}</h3>
<p className="text-xl font-bold mt-2">{value}</p>
</div>
  );
}
 
function Section({ title, items }) {
  return (
<section>
<h2 className="text-2xl font-semibold mb-4">{title}</h2>
<div className="grid md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
<ReasonCard key={idx} reason={item.heading} explanation={item.summary} />
        ))}
</div>
</section>
  );
}
 
function ReasonCard({ reason, explanation }) {
  return (
<div className="p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 shadow">
<h3 className="text-lg font-semibold">{reason}</h3>
<p className="mt-2 text-sm">{explanation}</p>
</div>
  );
}
 
function TransactionTable({ transactions }) {
  return (
<div className="overflow-x-auto">
<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
<thead>
<tr className="bg-gray-100 dark:bg-gray-800">
<th className="px-4 py-2 text-left">Date</th>
<th className="px-4 py-2 text-left">Category</th>
<th className="px-4 py-2 text-left">Description</th>
<th className="px-4 py-2 text-left">Amount</th>
<th className="px-4 py-2 text-left">Type</th>
<th className="px-4 py-2 text-left">Party</th>
</tr>
</thead>
<tbody>
          {transactions.map((tx, idx) => (
<tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
<td className="px-4 py-2">{tx.timestamp}</td>
<td className="px-4 py-2">{tx.category}</td>
<td className="px-4 py-2">{tx.description}</td>
<td className="px-4 py-2">₹{tx.amount} ({tx.transaction_type})
</td>
<td className="px-4 py-2">{tx.transaction_type}</td>
<td className="px-4 py-2">{tx.party_involved}</td>
</tr>
          ))}
</tbody>
</table>
</div>
  );
}