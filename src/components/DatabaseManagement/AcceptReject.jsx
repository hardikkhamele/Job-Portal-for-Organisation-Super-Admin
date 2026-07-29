// import React, { useEffect } from "react";
// import {
//   Check,
//   X,
//   Download,
//   ChevronLeftIcon,
//   ChevronRightIcon,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAcceptRejectData } from "../../redux/slice/databaseManagement/getAcceptRejectSlice";
// import {
//   approveCandidate,
//   resetAcceptState,
// } from "../../redux/slice/databaseManagement/acceptCandidate";
// import {
//   rejectCandidate,
//   resetRejectState,
// } from "../../redux/slice/databaseManagement/rejectCandidate";

// const AcceptReject = () => {
//   const dispatch = useDispatch();

//   // Selectors
//   const { list, loading, error, pagination } = useSelector(
//     (state) => state.acceptReject,
//   );
//   const { success: approveSuccess, loading: approveLoading } = useSelector(
//     (state) => state.acceptCandidate,
//   );
//   const { success: rejectSuccess, loading: rejectLoading } = useSelector(
//     (state) => state.rejectCandidate,
//   ); // Added

//   useEffect(() => {
//     dispatch(fetchAcceptRejectData(1));
//   }, [dispatch]);

//   // Success hone par list refresh karein (Approve & Reject dono ke liye)
//   useEffect(() => {
//     if (approveSuccess || rejectSuccess) {
//       dispatch(fetchAcceptRejectData(pagination.current || 1));
//       if (approveSuccess) dispatch(resetAcceptState());
//       if (rejectSuccess) dispatch(resetRejectState());
//     }
//   }, [approveSuccess, rejectSuccess, dispatch, pagination.current]);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.pages) {
//       dispatch(fetchAcceptRejectData(newPage));
//     }
//   };

//   const handleApprove = (id) => {
//     if (window.confirm("Are you sure you want to approve this candidate?")) {
//       dispatch(approveCandidate(id));
//     }
//   };

//   const handleReject = (id) => {
//     if (window.confirm("Are you sure you want to reject this candidate?")) {
//       dispatch(rejectCandidate(id));
//     }
//   }; // Added

//   const handleDownload = (fileUrl) => {
//     if (fileUrl && fileUrl.startsWith("http")) {
//       window.open(fileUrl, "_blank");
//     } else {
//       alert("Invalid file link or file not available");
//     }
//   };

//   return (
//     <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
//       <div className="w-full mx-auto">
//         <div className="bg-white rounded-xl shadow-sm p-6 ">
//           <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-800">Accept / Reject</h2>
//            <button
//             className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//           >
//             + Upload Database
//           </button>
//           </div>
//           <hr className="border-gray-300 mt-3 mb-5" />

//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-700">
//                   <th className="p-3 text-sm ">Sr.No.</th>
//                   <th className="p-3 text-sm ">Hr Name</th>
//                   <th className="p-3 text-sm ">Category</th>
//                   <th className="p-3 text-sm ">Subcategory</th>
//                   <th className="p-3 text-sm">Designation</th>
//                   <th className="p-3 text-sm">Upload Date</th>
//                   <th className="p-3 text-sm">Excel File</th>
//                   <th className="p-3 text-sm ">Accept / Reject</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan="6" className="p-10 text-center">
//                       <div className="flex flex-col justify-center items-center gap-3">
//                         <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
//                         <span className="text-purple-600 font-medium text-sm">
//                           Loading Data...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : error ? (
//                   <tr>
//                     <td
//                       colSpan="6"
//                       className="p-10 text-center text-red-500 font-medium"
//                     >
//                       {error}
//                     </td>
//                   </tr>
//                 ) : list && list.length > 0 ? (
//                   list.map((item, index) => (
//                     <tr
//                       key={item._id}
//                       className="border-t border-gray-200 text-center hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="p-3 text-sm text-gray-600">
//                         {(pagination.current - 1) * 10 + index + 1}
//                       </td>
//                        <td className="p-3 text-sm font-medium text-gray-800">
//                         {item.HRName}
//                       </td>
//                       <td className="p-3 text-sm font-medium text-gray-800">
//                         {item.CategoryName}
//                       </td>
//                       <td className="p-3 text-sm text-gray-600">
//                         {item.SubcategoryName}
//                       </td>
//                       <td className="p-3 text-sm text-gray-600">
//                         {item.DesignationName}
//                       </td>
//                       <td className="p-3 text-sm text-gray-600">
//                         {item.exceluploadedDate}
//                       </td>
//                       <td className="p-3">
//                         <div className="flex justify-center">
//                           <button
//                             onClick={() => handleDownload(item.File)}
//                             className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
//                           >
//                             <Download size={18} />
//                             <span className="text-xs">Download</span>
//                           </button>
//                         </div>
//                       </td>

