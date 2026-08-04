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
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import DeleteModal from "../common/DeleteModal";
import { fetchAllJobs } from "../../redux/slice/jobManagement/getAllJob";
import { getAllCategories, getSubCategoriesByCategoryId } from "../../redux/slice/category/categorySlice";
import defaultLogo from "../../assets/Technokreat.svg";
import Footer from "../Footer";
import { addNotification } from "../../utils/notificationHelper";
import { updateJob } from "../../redux/slice/jobManagement/updateJobSlice";

const JobManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { jobs = [], loading = false } = useSelector((state) => state.allJobs || {});
  const { categories = [], subCategories = [], subCategoriesLoading = false } = useSelector((state) => state.category || {});

  const [globalFilter, setGlobalFilter] = useState("");
  const [category, setCategory] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    jobTitle: "",
    minSalary: "",
    maxSalary: "",
    salaryType: "Monthly",
    location: "",
    jobLevel: "",
    jobType: "",
    experience: "",
    jobDescription: "",
  });

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

  const handleEditClick = (row) => {
    setEditingJob(row);
    setEditFormData({
      jobTitle: row.jobTitle || "",
      minSalary: row.salaryRange?.minSalary || "",
      maxSalary: row.salaryRange?.maxSalary || "",
      salaryType: row.salaryType || "Monthly",
      location: row.jobLocation?.name || row.location || "",
      jobLevel: row.advanceInformation?.jobLevel || "",
      jobType: row.advanceInformation?.jobType || "",
      experience: row.advanceInformation?.experience || "",
      jobDescription: row.jobDescription || "",
    });
    setIsEditModalOpen(true);
  };

  const handleConfirmEdit = async (e) => {
    e.preventDefault();
    if (!editingJob) return;
    setEditLoading(true);
    const jobId = editingJob._id || editingJob.id;
    const payload = {
      jobTitle: editFormData.jobTitle,
      salaryRange: {
        minSalary: Number(editFormData.minSalary),
        maxSalary: Number(editFormData.maxSalary),
      },
      salaryType: editFormData.salaryType,
      jobLocation: { name: editFormData.location },
      advanceInformation: {
        ...(editingJob.advanceInformation || {}),
        jobLevel: editFormData.jobLevel,
        jobType: editFormData.jobType,
        experience: editFormData.experience,
      },
      jobDescription: editFormData.jobDescription,
    };

    dispatch(updateJob({ jobId, jobData: payload }))
      .unwrap()
      .then(() => {
        setIsEditModalOpen(false);
        setEditingJob(null);
        dispatch(fetchAllJobs({ page: 1, limit: 150 }));
      })
      .catch((err) => {
        console.error("Error updating job:", err);
      })
      .finally(() => {
        setEditLoading(false);
      });
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRow) return;
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
      const jobId = selectedRow._id || selectedRow.id;

      try {
        await axios.delete(`${BASE_URL}/api/admin/jobs/deleteJob/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        try {
          await axios.delete(`${BASE_URL}/api/admin/employer/deleteJob/${jobId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (err2) {
          await axios.delete(`${BASE_URL}/api/admin/job/deleteJob/${jobId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      }

      toast.success("Job deleted successfully!");
      dispatch(fetchAllJobs({ page: 1, limit: 150 }));
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error(error.response?.data?.message || "Failed to delete job");
    } finally {
      setDeleteLoading(false);
      setIsModalOpen(false);
      setSelectedRow(null);
    }
  };

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
        <div className="flex gap-3 justify-center items-center">
          <Eye
            className="text-purple-600 cursor-pointer hover:scale-110 transition"
            size={18}
            title="View Job Details"
            onClick={() =>
              navigate(`/job-management/job-view-details/${row.original._id}`, {
                state: row.original,
              })
            }
          />
          <Edit
            className="text-purple-600 cursor-pointer hover:scale-110 transition"
            size={18}
            title="Edit Job Details"
            onClick={() => handleEditClick(row.original)}
          />
          <Trash2
            className="text-red-500 cursor-pointer hover:scale-110 transition"
            size={18}
            title="Delete Job"
            onClick={() => handleDeleteClick(row.original)}
          />
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
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRow(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />

      {/* Edit Job Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Edit Job Details
            </h2>

            <form onSubmit={handleConfirmEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.jobTitle}
                  onChange={(e) => setEditFormData({ ...editFormData, jobTitle: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Min Salary (₹)
                  </label>
                  <input
                    type="number"
                    value={editFormData.minSalary}
                    onChange={(e) => setEditFormData({ ...editFormData, minSalary: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Max Salary (₹)
                  </label>
                  <input
                    type="number"
                    value={editFormData.maxSalary}
                    onChange={(e) => setEditFormData({ ...editFormData, maxSalary: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Salary Type
                  </label>
                  <select
                    value={editFormData.salaryType}
                    onChange={(e) => setEditFormData({ ...editFormData, salaryType: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Job Level
                  </label>
                  <input
                    type="text"
                    value={editFormData.jobLevel}
                    onChange={(e) => setEditFormData({ ...editFormData, jobLevel: e.target.value })}
                    placeholder="e.g. Senior / Mid-level"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Job Type
                  </label>
                  <input
                    type="text"
                    value={editFormData.jobType}
                    onChange={(e) => setEditFormData({ ...editFormData, jobType: e.target.value })}
                    placeholder="e.g. Full-Time / Remote"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={editFormData.experience}
                    onChange={(e) => setEditFormData({ ...editFormData, experience: e.target.value })}
                    placeholder="e.g. 2-5 Years"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editFormData.location}
                  onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Job Description
                </label>
                <textarea
                  rows={4}
                  value={editFormData.jobDescription}
                  onChange={(e) => setEditFormData({ ...editFormData, jobDescription: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="px-5 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50"
                >
                  {editLoading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobManagement;