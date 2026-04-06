import React, { useState } from "react";
import { Check, X, Download, ChevronLeft, ChevronRight } from "lucide-react";
const AcceptReject = () => {

  
  const data = [
    { id: 1, category: "IT", sub: "Frontend", role: "React Developer" },
    { id: 2, category: "IT", sub: "Backend", role: "Node Developer" },
    { id: 3, category: "HR", sub: "Recruitment", role: "HR Executive" },
    { id: 4, category: "Finance", sub: "Accounts", role: "Accountant" },
    { id: 5, category: "IT", sub: "Full Stack", role: "MERN Developer" },
    { id: 6, category: "Marketing", sub: "Digital", role: "SEO Specialist" },

    { id: 7, category: "IT", sub: "Frontend", role: "Angular Dev" },
    { id: 8, category: "IT", sub: "Backend", role: "Java Dev" },
    { id: 9, category: "HR", sub: "Payroll", role: "HR Manager" },
    { id: 10, category: "Finance", sub: "Audit", role: "Auditor" },
    { id: 11, category: "IT", sub: "Full Stack", role: "MEAN Dev" },
    { id: 12, category: "Marketing", sub: "Content", role: "Content Writer" },

    { id: 13, category: "IT", sub: "Frontend", role: "Vue Dev" },
    { id: 14, category: "IT", sub: "Backend", role: "Python Dev" },
    { id: 15, category: "HR", sub: "Hiring", role: "Recruiter" },
    { id: 16, category: "Finance", sub: "Tax", role: "Tax Consultant" },
    { id: 17, category: "IT", sub: "Full Stack", role: "Django Dev" },
    { id: 18, category: "Marketing", sub: "SEO", role: "SEO Analyst" },
  ];

  //  Pagination State
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  //  Calculations
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
     <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
        <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 ">
        <h2 className="text-2xl font-bold">Accept / Reject</h2>
        <hr className="border-gray-300 mt-3 mb-5" />

        {/*  Table */}
        <table className="w-full border-collapse ">
          <thead>
            <tr className="bg-gray-200 ">
              <th className="p-3">Sr.No.</th>
              <th className="p-3">Category</th>
              <th className="p-3">Subcategory</th>
              <th className="p-3">Designation</th>
              <th className="p-3">Excel File</th>
              <th className="p-3">Accept / Reject</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.id} className="border-t border-gray-300 text-center ">
                <td className="p-3">{indexOfFirst + index + 1}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.sub}</td>
                <td className="p-3">{item.role}</td>
              <td className="p-3 text-center">
                  <div className="flex justify-center items-center">
                    <button className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer">
                      <Download size={20} />
                      Download
                    </button>
                  </div>
                </td>

                <td className="p-2 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <Check size={20} className="text-green-600 cursor-pointer" />
                    <X size={20} className="text-red-600 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-purple-600">
            Showing {indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, data.length)} of {data.length}
          </p>

          {/* Pagination */}
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-purple-300 text-purple-600 rounded-full"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              {"<"}
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 border border-purple-300 text-purple-600 rounded-full ${
                  currentPage === i + 1
                    ? "bg-purple-600 text-white"
                    : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 border border-purple-300 rounded-full text-purple-600"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AcceptReject;