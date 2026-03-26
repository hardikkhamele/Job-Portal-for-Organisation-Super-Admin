import React from "react";
import {
  ResponsiveContainer,
  ComposedChart ,
  Bar,
  Line,
  Area,
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
  Wallet ,
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



const revenueData = [
  { name: "1 Mar", v1: 800, v2: 800, v3: 900, total: 2400 },
  { name: "2 Mar", v1: 600, v2: 600, v3: 750, total: 1800 },
  { name: "3 Mar", v1: 1000, v2: 1000, v3: 1500, total: 3000 },
  { name: "4 Mar", v1: 500, v2: 500, v3: 700, total: 1400 },
  { name: "5 Mar", v1: 700, v2: 600, v3: 680, total: 1900 },
  { name: "6 Mar", v1: 900, v2: 800, v3: 950, total: 2500 },
  { name: "7 Mar", v1: 600, v2: 600, v3: 800, total: 1800 },
  { name: "8 Mar", v1: 1000, v2: 1000, v3: 2000, total: 3800 },
  { name: "9 Mar", v1: 500, v2: 500, v3: 900, total: 1500 },
  { name: "10 Mar", v1: 700, v2: 700, v3: 790, total: 2000 },
  { name: "11 Mar", v1: 600, v2: 600, v3: 690, total: 1700 },
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

const COLORS = ["#EC4899", "#6366F1"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
}) => {
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
      fontSize={15}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};


const tableData = [
  { sr: 1, user: "TechnoKrate", role: "Company", amount: "₹1949", date: "Feb 2, 2026 23:26" },
  { sr: 2, user: "Hemant Rai", role: "Job Seeker", amount: "₹149", date: "Feb 2, 2026 23:24" },
  { sr: 3, user: "HCL", role: "Company", amount: "₹1949", date: "Feb 2, 2026 23:23" },
  { sr: 4, user: "Amazon", role: "Company", amount: "₹1949", date: "Feb 2, 2026 23:22" },
  { sr: 5, user: "Sanjay Jha", role: "Job Seeker", amount: "₹149", date: "Feb 2, 2026 23:16" },
];

const columns = [
  {
    header: "Sr.No.",
    accessorKey: "sr",
  },
  {
    header: "User",
    accessorKey: "user",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-gray-800">{row.original.user}</p>
        <p className="text-xs text-gray-500">{row.original.role}</p>
      </div>
    ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Date & Time",
    accessorKey: "date",
  },
];

function Dashboard() {
  const table = useReactTable({
  data: tableData,
  columns,
  getCoreRowModel: getCoreRowModel(),
});

  return (
  <div className="min-h-screen bg-gray-100 p-10 flex flex-col pb-20">
      <div className="bg-white rounded-xl border border-gray-200 p-6 ">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Dashboard
          </h1>

          <div className="relative">
          <select className="bg-white px-4 py-2 rounded-md border text-sm shadow-sm outline-none focus:outline-none focus:ring-0 appearance-none cursor-pointer">
            <option> Last Month</option>
            <option className="bg-white text-gray-700">Last Week</option>
            <option className="bg-white text-gray-700">Last Year</option>
          </select>

          
          </div>
        </div>

        {/* CARDS */} 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <Card 
            title="Total Revenue"
            value="₹96,780"
            growth="+1.8%"
            subtitle="Job Seekers + Employers"
            icon={<Wallet  size={30} className="text-purple-600 stroke-[2]" />}
             bg="bg-[#F2DAFF]"
          />

          <Card 
            title="Total User"
            value="1,24,630"
            growth="+15.2%"
            subtitle="Job Seekers + Employers"
            icon={<Users size={30} className="text-green-600 stroke-[2]" />}
            bg="bg-[#DAF8DE]"
          />

          <Card 
            title="Active User"
            value="94,630"
            growth="+5.2%"
            subtitle="Job Seekers + Employers"
            icon={<UserCheck size={30} className="text-yellow-600 stroke-[2]" />}
            bg="bg-[#FFEDCC]"
          />

          <Card 
            title="Active Job Listing"
            value="32,630"
            growth="+12.8%"
            icon={<Briefcase size={30} className="text-orange-500 stroke-[2]" />}
            bg="bg-[#FFE0DD]"
          />

          <Card 
            title="Shortlisted Candidates"
            value="12,630"
            growth="+2.8%"
            icon={<User size={30} className="text-purple-500 stroke-[2]" />}
            bg="bg-[#F2DAFF]"
          />

          <Card 
            title="Successful Hires"
            value="6,780"
            growth="+1.8%"
            icon={<CheckCircle size={30} className="text-green-600 stroke-[2]" />}
            bg="bg-[#DAF8DE]"
          />
        </div>

        {/* REVENUE CHART */}
        <div className="rounded-2xl p-6 mt-8 border border-gray-200 shadow-sm bg-gradient-to-b from-[#FFFFFF] to-[#FFECEC]">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Revenue Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={revenueData} barGap={0} barCategoryGap="35%">
            
              {/* LIGHT GRID */}
              <CartesianGrid
                strokeDasharray="3 3 "
                vertical={false}
                stroke="#E5E7EB"
              />
          
              {/* AXIS */}
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
          
              <YAxis
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
          
              <Tooltip />

              

              <defs>
              {/* purple bar gradient */}
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.9} />
                <stop offset="50%" stopColor="#C893FD" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#EDE9FE" stopOpacity={0.3} />
              </linearGradient>

              {/* ORANGE / PINK SHADE */}
              <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#f3afc0" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#FFECEC" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Bar dataKey="v1" stackId="a" fill="#EDE9FE" barSize={40}  />
             <Bar dataKey="v2" stackId="a" fill="#D8B4FE" />
              <Bar dataKey="v3" stackId="a" fill="#af80df"  radius={[14, 14, 0, 0]} />

            <Area
              type="monotone"
              dataKey="total"
              stroke="none"
              fill="url(#orangeGradient)"
            />
            

          <Line
            type="monotone"
            dataKey="total"
            stroke="#a6742e"
            fill="url(#orangeGradient)"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy } = props;
              return (
                <circle cx={cx} cy={cy + 4} r={4} fill="#fff" stroke="#f2be65" strokeWidth={2} />
              );
            }}
            activeDot={(props) => {
              const { cx, cy } = props;
              return (
                <circle cx={cx} cy={cy + 4} r={8} fill="#fff" stroke="#f2be65" strokeWidth={3} />
              );
            }}
          />   
              <Area /> 
              <Line />     
            </ComposedChart >
          </ResponsiveContainer>
        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

          {/* JOB APPLICATION */}
          <div className="bg-white rounded-2xl border border-purple-300  p-6 shadow-lg">

            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Job Application
                <span className="text-purple-600 ml-2 font-semibold">
                  5,000
                </span>
              </h2>

              <select className="border border-purple-300 px-2 py-1 rounded-md text-sm">
                <option>This Year</option>
              </select>
            </div>

           <div className="grid md:grid-cols-2 gap-6 mt-4">

              {/* LINE */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-purple-300">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={jobData}>

                  {/* GRID (light dashed like figma) */}
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#E5E7EB"
                  />

                  {/* X AXIS */}
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                  />

                  {/* Y AXIS */}
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                  />

                  <Tooltip />

                  {/* BLUE LINE */}
                  <Line
                    type="monotone"   
                    dataKey="listing"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#6366F1" }}
                    activeDot={{ r: 5 }}
                  />

                  {/* PURPLE LINE */}
                  <Line
                    type="monotone"
                    dataKey="shortlisted"
                    stroke="#A855F7"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#A855F7" }}
                  />

                  {/* PINK LINE */}
                  <Line
                    type="monotone"
                    dataKey="hired"
                    stroke="#EC4899"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#EC4899" }}
                  />

                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-3 text-sm">

                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  Job Listing
                </span>

                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Shortlisted
                </span>

                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Hires
                </span>

              </div>
            </div>

              {/* PIE */}
              <div className="bg-[#FFFFFF] p-4 rounded-xl border border-purple-300 flex flex-col items-center justify-center relative">

            {/* PIE CHART */}
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={true}   
                  label={renderCustomizedLabel}        
                   >
                
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
                
           
                
            {/*  ADD LEGEND HERE (IMPORTANT POSITION) */}
            <div className="mt-3 text-sm space-y-2">
                
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                <span className="text-gray-700">Technical Role</span>
              </div>
                
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                <span className="text-gray-700">Non Technical Role</span>
              </div>
                
            </div>
                
          </div>
          </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl border border-purple-300 p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Recent Transactions
            </h2>

            <div className="overflow-hidden rounded-xl border border-gray-200">

              {/* HEADER */}
              <div className="grid grid-cols-4 bg-[#E9D5FF] px-4 py-3 text font-semibold text-gray-700 text-center">
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <div key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  ))
                )}
              </div>
              
              {/* ROWS */}
              {table.getRowModel().rows.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-4 px-4 py-3 text border-t border-gray-200 items-center hover:bg-gray-50 text-center"
                >
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
}

        /* CARD */
        function Card({ title, value, growth, icon, bg, subtitle  }) {
          return (
            <div className={`p-6 rounded-2xl ${bg} shadow-sm`}>
              <div className="flex justify-between items-start">
          
                <div>
                  <p className="text-lg font-bold text-gray-900 ">{title}</p>
                  {subtitle && (
                    <p className="text text-gray-500 mb-1">
                      {subtitle}
                    </p>
                  )}
                  <h2 className="text-2xl font-bold mt-5">{value}</h2>
                  <div className="flex items-center gap-1 text mt-1">
                    <TrendingUp size={20} className="text-green-600" />
                    <span className="text-gray-800">
                      {growth} vs Last months
                    </span>
                  </div>
                </div>
          
               <div className="opacity-90">
                  {icon}
                </div>
              </div>
            </div>
          );
        }

        export default Dashboard;