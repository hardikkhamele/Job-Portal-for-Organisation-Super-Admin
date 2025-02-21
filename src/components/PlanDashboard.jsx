
import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from './Card';

const dataBasic = [
  { value: 10000 },
  { value: 11000 },
  { value: 11500 },
  { value: 12500 },
];

const dataStandard = [
  { value: 9000 },
  { value: 9500 },
  { value: 9800 },
  { value: 10000 },
];

const dataEnterprise = [
  { value: 5500 },
  { value: 5300 },
  { value: 5100 },
  { value: 5000 },
];

const PlanCard = ({ title, value, percentage, trend, data, color }) => (
  <div className="w-full h-[400] p-4">
    <Card className="w-full h-full shadow-md rounded-2xl flex flex-col justify-between">
      <CardContent className="h-full flex flex-col justify-between">
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-2xl font-bold mt-2">{value}</p>
        <p className={`text-sm mt-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? '▲' : '▼'} {percentage}% vs last 7 days
        </p>
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

export default function PlanDashboard() {
  return (
    <div className="flex gap-6 p-6 bg-gray-50 h-[300px] items-center justify-center">
      <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Basic Plan Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <PlanCard 
            title="Basic Plan" 
            value="12.5K" 
            percentage={5} 
            trend="up" 
            data={dataBasic} 
            color="#4CAF50" 
          />
        </div>

        {/* Standard Plan Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <PlanCard 
            title="Standard Plan" 
            value="10K" 
            percentage={2} 
            trend="up" 
            data={dataStandard} 
            color="#4CAF50" 
          />
        </div>

        {/* Enterprise Plan Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <PlanCard 
            title="Enterprise Plan" 
            value="5K" 
            percentage={2} 
            trend="down" 
            data={dataEnterprise} 
            color="#F44336" 
          />
        </div>
      </div>
    </div>
  );
}



