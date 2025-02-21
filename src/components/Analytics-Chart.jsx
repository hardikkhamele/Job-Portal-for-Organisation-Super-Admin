import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController, // ✅ Correctly registered
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import dashgraphdata from "../data/dashgraphdata.json";

// ✅ Register all required components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Tooltip,
  Legend
);

const categories = ["Employer", "Candidate", "Jobs", "Revenue"];

const AnalyticsChart = () => {
  const chartRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("Revenue");

  // Extract unique months from the data
  const uniqueMonths = [
    "All",
    ...new Set(dashgraphdata.map((data) => data.label))
  ];

  // Filter data by selected month and category
  const filteredData = dashgraphdata.filter(
    (data) =>
      (selectedMonth === "All" || data.label === selectedMonth) &&
      data.category.includes(selectedCategory) // ✅ Fixed: Check if category array contains selectedCategory
  );

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(125, 82, 200, 1)"); // Dark Purple (Top)
      gradient.addColorStop(1, "rgba(125, 82, 200, 0.2)"); // Light Purple (Bottom)

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, [filteredData, selectedCategory]); // Re-run effect when data changes

  const data = {
    labels: filteredData.map((data) => data.label),
    datasets: [
      {
        type: "bar",
        label: selectedCategory,
        data: filteredData.map((data) => data.value),
        backgroundColor: "rgba(125, 82, 200, 0.8)", // Placeholder, replaced by gradient
        borderRadius: 8,
        barThickness: 50
      },
      {
        type: "line", // ✅ Fixed: Correct type
        label: "Trend",
        data: filteredData.map((data) => data.value),
        borderColor: "#A46F4D",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#A46F4D",
        pointRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}M`,
          color: "#999"
        },
        grid: { drawBorder: false }
      },
      x: {
        ticks: { color: "#999" },
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Analytics - ${selectedCategory}`,
        align: "start",
        font: { size: 20, weight: "bold" },
        color: "black"
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-purple-50 p-3 mt-6 rounded-lg shadow-md">
      {/* Title & Dropdown */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-xl font-bold text-gray-800">Analytics</h2>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 w-30 border rounded-md shadow-sm text-gray-700"
        >
          {uniqueMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="h-60">
        <Bar ref={chartRef} data={data} options={options} />
      </div>

      {/* Centered Buttons */}
      <div className="flex justify-center mt-2 mb-0 space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 mt-0 rounded-lg shadow-md text-sm font-semibold ${
              selectedCategory === category
                ? "bg-amber-700 text-white"
                : "bg-white border text-gray-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsChart;
