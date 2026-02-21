import React, { useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router";

const reportData = [
  { id: 1, date: "Feb 2, 2026", calls: 55, emails: 100 },
  { id: 2, date: "Feb 10, 2026", calls: 100, emails: 120 },
  { id: 3, date: "Feb 12, 2026", calls: 87, emails: 20 },
  { id: 4, date: "Feb 14, 2026", calls: 100, emails: 122 },
  { id: 5, date: "Feb 17, 2026", calls: 200, emails: 20 },
  { id: 6, date: "Feb 19, 2026", calls: 65, emails: 80 },
  { id: 7, date: "Feb 20, 2026", calls: 40, emails: 10 },
  { id: 8, date: "Feb 21, 2026", calls: 30, emails: 25 },
  { id: 9, date: "Feb 22, 2026", calls: 90, emails: 60 },
  { id: 10, date: "Feb 23, 2026", calls: 77, emails: 99 },
];

function HRViewDetails() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🔹 Pagination Logic
  const totalItems = reportData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentReports = reportData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">
      <div className="bg-white p-5 rounded-2xl">
        {/* 🔹 Header */}
        <div className="flex bg-white p-4  rounded-2xl items-center gap-3 mb-5">
          <button onClick={() => navigate(-1)}>←</button>
          <h1 className="text-xl font-semibold">View Details</h1>
        </div>
        <hr></hr>

        {/* 🔹 HR Profile Card */}
        <div className="bg-[#F4F6FA] rounded-xl p-4 flex justify-between items-center mt-4 mb-6">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/60"
              className="w-14 h-14 rounded-full"
              alt=""
            />
            <div>
              <h2 className="text-lg font-semibold">Kristin Watson</h2>
              <p className="text-sm text-gray-500">HR Manager</p>
            </div>
          </div>

          <div className="text-right text-sm text-gray-600">
            <p>kristian@gmail.com</p>
            <p>Password@1234</p>
          </div>
        </div>

        {/* 🔹 Daily Work Report Section */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-purple-600 font-medium mb-4 border-b pb-2">
            Daily Work Report
          </h2>

          {/* 🔹 Search + Date Filter */}
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search"
              className="border px-3 py-2 rounded-lg text-sm"
            />

            <div className="flex gap-3">
              <input
                type="date"
                className="border px-3 py-2 rounded-lg text-sm"
              />
              <input
                type="date"
                className="border px-3 py-2 rounded-lg text-sm"
              />
            </div>
          </div>

          {/* 🔹 Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="w-16 py-3 px-4 text-left">Sr.No.</th>
                  <th className="w-40 py-3 px-4 text-left">Date</th>
                  <th className="w-32 py-3 px-4 text-left">Total Calls</th>
                  <th className="w-32 py-3 px-4 text-left">Total Emails</th>
                  <th className="w-24 py-3 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentReports.map((report, index) => (
                  <tr
                    key={report.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">
                      {indexOfFirstItem + index + 1}
                    </td>

                    <td className="py-3 px-4">{report.date}</td>

                    <td className="py-3 px-4">{report.calls}</td>

                    <td className="py-3 px-4">{report.emails}</td>

                    <td className="py-3 px-4 text-center">
                      <Eye
                        size={18}
                        className="text-purple-600 cursor-pointer mx-auto"
                         onClick={() => navigate("/daily-work-update")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 🔹 Pagination Footer */}
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

export default HRViewDetails;
