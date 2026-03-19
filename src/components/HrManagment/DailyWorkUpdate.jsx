import React, { useState } from "react";
import {
  Eye,
  CircleChevronLeft,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

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

  // ✅ TanStack pagination
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const getStatusColor = (status) => {
    if (status === "Selected") return "text-green-600";
    if (status === "Processing") return "text-yellow-500";
    if (status === "Rejected") return "text-red-500";
    if (status === "Not Interested") return "text-gray-500";
  };

  // ✅ Columns
  const columns = [
    {
      header: "Sr.No",
      cell: ({ row }) =>
        row.index + 1 + pagination.pageIndex * pagination.pageSize,
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "education", header: "Education" },
    { accessorKey: "position", header: "Position" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "type", header: "Interaction" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={`font-medium ${getStatusColor(row.original.status)}`}>
          {row.original.status}
        </span>
      ),
    },
    {
      header: "Action",
      cell: () => (
        <Eye
          size={18}
          className="text-purple-600 mx-auto cursor-pointer"
          onClick={() => navigate("/candidate-profile")}
        />
      ),
    },
  ];

  // ✅ Table
  const table = useReactTable({
    data: workUpdateData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">
      <div className="bg-white p-5 rounded-2xl">

        {/* Header */}
        <div className="flex bg-white p-4 rounded-2xl items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <CircleChevronLeft size={28} />
          </button>
          <h1 className="text-xl font-semibold">
            Daily Work Update
          </h1>
        </div>

        <hr className="border-gray-300 mt-2 mb-5" />

        {/* Inner Card */}
        <div className="bg-white border border-gray-300 rounded-lg p-5 mt-4">

          {/* Search + Filters */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-65 h-11">
              <Search size={18} className="text-[#D3D3D3] mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            <div className="flex gap-3">
              <select className="border border-[rgba(211,211,211,1)] px-3 py-2 rounded-lg text-sm">
                <option>Status</option>
                <option>Selected</option>
                <option>Processing</option>
                <option>Rejected</option>
              </select>

              <select className="border border-[rgba(211,211,211,1)] px-3 py-2 rounded-lg text-sm">
                <option>Today</option>
                <option>Yesterday</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-sm">
              
              {/* THEAD */}
              <thead className="bg-gray-100 text-gray-600">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="py-3 px-4 text-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              {/* TBODY */}
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className=" text-center border-b border-[rgba(211,211,211,1)] hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-3 px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-purple-600">
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                workUpdateData.length
              )}{" "}
              of {workUpdateData.length}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>

              {[...Array(table.getPageCount())].map((_, i) => (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(i)}
                  className={`w-8 h-8 rounded-full ${
                    pagination.pageIndex === i
                      ? "bg-purple-600 text-white"
                      : "border text-purple-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DailyWorkUpdate;