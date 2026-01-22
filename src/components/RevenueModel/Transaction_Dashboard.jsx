
import React from "react";

const Transaction_Dashboard = () => {
  const transactions = [
    { title: "Total Transaction", value: 2000, color: "gray", icon: "" },
    { title: "Completed", value: 1000, color: "green", icon: "C" },
    { title: "Pending", value: 500, color: "yellow", icon: "P" },
    { title: "Cancelled", value: 500, color: "red", icon: "C" },
  ];

  // Map colors manually
  const colorClasses = {
    gray: "text-gray-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
    red: "text-red-600",
  };

  return (
    <div className="p-6 bg-gray-100" style={{ minHeight: "260px" }}>
      <h1 className="text-xl font-semibold">Hello! Technohire</h1>
      <h2 className="text-lg text-gray-600 mt-2">Transaction History</h2>
      <div className="grid grid-cols-4 gap-4 mt-6">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-4 rounded-lg text-center relative"
          >
            <h3 className="text-gray-600 text-md">{transaction.title}</h3>
            <p className={`text-2xl font-bold ${colorClasses[transaction.color]}`}>
              {transaction.value}
            </p>
            <div className={`text-lg font-bold ${colorClasses[transaction.color]} absolute right-4 top-1/2 transform -translate-y-1/2`}>
              {transaction.icon}
            </div>
            <p className="text-xs text-gray-400 mt-2">Last Updated: Yesterday</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transaction_Dashboard;
