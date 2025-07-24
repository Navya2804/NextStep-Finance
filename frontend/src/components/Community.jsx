import React, { useState } from "react";
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

const sampleData = {
  monthly: [
    { date: "2025-07-01", profit: 1000, goal: 3000 },
    { date: "2025-07-02", profit: 1800, goal: 3000 },
    { date: "2025-07-03", profit: 2400, goal: 3000 },
    { date: "2025-07-04", profit: 3000, goal: 3000 },
  ],
  quarterly: [
    { date: "Q1", profit: 9000, goal: 12000 },
    { date: "Q2", profit: 11000, goal: 12000 },
    { date: "Q3", profit: 13000, goal: 12000 },
    { date: "Q4", profit: 16000, goal: 12000 },
  ],
  semiannually: [
    { date: "H1", profit: 20000, goal: 25000 },
    { date: "H2", profit: 27000, goal: 25000 },
  ],
  annually: [
    { date: "2024", profit: 40000, goal: 50000 },
    { date: "2025", profit: 47000, goal: 50000 },
  ],
};

export default function Goals() {
  const [timeline, setTimeline] = useState("monthly");
  const data = sampleData[timeline];

  return (
    <div className="p-6 space-y-10 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold">Goals</h1>

      {/* Timeline Dropdown */}
      <div className="flex justify-end">
        <select
          className="p-2 border dark:bg-gray-800 dark:text-white rounded"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="semiannually">Semi-annually</option>
          <option value="annually">Annually</option>
        </select>
      </div>

      {/* Graph */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: "INR", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="profit" stroke="#3b82f6" name="Profit" />
          <Line
            type="monotone"
            dataKey="goal"
            stroke="#10b981"
            name="Goal"
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Why this happened? */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Why this happened?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ReasonCard
            reason="Low Q1 Sales"
            explanation="Seasonal demand drop and delayed campaigns."
          />
          <ReasonCard
            reason="High Return Rate"
            explanation="Manufacturing defect in batch B23 caused many returns."
          />
        </div>
      </section>

      {/* What can be improved? */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">What can be improved?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ReasonCard
            reason="Enhance Marketing"
            explanation="Launch regional and digital ads for Q3 onwards."
          />
          <ReasonCard
            reason="Upgrade QA Process"
            explanation="Stricter batch checks and testing to avoid defects."
          />
        </div>
      </section>
    </div>
  );
}

function ReasonCard({ reason, explanation }) {
  return (
    <div className="p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 shadow">
      <h3 className="text-lg font-semibold">Reason: {reason}</h3>
      <p className="mt-2 text-sm">Explanation: {explanation}</p>
    </div>
  );
}


// import { useState } from 'react';
// import { FaRegUser, FaRegComment, FaArrowRight } from 'react-icons/fa';

// const posts = Array.from({ length: 9 }).map((_, idx) => ({
//   id: idx + 1,
//   title: 'EUR/JPY 12HOURS Aka by Japsku Inpade',
//   description:
//     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.',
//   image: `https://source.unsplash.com/random/300x200?sig=${idx + 1}`,
// }));

// export default function Community() {
//   const [activeTab, setActiveTab] = useState('Hot News');

//   const tabs = ['Trending', 'Hot News', 'Popular', 'Latest'];

//   return (
//     <div className="space-y-6 w-full">
//       <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Community</h1>

//       {/* Search Bar */}
//       <div className="flex">
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
//         />
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-3 mt-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-1 rounded-full text-sm ${
//               activeTab === tab
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Posts Grid */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {posts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white dark:bg-gray-800 rounded-md shadow p-3 flex flex-col"
//           >
//             <img
//               src={post.image}
//               alt={post.title}
//               className="w-full h-40 object-cover rounded"
//             />
//             <h2 className="mt-3 font-semibold text-gray-800 dark:text-gray-100">
//               {post.title}
//             </h2>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               {post.description}
//             </p>
//             <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
//               <span className="flex items-center space-x-1">
//                 <FaRegUser /> <span>Username</span>
//               </span>
//               <span className="flex items-center space-x-1">
//                 <FaRegComment /> <span>1</span>
//               </span>
//               <span>
//                 <FaArrowRight />
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Load More */}
//       <div className="text-center">
//         <button className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900">
//           Load More
//         </button>
//       </div>
//     </div>
//   );
// }
