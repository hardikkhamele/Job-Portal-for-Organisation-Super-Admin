import { useState, useEffect } from "react";
import {
  Eye,
  CircleChevronLeft,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  FileText,
} from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchHrById, clearHrDetails } from "../../redux/slice/hrManagement/getHrById";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import Footer from "../Footer";

function HRViewDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const hrId = id || location.state?.hr?._id || location.state?.hrId;

  const { hrDetails, loading } = useSelector((state) => state.hrDetails);
  
  const hrInfo = hrDetails?.hr;
  const summaryList = hrDetails?.dailySummary || []; 
  const totalRecords = hrDetails?.pagination?.total || 0;

  const [activeTab, setActiveTab] = useState("dailyReport");
  const [transferredCandidates, setTransferredCandidates] = useState([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  useEffect(() => {
    if (hrId) {
      dispatch(fetchHrById(hrId));
    }
    return () => {
      dispatch(clearHrDetails());
    };
  }, [dispatch, hrId]);

  useEffect(() => {
    if (!hrId) return;

    const fetchTransferredCandidates = async () => {
      setLoadingCandidates(true);
      try {
        const token = localStorage.getItem("token");
        const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const authHeaders = { Authorization: `Bearer ${token}` };

        let candidateList = [];

        // 1. Check direct properties on hrDetails first
        const directList =
          hrDetails?.assignedCandidates ||
          hrDetails?.transferredCandidates ||
          hrDetails?.candidates ||
          hrDetails?.hr?.assignedCandidates ||
          hrDetails?.hr?.candidates ||
          [];

        if (Array.isArray(directList) && directList.length > 0) {
          candidateList = directList;
        }

        // 2. If direct list empty, query endpoints with fallback filtering
        if (candidateList.length === 0) {
          const endpointsToTry = [
            `${BASE_URL}/api/admin/candidate-database/getCandidates?assignedTo=${hrId}&limit=500`,
            `${BASE_URL}/api/admin/hr/assigned-candidates/${hrId}`,
            `${BASE_URL}/api/admin/candidate-database/getCandidates?hrId=${hrId}&limit=500`,
          ];

          for (const ep of endpointsToTry) {
            try {
              const res = await axios.get(ep, { headers: authHeaders });
              const listData =
                res.data?.assignedCandidates ||
                res.data?.transferredCandidates ||
                res.data?.candidates ||
                res.data?.data?.candidates ||
                res.data?.data ||
                (Array.isArray(res.data) ? res.data : []);

              if (Array.isArray(listData) && listData.length > 0) {
                const matched = listData.filter((item) => {
                  const assigned =
                    item.assignedTo ||
                    item.assignedHR ||
                    item.hrId ||
                    item.transferredTo ||
                    item.hr;
                  const idVal =
                    typeof assigned === "object" ? assigned?._id || assigned?.id : assigned;
                  return String(idVal) === String(hrId);
                });

                if (matched.length > 0) {
                  candidateList = matched;
                  break;
                } else if (!ep.includes("getCandidates")) {
                  candidateList = listData;
                  break;
                }
              }
            } catch {
              // continue
            }
          }
        }

        setTransferredCandidates(candidateList);
      } catch (err) {
        console.error("Error fetching assigned candidates:", err);
      } finally {
        setLoadingCandidates(false);
      }
    };

    fetchTransferredCandidates();
  }, [hrId, hrDetails]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [candPagination, setCandPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = [
    {
      header: "Sr.No.",
      cell: ({ row }) => row.index + 1 + pagination.pageIndex * pagination.pageSize,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ getValue }) => {
        const val = getValue();
        return val ? new Date(val).toLocaleDateString() : "N/A";
      }
    },
    {
      accessorKey: "totalCalls",
      header: "Total Calls",
    },
    {
      accessorKey: "totalEmails",
      header: "Total Emails",
    },
   {
    header: "Action",
    cell: ({ row }) => {
      const rawDate = row.original.date;
      const formattedDate = rawDate ? new Date(rawDate).toISOString().split('T')[0] : "";
      
      return (
        <Eye
          size={18}
          className="text-purple-600 cursor-pointer mx-auto"
          onClick={() => navigate("/hr-management/daily-work-update", { 
            state: { hrId, date: formattedDate }
          })}
        />
      );
    },
  },
  ];

  const candidateColumns = [
    {
      header: "Sr.No.",
      cell: ({ row }) => row.index + 1 + candPagination.pageIndex * candPagination.pageSize,
    },
    {
      header: "Candidate Name",
      cell: ({ row }) => {
        const item = row.original;
        const name = item.fullName || item.candidateName || item.name;
        if (typeof name === "object") return name?.name || "N/A";
        return name || "N/A";
      },
    },
    {
      header: "Email / Mobile",
      cell: ({ row }) => {
        const item = row.original;
        const email = typeof item.email === "string" ? item.email : "N/A";
        const mobile = item.mobileNumber || item.phone || item.mobile || "";
        return (
          <div>
            <p className="font-medium text-gray-800">{email}</p>
            {mobile && <p className="text-xs text-gray-500">{String(mobile)}</p>}
          </div>
        );
      },
    },
    {
      header: "Designation / Category",
      cell: ({ row }) => {
        const item = row.original;
        const desObj = item.designation;
        const catObj = item.category;

        const desStr =
          typeof desObj === "object"
            ? desObj?.name || desObj?.title || desObj?.designationName
            : desObj;

        const catStr =
          typeof catObj === "object"
            ? catObj?.name || catObj?.categoryName
            : catObj;

        return desStr || catStr || "N/A";
      },
    },
    {
      header: "Experience / Location",
      cell: ({ row }) => {
        const item = row.original;
        const exp = typeof item.experience === "object" ? item.experience?.name : item.experience;
        const loc = typeof item.currentCity === "object" ? item.currentCity?.name : item.currentCity || item.location;
        return (
          <div>
            <p>{exp || "N/A"}</p>
            {loc && <p className="text-xs text-gray-500">{typeof loc === "string" ? loc : ""}</p>}
          </div>
        );
      },
    },
    {
      header: "Transferred Date",
      cell: ({ row }) => {
        const val = row.original.updatedAt || row.original.createdAt || row.original.transferredAt;
        if (!val) return "N/A";
        const d = new Date(val);
        return !isNaN(d.getTime()) ? d.toLocaleDateString() : "N/A";
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const candId = row.original._id || row.original.id;
        return (
          <Eye
            size={18}
            className="text-purple-600 cursor-pointer mx-auto hover:text-purple-800 transition"
            onClick={() => {
              if (candId) {
                navigate(`/hr-management/candidate-profile/${candId}`);
              }
            }}
            title="View Candidate Profile"
          />
        );
      },
    },
  ];

  const table = useReactTable({
    data: summaryList, 
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const candidateTable = useReactTable({
    data: transferredCandidates,
    columns: candidateColumns,
    state: { pagination: candPagination },
    onPaginationChange: setCandPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">
      <div className="bg-white p-5 rounded-2xl shadow-sm mb-10">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <CircleChevronLeft size={28} className="text-gray-700 hover:text-black transition" />
          </button>
          <h1 className="text-xl font-semibold">View Details</h1>
        </div>

        <hr className="border-gray-300 mt-4 mb-5" />

        {/* Profile Section */}
        {loading && !hrInfo ? ( 
          <div className="flex flex-col justify-center items-center gap-3 h-[150px]">
            <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-[#F4F6FA] rounded-xl p-4 flex justify-between items-center mt-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-300 to-purple-500 text-white shadow-lg shadow-purple-200 border-2 border-gray-300">
                <h2 className="text-xl font-bold tracking-wider">
                  {hrInfo?.hrName?.[0] || "H"}
                </h2>
              </div>
              <div>
                <h2 className="text-lg font-semibold">{hrInfo?.hrName || "Loading..."}</h2>
                <p className="text-sm text-gray-500">{hrInfo?.designation || "N/A"}</p>
              </div>
            </div>

            <div className="text-right text-sm text-gray-600">
              <p className="font-medium">{hrInfo?.email || "N/A"}</p>
              <p className="text-xs text-purple-500 bg-purple-50 px-2 py-1 rounded-full inline-block mt-1">
                {hrInfo?.isverified ? "Verified" : "Pending Verification"}
              </p>
            </div>
          </div>
        )}

        {/* Report / Transferred Candidates Section */}
        <div className="bg-white border border-[rgba(211,211,211,1)] rounded-lg p-5">
          {/* Tab Headers */}
          <div className="flex gap-6 border-b border-gray-300 mb-5">
            <button
              onClick={() => setActiveTab("dailyReport")}
              className={`pb-3 font-semibold text-sm transition cursor-pointer flex items-center gap-2 ${
                activeTab === "dailyReport"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-purple-600"
              }`}
            >
              <FileText size={16} />
              <span>Daily Work Report</span>
            </button>

            <button
              onClick={() => setActiveTab("transferredCandidates")}
              className={`pb-3 font-semibold text-sm transition cursor-pointer flex items-center gap-2 ${
                activeTab === "transferredCandidates"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-purple-600"
              }`}
            >
              <UserCheck size={16} />
              <span>Transferred Candidates</span>
              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {transferredCandidates.length}
              </span>
            </button>
          </div>

          {activeTab === "dailyReport" ? (
            <>
              <div className="w-full overflow-x-auto">
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
                        <td colSpan={columns.length} className="py-10 text-center">
                          <div className="flex flex-col justify-center items-center gap-3">
                            <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="font-medium">Loading Daily Reports...</span>
                          </div>
                        </td>
                      </tr>
                    ) : summaryList.length > 0 ? (
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
                          No daily summary records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-purple-600 font-medium">
                  Showing {summaryList.length > 0 ? pagination.pageIndex * pagination.pageSize + 1 : 0} to{" "}
                  {Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalRecords)} of {totalRecords}
                </p>

                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage() || loading}
                    className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-30 hover:bg-purple-50"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {[...Array(table.getPageCount())].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => table.setPageIndex(i)}
                      disabled={loading}
                      className={`w-8 h-8 rounded-full text-xs font-semibold ${
                        pagination.pageIndex === i ? "bg-purple-600 text-white" : "border text-purple-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage() || loading}
                    className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-30 hover:bg-purple-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Transferred Candidates Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-center border-collapse">
                  <thead>
                    {candidateTable.getHeaderGroups().map((headerGroup) => (
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
                    {loadingCandidates ? (
                      <tr>
                        <td colSpan={candidateColumns.length} className="py-10 text-center">
                          <div className="flex flex-col justify-center items-center gap-3">
                            <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="font-medium">Loading Transferred Candidates...</span>
                          </div>
                        </td>
                      </tr>
                    ) : transferredCandidates.length > 0 ? (
                      candidateTable.getRowModel().rows.map((row) => (
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
                        <td colSpan={candidateColumns.length} className="py-10 text-center text-gray-400 italic">
                          No transferred candidates assigned to this HR yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Transferred Candidates Pagination */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-purple-600 font-medium">
                  Showing {transferredCandidates.length > 0 ? candPagination.pageIndex * candPagination.pageSize + 1 : 0} to{" "}
                  {Math.min((candPagination.pageIndex + 1) * candPagination.pageSize, transferredCandidates.length)} of {transferredCandidates.length} Candidates
                </p>

                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => candidateTable.previousPage()}
                    disabled={!candidateTable.getCanPreviousPage() || loadingCandidates}
                    className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-30 hover:bg-purple-50"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {[...Array(candidateTable.getPageCount())].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => candidateTable.setPageIndex(i)}
                      disabled={loadingCandidates}
                      className={`w-8 h-8 rounded-full text-xs font-semibold ${
                        candPagination.pageIndex === i ? "bg-purple-600 text-white" : "border text-purple-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => candidateTable.nextPage()}
                    disabled={!candidateTable.getCanNextPage() || loadingCandidates}
                    className="w-8 h-8 rounded-full border flex items-center justify-center text-purple-600 disabled:opacity-30 hover:bg-purple-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default HRViewDetails;