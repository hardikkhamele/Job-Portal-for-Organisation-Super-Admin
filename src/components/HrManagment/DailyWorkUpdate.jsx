import React, { useState, useEffect, useMemo } from "react";
import { Eye, CircleChevronLeft, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchHrReports, clearReports } from "../../redux/slice/hrManagement/getReportofHr";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Footer from "../Footer";

function DailyWorkUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { hrId, date } = location.state || {};

  const { reports, loading, totalRecords, totalPages } = useSelector((state) => state.hrReports);

  // Pagination State
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  
  const [searchTerm, setSearchTerm] = useState("");

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
  const safeTotalPages = Math.max(1, Number(totalPages) || 1);

  // Keep the control compact even when the report has many pages. Rendering every
  // page (for example 1–76) pushes the pagination outside of the card.
  const pageItems = useMemo(() => {
    const currentPage = pageIndex + 1;
    const pages = new Set([1, safeTotalPages]);

    for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
      if (page >= 1 && page <= safeTotalPages) pages.add(page);
    }

    const orderedPages = [...pages].sort((a, b) => a - b);
    return orderedPages.reduce((items, page, index) => {
      const previousPage = orderedPages[index - 1];
      if (previousPage && page - previousPage > 1) items.push(`ellipsis-${previousPage}`);
      items.push(page);
      return items;
    }, []);
  }, [pageIndex, safeTotalPages]);

  const filteredReports = useMemo(() => {
    if (!searchTerm) return reports;
    const lowerSearch = searchTerm.toLowerCase();
    return (reports || []).filter(
      (r) =>
        r.candidateName?.toLowerCase().includes(lowerSearch) ||
        r.education?.toLowerCase().includes(lowerSearch) ||
        r.designation?.toLowerCase().includes(lowerSearch) ||
        r.phoneNumber?.toString().includes(lowerSearch) ||
        r.candidateStatus?.toLowerCase().includes(lowerSearch)
    );
  }, [reports, searchTerm]);

  useEffect(() => {
    if (hrId && date) {
      dispatch(fetchHrReports({ 
        hrId, 
        date, 
        page: pageIndex + 1, 
        limit: pageSize 
      }));
    }
    return () => dispatch(clearReports());
  }, [dispatch, hrId, date, pageIndex, pageSize]);

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === "selected") return "text-green-600";
    if (s === "processing") return "text-yellow-500";
    if (s === "rejected") return "text-red-500";
    return "text-gray-500";
  };

  const columns = [
    {
      header: "Sr.No",
      cell: ({ row }) => row.index + 1 + pageIndex * pageSize,
    },
    { accessorKey: "candidateName", header: "Name" },
    { accessorKey: "education", header: "Education" },
    { 
      accessorKey: "designation", 
      header: "Designation"
    },
    { accessorKey: "phoneNumber", header: "Phone" },
    { accessorKey: "interactionType", header: "Interaction" },
    {
      accessorKey: "candidateStatus",
      header: "Status",
      cell: ({ row }) => (
        <span className={`font-medium ${getStatusColor(row.original.candidateStatus)}`}>
          {row.original.candidateStatus}
        </span>
      ),
    },
   {
  header: "Action",
  cell: ({ row }) => (
    <Eye
      size={18}
      className="text-purple-600 mx-auto cursor-pointer hover:scale-110 transition"
      onClick={() => navigate(`/hr-management/candidate-profile/${row.original.id}`)}
    />
  ),
},
  ];

  const table = useReactTable({
    data: filteredReports || [],
    columns,
    pageCount: safeTotalPages,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">
      <div className="bg-white p-5 rounded-2xl mb-10 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 p-4">
          <button onClick={() => navigate(-1)}>
            <CircleChevronLeft size={28} className="text-gray-700 hover:text-black transition" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            Daily Work Update
          </h1>
        </div>

        <hr className="border-gray-200 mt-2 mb-5" />

        <div className="bg-white border border-gray-300 rounded-lg p-5 mt-4">
          {/* Search & Filter UI */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-72 h-11 focus-within:border-purple-400 transition">
              <Search size={18} className="text-[#D3D3D3] mr-2" />
              <input 
                type="text" 
                placeholder="Search by name, education..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm w-full" 
              />
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-center border-collapse">
              <thead className="bg-gray-50 text-gray-600 border-b">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-gray-100 text-gray-600">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="py-3 px-4 font-semibold border-b border-gray-50">
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
                          <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </td>
                  </tr>
                ) : filteredReports?.length > 0 ? (
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
                    <td colSpan={columns.length} className="py-10 text-center text-gray-400 italic">
                      No reports found for this selected date.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-purple-600 font-medium">
              Showing {filteredReports?.length > 0 ? pageIndex * pageSize + 1 : 0} to{" "}
              {Math.min((pageIndex + 1) * pageSize, totalRecords)} of {totalRecords}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage() || loading}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-30 hover:bg-purple-50 transition"
              >
                <ChevronLeft size={20} />
              </button>

              {/* First, last and pages around the current page are enough to navigate. */}
              {pageItems.map((item) =>
                typeof item === "string" ? (
                  <span key={item} className="w-5 text-center text-purple-600" aria-hidden="true">
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => table.setPageIndex(item - 1)}
                    aria-label={`Go to page ${item}`}
                    aria-current={pageIndex === item - 1 ? "page" : undefined}
                    className={`w-8 h-8 rounded-full text-xs font-semibold transition ${
                      pageIndex === item - 1 ? "bg-purple-600 text-white shadow-md" : "border text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage() || loading}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-30 hover:bg-purple-50 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DailyWorkUpdate;
