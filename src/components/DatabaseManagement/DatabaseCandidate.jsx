import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCandidates } from "../../redux/slice/databaseManagement/getAllCandidate";

const DatabaseCandidate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { candidates, total, totalPages, loading } = useSelector(
    (state) => state.allCandidate,
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(
      fetchCandidates({ page: currentPage, limit: itemsPerPage, search }),
    );
  }, [dispatch, currentPage, search]);

  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 ">
          {/* Header */}
          <h2 className="text-2xl font-bold ">Database Candidate</h2>
          <hr className="border-gray-300 mt-3 mb-5" />

          {/* Search */}
         <div className="flex justify-between items-center mb-4">
  {/* Left Side: Search Bar */}
  <input
    type="text"
    placeholder="Search..."
    className="border border-gray-300 bg-gray-100 px-3 py-2 rounded w-64 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setCurrentPage(1); // Reset to page 1 on search
    }}
  />

  {/* Right Side: Dropdowns Container */}
  <div className="flex gap-3">
    <select 
      name="category" 
      className="border border-gray-300 bg-white px-3 py-2 rounded outline-none cursor-pointer focus:ring-2 focus:ring-blue-400"
      // Add your value and onChange here as needed
    >
      <option value="">Select category</option>
      <option value="it">IT</option>
      <option value="hr">HR</option>
      <option value="sales">Sales</option>
    </select>

    <select 
      name="designation" 
      className="border border-gray-300 bg-white px-3 py-2 rounded outline-none cursor-pointer focus:ring-2 focus:ring-blue-400"
      // Add your value and onChange here as needed
    >
      <option value="">Select Designation</option>
      <option value="developer">Tele Caller Excutive</option>
      <option value="manager">Business Development</option>
      <option value="designer">Sales Telecaller</option>
    </select>
  </div>
</div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 text-sm">Sr.No</th>
                  <th className="p-3 text-sm">Name</th>
                  <th className="p-3 text-sm">Category</th>
                  <th className="p-3 text-sm">Designation</th>
                  <th className="p-3 text-sm">Phone</th>
                  <th className="p-3 text-sm">Email</th>
                  <th className="p-3 text-sm">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center p-5">
                      <div className="flex flex-col justify-center items-center gap-3">
                        <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  candidates.map((item, index) => (
                    <tr
                      key={item._id}
                      className="border-t border-gray-300 text-center text-sm"
                    >
                      <td className="p-3">{startIndex + index + 1}</td>
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.categoryName || "N/A"}</td>
                      <td className="p-3">{item.designationName || "N/A"}</td>
                      <td className="p-3">{item.phone}</td>
                      <td className="p-3">{item.email}</td>
                      <td className="text-center">
                        <Eye
                          className="text-purple-600 cursor-pointer mx-auto"
                          size={20}
                          onClick={() =>
                            navigate(`/candidates/candidate-details/${item._id}`)
                          }
                        />
                      </td>
                    </tr>
                  ))
                )}
                {!loading && candidates.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-5">
                      No Candidates Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            {/* Showing text */}
            <p className="text-purple-600 text-sm font-medium">
              Showing {candidates.length > 0 ? startIndex + 1 : 0} to{" "}
              {startIndex + candidates.length} of {total}
            </p>

            {/* Pagination */}
            <div className="flex items-center gap-2">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border rounded-full border-purple-300 text-purple-600 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Page Numbers (Limited view) */}
              {[...Array(totalPages)].map((_, i) => {
                // Logic to show only few page numbers if totalPages is huge
                if (
                  i + 1 === 1 ||
                  i + 1 === totalPages ||
                  (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        currentPage === i + 1
                          ? "bg-purple-600 text-white"
                          : "border border-purple-300 text-purple-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                }
                return null;
              })}

              {/* Next */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 border border-purple-300 text-purple-600 rounded-full disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseCandidate;
