/*import React from "react";

const transactions = [
  { date: "Sep 9, 2024 4:30pm", name: "Dan", from: "Danvs@gmail.com", type: "Subscription", amount: "1200/-", status: "Pending", color: "text-yellow-500" },
  { date: "Sep 9, 2024 4:30pm", name: "Daniel", from: "Daniel@gmail.com", type: "Subscription", amount: "1200/-", status: "Pending", color: "text-yellow-500" },
  { date: "Sep 9, 2024 4:41pm", name: "Ryan", from: "Ryannt@gmail.com", type: "Sponsored Ads", amount: "1200/-", status: "Completed", color: "text-green-500" },
  { date: "Sep 9, 2024 4:42pm", name: "Riya", from: "Riyax@gmail.com", type: "Subscription", amount: "1200/-", status: "Pending", color: "text-yellow-500" },
  { date: "Sep 9, 2024 4:45pm", name: "Aarav", from: "Aarav@wbank", type: "Sponsored Ads", amount: "1200/-", status: "Cancelled", color: "text-red-500" },
  { date: "Sep 9, 2024 4:47pm", name: "Joe", from: "RJoe@gmail.com", type: "Subscription", amount: "1200/-", status: "Completed", color: "text-green-500" },
  { date: "Sep 9, 2024 4:59pm", name: "Kamlaah", from: "Kamlaah@wbank", type: "Subscription", amount: "1200/-", status: "Pending", color: "text-yellow-500" },
];

const Transaction_History = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{transaction.date}</td>
                <td className="p-3">{transaction.name}</td>
                <td className="p-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white mr-2">
                    {transaction.name.charAt(0)}
                  </div>
                  {transaction.from}
                </td>
                <td className="p-3">{transaction.type}</td>
                <td className="p-3">{transaction.amount}</td>
                <td className={`p-3 font-semibold ${transaction.color}`}>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
          <button className="px-3 py-1 bg-purple-500 text-white rounded-full mx-1">1</button>
          <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full mx-1">2</button>
          <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full mx-1">3</button>
          <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full mx-1">4</button>
          <button className="px-3 py-1 bg-purple-500 text-white rounded-full mx-1">&rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default Transaction_History;
*/


import React, { useState } from "react";

const transactions = [
  { date: "Sep 9, 2024 4:30pm", name: "Raviranjan", from: "ravi@gmail.com", type: "Subscription", amount: "111200/-", status: "Pending", color: "text-yellow-500" },
  { date: "Sep 9, 2024 4:30pm", name: "Daniel", from: "Daniel@gmail.com", type: "Subscription", amount: "1200/-", status: "Pending", color: "text-yellow-500" },
  { date: "Sep 9, 2024 4:41pm", name: "Ryan", from: "Ryannt@gmail.com", type: "Sponsored Ads", amount: "1200/-", status: "Completed", color: "text-green-500" },
  { date: "Sep 9, 2024 4:42pm", name: "Riya", from: "Riyax@gmail.com", type: "Subscription", amount: "1200/-", status: "Pending", color: "text-yellow-500" },
  { date: "Sep 9, 2024 4:45pm", name: "Aarav", from: "Aarav@wbank", type: "Sponsored Ads", amount: "1200/-", status: "Cancelled", color: "text-red-500" },
  { date: "Sep 9, 2024 4:47pm", name: "Joe", from: "RJoe@gmail.com", type: "Subscription", amount: "1200/-", status: "Completed", color: "text-green-500" },
  { date: "Sep 9, 2024 4:59pm", name: "Kamlaah", from: "Kamlaah@wbank", type: "Subscription", amount: "1200/-", status: "Pending", color: "text-yellow-500" },

  { date: "Sep 10, 2024 5:30pm", name: "Ravi", from: "Ravi@gmail.com", type: "Subscription", amount: "2200/-", status: "Pending", color: "text-yellow-500" },
  { date: "Sep 19, 2024 7:30pm", name: "Aarti", from: "Aarti@gmail.com", type: "Subscription", amount: "29000/-", status: "Pending", color: "text-yellow-500" },
  { date: "Sep 29, 2024 1:41pm", name: "Ryan", from: "Ryannt@gmail.com", type: "Sponsored Ads", amount: "22200/-", status: "Completed", color: "text-green-500" },
  { date: "Sep 5, 2024 3:42pm", name: "Riya", from: "Riyax@gmail.com", type: "Subscription", amount: "15000/-", status: "Pending", color: "text-yellow-500" },
  { date: "Sep 7, 2024 9:45pm", name: "Aara", from: "Aara@wbank", type: "Sponsored Ads", amount: "12000/-", status: "Cancelled", color: "text-red-500" },
  { date: "Sep 9, 2024 2:47pm", name: "Raj", from: "Raj@gmail.com", type: "Subscription", amount: "11200/-", status: "Completed", color: "text-green-500" },
  { date: "Sep 9, 2024 1:59pm", name: "Kamlaah", from: "Kamlaah@wbank", type: "Subscription", amount: "22200/-", status: "Pending", color: "text-yellow-500" },

];

const itemsPerPage = 5; // Number of items per page

const Transaction_History = () => {
  const [currentPage, setCurrentPage] = useState(1);

  
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);

  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
        <div className  ="h-[400px] overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{transaction.date}</td>
                <td className="p-3">{transaction.name}</td>
                <td className="p-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white mr-2">
                    {transaction.name.charAt(0)}
                  </div>
                  {transaction.from}
                </td>
                <td className="p-3">{transaction.type}</td>
                <td className="p-3">{transaction.amount}</td>
                <td className={`p-3 font-semibold ${transaction.color}`}>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

      
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-full mx-1 ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-purple-500 text-white"}`}
          >
            &larr;
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-full mx-1 ${currentPage === index + 1 ? "bg-purple-500 text-white" : "bg-gray-300 text-gray-700"}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-full mx-1 ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-purple-500 text-white"}`}
          >
            &rarr;
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction_History;
