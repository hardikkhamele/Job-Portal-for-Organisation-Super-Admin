
import React from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const profitData = [
  { day: 'MON', Candidates: 14000, Employer: 25000, SponsoredAds: 42000, ReceivedJobs: 35000 },
  { day: 'TUE', Candidates: 15000, Employer: 26000, SponsoredAds: 43000, ReceivedJobs: 36000 },
  { day: 'WED', Candidates: 16000, Employer: 27000, SponsoredAds: 44000, ReceivedJobs: 37000 },
  { day: 'THU', Candidates: 17000, Employer: 28000, SponsoredAds: 45000, ReceivedJobs: 38000 },
  { day: 'FRI', Candidates: 18000, Employer: 29000, SponsoredAds: 46000, ReceivedJobs: 39000 },
  { day: 'SAT', Candidates: 19000, Employer: 30000, SponsoredAds: 47000, ReceivedJobs: 40000 },
];

const planData = [
  { day: 'MON', PremiumPlan: 14500 },
  { day: 'TUE', PremiumPlan: 15000 },
  { day: 'WED', PremiumPlan: 15500 },
  { day: 'THU', PremiumPlan: 16000 },
  { day: 'FRI', PremiumPlan: 16250 },
  { day: 'SAT', PremiumPlan: 16500 },
];

const ProfitDashboard = () => {
  return (
    <div className="px-4 bg-gray-100 h-[400px] flex gap-4 my-[20px]">

      
      <div className="bg-white p-4 rounded-2xl shadow-md flex-1 h-full flex flex-col justify-between">
        <h2 className="text-xl font-semibold">Total Profit</h2>
        <p className="text-gray-500">Last 7 days</p>
        <h1 className="text-4xl font-bold mt-2">116K</h1>
        <ul className="mt-4 text-lg">
          <li className="text-blue-500">14K</li>
          <li className="text-red-500">25K</li>
          <li className="text-green-500">42K</li>
          <li className="text-orange-500">35K</li>
        </ul>
      </div>

      
      <div className="bg-white p-4 rounded-2xl shadow-md flex-1 h-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Candidates" stroke="#0000FF" strokeWidth={3} />
            <Line type="monotone" dataKey="Employer" stroke="#FF0000" strokeWidth={3} />
            <Line type="monotone" dataKey="SponsoredAds" stroke="#00FF00" strokeWidth={3} />
            <Line type="monotone" dataKey="ReceivedJobs" stroke="#FF5733" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-md flex-1 h-full flex flex-col justify-between">
        <h2 className="text-xl font-semibold">Top Purchased Plan</h2>
        <p className="text-gray-500">Premium Plan (Last 7 days)</p>
        <h1 className="text-3xl font-bold mt-2">16.5K</h1>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={planData}>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="PremiumPlan" stroke="#00C853" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitDashboard;


