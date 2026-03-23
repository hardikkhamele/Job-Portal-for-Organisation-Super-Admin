import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";



const RevenuePage = () => {
  const navigate = useNavigate();

  const data = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        sr: i + 1,
        txn: "PYM782390HJF",
        name: ["Technocrate", "Google", "HCL", "Microsoft", "Infosys"][i % 5],
        plan:
          i % 2 === 0 ? "Basic Bundle Plan" : "Advanced Bundle Plan",
        price: i % 2 === 0 ? "₹ 1,949" : "₹ 3,649",
        status: "Successful",
      })),
    []
  );

  //  Columns
  const columns = useMemo(
    () => [
      { accessorKey: "sr", header: "Sr.No." },
      { accessorKey: "txn", header: "Transaction Id" },
      { accessorKey: "name", header: "Employer Name" },
      { accessorKey: "plan", header: "Plan Details" },
      { accessorKey: "price", header: "Price" },
      {
        accessorKey: "status",
        header: "Status",
        cell: () => (
          <span className="text-green-600 font-medium">Successful</span>
        ),
      },
      {
        header: "Action",
        cell: () => (
          <Eye
            onClick={() => navigate("/revenue/view")}
            className="text-purple-600 cursor-pointer w-6 h-6 mx-auto"
          />
        ),
      },
    ],
    []
  );

  //  Table Setup
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 mb-3 rounded-xl shadow-md">
        
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">Revenue Management</h1>
        <hr className="mb-4" />

        {/* Search */}
        <div className="relative w-64 mb-4 border border-[#D3D3D3] rounded-lg ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-full rounded-md  border-[#D3D3D3] bg-[#F7F8F9] outline-none "
          />
        </div>

        {/* Table */}
        <table className="w-full text text-center  ">
          <thead className="bg-[#D3D3D3] ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-6 font-bold">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b text-center border-gray-200">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-7">
                    {flexRender(
                      cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-purple-700 text font-bold">
            Showing {pagination.pageIndex * 5 + 1} to{" "}
            {(pagination.pageIndex + 1) * 5} of {data.length} Transactions
          </p>

          {/* Pagination */}
          <div className="flex items-center gap-2">
            
            {/* Prev */}
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border rounded-full p-2"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: table.getPageCount() }).map((_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={`w-8 h-8 rounded-full ${
                  pagination.pageIndex === i
                    ? "bg-purple-600 text-white"
                    : "border"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border rounded-full p-2"
            >
              <ChevronRight size={16} />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default RevenuePage;