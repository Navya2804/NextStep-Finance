import React from "react";

const Contact = () => {
  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Contact Us
      </h1>

      {/* Optional Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        />
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6 w-full">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            >
              <option>Select category</option>
              <option>Technical Issue</option>
              <option>Billing</option>
              <option>General Inquiry</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              We’ll never share your email.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            rows="8"
            placeholder="Your message"
            className="flex-1 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 resize-none"
          ></textarea>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Please provide as much detail as possible.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          Send →
        </button>
      </div>
    </div>
  );
};

export default Contact;
