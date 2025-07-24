import { useState } from 'react';
import { FaRegUser, FaRegComment, FaArrowRight } from 'react-icons/fa';

const posts = Array.from({ length: 9 }).map((_, idx) => ({
  id: idx + 1,
  title: 'EUR/JPY 12HOURS Aka by Japsku Inpade',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.',
  image: `https://source.unsplash.com/random/300x200?sig=${idx + 1}`,
}));

export default function Community() {
  const [activeTab, setActiveTab] = useState('Hot News');

  const tabs = ['Trending', 'Hot News', 'Popular', 'Latest'];

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Community</h1>

      {/* Search Bar */}
      <div className="flex">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 rounded-full text-sm ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-md shadow p-3 flex flex-col"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="mt-3 font-semibold text-gray-800 dark:text-gray-100">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {post.description}
            </p>
            <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center space-x-1">
                <FaRegUser /> <span>Username</span>
              </span>
              <span className="flex items-center space-x-1">
                <FaRegComment /> <span>1</span>
              </span>
              <span>
                <FaArrowRight />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900">
          Load More
        </button>
      </div>
    </div>
  );
}
