import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Eye, Trash2, Search, ChevronLeft, ChevronRight,
  ArrowLeft, Filter, CloudDownload, Loader2
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";
import FilterModal from "../common/FilterModal";
import DeleteModal from "../common/DeleteModal";
import { getJobSeekersByDesignationId } from "../../redux/slice/jobseeker/jobseekerSlice";

function CandidateJobView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { designationId } = useParams();

  const { jobSeekers, listLoading, pagination } = useSelector(
    (state) => state.jobseeker
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Fetch data when designation, page, or limit changes
  useEffect(() => {
    if (designationId) {
      dispatch(
        getJobSeekersByDesignationId({
          designationId,
          page: currentPage,
          limit: limit,
        })
      );
    }
  }, [designationId, currentPage, limit, dispatch]);

  // Handle Dynamic Limit Change
  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page to avoid out-of-bounds errors
  };

  // ── Excel Export Function ────────────────────────────────
  const exportToExcel = () => {
    const dataToExport = jobSeekers.map((user, index) => ({
      "Sr. No.": (pagination.currentPage - 1) * pagination.limit + index + 1,
      "Full Name": user.fullName,
      "Email": user.email,
      "Location": user.location || "N/A",
      "Experience": user.experiences?.length > 0 ? `${user.experiences.length} Years` : "Fresher",
      "Specialization": user.specialization?.name || "N/A",
      "Category": user.jobCategory?.name || "N/A",
      "Role": user.jobRole?.name || "N/A",
      "Status": user.isVerified ? "Verified" : "Unverified"
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
    XLSX.writeFile(workbook, `Candidates_List_Page_${pagination.currentPage}.xlsx`);
  };

  // ── Resume Download Function ─────────────────────────────
  const downloadResume = (resumeUrl, fileName) => {
    if (!resumeUrl) return alert("Resume not available");
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.setAttribute("download", fileName || "resume.pdf");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = jobSeekers.filter(
    (s) =>
      s.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.location?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) => (pagination.currentPage - 1) * pagination.limit + row.index + 1,
    },
    {
      header: "Candidate",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700 flex-shrink-0">
              {user.fullName?.charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <p className="font-medium">{user.fullName}</p>
              <p className="text-xs text-gray-500">({user.jobRole?.name || "—"})</p>
            </div>
          </div>
        );
      },
    },
    {
      header: "Experience",
      cell: ({ row }) => row.original.experiences?.length > 0 ? `${row.original.experiences.length} exp.` : "Fresher",
    },
    {
      header: "Location",
      cell: ({ row }) => row.original.location || "—",
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${row.original.isVerified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"}`}>
          {row.original.isVerified ? "Verified" : "Unverified"}
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center gap-4 text-purple-600">
          <Eye
            size={18}
            className="cursor-pointer hover:text-purple-800"
            onClick={() => navigate(`/candidate-profile/${row.original.id}`)}
          />
          {/* <CloudDownload
            size={18}
            className="cursor-pointer hover:text-purple-800"
            onClick={() => downloadResume(row.original.resume, `${row.original.fullName}_Resume.pdf`)}
          /> */}
          {/* <Trash2
            size={18}
            className="cursor-pointer text-red-500 hover:text-red-700"
            onClick={() => {
              setSelectedId(row.original.id);
              setIsDeleteOpen(true);
            }}
          /> */}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const renderPaginationButtons = () => {
    const totalPages = pagination.totalPages;
    const buttons = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 rounded-full text-sm font-medium transition ${
            currentPage === i ? "bg-purple-600 text-white" : "border text-purple-600 hover:bg-purple-50"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center bg-white">
                <ArrowLeft size={18} />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Job Seeker Management</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Show:</span>
                <select 
                  value={limit} 
                  onChange={handleLimitChange}
                  className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-purple-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <button onClick={exportToExcel} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 text-sm font-medium rounded-lg transition">
                <CloudDownload size={16} /> Export Excel
              </button>
            </div>
          </div>
          <hr className="border-gray-300 mt-2 mb-5" />

          {/* Table Controls */}
          <div className="border border-[#D3D3D3] rounded-lg p-6">
            <div className="flex justify-between items-center mb-5 gap-3">
              <div className="flex items-center border border-[#D3D3D3] rounded-lg px-3 bg-[#F7F8F9] h-10 w-64">
                <Search size={16} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  className="bg-transparent outline-none text-sm w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50" onClick={() => setIsFilterOpen(true)}>
                <Filter size={16} /> Filter
              </button>
            </div>

            {/* Table */}
            {listLoading ? (
              <div className="flex justify-center items-center py-24"><Loader2 size={36} className="animate-spin text-purple-600" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center border-collapse">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className="bg-gray-100 text-gray-600">
                        {headerGroup.headers.map((header) => (
                          <th key={header.id} className="py-3 px-4 text-sm font-semibold">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="border-b border-[#D3D3D3] hover:bg-gray-50 transition">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="py-4 px-4">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            {!listLoading && pagination.totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-purple-600">
                  Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalRecords)} of {pagination.totalRecords}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-40"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  {renderPaginationButtons()}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, pagination.totalPages))}
                    disabled={currentPage === pagination.totalPages}
                    className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-40"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <FilterModal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => setIsDeleteOpen(false)}
      />
    </div>
  );
}

export default CandidateJobView;