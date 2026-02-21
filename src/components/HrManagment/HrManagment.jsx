import React, { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

const hrData = [
  { id: 1, name: "Kristian Watson", designation: "HR Manager", email: "kristian@gmail.com", password: "Password@12345" },
  { id: 2, name: "Jenny Wilson", designation: "HR Manager", email: "jenny@gmail.com", password: "Password@12345" },
  { id: 3, name: "Rane Watson", designation: "HR Manager", email: "rane1@gmail.com", password: "Password@12345" },
  { id: 4, name: "Alex Brown", designation: "Recruiter", email: "alex@gmail.com", password: "Password@12345" },
  { id: 5, name: "John Doe", designation: "HR Manager", email: "john@gmail.com", password: "Password@12345" },
  { id: 6, name: "Emma Stone", designation: "Recruiter", email: "emma@gmail.com", password: "Password@12345" },
  { id: 7, name: "Robert Fox", designation: "HR Manager", email: "robert@gmail.com", password: "Password@12345" },
  { id: 8, name: "Sophia Lee", designation: "Recruiter", email: "sophia@gmail.com", password: "Password@12345" },
  { id: 9, name: "James Bond", designation: "HR Manager", email: "bond@gmail.com", password: "Password@12345" },
  { id: 10, name: "William Clark", designation: "Recruiter", email: "william@gmail.com", password: "Password@12345" },
];

function HRManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = hrData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHRs = hrData.slice(indexOfFirstItem, indexOfLastItem);
  const navigate = useNavigate ()
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">HR Management</h1>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">

          
          {/* Top Controls */}
          <div className="flex justify-between items-center mb-5">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search"
                className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
                    <div className="flex gap-3">

              <select className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Designation</option>
                <option>HR Manager</option>
                <option>Recruiter</option>
              </select>

         <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
           onClick={()=>navigate("/create-hr")}>
              Create HR
            </button>
            </div>


          </div>


          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="py-3 px-4">Sr.No.</th>
                  <th className="py-3 px-4">HR Name</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4">Email ID</th>
                  <th className="py-3 px-4">Password</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentHRs.map((hr, index) => (
                  <tr key={hr.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-4 px-4">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="py-4 px-4">{hr.name}</td>
                    <td className="py-4 px-4">{hr.designation}</td>
                    <td className="py-4 px-4">{hr.email}</td>
                    <td className="py-4 px-4">{hr.password}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-4 text-purple-600">
                        <Eye size={18} className="cursor-pointer"  onClick={() => navigate("/hr-view-details")} />
                        <Pencil size={18} className="cursor-pointer" onClick={()=>navigate("/edit-hr")} />
                        <Trash2 size={18} className="cursor-pointer text-red-500" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-purple-600">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, totalItems)} of {totalItems} HRs
            </p>

            <div className="flex items-center gap-2">
              {/* Previous */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-50"
              >
                {"<"}
              </button>

              {/* Page Numbers */}
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

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-50"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm mt-12">
          Copyright © 2024 TechnoHire. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default HRManagement;