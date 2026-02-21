import React, { useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router";

const workUpdateData = [
  { id: 1, name: "Aman Kumar", education: "B.Tech", position: "Android Developer", phone: "7798855406", type: "Call", status: "Selected" },
  { id: 2, name: "Aman Kumar", education: "B.Tech", position: "Android Developer", phone: "7798855406", type: "Message", status: "Processing" },
  { id: 3, name: "Aman Kumar", education: "B.Tech", position: "Android Developer", phone: "7798855406", type: "Call & Message", status: "Rejected" },
  { id: 4, name: "Aman Kumar", education: "B.Tech", position: "Android Developer", phone: "7798855406", type: "Call", status: "Not Interested" },
  { id: 5, name: "Aman Kumar", education: "B.Tech", position: "Android Developer", phone: "7798855406", type: "Call & Message", status: "Processing" },
  { id: 6, name: "Aman Kumar", education: "B.Tech", position: "Android Developer", phone: "7798855406", type: "Call", status: "Selected" },
  { id: 7, name: "Aman Kumar", education: "B.Tech", position: "Android Developer", phone: "7798855406", type: "Call", status: "Rejected" },
];

function DailyWorkUpdate() {

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = workUpdateData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = workUpdateData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getStatusColor = (status) => {
    if (status === "Selected") return "text-green-600";
    if (status === "Processing") return "text-yellow-500";
    if (status === "Rejected") return "text-red-500";
    if (status === "Not Interested") return "text-gray-500";
  };

  return (

    // 🔹 SAME OUTER BG
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">

      {/* 🔹 SAME WHITE PARENT CARD */}
      <div className="bg-white p-5 rounded-2xl">

        {/* 🔹 HEADER SAME */}
        <div className="flex bg-white p-4 rounded-2xl items-center gap-3 mb-5">
          <button onClick={() => navigate(-1)}>←</button>
          <h1 className="text-xl font-semibold">
            Daily Work Update
          </h1>
        </div>

        <hr />

        {/* 🔹 INNER CONTENT CARD */}
        <div className="bg-white rounded-xl shadow p-5 mt-4">

          {/* 🔹 Search + Filters */}
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search"
              className="border px-3 py-2 rounded-lg text-sm"
            />

            <div className="flex gap-3">
              <select className="border px-3 py-2 rounded-lg text-sm">
                <option>Status</option>
                <option>Selected</option>
                <option>Processing</option>
                <option>Rejected</option>
              </select>

              <select className="border px-3 py-2 rounded-lg text-sm">
                <option>Today</option>
                <option>Yesterday</option>
              </select>
            </div>
          </div>

          {/* 🔹 TABLE */}
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left">Sr.No</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Education</th>
                  <th className="py-3 px-4 text-left">Position</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Interaction</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.education}</td>
                    <td className="py-3 px-4">{item.position}</td>
                    <td className="py-3 px-4">{item.phone}</td>
                    <td className="py-3 px-4">{item.type}</td>
                    <td className={`py-3 px-4 font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Eye size={18} className="text-purple-600 mx-auto cursor-pointer"  onClick={() => navigate("/candidate-profile")} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔹 PAGINATION */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-purple-600">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, totalItems)} of {totalItems}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 border rounded-full"
              >
                {"<"}
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-8 h-8 rounded-full ${
                    currentPage === i + 1
                      ? "bg-purple-600 text-white"
                      : "border text-purple-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 border rounded-full"
              >
                {">"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DailyWorkUpdate;