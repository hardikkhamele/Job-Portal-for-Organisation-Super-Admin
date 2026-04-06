import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

const DatabaseCandidate = () => {
  const navigate = useNavigate();

 
  const candidates = [
    { id: 1, name: "Vaibhav", education: "MCA", role: "Angular Developer", phone: "98956889023", interaction: "Call", status: "Pending" },
    { id: 2, name: "Amit", education: "B.Tech", role: "React Dev", phone: "9876543210", interaction: "Email", status: "Accepted" },
    { id: 3, name: "Sneha", education: "BCA", role: "Frontend Dev", phone: "9123456780", interaction: "Call", status: "Rejected" },
    { id: 4, name: "Rahul", education: "M.Tech", role: "Backend Dev", phone: "9988776655", interaction: "Meet", status: "Pending" },
    { id: 5, name: "Pooja", education: "BSc IT", role: "UI Dev", phone: "9012345678", interaction: "Call", status: "Accepted" },
    { id: 6, name: "Karan", education: "MCA", role: "Fullstack", phone: "9090909090", interaction: "Email", status: "Pending" },
    { id: 7, name: "Neha", education: "BCA", role: "Tester", phone: "9871234567", interaction: "Call", status: "Rejected" },
    { id: 8, name: "Ravi", education: "B.Tech", role: "Java Dev", phone: "9998887776", interaction: "Meet", status: "Accepted" },
    { id: 9, name: "Anjali", education: "MCA", role: "Angular Dev", phone: "8887776665", interaction: "Call", status: "Pending" },
    { id: 10, name: "Sagar", education: "BSc CS", role: "Support", phone: "7776665554", interaction: "Email", status: "Rejected" },
    { id: 11, name: "Meena", education: "BCA", role: "Frontend", phone: "6665554443", interaction: "Call", status: "Accepted" },
    { id: 12, name: "Arjun", education: "M.Tech", role: "Backend", phone: "5554443332", interaction: "Meet", status: "Pending" },
    { id: 13, name: "Priya", education: "BSc IT", role: "UI UX", phone: "4443332221", interaction: "Call", status: "Accepted" },
    { id: 14, name: "Rohit", education: "B.Tech", role: "DevOps", phone: "3332221110", interaction: "Email", status: "Rejected" },
    { id: 15, name: "Kavya", education: "MCA", role: "React Dev", phone: "2221110009", interaction: "Call", status: "Pending" }
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  //  Filter Data
  const filteredData = candidates.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  //  Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
       <div className="w-full mx-auto">
       <div className="bg-white rounded-xl shadow-sm p-6 ">

        {/* Header */}
        <h2 className="text-2xl font-bold ">Database Candidate</h2>
        <hr className="border-gray-300 mt-3 mb-5" />

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 bg-gray-100 px-3 py-2 rounded mb-4 w-64 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 ">
              <th className="p-3">Sr.No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Education</th>
              <th className="p-3">Designation</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Interaction</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.id} className="border-t border-gray-300 text-center ">
                <td className="p-3">{startIndex + index + 1}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.education}</td>
                <td className="p-3">{item.role}</td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3">{item.interaction}</td>
                <td className="p-3">{item.status}</td>
               <td className="text-center">

                <Eye
                  className="text-purple-600 cursor-pointer mx-auto"
                  size={20}
                  onClick={() => navigate("/candidate-details")}
                />
              </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">

          {/* Showing text */}
          <p className="text-purple-600 text-sm">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length}
          </p>

          {/* Pagination */}
          <div className="flex items-center gap-2">

            {/* Prev */}
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="p-2 border rounded-full border-purple-300 text-purple-600"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-full border-purple-300 text-purple-600 ${
                  currentPage === i + 1
                    ? "bg-purple-600 text-white"
                    : "border"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-purple-300 text-purple-600 rounded-full"
            >
              <ChevronRight size={16} />
            </button>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DatabaseCandidate;