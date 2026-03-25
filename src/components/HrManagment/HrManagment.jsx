// import React, { useState } from "react";
// import {
//   Eye,
//   Edit,
//   Trash2,
//   Search,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useNavigate } from "react-router";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// import HrModal from "../common/HrModal";

// const hrData = [
//   {
//     id: 1,
//     name: "Kristian Watson",
//     designation: "HR Manager",
//     email: "kristian@gmail.com",
//     password: "Password@12345",
//   },
//   {
//     id: 2,
//     name: "Jenny Wilson",
//     designation: "HR Manager",
//     email: "jenny@gmail.com",
//     password: "Password@12345",
//   },
//   {
//     id: 3,
//     name: "Rane Watson",
//     designation: "HR Manager",
//     email: "rane1@gmail.com",
//     password: "Password@12345",
//   },
//   {
//     id: 4,
//     name: "Alex Brown",
//     designation: "Recruiter",
//     email: "alex@gmail.com",
//     password: "Password@12345",
//   },
//   {
//     id: 5,
//     name: "John Doe",
//     designation: "HR Manager",
//     email: "john@gmail.com",
//     password: "Password@12345",
//   },
//   {
//     id: 6,
//     name: "Emma Stone",
//     designation: "Recruiter",
//     email: "emma@gmail.com",
//     password: "Password@12345",
//   },
//   {
//     id: 7,
//     name: "Robert Fox",
//     designation: "HR Manager",
//     email: "robert@gmail.com",
//     password: "Password@12345",
//   },
//   {
//     id: 8,
//     name: "Sophia Lee",
//     designation: "Recruiter",
//     email: "sophia@gmail.com",
//     password: "Password@12345",
//   },
//   {
//     id: 9,
//     name: "James Bond",
//     designation: "HR Manager",
//     email: "bond@gmail.com",
//     password: "Password@12345",
//   },
//   {
//     id: 10,
//     name: "William Clark",
//     designation: "Recruiter",
//     email: "william@gmail.com",
//     password: "Password@12345",
//   },
// ];

// function HRManagement() {
//   const navigate = useNavigate();

//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 5,
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);

//   const columns = [
//     {
//       header: "Sr.No.",
//       cell: ({ row }) =>
//         row.index + 1 + pagination.pageIndex * pagination.pageSize,
//     },
//     {
//       accessorKey: "name",
//       header: "HR Name",
//     },
//     {
//       accessorKey: "designation",
//       header: "Designation",
//     },
//     {
//       accessorKey: "email",
//       header: "Email ID",
//     },
//     {
//       accessorKey: "password",
//       header: "Password",
//     },
//     {
//       header: "Action",
//       cell: ({ row }) => {
//   const hr = row.original;

//   return (
//     <div className="flex justify-center gap-4 text-purple-600">
//       <Eye
//         size={18}
//         className="cursor-pointer"
//         onClick={() => navigate("/hr-view-details")}
//       />

//       <Edit
//         size={18}
//         className="cursor-pointer"
//         onClick={() => navigate("/edit-hr")}
//       />

//       <Trash2
//         size={18}
//         className="cursor-pointer text-red-500"
//         onClick={() => {
//           setSelectedId(hr.id);
//           setIsModalOpen(true);
//         }}
//       />
//     </div>
//   );
// }
//     },
//   ];

//   const table = useReactTable({
//     data: hrData,
//     columns,
//     state: { pagination },
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   return (
//     <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
//       <div className="w-full mx-auto">
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h4 className="text-2xl font-bold text-black">HR Management</h4>
//           <hr className="border-gray-300 mt-2 mb-5" />

//           <div className="border border-[rgba(211,211,211,1)] rounded-lg p-6">
//             {/* Top Controls (UNCHANGED) */}
//             <div className="flex justify-between items-center mb-5">
//               <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-65 h-11">
//                 <Search size={18} className="text-[#D3D3D3] mr-2" />
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="bg-transparent outline-none text-sm w-full"
//                 />
//               </div>

//               <div className="flex gap-3">
//                 <select className="border border-[rgba(211,211,211,1)] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
//                   <option>Designation</option>
//                   <option>HR Manager</option>
//                   <option>Recruiter</option>
//                 </select>

//                 <button
//                   className="bg-[rgba(211,171,42,1)] rounded-lg hover:bg-yellow-600 text-white px-5 py-2 text-sm font-medium"
//                   onClick={() => navigate("/create-hr")}
//                 >
//                   Create HR
//                 </button>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-center border-collapse">
//                 <thead>
//                   {table.getHeaderGroups().map((headerGroup) => (
//                     <tr
//                       key={headerGroup.id}
//                       className="bg-gray-100 text-gray-600"
//                     >
//                       {headerGroup.headers.map((header) => (
//                         <th key={header.id} className="py-3 px-4">
//                           {flexRender(
//                             header.column.columnDef.header,
//                             header.getContext(),
//                           )}
//                         </th>
//                       ))}
//                     </tr>
//                   ))}
//                 </thead>

//                 <tbody>
//                   {table.getRowModel().rows.map((row) => (
//                     <tr
//                       key={row.id}
//                       className="border-b border-[rgba(211,211,211,1)] hover:bg-gray-50 transition"
//                     >
//                       {row.getVisibleCells().map((cell) => (
//                         <td key={cell.id} className="py-4 px-4">
//                           {flexRender(
//                             cell.column.columnDef.cell,
//                             cell.getContext(),
//                           )}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination (same UI, powered by TanStack) */}
//             <div className="flex justify-between items-center mt-6">
//               <p className="text-sm text-purple-600">
//                 Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
//                 {Math.min(
//                   (pagination.pageIndex + 1) * pagination.pageSize,
//                   hrData.length,
//                 )}{" "}
//                 of {hrData.length} HRs
//               </p>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => table.previousPage()}
//                   disabled={!table.getCanPreviousPage()}
//                   className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-50"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>

//                 {[...Array(table.getPageCount())].map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => table.setPageIndex(i)}
//                     className={`w-8 h-8 rounded-full ${
//                       pagination.pageIndex === i
//                         ? "bg-purple-600 text-white"
//                         : "border text-purple-600"
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}

