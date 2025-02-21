import React from "react";

const jobs = [
  {
    title: "Work Shop Manager - Google",
    location: "Nagpur, Maharashtra",
    created: "Jan 1st, 10 AM",
    expires: "Mon, Mar 30th",
    stats: [
      { label: "Applicants", count: 28 },
      { label: "New", count: 20 },
      { label: "Reviewed", count: 5 },
      { label: "Rejected", count: 15 },
      { label: "Hired", count: 6 },
    ],
  },
  {
    title: "Front End Developer - Instagram",
    location: "Nagpur, Maharashtra",
    created: "Jan 1st, 10 AM",
    expires: "Mon, Mar 30th",
    stats: [
      { label: "Applicants", count: 28 },
      { label: "New", count: 20 },
      { label: "Reviewed", count: 5 },
      { label: "Rejected", count: 15 },
      { label: "Hired", count: 6 },
    ],
  },
];

const RecentlyJobs = () => {
  return (
    <div className="bg-white p-1 rounded-xl shadow-md w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recently Posted Jobs</h2>
        <button className="text-blue-600 hover:underline">View All</button>
      </div>

      {/* Jobs List */}
      {jobs.map((job, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4 flex justify-between items-center">
          {/* Left Side: Job Info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <h3 className="font-medium">{job.title}</h3>
            </div>
            <p className="text-gray-500 text-sm">{job.location}</p>
            <p className="text-gray-400 text-xs">
              Created on {job.created} | Expires on {job.expires}
            </p>
          </div>

          {/* Right Side: Application Stats */}
          <div className="grid grid-cols-5 gap-4">
            {job.stats.map((item, idx) => (
              <div key={idx} className="bg-purple-100 p-3 rounded-md text-center w-16">
                <p className="text-xs text-gray-600">{item.label}</p>
                <p className="font-bold text-lg">{item.count}</p>
              </div>
            ))}
          </div>

          {/* Review Button */}
          <div>
            <button className="text-blue-500 font-semibold hover:underline">Review</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentlyJobs;