//                       <td className="p-3">
//                         <div className="flex justify-center items-center gap-4">
//                           {item.isApproved ? (
//                             <span className="text-green-600 text-sm border border-purple-200 p-2 rounded-2xl tracking-wider">
//                               Accepted Already
//                             </span>
//                           ) : (
//                             <>
//                               <span
//                                 className={`border-2 border-purple-200 rounded-full h-7 w-7 flex justify-center items-center ${
//                                   approveLoading
//                                     ? "opacity-50 cursor-not-allowed"
//                                     : "cursor-pointer"
//                                 }`}
//                                 onClick={() =>
//                                   !approveLoading && handleApprove(item._id)
//                                 }
//                               >
//                                 <Check
//                                   size={18}
//                                   className="text-green-600 hover:scale-125 transition-transform"
//                                   title="Accept"
//                                 />
//                               </span>

//                               <span
//                                 className={`border-2 border-purple-200 rounded-full h-7 w-7 flex justify-center items-center ${
//                                   rejectLoading
//                                     ? "opacity-50 cursor-not-allowed"
//                                     : "cursor-pointer"
//                                 }`}
//                                 onClick={() =>
//                                   !rejectLoading && handleReject(item._id)
//                                 }
//                               >
//                                 <X
//                                   size={18}
//                                   className="text-red-600 hover:scale-125 transition-transform"
//                                   title="Reject"
//                                 />
//                               </span>
//                             </>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="6"
//                       className="p-10 text-gray-400 italic text-center"
//                     >
//                       No records available for this page.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls remain same */}
//           {!loading && !error && list.length > 0 && (
//             <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
//               <p className="text-sm text-gray-500">
//                 Showing Page{" "}
//                 <span className="font-semibold text-purple-600">
//                   {pagination.current}
//                 </span>{" "}
//                 of <span className="font-semibold">{pagination.pages}</span> (
//                 {pagination.total} total records)
//               </p>

//               <div className="flex items-center gap-2">
//                 <button
//                   className="text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-50 transition-colors"
//                   disabled={pagination.current === 1}
//                   onClick={() => handlePageChange(pagination.current - 1)}
//                 >
//                   <ChevronLeftIcon size={20} />
//                 </button>

//                 <div className="flex gap-1">
//                   {[...Array(pagination.pages)].map((_, i) => (
//                     <button
//                       key={i}
//                       className={`w-8 h-8 flex items-center justify-center border rounded-full text-sm transition-all ${
//                         pagination.current === i + 1
//                           ? "bg-purple-600 text-white border-purple-600 shadow-md"
//                           : "border-gray-200 text-gray-600 hover:border-purple-400 hover:text-purple-600"
//                       }`}
//                       onClick={() => handlePageChange(i + 1)}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   className="text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-50 transition-colors"
//                   disabled={pagination.current === pagination.pages}
//                   onClick={() => handlePageChange(pagination.current + 1)}
//                 >
//                   <ChevronRightIcon size={20} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AcceptReject;

import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import axios from "axios";
import {
  Check,
  X,
  Download,
  ChevronLeftIcon,
  ChevronRightIcon,
  Upload,
  Loader2,
  UploadCloud,
  UploadIcon,
  Eye,
  Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcceptRejectData } from "../../redux/slice/databaseManagement/getAcceptRejectSlice";