//                 <button
//                   onClick={() => table.nextPage()}
//                   disabled={!table.getCanNextPage()}
//                   className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-50"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="text-center text-gray-400 text-sm mt-12">
//           Copyright © 2024 TechnoHire. All rights reserved.
//         </div>
//         <HrModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onConfirm={() => {
//             console.log("Delete ID:", selectedId);
//             setIsModalOpen(false);
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default HRManagement;







import React, { useState, useEffect } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import HrModal from "../common/HrModal";
import useGetHr from "../../hooks/hr/useGetHr";

function HRManagement() {
  const navigate = useNavigate();
  const { getHrData, hrList, totalHr, loading } = useGetHr();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // API fetch call on page or search change
  useEffect(() => {
    // API 1-based index use karti hai
    getHrData(pagination.pageIndex + 1, searchTerm);
  }, [pagination.pageIndex, searchTerm, getHrData]);

  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) => row.index + 1 + pagination.pageIndex * pagination.pageSize,
    },
    {
      accessorKey: "hrName",
      header: "HR Name",
    },
    {
      accessorKey: "designation",
      header: "Designation",
    },
    {
      accessorKey: "email",
      header: "Email ID",
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const hr = row.original;
        return (
          <div className="flex justify-center gap-4 text-purple-600">
            <Eye 
              size={18} 
              className="cursor-pointer hover:scale-110 transition" 
              onClick={() => navigate("/hr-view-details", { state: { hr } })} 
            />
            <Edit 
              size={18} 
              className="cursor-pointer hover:scale-110 transition" 
              onClick={() => navigate("/edit-hr", { state: { hr } })} 
            />
            <Trash2 
              size={18} 
              className="cursor-pointer text-red-500 hover:scale-110 transition" 
              onClick={() => { 
                setSelectedId(hr._id); 
                setIsModalOpen(true); 
              }} 
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: hrList || [],
    columns,
    pageCount: Math.ceil(totalHr / pagination.pageSize),
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, 
  });

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-2xl font-bold text-black">HR Management</h4>
          <hr className="border-gray-300 mt-2 mb-5" />

          <div className="border border-[rgba(211,211,211,1)] rounded-lg p-6">
            {/* Top Controls */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-65 h-11 focus-within:border-purple-400 transition">
                <Search size={18} className="text-[#D3D3D3] mr-2" />
                <input
                  type="text"
                  placeholder="Search HR..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPagination(prev => ({ ...prev, pageIndex: 0 })); 
                  }}
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>

              <div className="flex gap-3">
                <button
                  className="bg-[rgba(211,171,42,1)] rounded-lg hover:bg-yellow-600 text-white px-5 py-2 text-sm font-medium transition"
                  onClick={() => navigate("/create-hr")}
                >
                  Create HR
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-sm text-center border-collapse">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-gray-100 text-gray-600">
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="py-3 px-4 font-semibold">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={columns.length} className="py-20 text-gray-500">
                        <div className="flex flex-col justify-center items-center gap-3">
                           <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                           <span className="font-medium">Loading HR Records...</span>
                        </div>
                      </td>
                    </tr>
                  ) : hrList?.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="border-b border-[rgba(211,211,211,1)] hover:bg-gray-50 transition">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="py-4 px-4 text-gray-700">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="py-20 text-gray-400 italic">
                        No HR records found for "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination UI */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-purple-600 font-medium">
                Showing {hrList?.length > 0 ? (pagination.pageIndex * pagination.pageSize + 1) : 0} to{" "}
                {Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalHr)}{" "}
                of {totalHr} HRs
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage() || loading}
                  className="w-8 h-8 rounded-full border border-purple-200 flex items-center justify-center text-purple-600 disabled:opacity-30 hover:bg-purple-50 transition"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Page Numbers */}
                {[...Array(table.getPageCount())].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(i)}
                    className={`w-8 h-8 rounded-full text-xs font-semibold transition ${
                      pagination.pageIndex === i
                        ? "bg-purple-600 text-white shadow-md"
                        : "border border-purple-200 text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage() || loading}
                  className="w-8 h-8 rounded-full border border-purple-200 flex items-center justify-center text-purple-600 disabled:opacity-30 hover:bg-purple-50 transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm mt-12 mb-4">
          Copyright © 2026 TechnoHire. All rights reserved.
        </div>

        <HrModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            // Future implementation for delete API
            console.log("Delete triggered for:", selectedId);
            setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}

export default HRManagement;