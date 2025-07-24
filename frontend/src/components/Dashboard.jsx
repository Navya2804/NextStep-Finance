import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { FaStar } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const sparklineOptions = {
  responsive: true,
  elements: { point: { radius: 0 } },
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: {
    x: { display: false },
    y: { display: false },
  },
};

const bigGraphOptions = {
  responsive: true,
  elements: { point: { radius: 3 } },
  plugins: { legend: { display: false } },
  scales: {
    x: {
      ticks: { color: "#9CA3AF", font: { size: 12 } },
      grid: { color: "rgba(156,163,175,0.2)" },
    },
    y: {
      ticks: { color: "#9CA3AF", font: { size: 12 } },
      grid: { color: "rgba(156,163,175,0.2)" },
    },
  },
};

const dummySparkline = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      data: [120, 130, 125, 140, 135],
      borderColor: "#3B82F6",
      tension: 0.3,
    },
  ],
};

const dummyBigGraph = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Price",
      data: [150, 160, 140, 170, 165, 180, 175],
      fill: true,
      borderColor: "#10B981",
      backgroundColor: "rgba(16,185,129,0.1)",
      tension: 0.3,
    },
  ],
};

const cardData = [
  { name: "AAPL", price: "$150.12", change: "+1.2%", graph: dummySparkline },
  { name: "MSFT", price: "$310.43", change: "-0.5%", graph: dummySparkline },
  { name: "TSLA", price: "$750.00", change: "+3.4%", graph: dummySparkline },
  { name: "GOOG", price: "$2,800", change: "+0.8%", graph: dummySparkline },
];

const favorites = ["AAPL", "TSLA", "GOOG", "MSFT"];

const marketTrends = [
  { name: "Energy", trend: "+2.1%" },
  { name: "Tech", trend: "-1.2%" },
  { name: "Finance", trend: "+0.8%" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 w-full">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Dashboard
      </h1>

      {/* My Portfolio */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cardData.map((stock, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                {stock.name}
              </h2>
              <span
                className={`text-sm ${
                  stock.change.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stock.change}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stock.price}
            </p>
            <Line data={stock.graph} options={sparklineOptions} />
          </div>
        ))}
      </section>

      {/* Selected Expanded Graph */}
      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Selected Stock: AAPL
        </h2>
        <Line data={dummyBigGraph} options={bigGraphOptions} />
      </section>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* My Favorites */}
        <section className="bg-white dark:bg-gray-800 p-4 rounded shadow flex-1">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            My Favorites
          </h2>
          <ul className="space-y-2">
            {favorites.map((fav, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded"
              >
                <span>{fav}</span>
                <FaStar className="text-yellow-400" />
              </li>
            ))}
          </ul>
        </section>

        {/* Market Trends */}
        <section className="bg-white dark:bg-gray-800 p-4 rounded shadow flex-1">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Market Trends
          </h2>
          <ul className="space-y-2">
            {marketTrends.map((trend, idx) => (
              <li
                key={idx}
                className="flex justify-between bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded"
              >
                <span>{trend.name}</span>
                <span
                  className={
                    trend.trend.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {trend.trend}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
