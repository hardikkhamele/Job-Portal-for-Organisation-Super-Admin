import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import dashboardData from "../data/dashboardEmplyee.json";

ChartJS.register(
  BarElement,
  CategoryScale,
  LineController,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsDashboard = () => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-6 pt-1">
      {/* Analytics (Bar Chart) */}
      <div className="bg-white  p-2 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Analytics</h3>
        <div className=" h-55 w-135 flex justify-center">
          <Bar data={dashboardData.barChartData} />
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <span className="block text-purple-700 font-bold text-xl">
              {dashboardData.summary.jobsPosted}
            </span>
            <span className="text-gray-600">Job Posted</span>
          </div>
          <div className="text-center">
            <span className="block text-purple-400 font-bold text-xl">
              {dashboardData.summary.candidates}
            </span>
            <span className="text-gray-600">Candidate</span>
          </div>
        </div>
      </div>

      {/* Overview (Doughnut Chart) */}
      <div className="bg-white  p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Overview</h3>
        <div className="h-55 w-135 flex justify-center">
          <Doughnut data={dashboardData.doughnutChartData} />
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center text-blue-500">
            <span>Active Accounts</span>
            <span>{dashboardData.doughnutChartData.datasets[0].data[0]}</span>
          </div>
          <div className="flex justify-between items-center text-red-500">
            <span>Deactivated Accounts</span>
            <span>{dashboardData.doughnutChartData.datasets[0].data[1]}</span>
          </div>
          <div className="flex justify-between items-center text-yellow-500">
            <span>Verification Pending</span>
            <span>{dashboardData.doughnutChartData.datasets[0].data[2]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
