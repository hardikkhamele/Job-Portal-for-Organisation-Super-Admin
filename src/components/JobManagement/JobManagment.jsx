import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";
// import DeleteModal from "../common/DeleteModal";
import { fetchAllJobs } from "../../redux/slice/jobManagement/getAllJob";
import { getAllCategories, getSubCategoriesByCategoryId } from "../../redux/slice/category/categorySlice";
import defaultLogo from "../../assets/Technokreat.svg";
import Footer from "../Footer";
import { addNotification } from "../../utils/notificationHelper";

const JobManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { jobs, loading } = useSelector((state) => state.allJobs);
  const { categories, subCategories, subCategoriesLoading } = useSelector((state) => state.category);

  const [globalFilter, setGlobalFilter] = useState("");
  const [category, setCategory] = useState("All");

  const [pagination, setPagination] = useState({
    pageIndex: 0, 
    pageSize: 10,
  });

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // Fetch all jobs on mount (higher limit to fetch all)
  useEffect(() => {
    dispatch(fetchAllJobs({ page: 1, limit: 150 }));
    addNotification(
      "Job Posted Successfully",
      "A new Senior React Developer job listing has been published successfully.",
      "success"
    );
  }, [dispatch]);

  // Fetch subcategories when category filter changes
  useEffect(() => {
    if (category !== "All") {
      dispatch(getSubCategoriesByCategoryId(category));
    }
  }, [dispatch, category]);

  // Reset pagination index on filter/search change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [globalFilter, category]);

  // Local filtered jobs computed client-side
  const filteredJobs = useMemo(() => {
    let result = jobs || [];

    // 1. Filter by Category (via Subcategories map)
    if (category !== "All") {
      if (subCategories && subCategories.length > 0) {
        const subCatIds = subCategories.map((sub) => sub.id);
        result = result.filter(
          (job) => job.subCategory && subCatIds.includes(job.subCategory.id)
        );
      } else {
        // If category is selected but subcategories are empty or not loaded yet, return empty list
        result = [];
      }
    }

    // 2. Filter by Search input (globalFilter)
    if (globalFilter.trim()) {
      const searchLower = globalFilter.toLowerCase();
      result = result.filter(
        (job) =>
          job.jobTitle?.toLowerCase().includes(searchLower) ||
          job.employerName?.toLowerCase().includes(searchLower) ||
          job.subCategory?.name?.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [jobs, category, subCategories, globalFilter]);


  // const handleConfirmDelete = () => {
  //   setIsModalOpen(false);
  //   setSelectedRow(null);
  // };

  // const handleDeleteClick = (row) => {
  //   setSelectedRow(row);
  //   setIsModalOpen(true);
  // };

  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) => pagination.pageIndex * pagination.pageSize + row.index + 1,
      meta: { align: "text-center" },
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
      meta: { align: "text-left" },
    },
    {
      header: "Job list",
      cell: ({ row }) => (
        <div className="text-left">
          <p className="font-medium">{row.original.jobTitle}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <span>{row.original.jobType} {row.original.subCategory?.name ? `• ${row.original.subCategory?.name}` : ''}</span>
          </div>
        </div>
      ),
      meta: { align: "text-left" },
    },
    {
      header: "Spam Counts",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-red-500">{row.original.spamCount || 0}</p>
          <span className="text-xs text-gray-500">Reports</span>
        </div>
      ),
      meta: { align: "text-center" },
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
      meta: { align: "text-center" },
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-3 justify-center">
          <Eye className="text-purple-600 cursor-pointer hover:scale-110 transition" size={18} onClick={() => navigate(`/job-management/job-view-details/${row.original._id}`, { state: row.original })} />
          {/* <Trash2 className="text-red-500 cursor-pointer hover:scale-110 transition" size={18} onClick={() => handleDeleteClick(row.original)} /> */}
        </div>
      ),
      meta: { align: "text-center" },
    },
  ];

  const table = useReactTable({
    data: filteredJobs || [],
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-3 bg-gray-100 min-h-screen">
      <div className="bg-white p-5 rounded-xl shadow mb-12">
        <h2 className="text-2xl font-bold text-black">Job Management</h2>
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
              {categories && categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-gray-100 text-gray-600">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`py-3 px-4 font-semibold ${
                          header.column.columnDef.meta?.align || "text-center"
                        }`}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody className="text-gray-700">
                {loading || (category !== "All" && subCategoriesLoading) ? (
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
                    <tr key={row.id} className="border-b border-[rgba(211,211,211,1)] hover:bg-gray-50 transition">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={`p-3 text-gray-700 ${
                            cell.column.columnDef.meta?.align || "text-center"
                          }`}
                        >
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
                {filteredJobs.length > 0 ? (pagination.pageIndex * pagination.pageSize) + 1 : 0}
              </span> to{" "}
              <span className="font-medium text-purple-600">
                {Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredJobs.length)}
              </span> of {filteredJobs.length} Jobs
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
      {/* <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmDelete} /> */}
    </div>
  );
};

export default JobManagement;