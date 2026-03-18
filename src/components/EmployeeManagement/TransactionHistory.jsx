import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Users, Zap, Clock, Eye,  TrendingUp, ArrowLeftRight} from "lucide-react";

function TransactionHistory() {
  const [globalFilter, setGlobalFilter] = useState("");

  

  //  TABLE DATA
  const data = useMemo(
    () => [
      {
        sr: 1,
        id: "PYM782390HJF",
        plan: "Basic Bundle Plan",
        price: "₹ 1,949",
        date: "Feb 2, 2026 19:28",
        status: "Successful",
      },
      {
        sr: 2,
        id: "PYM784670HJF",
        plan: "Basic Bundle Plan",
        price: "₹ 1,949",
        date: "Feb 2, 2026 19:28",
        status: "Failed",
      },
      {
        sr: 3,
        id: "PYM784670HJF",
        plan: "Advanced Bundle Plan",
        price: "₹ 3,649",
        date: "Feb 2, 2026 19:28",
        status: "Successful",
      },
      {
        sr: 4,
        id: "PYM7845678TF",
        plan: "Advanced Bundle Plan",
        price: "₹ 3,649",
        date: "Feb 2, 2026 19:28",
        status: "Failed",
      },

      {
        sr: 5,
        id: "PYM782390HJF",
        plan: "Basic Bundle Plan",
        price: "₹ 1,949",
        date: "Feb 2, 2026 19:28",
        status: "Successful",
      },
      {
        sr: 6,
        id: "PYM784670HJF",
        plan: "Basic Bundle Plan",
        price: "₹ 1,949",
        date: "Feb 2, 2026 19:28",
        status: "Failed",
      },
      {
        sr: 7,
        id: "PYM784670HJF",
        plan: "Advanced Bundle Plan",
        price: "₹ 3,649",
        date: "Feb 2, 2026 19:28",
        status: "Successful",
      },
      {
        sr: 8,
        id: "PYM7845678TF",
        plan: "Advanced Bundle Plan",
        price: "₹ 3,649",
        date: "Feb 2, 2026 19:28",
        status: "Failed",
      },

      {
        sr: 9,
        id: "PYM782390HJF",
        plan: "Basic Bundle Plan",
        price: "₹ 1,949",
        date: "Feb 2, 2026 19:28",
        status: "Successful",
      },
      {
        sr: 10,
        id: "PYM784670HJF",
        plan: "Basic Bundle Plan",
        price: "₹ 1,949",
        date: "Feb 2, 2026 19:28",
        status: "Failed",
      },
      {
        sr: 11,
        id: "PYM784670HJF",
        plan: "Advanced Bundle Plan",
        price: "₹ 3,649",
        date: "Feb 2, 2026 19:28",
        status: "Successful",
      },
      {
        sr: 12,
        id: "PYM7845678TF",
        plan: "Advanced Bundle Plan",
        price: "₹ 3,649",
        date: "Feb 2, 2026 19:28",
        status: "Failed",
      },

      {
        sr: 13,
        id: "PYM782390HJF",
        plan: "Basic Bundle Plan",
        price: "₹ 1,949",
        date: "Feb 2, 2026 19:28",
        status: "Successful",
      },
      {
        sr: 14,
        id: "PYM784670HJF",
        plan: "Basic Bundle Plan",
        price: "₹ 1,949",
        date: "Feb 2, 2026 19:28",
        status: "Failed",
      },
      {
        sr: 15,
        id: "PYM784670HJF",
        plan: "Advanced Bundle Plan",
        price: "₹ 3,649",
        date: "Feb 2, 2026 19:28",
        status: "Successful",
      },
    ],
    []
  );

  //  COLUMNS
  const columns = useMemo(
    () => [
      { accessorKey: "sr", header: "Sr.No." },
      { accessorKey: "id", header: "Transaction Id" },
      { accessorKey: "plan", header: "Plan Details" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "date", header: "Purchase Date & time" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span
            className={
              row.original.status === "Successful"
                ? "text-green-600"
                : "text-red-500"
            }
          >
            {row.original.status}
          </span>
        ),
      },
      {
         header: "Action",
         cell: () => (
           <div className="flex justify-center items-center w-full">
             <Eye className="cursor-pointer text-purple-800" size={20} />
           </div>
         ),
        }
    ],
    []
  );

         const [pagination, setPagination] = useState({
         pageIndex: 0,
         pageSize: 5, 
        });

         //  TABLE INSTANCE
         const table = useReactTable({
         data,
         columns,
         state: { 
           globalFilter,
           pagination, 
         },
         onGlobalFilterChange: setGlobalFilter,
         onPaginationChange: setPagination, 
         getCoreRowModel: getCoreRowModel(),
         getPaginationRowModel: getPaginationRowModel(),
        });

  

  return (
    <div className="p-4">

      {/*  TOP CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-7">
        <div className="border border-purple-500 rounded-xl p-5 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text mb-5">Total Money Spend</p>
            <h2 className="text-2xl font-bold ">₹ 85,000</h2>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Users className="text-purple-600" />
          </div>
        </div>

        <div className="border border-purple-500 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text mb-3">This Month Spend</p>
            <h2 className="text-2xl font-bold mb-5">₹ 8,000</h2>
           <div className="flex items-center gap-1 text-green-500 text">
              <TrendingUp size={20} />
              <span className="text-black">10% vs Last months</span>
            </div>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Zap className="text-purple-600" />
          </div>
        </div>

        <div className="border border-purple-500 rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text mb-5">Latest Transaction</p>
            <h2 className="text-2xl font-bold mb-5">₹ 1,949</h2>
            <div className="flex items-center gap-1 text-gray-500 text">
                <ArrowLeftRight size={20} />
            <p className="text-gray-700 text">Feb 2, 2026 19:28</p>
          </div>
           </div>

          <div className="bg-purple-100 p-3 rounded-full">
            <Clock className="text-purple-600" />
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex justify-between items-center mb-4">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search"
          className=" bg-[#F7F8F9] border border-gray-200 rounded-lg px-3 py-2 w-1/5 outline-none"
        />

        <select className="borderborder-gray-200 rounded-lg px-3 py-2 bg-[#F7F8F9]">
          <option>All Transaction</option>
        </select>
      </div>

      {/*  TABLE */}
      <div className="border border-gray-200 rounded-xl overflow-hidden ]">
        <table className="w-full text">
          <thead className="bg-[#D3D3D3]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-3 text-center">
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
              <tr key={row.id} className="border-t border-gray-200">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 text-center">
                    {flexRender(
                      cell.column.columnDef.cell ??
                        cell.column.columnDef.accessorKey,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  PAGINATION */}
      <div className="flex justify-between items-center mt-4">

  {/* LEFT TEXT */}
  <p className="text-purple-600 text font-bold">
  Showing{" "}
  {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
  {" "}to{" "}
  {Math.min(
    (table.getState().pagination.pageIndex + 1) *
      table.getState().pagination.pageSize,
    data.length
  )}{" "}
  of {data.length} Transactions
</p>

  {/* RIGHT PAGINATION */}
  <div className="flex items-center gap-2">

    {/* PREVIOUS BUTTON */}
    <button
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
      className={`w-8 h-8 flex items-center justify-center rounded-full border border-purple-500
        ${!table.getCanPreviousPage() ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
    >
      {"<"}
    </button>

    {/* PAGE NUMBERS */}
    {Array.from({ length: table.getPageCount() }).map((_, i) => (
      <button
        key={i}
        onClick={() => table.setPageIndex(i)}
        className={`w-8 h-8 flex items-center justify-center rounded-full border border-purple-500 text-purple-500 font-bold
          ${
            table.getState().pagination.pageIndex === i
              ? "bg-purple-600 text-white" 
              : "border hover:bg-gray-100"
          }`}
      >
        {i + 1}
      </button>
    ))}

    {/* NEXT BUTTON */}
    <button
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
      className={`w-8 h-8 flex items-center justify-center rounded-full border border-purple-500 font-bold
        ${!table.getCanNextPage() ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
    >
      {">"}
    </button>

  </div>
</div>

    </div>
  );
}

export default TransactionHistory;