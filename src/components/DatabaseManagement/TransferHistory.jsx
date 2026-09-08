import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  History,
  CheckCircle2,
  UserCheck,
  Calendar,
  Clock,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
} from "lucide-react";
import { getTransferHistory } from "../../utils/transferHistoryHelper";

const TransferHistory = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Selected batch for detailed candidate drill-down
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batchSearchTerm, setBatchSearchTerm] = useState("");
  const [batchPage, setBatchPage] = useState(1);
  const batchItemsPerPage = 10;

  const loadData = () => {
    setHistoryList(getTransferHistory());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("transferHistoryUpdated", loadData);
    return () => {
      window.removeEventListener("transferHistoryUpdated", loadData);
    };
  }, []);

  // Filtered batches
  const filteredBatches = useMemo(() => {
    return historyList.filter((item) => {
      const matchesSearch =
        !searchTerm.trim() ||
        item.transferredTo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.destModule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dateTime?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.transferredBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.range?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept =
        departmentFilter === "all" ||
        (departmentFilter === "hr" &&
          item.destModule?.toLowerCase().includes("hr")) ||
        (departmentFilter === "employee" &&
          (item.destModule?.toLowerCase().includes("employee") ||
            item.destModule?.toLowerCase().includes("employer")));

      return matchesSearch && matchesDept;
    });
  }, [historyList, searchTerm, departmentFilter]);

  // Paginated batches
  const totalPages = Math.ceil(filteredBatches.length / itemsPerPage) || 1;
  const paginatedBatches = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBatches.slice(start, start + itemsPerPage);
  }, [filteredBatches, currentPage]);

  // Filtered candidates in selected batch
  const filteredBatchCandidates = useMemo(() => {
    if (!selectedBatch || !Array.isArray(selectedBatch.candidates)) return [];
    if (!batchSearchTerm.trim()) return selectedBatch.candidates;
    const term = batchSearchTerm.toLowerCase().trim();
    return selectedBatch.candidates.filter(
      (c) =>
        c.name?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term) ||
        c.phone?.toLowerCase().includes(term) ||
        c.designation?.toLowerCase().includes(term) ||
        c.category?.toLowerCase().includes(term) ||
        c.city?.toLowerCase().includes(term)
    );
  }, [selectedBatch, batchSearchTerm]);

  // Paginated candidates in selected batch
  const batchTotalPages =
    Math.ceil(filteredBatchCandidates.length / batchItemsPerPage) || 1;
  const paginatedBatchCandidates = useMemo(() => {
    const start = (batchPage - 1) * batchItemsPerPage;
    return filteredBatchCandidates.slice(start, start + batchItemsPerPage);
  }, [filteredBatchCandidates, batchPage]);

  // Stats
  const totalTransferredCount = useMemo(() => {
    return historyList.reduce(
      (acc, curr) => acc + (Number(curr.count) || 0),
      0
    );
  }, [historyList]);

  return (
    <div className="w-full bg-[#F4F6FA] p-4 sm:p-6 min-h-screen">
      <div className="w-full mx-auto space-y-6">
        {/* Top Breadcrumb & Page Header */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <button
                type="button"
                onClick={() => navigate("/candidates")}
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold text-xs mb-2 transition cursor-pointer group"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                <span>Back to Database Candidate</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                  <History size={24} />
                </div>
                <span>Candidate Transfer History & Logs</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                View complete audit trail of candidate transfers to HR Management and Employee Management modules.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={loadData}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition cursor-pointer shadow-xs"
              >
                <RefreshCw size={14} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl border border-purple-100 flex items-center gap-3.5 shadow-2xs">
              <div className="p-3 bg-purple-600 text-white rounded-xl shadow-xs">
                <UserCheck size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total Candidates Transferred
                </p>
                <p className="text-2xl font-extrabold text-purple-700 mt-0.5">
                  {totalTransferredCount}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 flex items-center gap-3.5 shadow-2xs">
              <div className="p-3 bg-blue-600 text-white rounded-xl shadow-xs">
                <Calendar size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total Transfer Batches
                </p>
                <p className="text-2xl font-extrabold text-blue-700 mt-0.5">
                  {historyList.length}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl border border-emerald-100 flex items-center gap-3.5 shadow-2xs">
              <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-xs">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Latest Transfer
                </p>
                <p className="text-sm font-bold text-emerald-800 mt-1 truncate">
                  {historyList[0]?.dateTime || "No transfers yet"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section: Detailed Batch Candidates Drill-down OR Batches Table */}
        {selectedBatch ? (
          /* ================= Drill-down Candidate View ================= */
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
            {/* Drill-down Header */}
            <div className="p-6 bg-purple-50/50 border-b border-purple-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBatch(null);
                    setBatchSearchTerm("");
                    setBatchPage(1);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-purple-100 border border-purple-200 text-purple-700 font-semibold rounded-lg text-xs transition cursor-pointer shadow-xs"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Batches</span>
                </button>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-900">
                      Candidates in this Transfer
                    </h2>
                    <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {selectedBatch.candidates?.length || selectedBatch.count} Candidate(s)
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Transferred to{" "}
                    <strong className="text-purple-700 font-semibold">
                      {selectedBatch.transferredTo}
                    </strong>{" "}
                    ({selectedBatch.destModule}) on {selectedBatch.dateTime}
                  </p>
                </div>
              </div>

              {/* In-Batch Search */}
              {selectedBatch.candidates?.length > 0 && (
                <div className="relative w-full sm:w-72">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-2.5 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search candidate by name, phone, etc."
                    value={batchSearchTerm}
                    onChange={(e) => {
                      setBatchSearchTerm(e.target.value);
                      setBatchPage(1);
                    }}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-300 bg-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition shadow-2xs"
                  />
                </div>
              )}
            </div>

            {/* Candidates Table */}
            <div className="p-6">
              {selectedBatch.candidates && selectedBatch.candidates.length > 0 ? (
                <>
                  <div className="overflow-x-auto border border-gray-200 rounded-xl">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                          <th className="py-3 px-4 text-center w-14">#</th>
                          <th className="py-3 px-4">Candidate Name</th>
                          <th className="py-3 px-4">Designation</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Phone</th>
                          <th className="py-3 px-4">Email</th>
                          <th className="py-3 px-4">City</th>
                          <th className="py-3 px-4 text-center w-20">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {paginatedBatchCandidates.map((cand, idx) => (
                          <tr
                            key={cand.id || idx}
                            className="hover:bg-purple-50/30 transition-colors"
                          >
                            <td className="py-3 px-4 text-center font-bold text-gray-500">
                              {(batchPage - 1) * batchItemsPerPage + idx + 1}
                            </td>
                            <td className="py-3 px-4 font-semibold text-gray-900">
                              {cand.name || "N/A"}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {cand.designation || "N/A"}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {cand.category || "N/A"}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {cand.phone || "N/A"}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {cand.email || "N/A"}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {cand.city || "N/A"}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {cand.id && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate(
                                      `/candidates/candidate-details/${cand.id}`
                                    )
                                  }
                                  className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 px-2 py-1 rounded transition cursor-pointer font-semibold"
                                  title="View Full Profile"
                                >
                                  <Eye size={15} />
                                  <span>View</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                        {paginatedBatchCandidates.length === 0 && (
                          <tr>
                            <td
                              colSpan="8"
                              className="text-center py-10 text-gray-400"
                            >
                              No candidates match your search "{batchSearchTerm}".
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Batch Pagination */}
                  {batchTotalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
                      <span>
                        Showing {(batchPage - 1) * batchItemsPerPage + 1} to{" "}
                        {Math.min(
                          batchPage * batchItemsPerPage,
                          filteredBatchCandidates.length
                        )}{" "}
                        of {filteredBatchCandidates.length} candidates
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={batchPage === 1}
                          onClick={() => setBatchPage((p) => Math.max(p - 1, 1))}
                          className="px-3 py-1.5 border rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <span>
                          Page {batchPage} of {batchTotalPages}
                        </span>
                        <button
                          type="button"
                          disabled={batchPage === batchTotalPages}
                          onClick={() =>
                            setBatchPage((p) => Math.min(p + 1, batchTotalPages))
                          }
                          className="px-3 py-1.5 border rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 bg-amber-50/60 border border-amber-200 rounded-xl p-6">
                  <p className="text-sm font-semibold text-amber-900">
                    Detailed candidate profiles for this past transfer are recorded in {selectedBatch.destModule}.
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    You can view this complete candidate list under{" "}
                    <strong>{selectedBatch.destModule}</strong> ➔{" "}
                    <strong>{selectedBatch.transferredTo}</strong> ➔{" "}
                    <strong>Transferred Candidates</strong> tab.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ================= All Batches View ================= */
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-200">
              <div className="relative flex-1 max-w-md">
                <Search
                  size={16}
                  className="absolute left-3.5 top-2.5 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by recipient, module, or date..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-300 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition shadow-2xs"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                  <Filter size={14} />
                  <span>Filter:</span>
                </div>
                <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setDepartmentFilter("all");
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded-md transition cursor-pointer ${
                      departmentFilter === "all"
                        ? "bg-purple-600 text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDepartmentFilter("hr");
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded-md transition cursor-pointer ${
                      departmentFilter === "hr"
                        ? "bg-purple-600 text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    HR Management
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDepartmentFilter("employee");
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded-md transition cursor-pointer ${
                      departmentFilter === "employee"
                        ? "bg-purple-600 text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Employee Management
                  </button>
                </div>
              </div>
            </div>

            {/* Batches Table */}
            <div className="mt-5">
              {filteredBatches.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-purple-50 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <History size={32} />
                  </div>
                  <h3 className="text-base font-bold text-gray-800">
                    No Transfer Logs Found
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                    When you transfer candidates from the Database Candidate page, the complete history will appear here.
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto border border-gray-200 rounded-xl">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                          <th className="py-3 px-4 w-12 text-center">#</th>
                          <th className="py-3 px-4">Date & Time</th>
                          <th className="py-3 px-4">Transferred Data</th>
                          <th className="py-3 px-4">Transferred To</th>
                          <th className="py-3 px-4">Department Module</th>
                          <th className="py-3 px-4">Transferred By</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {paginatedBatches.map((item, idx) => (
                          <tr
                            key={item.id || idx}
                            className="hover:bg-purple-50/30 transition-colors"
                          >
                            <td className="py-3.5 px-4 text-center font-bold text-gray-500">
                              {(currentPage - 1) * itemsPerPage + idx + 1}
                            </td>
                            <td className="py-3.5 px-4 font-medium text-gray-800 whitespace-nowrap">
                              {item.dateTime}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 font-bold">
                                {item.count} Candidate(s)
                              </span>
                              {item.range && (
                                <p className="text-[11px] text-gray-500 mt-0.5">
                                  {item.range}
                                </p>
                              )}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-gray-900">
                              {item.transferredTo}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                                  item.destModule?.includes("HR")
                                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                                    : "bg-amber-50 text-amber-700 border border-amber-200"
                                }`}
                              >
                                {item.destModule}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-gray-600 font-medium">
                              {item.transferredBy || "Super Admin"}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px]">
                                <CheckCircle2 size={12} />
                                {item.status || "Success"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedBatch(item);
                                  setBatchSearchTerm("");
                                  setBatchPage(1);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-2xs transition cursor-pointer text-xs"
                                title="View exact candidates in this transfer batch"
                              >
                                <Eye size={13} />
                                <span>
                                  View Candidates ({item.candidates?.length || item.count})
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Batches Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 text-xs text-gray-600">
                      <span>
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(
                          currentPage * itemsPerPage,
                          filteredBatches.length
                        )}{" "}
                        of {filteredBatches.length} transfer records
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={currentPage === 1}
                          onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                          }
                          className="px-3 py-1.5 border rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <span>
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          type="button"
                          disabled={currentPage === totalPages}
                          onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                          }
                          className="px-3 py-1.5 border rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferHistory;
