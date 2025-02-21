import React from "react";

const JobPost = () => {
  const stats = [
    { title: "Active Jobs", count: 50, icon: "📝", color: "bg-red-100" },
    { title: "New Applications", count: 42, icon: "📩", color: "bg-purple-100" },
    { title: "Shortlist", count: 24, icon: "✅", color: "bg-green-100" },
    { title: "Shortlist Reviewed", count: 12, icon: "📊", color: "bg-yellow-100" },
  ];

  return (
    <div className="bg-gray-100 p-1">
      <h1 className="text-lg font-semibold">Hello! TechnoHire</h1>
      <h2 className="text-2xl font-bold mt-2">Job Post Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md ${item.color} flex items-center justify-between`}
          >
            <div>
              <h3 className="text-xl font-semibold">{item.count}</h3>
              <p className="text-gray-700">{item.title}</p>
              <p className="text-xs text-gray-500">Updated Today Morning</p>
            </div>
            <span className="text-3xl">{item.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPost;






/*import React from "react";

const JobPost = () => {
  const stats = [
    { title: "Active Jobs", count: 50, icon: "📝", color: "bg-red-100" },
    { title: "New Applications", count: 42, icon: "📩", color: "bg-purple-100" },
    { title: "Shortlist", count: 24, icon: "✅", color: "bg-green-100" },
    { title: "Shortlist Reviewed", count: 12, icon: "📊", color: "bg-yellow-100" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-lg font-semibold">Hello! TechnoHire</h1>
      <h2 className="text-2xl font-bold mt-2">Job Post Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md ${item.color} flex items-center justify-between`}
          >
            <div>
              <h3 className="text-xl font-semibold">{item.count}</h3>
              <p className="text-gray-700">{item.title}</p>
              <p className="text-xs text-gray-500">Updated Today Morning</p>
            </div>
            <span className="text-3xl">{item.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPost;
*/