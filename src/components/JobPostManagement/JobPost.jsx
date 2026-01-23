import React from "react";

const JobPost = () => {
  const stats = [
    { title: "Active Jobs", count: 50, icon: "📝" },
    { title: "New Applications", count: 42, icon: "📩" },
    { title: "Shortlist", count: 24, icon: "✅" },
    { title: "Shortlist Reviewed", count: 12, icon: "📊" },
  ];

  return (
    <div className="bg-gray-100 p-1">
      <h1 className="text-lg font-semibold">Hello! TechnoHire</h1>
      <h2 className="text-2xl font-bold mt-2">Job Post Management</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-md bg-white flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="text-2xl">{item.icon}</span>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-3">{item.count}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
                <span className="text-base">⏱️</span>
                <span>Update Today Morning</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPost;
