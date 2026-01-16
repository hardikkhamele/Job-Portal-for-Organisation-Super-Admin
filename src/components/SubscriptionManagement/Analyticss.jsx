import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Jan", subscribers: 100 },
  { month: "Feb", subscribers: 150 },
  { month: "Mar", subscribers: 200 },
  { month: "Apr", subscribers: 250 },
  { month: "May", subscribers: 350 },
  { month: "Jun", subscribers: 400 },
  { month: "Jul", subscribers: 450 },
  { month: "Aug", subscribers: 500 },
  { month: "Sep", subscribers: 480 },
  { month: "Oct", subscribers: 520 },
  { month: "Nov", subscribers: 600 },
  { month: "Dec", subscribers: 650 }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-md text-black text-sm">
        <p className="font-semibold">{payload[0].payload.month}</p>
        <p>Subscribers: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const Analytics = () => (
  <div className="w-full h-52 bg-white p-2 rounded-xl   ">
    <h2 className="text-lg font-semibold mb-2">Analytics</h2>
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="subscribers" fill="#28a745" barSize={30} radius={[5, 5, 0, 0]} />
      </BarChart>
    <div className="mt-2 flex items-center bg-white-100 p-2 rounded text-center relative left-36 " >
      <div className="text-red-600 font-bold bg-red-100 h-full rounded-l-xl px-1 text-lg p-2  ">1230</div>
      <div className="text-gray-700 border-2 p-2">User Not Subscribed Yet</div>
    </div>
    </ResponsiveContainer>
  </div>
);

export default Analytics;