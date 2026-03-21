import React from "react";

const CreditModel = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-4">Credit Management</h1>

      <hr className="mb-6" />

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search"
          className="border px-4 py-2 rounded-md w-64"
        />
      </div>

      {/* Database Credit */}
      <h2 className="text-lg font-semibold mb-4">Database Credit</h2>

      <div className="grid grid-cols-2 gap-6 mb-8">

        {/* Profile Unlock */}
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Profile Unlock</h3>
          <p className="text-gray-500 text-sm mb-4">
            Required 1 Database Credit Per Profile
          </p>
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-md">
            Edit
          </button>
        </div>

        {/* Excel Download */}
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Excel Download</h3>
          <p className="text-gray-500 text-sm mb-4">
            Required 2 Database Credit Per Profile
          </p>
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-md">
            Edit
          </button>
        </div>

      </div>

      {/* Job Post Credit */}
      <h2 className="text-lg font-semibold mb-4">Job Post Credit</h2>

      <div className="grid grid-cols-3 gap-6">

        {/* Classic */}
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Classic Job Post</h3>
          <p className="text-gray-500 text-sm mb-4">
            Required 1 Job Credit Per Job Post
          </p>
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-md">
            Edit
          </button>
        </div>

        {/* Premium */}
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Premium Job Post</h3>
          <p className="text-gray-500 text-sm mb-4">
            Required 2 Job Credit Per Job Post
          </p>
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-md">
            Edit
          </button>
        </div>

        {/* Super Premium */}
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Super Premium Job Post</h3>
          <p className="text-gray-500 text-sm mb-4">
            Required 3 Job Credit Per Job Post
          </p>
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-md">
            Edit
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreditModel;