import React from "react"; 
import { FaTrashAlt, FaEye, FaChevronDown } from "react-icons/fa";

const reportedJobs = [
  { 
    title: "Networking Engineer", 
    reported: 82, 
    logo: "https://cdn-icons-png.flaticon.com/512/4228/4228679.png" // Network Engineer Icon
  },
  { 
    title: "Non Voice Support", 
    reported: 71, 
    logo: "https://cdn-icons-png.flaticon.com/512/2920/2920264.png" // Customer Support Icon
  },
  { 
    title: "Technical Support", 
    reported: 79, 
    logo: "https://cdn-icons-png.flaticon.com/512/3771/3771518.png" // Technical Support Icon
  },
  { 
    title: "UI/UX Designer", 
    reported: 67, 
    logo: "https://cdn-icons-png.flaticon.com/512/5642/5642331.png" // UI/UX Icon
  },
];


const hiringCompanies = [
  {
    hired: "30K",
    company: "Figma",
    percentage: 25.8,
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png", // Updated to correct Figma logo
    increase: true,
  },
  {
    hired: "26K",
    company: "Apple",
    percentage: 16.2,
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", // Updated to correct Apple logo
    increase: false,
  },
  {
    hired: "223K",
    company: "Google",
    percentage: 25.8,
    logo: "https://cdn-icons-png.flaticon.com/512/2702/2702602.png",
    increase: true,
  },
  {
    hired: "144K",
    company: "Facebook",
    percentage: 16.2,
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
    increase: false,
  },
  {
    hired: "78K",
    company: "Instagram",
    percentage: 25.8,
    logo: "https://cdn-icons-png.flaticon.com/512/733/733558.png",
    increase: true,
  },
];


const ReportedJobs = () => {
  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reported Jobs */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Reported Jobs</h2>
            <button className="text-blue-600 hover:underline">View More</button>
          </div>

          {reportedJobs.map((job, index) => (
            <div key={index} className="flex items-center p-3 border rounded-md mb-3 gap-4">
              <img src={job.logo} alt={job.title} className="w-8 h-8 rounded-full" />
              <div>
                <h3 className="font-medium">{job.title}</h3>
                <p className="text-sm text-red-500">⚠️ Reported by {job.reported} people as spam</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-purple-500 text-white px-3 py-1 rounded flex items-center">
                  <FaEye className="mr-1" /> View
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
                  <FaTrashAlt className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Top Hiring Companies */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Top Hiring Companies</h2>
            <button className="bg-gray-200 px-3 py-1 rounded-md flex items-center text-sm">
              Per Month <FaChevronDown className="ml-1" />
            </button>
          </div>

          {/* Table Header */}
          <div className="flex justify-between text-gray-600 text-sm pb-2 border-b">
            <p>Companies</p>
            <p>Hiring %</p>
          </div>

          {/* Company List */}
          <div className="grid grid-cols-1 gap-4 mt-4">
            {hiringCompanies.map((company, index) => (
              <div key={index} className="flex items-center gap-4">
                <img src={company.logo} alt={company.company} className="w-8 h-8 rounded-full" />
                <div className="w-full">
                  <div className="text-gray-700 font-bold">{company.hired} hired</div>
                  <div className="flex justify-between">
                    <p className="font-medium">{company.company}</p>
                    <p className={company.increase ? "text-green-500" : "text-red-500"}>
                      {company.increase ? "▲" : "▼"} {company.percentage}%
                    </p>
                  </div>
                  <div className="bg-gray-200 h-2 rounded-full w-full mt-1">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${company.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportedJobs;
