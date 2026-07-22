import React, { useEffect, useState, useMemo } from "react";
import {
  ArrowLeft,
  Search,
  Download,
  FileSpreadsheet,
  User,
  Calendar,
  Layers,
  Briefcase,
  Check,
  X,
} from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  fetchExcelData,
  clearExcelData,
} from "../../redux/slice/databaseManagement/getExcelDataSlice";
import {
  approveCandidate,
  resetAcceptState,
} from "../../redux/slice/databaseManagement/acceptCandidate";
import {
  rejectCandidate,
  resetRejectState,
} from "../../redux/slice/databaseManagement/rejectCandidate";

const ViewExcelData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  // Item passed via route state from AcceptReject.jsx
  const itemFromState = location.state?.item;

  // Redux states
  const { data: rawResponse, loading: apiLoading, error: apiError } = useSelector(
    (state) => state.excelData
  );
  const { success: approveSuccess, loading: approveLoading } = useSelector(
    (state) => state.acceptCandidate
  );
  const { success: rejectSuccess, loading: rejectLoading } = useSelector(
    (state) => state.rejectCandidate
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isApprovedLocal, setIsApprovedLocal] = useState(
    Boolean(itemFromState?.isApproved)
  );
  const [fileParsingLoading, setFileParsingLoading] = useState(false);
  const [fileParsingError, setFileParsingError] = useState(null);
  const [parsedFileRows, setParsedFileRows] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    if (id) {
      dispatch(fetchExcelData(id));
    }
    return () => {
      dispatch(clearExcelData());
    };
  }, [dispatch, id]);

  // Sync approved status on action success
  useEffect(() => {
    if (approveSuccess) {
      setIsApprovedLocal(true);
      dispatch(resetAcceptState());
    }
    if (rejectSuccess) {
      setIsApprovedLocal(false);
      dispatch(resetRejectState());
    }
  }, [approveSuccess, rejectSuccess, dispatch]);

  // Extract metadata safely combining itemFromState and rawResponse
  const responseData = rawResponse?.data || rawResponse || {};
  const databaseRecord =
    responseData?.candidateDatabase ||
    responseData?.database ||
    responseData?.record ||
    (responseData._id ? responseData : itemFromState || {});

  // Extract HR metadata
  const hrInfo = useMemo(() => {
    const rawHr =
      itemFromState?.HRName ||
      databaseRecord?.HRName ||
      databaseRecord?.hrName ||
      databaseRecord?.user?.name ||
      databaseRecord?.hr?.name ||
      "N/A";
    const hrName = rawHr === "N/A" ? "Admin" : rawHr;

    const category =
      itemFromState?.CategoryName ||
      itemFromState?.categoryName ||
      databaseRecord?.CategoryName ||
      databaseRecord?.categoryName ||
      (typeof databaseRecord?.category === "object"
        ? databaseRecord?.category?.name || databaseRecord?.category?.categoryName
        : databaseRecord?.category) ||
      "N/A";

    const subCategory =
      itemFromState?.SubcategoryName ||
      itemFromState?.subCategoryName ||
      databaseRecord?.SubcategoryName ||
      databaseRecord?.subCategoryName ||
      (typeof databaseRecord?.subCategory === "object"
        ? databaseRecord?.subCategory?.name || databaseRecord?.subCategory?.subCategoryName
        : databaseRecord?.subCategory) ||
      "N/A";

    const designation =
      itemFromState?.DesignationName ||
      itemFromState?.designationName ||
      databaseRecord?.DesignationName ||
      databaseRecord?.designationName ||
      (typeof databaseRecord?.designation === "object"
        ? databaseRecord?.designation?.name || databaseRecord?.designation?.designationName
        : databaseRecord?.designation) ||
      "N/A";

    const rawDate =
      itemFromState?.exceluploadedDate ||
      databaseRecord?.exceluploadedDate ||
      databaseRecord?.createdAt ||
      databaseRecord?.uploadDate;

    let uploadDate = "N/A";
    if (rawDate) {
      try {
        const d = new Date(rawDate);
        uploadDate = isNaN(d.getTime()) ? String(rawDate) : d.toLocaleDateString("en-GB");
      } catch {
        uploadDate = String(rawDate);
      }
    }

    const fileUrl =
      itemFromState?.File ||
      databaseRecord?.File ||
      databaseRecord?.fileUrl ||
      databaseRecord?.file ||
      null;

    const isApproved =
      isApprovedLocal ||
      Boolean(itemFromState?.isApproved) ||
      Boolean(databaseRecord?.isApproved);

    return {
      hrName,
      category,
      subCategory,
      designation,
      uploadDate,
      fileUrl,
      isApproved,
    };
  }, [itemFromState, databaseRecord, isApprovedLocal]);

  // Helper to extract candidate rows array dynamically from any response structure
  const apiExtractedRows = useMemo(() => {
    if (Array.isArray(responseData)) return responseData;
    if (Array.isArray(responseData.excelData)) return responseData.excelData;
    if (Array.isArray(responseData.data)) return responseData.data;
    if (Array.isArray(responseData.candidates)) return responseData.candidates;
    if (Array.isArray(responseData.excel_data)) return responseData.excel_data;
    if (Array.isArray(databaseRecord?.excelData)) return databaseRecord.excelData;
    if (Array.isArray(databaseRecord?.candidates)) return databaseRecord.candidates;

    // Deep search in top-level keys for any array of objects
    for (const key of Object.keys(responseData)) {
      if (Array.isArray(responseData[key]) && responseData[key].length > 0) {
        if (typeof responseData[key][0] === "object" && responseData[key][0] !== null) {
          return responseData[key];
        }
      }
    }
    return [];
  }, [responseData, databaseRecord]);

  // Fallback: If API doesn't return embedded JSON rows, fetch and parse the Excel file directly from fileUrl
  useEffect(() => {
    let isMounted = true;
    const fileUrl = hrInfo.fileUrl;

    if (apiExtractedRows.length === 0 && fileUrl && fileUrl.startsWith("http")) {
      setFileParsingLoading(true);
      setFileParsingError(null);

      axios
        .get(fileUrl, { responseType: "arraybuffer" })
        .then((response) => {
          if (!isMounted) return;
          const data = new Uint8Array(response.data);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          if (firstSheetName) {
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonRows = XLSX.utils.sheet_to_json(worksheet);
            setParsedFileRows(jsonRows);
          }
          setFileParsingLoading(false);
        })
        .catch((err) => {
          if (!isMounted) return;
          console.error("Failed to download and parse Excel file:", err);
          setFileParsingError("Could not download or parse the Excel sheet file.");
          setFileParsingLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [apiExtractedRows.length, hrInfo.fileUrl]);

  // Determine final rows to display
  const rawRows = useMemo(() => {
    return apiExtractedRows.length > 0 ? apiExtractedRows : parsedFileRows;
  }, [apiExtractedRows, parsedFileRows]);

  const loading = apiLoading || fileParsingLoading;
  const error = apiError || fileParsingError;

  // Extract ALL unique column keys across ALL row objects so all fields display
  const columns = useMemo(() => {
    if (!rawRows || rawRows.length === 0) return [];
    const keysSet = new Set();
    rawRows.forEach((row) => {
      if (typeof row === "object" && row !== null) {
        Object.keys(row).forEach((key) => {
          if (key !== "_id" && key !== "__v") {
            keysSet.add(key);
          }
        });
      }
    });
    return Array.from(keysSet);
  }, [rawRows]);

  // Filter rows based on search term
  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return rawRows;
    const term = searchTerm.toLowerCase();
    return rawRows.filter((row) =>
      Object.values(row).some((val) =>
        String(val ?? "")
          .toLowerCase()
          .includes(term)
      )
    );
  }, [rawRows, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage) || 1;
  const paginatedRows = useMemo(() => {
    return filteredRows.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredRows, currentPage]);

  const handleDownload = () => {
    if (hrInfo.fileUrl && hrInfo.fileUrl.startsWith("http")) {
      window.open(hrInfo.fileUrl, "_blank");
    } else {
      alert("Excel file link not available.");
    }
  };

  const handleApprove = () => {
    if (window.confirm("Are you sure you want to approve this candidate database?")) {
      dispatch(approveCandidate(id));
    }
  };

  const handleReject = () => {
    if (window.confirm("Are you sure you want to reject this candidate database?")) {
      dispatch(rejectCandidate(id));
    }
  };

  return (
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">
      <div className="w-full mx-auto space-y-6">
        {/* Header Bar */}
        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full border border-gray-300 hover:bg-purple-50 hover:border-purple-600 hover:text-purple-600 transition-colors cursor-pointer"
              title="Go Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FileSpreadsheet className="text-purple-600" size={26} />
                Excel Data Details
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Viewing candidate database uploaded in Excel format
              </p>
            </div>
          </div>

          {/* Action Buttons Header */}
          <div className="flex items-center gap-3">
            {/* Accept / Reject Status or Action Buttons */}
            {hrInfo.isApproved ? (
              <span className="text-green-600 font-semibold text-sm border border-purple-200 bg-purple-50 px-4 py-2 rounded-2xl tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                <Check size={18} /> Accepted Already
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => !approveLoading && handleApprove()}
                  disabled={approveLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                  title="Approve Database"
                >
                  <Check size={18} />
                  {approveLoading ? "Accepting..." : "Accept"}
                </button>
                <button
                  onClick={() => !rejectLoading && handleReject()}
                  disabled={rejectLoading}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                  title="Reject Database"
                >
                  <X size={18} />
                  {rejectLoading ? "Rejecting..." : "Reject"}
                </button>
              </div>
            )}

            {hrInfo.fileUrl && (
              <button
                onClick={handleDownload}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Download size={16} />
                Download Excel
              </button>
            )}
          </div>
        </div>

        {/* HR & Meta Summary Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 border-l-4 border-purple-600 items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <User size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-gray-400 font-medium block">
                HR Name
              </span>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {hrInfo.hrName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Layers size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-gray-400 font-medium block">
                Category
              </span>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {hrInfo.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Layers size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-gray-400 font-medium block">
                Subcategory
              </span>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {hrInfo.subCategory}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Briefcase size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-gray-400 font-medium block">
                Designation
              </span>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {hrInfo.designation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Calendar size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-gray-400 font-medium block">
                Upload Date
              </span>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {hrInfo.uploadDate}
              </p>
            </div>
          </div>

          {/* Accept / Reject Quick Buttons in Meta Card */}
          <div className="flex items-center justify-center sm:justify-start gap-3 pl-2 sm:border-l sm:border-gray-200">
            {hrInfo.isApproved ? (
              <span className="text-green-600 text-xs font-semibold border border-purple-200 bg-purple-50 px-3 py-1.5 rounded-full tracking-wider">
                Accepted
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className={`border-2 border-purple-200 rounded-full h-8 w-8 flex justify-center items-center ${
                    approveLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-green-50"
                  }`}
                  onClick={() => !approveLoading && handleApprove()}
                  title="Accept Database"
                >
                  <Check
                    size={18}
                    className="text-green-600 hover:scale-125 transition-transform"
                  />
                </span>

                <span
                  className={`border-2 border-purple-200 rounded-full h-8 w-8 flex justify-center items-center ${
                    rejectLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-red-50"
                  }`}
                  onClick={() => !rejectLoading && handleReject()}
                  title="Reject Database"
                >
                  <X
                    size={18}
                    className="text-red-600 hover:scale-125 transition-transform"
                  />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          {/* Top Controls: Search & Record Count */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-600"
              />
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Total Records:{" "}
              <span className="text-purple-600 font-bold text-sm">
                {filteredRows.length}
              </span>
            </div>
          </div>

          {/* Loading / Error / Table Content */}
          {loading ? (
            <div className="p-12 text-center flex flex-col justify-center items-center gap-3">
              <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-purple-600 font-medium text-sm">
                Parsing and loading Excel sheet data...
              </span>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-200">
              <p className="font-semibold text-base mb-1">
                Failed to load Excel data
              </p>
              <p className="text-xs text-red-400">{error}</p>
            </div>
          ) : rawRows.length === 0 ? (
            <div className="p-12 text-center text-gray-400 italic bg-gray-50 rounded-xl border border-gray-200">
              No candidates or Excel records found in this database upload.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-left border-collapse min-w-full">
                  <thead>
                    <tr className="bg-purple-50 text-purple-900 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider">
                      <th className="p-3 text-center w-16">Sr. No.</th>
                      {columns.map((colKey) => (
                        <th key={colKey} className="p-3 whitespace-nowrap">
                          {colKey}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                    {paginatedRows.length > 0 ? (
                      paginatedRows.map((row, idx) => (
                        <tr
                          key={row._id || idx}
                          className="hover:bg-purple-50/50 transition-colors"
                        >
                          <td className="p-3 text-center text-gray-500 font-medium">
                            {(currentPage - 1) * itemsPerPage + idx + 1}
                          </td>
                          {columns.map((colKey) => (
                            <td
                              key={colKey}
                              className="p-3 whitespace-nowrap max-w-xs truncate"
                              title={String(row[colKey] ?? "")}
                            >
                              {typeof row[colKey] === "object" &&
                              row[colKey] !== null
                                ? JSON.stringify(row[colKey])
                                : String(row[colKey] ?? "-")}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={columns.length + 1}
                          className="p-8 text-center text-gray-400 italic"
                        >
                          No matching candidate records found for "{searchTerm}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center pt-3 text-sm text-gray-600 gap-3">
                  <div>
                    Page{" "}
                    <span className="font-semibold text-purple-600">
                      {currentPage}
                    </span>{" "}
                    of <span className="font-semibold">{totalPages}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-200 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-50 hover:text-purple-600 transition-colors cursor-pointer"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center font-medium cursor-pointer ${
                          currentPage === i + 1
                            ? "bg-purple-600 text-white"
                            : "border border-gray-200 hover:bg-purple-50 hover:text-purple-600"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages)
                        )
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-200 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-50 hover:text-purple-600 transition-colors cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewExcelData;
