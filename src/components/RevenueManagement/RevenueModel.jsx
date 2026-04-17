import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Search, Eye, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchAllTransactions } from "../../redux/slice/revenueManagement/revenueSlice";
import Footer from "../Footer";

const RevenuePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Get data from Redux
  const { transactions, pagination, loading, error } = useSelector(
    (state) => state.revenue
  );

  // Sync with local table state (Note: API is 1-indexed, TanStack is 0-indexed)
  const [tablePagination, setTablePagination] = useState({
    pageIndex: 0,
    pageSize: 10, // Adjust based on your preferred limit
  });

  useEffect(() => {
    dispatch(
      fetchAllTransactions({
        page: tablePagination.pageIndex + 1,
        limit: tablePagination.pageSize,
        search: searchTerm,
      })
    );
  }, [dispatch, tablePagination.pageIndex, tablePagination.pageSize, searchTerm]);

  const columns = useMemo(
    () => [
      {
        header: "Sr.No.",
        accessorFn: (_, index) => tablePagination.pageIndex * tablePagination.pageSize + index + 1,
      },
      { accessorKey: "transactionId", header: "Transaction Id" },
      { accessorKey: "employerName", header: "Employer Name" },
      { 
        accessorKey: "planDetails", 
        header: "Plan Details",
        cell: ({ row }) => row.original.planDetails || "N/A"
      },
      { 
        accessorKey: "price", 
        header: "Price",
        cell: ({ getValue }) => `₹ ${getValue()}`
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <span className={`capitalize font-medium ${getValue() === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {getValue()}
          </span>
        ),
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <Eye
            size={18}
            onClick={() => navigate(`/revenue-management/view/${row.original._id}`)}
            className="text-purple-600 cursor-pointer w-6 h-6 mx-auto"
          />
        ),
      },
    ],
    [tablePagination, navigate]
  );

  const table = useReactTable({
    data: transactions,
    columns,
    pageCount: pagination.totalPages || -1,
    state: { pagination: tablePagination },
    onPaginationChange: setTablePagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // Let the API handle it
  });

  return (
    <div className="p-5 bg-gray-100 min-h-screen pb-20">
      <div className="bg-white p-6 mb-3 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-2">Revenue Management</h1>
        <hr className="mb-6 border-gray-300" />

        <div className="relative w-64 mb-4 border border-[#D3D3D3] rounded-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md border-[#D3D3D3] bg-[#F7F8F9] outline-none"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-600" /></div>
        ) : error ? (
          <div className="text-red-500 text-center py-10">{error}</div>
        ) : (
          <>
            <table className="w-full text-sm text-center border-collapse">
              <thead className="bg-[#D3D3D3]">
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
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-4 px-4 text-gray-700">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <p className="text-purple-700 font-bold">
                Showing {transactions.length > 0 ? (tablePagination.pageIndex * tablePagination.pageSize) + 1 : 0} to{" "}
                {Math.min((tablePagination.pageIndex + 1) * tablePagination.pageSize, pagination.total)} of {pagination.total} Transactions
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!pagination.hasPrevPage}
                  className="border rounded-full p-2 disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: pagination.totalPages || 0 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(i)}
                    className={`w-8 h-8 rounded-full ${tablePagination.pageIndex === i ? "bg-purple-600 text-white" : "border"}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => table.nextPage()}
                  disabled={!pagination.hasNextPage}
                  className="border rounded-full p-2 disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RevenuePage;