import {
  approveCandidate,
  resetAcceptState,
} from "../../redux/slice/databaseManagement/acceptCandidate";
import {
  rejectCandidate,
  resetRejectState,
} from "../../redux/slice/databaseManagement/rejectCandidate";
import {
  fetchAllCategories,
  fetchSubCategoriesByCategory,
  fetchDesignationsBySubCategory,
  uploadCandidateDatabase,
  resetUploadState,
} from "../../redux/slice/databaseManagement/acceptRejUploadDatabase/acceptRejectSlice";
import DeleteModal from "../common/DeleteModal";
import {
  deleteCandidateDatabase,
  resetDeleteState,
} from "../../redux/slice/databaseManagement/deleteCandidateDatabase";
const AcceptReject = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Delete modal state
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();

  // Selectors
  const { list, loading, error, pagination } = useSelector(
    (state) => state.acceptReject,
  );
  const { success: approveSuccess, loading: approveLoading } = useSelector(
    (state) => state.acceptCandidate,
  );
  const { success: rejectSuccess, loading: rejectLoading } = useSelector(
    (state) => state.rejectCandidate,
  );
  const { success: deleteSuccess, loading: deleteLoading } = useSelector(
    (state) => state.deleteCandidateDatabase,
  );

  // Dropdown Selectors
  const {
    categories,
    subCategories,
    designations,
    uploadLoading,
    uploadSuccess,
  } = useSelector((state) => state.allDropdown);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAcceptRejectData(1));
  }, [dispatch]);

  // Success hone par list refresh karein (Approve, Reject & Delete ke liye)
  useEffect(() => {
    if (approveSuccess || rejectSuccess || deleteSuccess) {
      dispatch(fetchAcceptRejectData(pagination.current || 1));
      if (approveSuccess) dispatch(resetAcceptState());
      if (rejectSuccess) dispatch(resetRejectState());
      if (deleteSuccess) {
        dispatch(resetDeleteState());
        setOpenDeleteModal(false);
        setSelectedRow(null);
      }
    }
  }, [approveSuccess, rejectSuccess, deleteSuccess, dispatch, pagination.current]);

  // Upload success handling
  useEffect(() => {
    if (uploadSuccess) {
      setIsModalOpen(false);
      dispatch(fetchAcceptRejectData(pagination.current || 1));
      dispatch(resetUploadState());
      // Reset form fields
      setSelectedCategory("");
      setSelectedSubCategory("");
      setSelectedDesignation("");
      setSelectedFile(null);
    }
  }, [uploadSuccess, dispatch, pagination.current]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      dispatch(fetchAcceptRejectData(newPage));
    }
  };

  const handleApprove = (id) => {
    if (window.confirm("Are you sure you want to approve this candidate?")) {
      dispatch(approveCandidate(id));
    }
  };

  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this candidate?")) {
      dispatch(rejectCandidate(id));
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedRow) {
      dispatch(deleteCandidateDatabase(selectedRow._id));
    }
  };
 
  const handleDownloadExcelFile = async (item) => {
    if (!item || !item._id) {
      alert("Invalid database record");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
      
      const response = await axios.get(
        `${BASE_URL}/api/admin/candidate-database/getexcelData/${item._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const responseData = response.data?.data || response.data || {};
      const databaseRecord =
        responseData?.candidateDatabase ||
        responseData?.database ||
        responseData?.record ||
        (responseData._id ? responseData : item);

      let rows = [];
      if (Array.isArray(responseData)) rows = responseData;
      else if (Array.isArray(responseData.excelData)) rows = responseData.excelData;
      else if (Array.isArray(responseData.data)) rows = responseData.data;
      else if (Array.isArray(responseData.candidates)) rows = responseData.candidates;
      else if (Array.isArray(responseData.excel_data)) rows = responseData.excel_data;
      else if (Array.isArray(databaseRecord?.excelData)) rows = databaseRecord.excelData;
      else if (Array.isArray(databaseRecord?.candidates)) rows = databaseRecord.candidates;
      
      if (rows.length === 0) {
        for (const key of Object.keys(responseData)) {
          if (Array.isArray(responseData[key]) && responseData[key].length > 0) {
            if (typeof responseData[key][0] === "object" && responseData[key][0] !== null) {
              rows = responseData[key];
              break;
            }
          }
        }
      }

      if (rows.length === 0 && databaseRecord) {
        for (const key of Object.keys(databaseRecord)) {
          if (Array.isArray(databaseRecord[key]) && databaseRecord[key].length > 0) {
            if (typeof databaseRecord[key][0] === "object" && databaseRecord[key][0] !== null) {
              rows = databaseRecord[key];
              break;
            }
          }
        }
      }

      if (rows && rows.length > 0) {
        const cleanedRows = rows.map(row => {
          const newRow = { ...row };
          delete newRow._id;
          delete newRow.__v;
          delete newRow.candidateDatabaseId;
          delete newRow.createdAt;
          delete newRow.updatedAt;
          return newRow;
        });

        const worksheet = XLSX.utils.json_to_sheet(cleanedRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
        
        const categoryName = item.CategoryName || "Database";
        const designationName = item.DesignationName || "Candidates";
        XLSX.writeFile(workbook, `${categoryName}_${designationName}_Database.xlsx`);
      } else {
        const fileUrl = databaseRecord?.File || databaseRecord?.fileUrl || databaseRecord?.file || item.File || item.fileUrl || item.file;
        if (fileUrl) {
          const resolvedUrl = fileUrl.startsWith("http")
            ? fileUrl
            : `${BASE_URL}${fileUrl.startsWith("/") ? "" : "/"}${fileUrl}`;
          window.open(resolvedUrl, "_blank");
        } else {
          alert("Excel file link or data not available.");
        }
      }
    } catch (error) {
      console.error("Failed to download excel database:", error);
      const fileUrl = item.File || item.fileUrl || item.file;
      if (fileUrl) {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
        const resolvedUrl = fileUrl.startsWith("http")
          ? fileUrl
          : `${BASE_URL}${fileUrl.startsWith("/") ? "" : "/"}${fileUrl}`;
        window.open(resolvedUrl, "_blank");
      } else {
        alert("Failed to download excel database.");
      }
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubCategory("");
    setSelectedDesignation("");
    if (categoryId) {
      dispatch(fetchSubCategoriesByCategory(categoryId));
    }
  };

  const handleSubCategoryChange = (e) => {
    const subCategoryId = e.target.value;
    setSelectedSubCategory(subCategoryId);
    setSelectedDesignation("");
    if (subCategoryId) {
      dispatch(fetchDesignationsBySubCategory(subCategoryId));
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadSubmit = () => {
    if (!selectedCategory) {
      alert("Please select category");
      return;
    }
    if (!selectedSubCategory) {
      alert("Please select sub category");
      return;
    }
    if (!selectedDesignation) {
      alert("Please select designation");
      return;
    }
    if (!selectedFile) {
      alert("Please select an Excel file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert sheet data to JSON array
        const jsonRows = XLSX.utils.sheet_to_json(worksheet);

        const payload = {
          category: selectedCategory,
          subCategory: selectedSubCategory,
          designation: selectedDesignation,
          excelData: jsonRows,
        };

        dispatch(uploadCandidateDatabase(payload));
      } catch (err) {
        alert("Failed to parse Excel file. Please check if the file format is valid.");
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 ">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Accept / Reject
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
            >
              Upload Database
              <UploadIcon size={14} />
            </button>
          </div>
          <hr className="border-gray-300 mt-3 mb-5" />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 text-sm text-center">Sr.No.</th>
                  <th className="p-3 text-sm text-center">Hr Name</th>
                  <th className="p-3 text-sm text-center">Category</th>
                  <th className="p-3 text-sm text-center">Subcategory</th>
                  <th className="p-3 text-sm text-center">Designation</th>
                  <th className="p-3 text-sm text-center">Upload Date</th>
                  <th className="p-3 text-sm text-center">Excel File</th>
                  <th className="p-3 text-sm text-center">Accept / Reject</th>
                  <th className="p-3 text-sm text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <Fragment>
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="p-10 text-center">
                        <div className="flex flex-col justify-center items-center gap-3">
                          <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-purple-600 font-medium text-sm">
                            Loading Data...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="p-10 text-center text-red-500 font-medium"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : list && list.length > 0 ? (
                    list.map((item, index) => (
                      <tr
                        key={item._id}
                        className="border-t border-gray-200 text-center hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-3 text-sm text-gray-600">
                          {(pagination.current - 1) * 10 + index + 1}
                        </td>
                        <td className="p-3 text-sm font-medium text-gray-800">
                          {/* {item.HRName} */}
                          {item.HRName === "N/A" ? "Admin" : item.HRName}
                        </td>
                        <td className="p-3 text-sm font-medium text-gray-800">
                          {item.CategoryName}
                        </td>
                        <td className="p-3 text-sm text-gray-600">
                          {item.SubcategoryName}
                        </td>
                        <td className="p-3 text-sm text-gray-600">
                          {item.DesignationName}
                        </td>
                        <td className="p-3 text-sm text-gray-600">
                          {item.exceluploadedDate}
                        </td>
                        <td className="p-3">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleDownloadExcelFile(item)}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
                            >
                              <Download size={18} />
                              <span className="text-xs">Download</span>
                            </button>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-center items-center font-medium text-xs">
                            {item.isApproved || item.status === "Approved" || item.status === "Accepted" ? (
                              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-300 shadow-sm">
                                Accepted
                              </span>
                            ) : item.isRejected || item.status === "Rejected" ? (
                              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-300 shadow-sm">
                                Rejected
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-300 shadow-sm">
                                Pending
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-center items-center gap-3">
                            <Eye
                              size={20}
                              className="text-purple-500 cursor-pointer hover:scale-110 transition-transform"
                              onClick={() => navigate(`/accept-reject/view/${item._id}`, { state: { item } })}
                              title="View Excel Database Details"
                            />
                            <Trash2
                              size={20}
                              className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                              onClick={() => {
                                setSelectedRow(item);
                                setOpenDeleteModal(true);
                              }}
                              title="Delete Database"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="p-10 text-gray-400 italic text-center"
                      >
                        No records available for this page.
                      </td>
                    </tr>
                  )}
                </Fragment>
              </tbody>
            </table>
          </div>

          {/* Pagination Controls remain same */}
          {!loading && !error && list.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <p className="text-sm text-gray-500">
                Showing Page{" "}
                <span className="font-semibold text-purple-600">
                  {pagination.current}
                </span>{" "}
                of <span className="font-semibold">{pagination.pages}</span> (
                {pagination.total} total records)
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-50 transition-colors"
                  disabled={pagination.current === 1}
                  onClick={() => handlePageChange(pagination.current - 1)}
                >
                  <ChevronLeftIcon size={20} />
                </button>
                <div className="flex gap-1">
                  {[...Array(pagination.pages)].map((_, i) => (
                    <button
                      key={i}
                      className={`w-8 h-8 flex items-center justify-center border rounded-full text-sm transition-all ${
                        pagination.current === i + 1
                          ? "bg-purple-600 text-white border-purple-600 shadow-md"
                          : "border-gray-200 text-gray-600 hover:border-purple-400 hover:text-purple-600"
                      }`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  className="text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-50 transition-colors"
                  disabled={pagination.current === pagination.pages}
                  onClick={() => handlePageChange(pagination.current + 1)}
                >
                  <ChevronRightIcon size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal - With API Integration */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Upload Candidate Database
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2.5 bg-gray-50 border cursor-pointer border-gray-300 rounded-md text-sm"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Category
                </label>
                <select
                  className="w-full p-2.5 bg-gray-50 border cursor-pointer border-gray-300 rounded-md text-sm"
                  value={selectedSubCategory}
                  onChange={handleSubCategoryChange}
                  disabled={!selectedCategory}
                >
                  <option value="">Select Sub Category</option>
                  {subCategories[selectedCategory]?.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.subCategoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation
                </label>
                <select
                  className="w-full p-2.5 bg-gray-50 border cursor-pointer border-gray-300 rounded-md text-sm"
                  value={selectedDesignation}
                  onChange={(e) => setSelectedDesignation(e.target.value)}
                  disabled={!selectedSubCategory}
                >
                  <option value="">Select Designation</option>
                  {designations[selectedSubCategory]?.map((des) => (
                    <option key={des.id} value={des.id}>
                      {des.designationName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload File (Excel)
                </label>
                <div className="flex flex-col gap-2">
                  <label className="bg-purple-700 hover:bg-purple-800 text-white w-max px-4 py-2 rounded-md cursor-pointer flex items-center gap-2 text-sm transition-colors">
                    <Upload size={16} />{" "}
                    {selectedFile ? selectedFile.name : "Choose File"}
                    <input
                      type="file"
                      className="hidden"
                      accept=".xlsx, .xls"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    * Note: The Excel sheet must contain a column named exactly <span className="font-bold text-purple-700">"Name"</span> (case-sensitive) with candidate names. Columns for <span className="font-bold">"Email"</span> and <span className="font-bold">"Phone"</span> are highly recommended.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border-2 border-purple-600 cursor-pointer text-purple-600 font-bold py-3 rounded-xl hover:bg-purple-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUploadSubmit}
                  disabled={uploadLoading}
                  className="bg-purple-700 cursor-pointer text-white font-bold py-3 rounded-xl hover:bg-purple-800 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Upload Database"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Modal */}
      <DeleteModal
        isOpen={openDeleteModal}
        onClose={() => {
          if (!deleteLoading) {
            setOpenDeleteModal(false);
            setSelectedRow(null);
          }
        }}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
};

export default AcceptReject;
