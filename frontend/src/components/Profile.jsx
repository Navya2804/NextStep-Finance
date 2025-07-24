import React from 'react';

const Profile = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow p-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">Account Setting</h2>
      <h3 className="text-blue-600 dark:text-blue-400 font-medium mb-2">My Profile</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Update Photo and personal detail here
      </p>

      {/* Profile and Cover Upload */}
      <div className="flex flex-col items-center space-y-4 mb-8">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <p className="text-sm text-center mt-2">This will be display on your profile</p>
        </div>

        <div className="w-full max-w-md border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Cover Image</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Drag and drop here</p>
        </div>
      </div>

      {/* General Info Form */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              placeholder="Email"
              className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Email"
              className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Display Name</label>
          <input
            type="text"
            placeholder="Email"
            className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="min-w-[100px]">
            <label className="block text-sm font-medium mb-1">Select Country</label>
            <select className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-800">
              <option>+00</option>
              <option>+1</option>
              <option>+91</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            placeholder="Description"
            className="w-full p-2 h-24 rounded border dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100 dark:hover:bg-red-900">
            Discard Change
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
