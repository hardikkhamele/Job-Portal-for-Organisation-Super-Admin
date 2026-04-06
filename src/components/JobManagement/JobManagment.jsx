import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Search,
  Eye,
  Trash2,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import DeleteModal from "../common/DeleteModal";
import { fetchAllJobs } from "../../redux/slice/jobManagement/getAllJob";
import defaultLogo from "../../assets/Technokreat.svg";
import Footer from "../Footer";

const JobManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { jobs, loading, pagination: reduxPagination } = useSelector((state) => state.allJobs);

  const [globalFilter, setGlobalFilter] = useState("");
  const [category, setCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0, 
    pageSize: 10,
  });

  // Search ya Category change hone par page 1 par reset karein
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [globalFilter, category]);

  // API Trigger with Search Params
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchAllJobs({ 
        page: pagination.pageIndex + 1, 
        limit: pagination.pageSize,
        search: globalFilter,
        category: category
      }));
    }, 500); // Debounce taaki typing ke waqt lagatar API call na ho

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, pagination.pageIndex, pagination.pageSize, globalFilter, category]);

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) => pagination.pageIndex * pagination.pageSize + row.index + 1,
    },
    {
      header: "Employer",
      cell: ({ row }) => {
        const logo = row.original.companyLogo?.[0] || defaultLogo;
        return (
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-9 h-9 rounded-full bg-gray-100 p-1 object-contain border border-gray-300" />
            <span className="font-medium text-gray-800">{row.original.employerName || "N/A"}</span>
          </div>
        );
      },
    },
    {
      header: "Job list",
      cell: ({ row }) => (
        <div className="text-left">
          <p className="font-medium">{row.original.jobTitle}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin size={14} className="text-gray-400" />
            <span>{row.original.jobType} • {row.original.subCategory?.name}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Spam Counts",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-red-500">{row.original.spamCount || 0}</p>
          <span className="text-xs text-gray-500">Reports</span>
        </div>
      ),
    },
    {
      header: "Posted Time & Date",
      cell: ({ row }) => {
        const date = new Date(row.original.postedDateTime);
        return (
          <div className="text-xs">
            <p>{date.toLocaleDateString("en-GB")}</p>
            <p className="text-gray-400">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-3 justify-center">
          <Eye className="text-purple-600 cursor-pointer hover:scale-110 transition" size={18} onClick={() => navigate(`/job-management/job-view-details/${row.original._id}`, { state: row.original })} />
          <Trash2 className="text-red-500 cursor-pointer hover:scale-110 transition" size={18} onClick={() => handleDeleteClick(row.original)} />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: jobs || [],
    columns,
    pageCount: reduxPagination.totalPages,
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-5 rounded-xl shadow mb-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Job Management</h2>
        <hr className="border-gray-300 mt-2 mb-5" />

        <div className="border border-gray-300 rounded-lg p-6 bg-white">
          <div className="flex justify-between mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 bg-[#F7F8F9] w-72 h-11">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search by JobList "
                className="bg-transparent outline-none text-sm w-full"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>

            <select
              className="border border-gray-300 p-2 rounded-lg text-sm bg-white outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Software Development">Software Development</option>
              <option value="Data Science">Data Science</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
              <option value="Web Development">Web Development</option>
            </select>
          </div>

          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="p-4 font-semibold text-center border-b">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody className="text-gray-700">
                {loading ? (
                  /* --- Loader inside table body --- */
                  <tr>
                    <td colSpan={columns.length} className="p-20 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
                        <p className="text-gray-500 font-medium animate-pulse">Loading data...</p>
                      </div>
                    </td>
                  </tr>
                ) : table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b border-gray-200 hover:bg-purple-50/30 transition text-center">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="p-10 text-center text-gray-400">
                      No jobs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination UI */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-purple-600">
                {reduxPagination.totalJobs > 0 ? (pagination.pageIndex * pagination.pageSize) + 1 : 0}
              </span> to{" "}
              <span className="font-medium text-purple-600">
                {Math.min((pagination.pageIndex + 1) * pagination.pageSize, reduxPagination.totalJobs)}
              </span> of {reduxPagination.totalJobs} Jobs
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="w-9 h-9 rounded-full border flex items-center justify-center text-purple-600 border-purple-200 hover:bg-purple-50 disabled:opacity-30 transition"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: table.getPageCount() }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(i)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                      pagination.pageIndex === i ? "bg-purple-600 text-white shadow-md" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="w-9 h-9 rounded-full border flex items-center justify-center text-purple-600 border-purple-200 hover:bg-purple-50 disabled:opacity-30 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default JobManagement;