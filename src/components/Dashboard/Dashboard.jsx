import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  PieChart,
  Legend,
  Pie,
  Cell,
} from "recharts";

import {
  Wallet,
  Users,
  UserCheck,
  Briefcase,
  User,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

// --- DATA (Monthly Data for different years) ---
const revenueDataByYear = {
  2024: {
    Jan: { name: "Jan", v1: 800, v2: 800, v3: 900, total: 2500 },
    Feb: { name: "Feb", v1: 600, v2: 600, v3: 750, total: 1950 },
    Mar: { name: "Mar", v1: 1000, v2: 1000, v3: 1500, total: 3500 },
    Apr: { name: "Apr", v1: 500, v2: 500, v3: 700, total: 1700 },
    May: { name: "May", v1: 700, v2: 600, v3: 680, total: 1980 },
    Jun: { name: "Jun", v1: 900, v2: 800, v3: 950, total: 2650 },
    Jul: { name: "Jul", v1: 600, v2: 600, v3: 800, total: 2000 },
    Aug: { name: "Aug", v1: 1000, v2: 1000, v3: 2000, total: 4000 },
    Sep: { name: "Sep", v1: 500, v2: 500, v3: 900, total: 1900 },
    Oct: { name: "Oct", v1: 700, v2: 700, v3: 790, total: 2190 },
    Nov: { name: "Nov", v1: 600, v2: 600, v3: 690, total: 1890 },
    Dec: { name: "Dec", v1: 850, v2: 850, v3: 1200, total: 2900 },
  },
  2025: {
    Jan: { name: "Jan", v1: 900, v2: 900, v3: 1000, total: 2800 },
    Feb: { name: "Feb", v1: 700, v2: 700, v3: 850, total: 2250 },
    Mar: { name: "Mar", v1: 1100, v2: 1100, v3: 1600, total: 3800 },
    Apr: { name: "Apr", v1: 600, v2: 600, v3: 800, total: 2000 },
    May: { name: "May", v1: 800, v2: 700, v3: 780, total: 2280 },
    Jun: { name: "Jun", v1: 1000, v2: 900, v3: 1050, total: 2950 },
    Jul: { name: "Jul", v1: 700, v2: 700, v3: 900, total: 2300 },
    Aug: { name: "Aug", v1: 1100, v2: 1100, v3: 2200, total: 4400 },
    Sep: { name: "Sep", v1: 600, v2: 600, v3: 1000, total: 2200 },
    Oct: { name: "Oct", v1: 800, v2: 800, v3: 890, total: 2490 },
    Nov: { name: "Nov", v1: 700, v2: 700, v3: 790, total: 2190 },
    Dec: { name: "Dec", v1: 950, v2: 950, v3: 1300, total: 3200 },
  },
  2026: {
    Jan: { name: "Jan", v1: 1000, v2: 1000, v3: 1100, total: 3100 },
    Feb: { name: "Feb", v1: 800, v2: 800, v3: 950, total: 2550 },
    Mar: { name: "Mar", v1: 1200, v2: 1200, v3: 1700, total: 4100 },
    Apr: { name: "Apr", v1: 700, v2: 700, v3: 900, total: 2300 },
    May: { name: "May", v1: 900, v2: 800, v3: 880, total: 2580 },
    Jun: { name: "Jun", v1: 1100, v2: 1000, v3: 1150, total: 3250 },
    Jul: { name: "Jul", v1: 800, v2: 800, v3: 1000, total: 2600 },
    Aug: { name: "Aug", v1: 1200, v2: 1200, v3: 2400, total: 4800 },
    Sep: { name: "Sep", v1: 700, v2: 700, v3: 1100, total: 2500 },
    Oct: { name: "Oct", v1: 900, v2: 900, v3: 990, total: 2790 },
    Nov: { name: "Nov", v1: 800, v2: 800, v3: 890, total: 2490 },
    Dec: { name: "Dec", v1: 1050, v2: 1050, v3: 1400, total: 3500 },
  },
};

// Weekly data for months (rounded to nearest integer)
const getWeeklyData = (year, month) => {
  const weeks = [`Week 1`, `Week 2`, `Week 3`, `Week 4`];
  const baseData = {
    2024: {
      Jan: [600, 700, 800, 900],
      Feb: [500, 600, 700, 800],
      Mar: [700, 800, 900, 1000],
      Apr: [400, 500, 600, 700],
      May: [500, 600, 650, 700],
      Jun: [650, 700, 800, 850],
      Jul: [450, 550, 650, 750],
      Aug: [700, 800, 900, 1000],
      Sep: [400, 500, 600, 650],
      Oct: [550, 600, 650, 700],
      Nov: [450, 500, 600, 650],
      Dec: [600, 700, 800, 900],
    },
    2025: {
      Jan: [700, 800, 900, 1000],
      Feb: [600, 700, 800, 900],
      Mar: [800, 900, 1000, 1100],
      Apr: [500, 600, 700, 800],
      May: [600, 700, 750, 800],
      Jun: [750, 800, 900, 950],
      Jul: [550, 650, 750, 850],
      Aug: [800, 900, 1000, 1100],
      Sep: [500, 600, 700, 750],
      Oct: [650, 700, 750, 800],
      Nov: [550, 600, 700, 750],
      Dec: [700, 800, 900, 1000],
    },
    2026: {
      Jan: [800, 900, 1000, 1100],
      Feb: [700, 800, 900, 1000],
      Mar: [900, 1000, 1100, 1200],
      Apr: [600, 700, 800, 900],
      May: [700, 800, 850, 900],
      Jun: [850, 900, 1000, 1050],
      Jul: [650, 750, 850, 950],
      Aug: [900, 1000, 1100, 1200],
      Sep: [600, 700, 800, 850],
      Oct: [750, 800, 850, 900],
      Nov: [650, 700, 800, 850],
      Dec: [800, 900, 1000, 1100],
    },
  };

  const weeklyValues = baseData[year]?.[month] || [500, 600, 700, 800];

  return weeks.map((week, index) => ({
    name: week,
    v1: Math.round(weeklyValues[index] * 0.8),
    v2: Math.round(weeklyValues[index] * 0.9),
    v3: weeklyValues[index],
    total: Math.round(weeklyValues[index] * 2.7),
  }));
};

const jobDataByYear = {
  2024: [
    { name: "Jan", listing: 3000, shortlisted: 2500, hired: 2000 },
    { name: "Feb", listing: 3500, shortlisted: 2800, hired: 2300 },
    { name: "Mar", listing: 4000, shortlisted: 3200, hired: 2500 },
    { name: "Apr", listing: 4500, shortlisted: 3500, hired: 2700 },
    { name: "May", listing: 4200, shortlisted: 3800, hired: 3000 },
    { name: "Jun", listing: 4800, shortlisted: 4200, hired: 3300 },
    { name: "Jul", listing: 5000, shortlisted: 4500, hired: 3500 },
    { name: "Aug", listing: 5200, shortlisted: 4700, hired: 3700 },
    { name: "Sep", listing: 4900, shortlisted: 4400, hired: 3400 },
    { name: "Oct", listing: 5100, shortlisted: 4600, hired: 3600 },
    { name: "Nov", listing: 5300, shortlisted: 4800, hired: 3800 },
    { name: "Dec", listing: 5500, shortlisted: 5000, hired: 4000 },
  ],
  2025: [
    { name: "Jan", listing: 3200, shortlisted: 2700, hired: 2200 },
    { name: "Feb", listing: 3700, shortlisted: 3000, hired: 2500 },
    { name: "Mar", listing: 4200, shortlisted: 3400, hired: 2700 },
    { name: "Apr", listing: 4700, shortlisted: 3700, hired: 2900 },
    { name: "May", listing: 4400, shortlisted: 4000, hired: 3200 },
    { name: "Jun", listing: 5000, shortlisted: 4400, hired: 3500 },
    { name: "Jul", listing: 5200, shortlisted: 4700, hired: 3700 },
    { name: "Aug", listing: 5400, shortlisted: 4900, hired: 3900 },
    { name: "Sep", listing: 5100, shortlisted: 4600, hired: 3600 },
    { name: "Oct", listing: 5300, shortlisted: 4800, hired: 3800 },
    { name: "Nov", listing: 5500, shortlisted: 5000, hired: 4000 },
    { name: "Dec", listing: 5700, shortlisted: 5200, hired: 4200 },
  ],
  2026: [
    { name: "Jan", listing: 3400, shortlisted: 2900, hired: 2400 },
    { name: "Feb", listing: 3900, shortlisted: 3200, hired: 2700 },
    { name: "Mar", listing: 4400, shortlisted: 3600, hired: 2900 },
    { name: "Apr", listing: 4900, shortlisted: 3900, hired: 3100 },
    { name: "May", listing: 4600, shortlisted: 4200, hired: 3400 },
    { name: "Jun", listing: 5200, shortlisted: 4600, hired: 3700 },
    { name: "Jul", listing: 5400, shortlisted: 4900, hired: 3900 },
    { name: "Aug", listing: 5600, shortlisted: 5100, hired: 4100 },
    { name: "Sep", listing: 5300, shortlisted: 4800, hired: 3800 },
    { name: "Oct", listing: 5500, shortlisted: 5000, hired: 4000 },
    { name: "Nov", listing: 5700, shortlisted: 5200, hired: 4200 },
    { name: "Dec", listing: 5900, shortlisted: 5400, hired: 4400 },
  ],
};

const pieData = [
  { name: "Technical", value: 75 },
  { name: "Non Technical", value: 25 },
];

const COLORS = ["#EC4899", "#6366F1"];

const tableData = [
  {
    sr: 1,
    user: "TechnoKrate",
    role: "Company",
    amount: "₹1949",
    date: "Feb 2, 2026 23:26",
  },
  {
    sr: 2,
    user: "Hemant Rai",
    role: "Job Seeker",
    amount: "₹149",
    date: "Feb 2, 2026 23:24",
  },
  {
    sr: 3,
    user: "HCL",
    role: "Company",
    amount: "₹1949",
    date: "Feb 2, 2026 23:23",
  },
  {
    sr: 4,
    user: "Amazon",
    role: "Company",
    amount: "₹1949",
    date: "Feb 2, 2026 23:22",
  },
  {
    sr: 5,
    user: "Sanjay Jha",
    role: "Job Seeker",
    amount: "₹149",
    date: "Feb 2, 2026 23:16",
  },
];

// Custom Tooltip to show values without decimals
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ₹{Math.round(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomJobTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {Math.round(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const columns = [
  { header: "Sr.No.", accessorKey: "sr" },
  {
    header: "User",
    accessorKey: "user",
    cell: ({ row }) => (
      <div className="text-left">
        <p className="font-medium text-gray-800">{row.original.user}</p>
        <p className="text-xs text-gray-500">{row.original.role}</p>
      </div>
    ),
  },
  { header: "Amount", accessorKey: "amount" },
  { header: "Date & Time", accessorKey: "date" },
];

// --- COMPONENTS ---
function Card({ title, value, growth, icon, bg, subtitle }) {
  return (
    <div className={`p-6 rounded-2xl ${bg} shadow-sm border border-black/5`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-lg font-bold text-gray-900">{title}</p>
          {subtitle && <p className="text-sm text-gray-500 mb-1">{subtitle}</p>}
          <h2 className="text-2xl font-bold mt-4">{value}</h2>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp size={18} className="text-green-600" />
            <span className="text-sm text-gray-800 font-medium">
              {growth} vs Last month
            </span>
          </div>
        </div>
        <div className="p-2 bg-white/50 rounded-lg shadow-inner">{icon}</div>
      </div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState("Mar");
  const [viewType, setViewType] = useState("yearly"); // "yearly" or "monthly"

  // Get available years
  const availableYears = Object.keys(revenueDataByYear).map(Number);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get data based on selected view
  const getRevenueData = () => {
    if (viewType === "yearly") {
      return Object.values(revenueDataByYear[selectedYear]);
    } else {
      return getWeeklyData(selectedYear, selectedMonth);
    }
  };

  const revenueData = getRevenueData();
  const jobData = jobDataByYear[selectedYear] || jobDataByYear[2026];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-gray-50 lg:p-5 m-3 rounded-xl shadow-sm flex flex-col gap-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <select className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm shadow-sm focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer appearance-none">
            <option>Last Month</option>
            <option>Last Week</option>
            <option>Last Year</option>
          </select>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Total Revenue"
            value="₹96,780"
            growth="+1.8%"
            subtitle="Job Seekers + Employers"
            icon={<Wallet size={28} className="text-purple-600" />}
            bg="bg-gradient-to-br from-purple-500 to-indigo-200 "
          />

          <Card
            title="Total User"
            value="1,24,630"
            growth="+15.2%"
            subtitle="Job Seekers + Employers"
            icon={<Users size={28} className="text-green-600" />}
            bg="bg-gradient-to-br from-emerald-100 to-emerald-300"
          />

          <Card
            title="Active User"
            value="94,630"
            growth="+5.2%"
            subtitle="Job Seekers + Employers"
            icon={<UserCheck size={28} className="text-yellow-600" />}
            bg="bg-gradient-to-br from-amber-200 to-amber-300"
          />

          <Card
            title="Active Job Listing"
            value="32,630"
            growth="+12.8%"
            icon={<Briefcase size={28} className="text-orange-500" />}
            bg="bg-gradient-to-br from-rose-300 to-rose-200"
          />

          <Card
            title="Shortlisted Candidates"
            value="12,630"
            growth="+2.8%"
            icon={<User size={28} className="text-purple-500" />}
            bg="bg-gradient-to-br from-violet-500 to-violet-200"
          />
          <Card
            title="Successful Hires"
            value="6,780"
            growth="+1.8%"
            icon={<CheckCircle size={28} className="text-green-600" />}
            bg="bg-gradient-to-br from-sky-300 to-sky-200"
          />
        </div>

        {/* REVENUE CHART */}
        <div className="rounded-2xl p-6 mt-8 border border-gray-200 shadow-sm bg-white">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Revenue Overview
            </h2>

            {/* Filter Controls */}
            <div className="flex gap-3">
              {/* View Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewType("yearly")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    viewType === "yearly"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setViewType("monthly")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    viewType === "monthly"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Monthly
                </button>
              </div>

              {/* Year Selector */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Month Selector (only visible in monthly view) */}
              {viewType === "monthly" && (
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueData}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              {/* Multiple Lines for different data series */}
              <Line
                type="monotone"
                dataKey="v1"
                stroke="#A855F7"
                strokeWidth={2}
                dot={false}
                name="Revenue Stream 1"
              />
              <Line
                type="monotone"
                dataKey="v2"
                stroke="#A855F7"
                strokeWidth={2}
                dot={false}
                name="Revenue Stream 2"
              />
              <Line
                type="monotone"
                dataKey="v3"
                stroke="#A855F7"
                strokeWidth={2}
                dot={false}
                name="Revenue Stream 3"
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#D97706"
                strokeWidth={3}
                dot={{ r: 4, fill: "#fff", stroke: "#F59E0B", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                name="Total Revenue"
              />

              {/* Area under the total line */}
              <Area
                type="monotone"
                dataKey="total"
                stroke="none"
                fill="url(#lineGradient)"
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Chart Info */}
          <div className="mt-4 text-center text-sm text-gray-500">
            {viewType === "yearly" ? (
              <span>Showing {selectedYear} revenue data by month</span>
            ) : (
              <span>
                Showing {selectedMonth} {selectedYear} revenue data by week
              </span>
            )}
          </div>
        </div>

        {/* JOB APPLICATION CHARTS - New UI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-gradient-to-br from-white to-purple-50/20 rounded-2xl border border-purple-100 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Job Application Analytics
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Track your hiring pipeline
                </p>
              </div>

              {/* Year filter for Job Data */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border border-purple-200 bg-white px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-3 text-center">
                <p className="text-xs text-indigo-600 font-medium">
                  Total Listings
                </p>
                <p className="text-xl font-bold text-indigo-700">
                  {jobData.reduce((sum, item) => sum + item.listing, 0)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center">
                <p className="text-xs text-purple-600 font-medium">
                  Shortlisted
                </p>
                <p className="text-xl font-bold text-purple-700">
                  {jobData.reduce((sum, item) => sum + item.shortlisted, 0)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-3 text-center">
                <p className="text-xs text-pink-600 font-medium">Hired</p>
                <p className="text-xl font-bold text-pink-700">
                  {jobData.reduce((sum, item) => sum + item.hired, 0)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={jobData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e0e0e0"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#6B7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#6B7280" }}
                    />
                    <Tooltip content={<CustomJobTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="listing"
                      stroke="#6366F1"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#6366F1", strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name="Listings"
                    />
                    <Line
                      type="monotone"
                      dataKey="shortlisted"
                      stroke="#A855F7"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#A855F7", strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name="Shortlisted"
                    />
                    <Line
                      type="monotone"
                      dataKey="hired"
                      stroke="#EC4899"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#EC4899", strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name="Hired"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={renderCustomizedLabel}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center mt-3">
                      <p className="text-xs text-gray-500">Total Applications</p>
                      <p className="text-lg font-bold text-purple-600">
                        {pieData.reduce((sum, item) => sum + item.value, 0)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6 text-xs font-medium mt-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-50 rounded-full">
                    <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                    <span className="text-pink-700">Technical</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                    <span className="text-indigo-700">Non-Tech</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TRANSACTIONS TABLE - New UI */}
          <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Recent Transactions
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Latest payment activities
                </p>
              </div>
              <button
                onClick={() => navigate("/revenue-management")}
                className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors flex items-center gap-1"
              >
                View All →
              </button>
            </div>

            {/* Simple Card Grid */}
            <div className="space-y-3">
              {table.getRowModel().rows.map((row, index) => {
                const cells = row.getVisibleCells();
                return (
                  <div
                    key={row.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-pink-50 rounded-xl transition-all hover:bg-gradient-to-r hover:from-purple-200 hover:to-pink-100 transition-all duration-100 cursor-pointer group"
                  >
                    {/* Left Section */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-1">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {cells.map((cell, idx) => (
                            <div key={cell.id} className="flex flex-col">
                              <span className="text-xs text-gray-400">
                                {cell.column.columnDef.header}
                              </span>
                              <span className="text-sm text-gray-700 font-medium">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="text-right">
                      <svg
                        className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More Button */}
            {table.getRowModel().rows.length > 5 && (
              <div className="mt-6 text-center">
                <button className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors">
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for pie chart labels
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#555"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default Dashboard;
