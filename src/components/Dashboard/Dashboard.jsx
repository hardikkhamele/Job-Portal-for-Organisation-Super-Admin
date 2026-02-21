import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FaUsers,
  FaUserTie,
  FaBriefcase,
  FaDollarSign,
} from "react-icons/fa";

const revenueData = [
  { name: "1 Mar", value: 2400 },
  { name: "2 Mar", value: 1800 },
  { name: "3 Mar", value: 3000 },
  { name: "4 Mar", value: 1400 },
  { name: "5 Mar", value: 1900 },
  { name: "6 Mar", value: 2500 },
  { name: "7 Mar", value: 1800 },
  { name: "8 Mar", value: 3100 },
  { name: "9 Mar", value: 1500 },
  { name: "10 Mar", value: 2000 },
  { name: "11 Mar", value: 1700 },
];

const jobData = [
  { name: "Jan", listing: 3000, shortlisted: 2000, hired: 2500 },
  { name: "Feb", listing: 3500, shortlisted: 2300, hired: 2800 },
  { name: "Mar", listing: 4000, shortlisted: 2500, hired: 3200 },
  { name: "Apr", listing: 4500, shortlisted: 2700, hired: 3500 },
  { name: "May", listing: 4200, shortlisted: 3000, hired: 3800 },
  { name: "Jun", listing: 4800, shortlisted: 3300, hired: 4200 },
];

const pieData = [
  { name: "Technical", value: 75 },
  { name: "Non Technical", value: 25 },
];

const pieColors = ["#7C3AED", "#E879F9"];

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F4F6FA] p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <select className="bg-white px-4 py-2 rounded-lg shadow-sm border text-sm">
            <option>Last Month</option>
          </select>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Total Revenue" value="$96,780" growth="+1.8%" icon={<FaDollarSign />} gradient="from-purple-200 to-purple-100" />
          <Card title="Total User" value="1,24,630" growth="+15.2%" icon={<FaUsers />} gradient="from-green-200 to-green-100" />
          <Card title="Active User" value="94,630" growth="+5.2%" icon={<FaUserTie />} gradient="from-yellow-200 to-yellow-100" />
          <Card title="Active Job Listing" value="32,630" growth="+12.8%" icon={<FaBriefcase />} gradient="from-pink-200 to-pink-100" />
          <Card title="Shortlisted Candidates" value="12,630" growth="+2.8%" icon={<FaUsers />} gradient="from-indigo-200 to-indigo-100" />
          <Card title="Successful Hires" value="6,780" growth="+1.8%" icon={<FaUserTie />} gradient="from-teal-200 to-teal-100" />
        </div>

        {/* REVENUE CHART */}
        <div className="bg-white rounded-3xl shadow-sm p-6 mt-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Revenue Overview
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#C4B5FD"
                radius={[12, 12, 0, 0]}
                barSize={40}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6D28D9"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

{/* JOB APPLICATION */}
<div className="bg-white rounded-2xl border border-purple-300 p-6 shadow-sm">

  {/* Header */}
  <div className="flex justify-between items-center mb-5">
    <h2 className="text-lg font-semibold text-gray-800">
      Job Application{" "}
      <span className="text-purple-600 font-bold ml-2">5,000</span>
    </h2>

    <select className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white">
      <option>This Year</option>
    </select>
  </div>

  {/* Inner Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* LEFT: LINE CHART BOX */}
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">

      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={jobData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="listing"
            stroke="#6366F1"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="shortlisted"
            stroke="#A855F7"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="hired"
            stroke="#EC4899"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-3 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
          Job Listing
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
          Shortlisted
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
          Hires
        </span>
      </div>
    </div>

    {/* RIGHT: DONUT BOX */}
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col items-center justify-center">

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={pieData}
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={pieColors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Donut Labels */}
      <div className="flex justify-center gap-6 text-xs mt-2">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
          Technical Role
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-pink-400 rounded-full"></span>
          Non Technical Role
        </span>
      </div>
    </div>

  </div>
</div>


          {/* RECENT TRANSACTIONS */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">
              Recent Transactions
            </h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="bg-purple-100 text-gray-700">
                  <th className="py-3 rounded-l-xl">Sr.No</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th className="rounded-r-xl">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((num) => (
                  <tr
                    key={num}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 text-center">{num}</td>
                    <td className="text-center font-medium">
                      TechnoKrate
                    </td>
                    <td className="text-center text-purple-600 font-semibold">
                      ₹1949
                    </td>
                    <td className="text-center text-gray-500">
                      Feb 2, 2026 23:26
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

/* CARD COMPONENT */
function Card({ title, value, growth, icon, gradient }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} p-6 rounded-3xl shadow-sm hover:shadow-md transition`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <h2 className="text-2xl font-bold mt-2 text-gray-800">
            {value}
          </h2>
          <p className="text-green-600 text-sm mt-1">
            {growth} vs Last month
          </p>
        </div>

        <div className="bg-white p-3 rounded-xl shadow">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
