import React, { useEffect } from "react";
import {
  Check,
  X,
  Download,
  ChevronLeftIcon,
  ChevronRightIcon,
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

const AcceptReject = () => {
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
  ); // Added

  useEffect(() => {
    dispatch(fetchAcceptRejectData(1));
  }, [dispatch]);

  // Success hone par list refresh karein (Approve & Reject dono ke liye)
  useEffect(() => {
    if (approveSuccess || rejectSuccess) {
      dispatch(fetchAcceptRejectData(pagination.current || 1));
      if (approveSuccess) dispatch(resetAcceptState());
      if (rejectSuccess) dispatch(resetRejectState());
    }
  }, [approveSuccess, rejectSuccess, dispatch, pagination.current]);

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
  }; // Added

  const handleDownload = (fileUrl) => {
    if (fileUrl && fileUrl.startsWith("http")) {
      window.open(fileUrl, "_blank");
    } else {
      alert("Invalid file link or file not available");
    }
  };

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 ">
          <h2 className="text-2xl font-bold text-gray-800">Accept / Reject</h2>
          <hr className="border-gray-300 mt-3 mb-5" />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 text-sm ">Sr.No.</th>
                  <th className="p-3 text-sm ">Hr Name</th>
                  <th className="p-3 text-sm ">Category</th>
                  <th className="p-3 text-sm ">Subcategory</th>
                  <th className="p-3 text-sm">Designation</th>
                  <th className="p-3 text-sm">Excel File</th>
                  <th className="p-3 text-sm ">Accept / Reject</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-10 text-center">
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
                      colSpan="6"
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
                        {item.HRName}
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
                      <td className="p-3">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleDownload(item.File)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
                          >
                            <Download size={18} />
                            <span className="text-xs">Download</span>
                          </button>
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="flex justify-center items-center gap-4">
                          {item.isApproved ? (
                            <span className="text-green-600 text-sm border border-purple-200 p-2 rounded-2xl tracking-wider">
                              Accepted Already
                            </span>
                          ) : (
                            <>
                              <span
                                className={`border-2 border-purple-200 rounded-full h-7 w-7 flex justify-center items-center ${
                                  approveLoading
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                                onClick={() =>
                                  !approveLoading && handleApprove(item._id)
                                }
                              >
                                <Check
                                  size={18}
                                  className="text-green-600 hover:scale-125 transition-transform"
                                  title="Accept"
                                />
                              </span>

                              <span
                                className={`border-2 border-purple-200 rounded-full h-7 w-7 flex justify-center items-center ${
                                  rejectLoading
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                                onClick={() =>
                                  !rejectLoading && handleReject(item._id)
                                }
                              >
                                <X
                                  size={18}
                                  className="text-red-600 hover:scale-125 transition-transform"
                                  title="Reject"
                                />
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-10 text-gray-400 italic text-center"
                    >
                      No records available for this page.
                    </td>
                  </tr>
                )}
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
    </div>
  );
};

export default AcceptReject;
