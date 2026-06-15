import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCandidates } from "../../redux/slice/databaseManagement/getAllCandidate";
import {
  fetchCategories,
  fetchDesignations,
  clearDesignations,
} from "../../redux/slice/databaseManagement/dropdownSlice";

const DatabaseCandidate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();cd 

  // Selectors
  const { candidates, total, totalPages, loading } = useSelector(
    (state) => state.allCandidate,
  );
  const { categories, designations } = useSelector((state) => state.dropdown);

  // Local States
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchCandidates({
        page: currentPage,
        limit: itemsPerPage,
        search,
        category: selectedCategory,
        designation: selectedDesignation,
        location: selectedLocation,
        experience: selectedExperience,
      }),
    );
  }, [
    dispatch,
    currentPage,
    search,
    selectedCategory,
    selectedDesignation,
    selectedLocation,
    selectedExperience,
  ]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedDesignation("");
    setCurrentPage(1);

    if (categoryId) {
      dispatch(fetchDesignations(categoryId));
    } else {
      dispatch(clearDesignations());
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedDesignation("");
    setSelectedLocation("");
    setSelectedExperience("");
    setCurrentPage(1);
    dispatch(clearDesignations());
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 ">
          <h2 className="text-2xl font-bold ">Database Candidate</h2>
          <hr className="border-gray-300 mt-3 mb-5" />

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
            <input
              type="text"
              placeholder="Search by name, email, etc."
              className="border border-gray-300 bg-gray-100 px-3 py-2 rounded w-full md:w-64 outline-none focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border border-gray-300 bg-white px-3 py-2 rounded outline-none cursor-pointer focus:ring-2 focus:ring-purple-200 w-1/2 md:w-48"
              >
                <option value="">Select category</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Designation Dropdown */}
              <select
                value={selectedDesignation}
                onChange={(e) => {
                  setSelectedDesignation(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 bg-white px-3 py-2 rounded outline-none cursor-pointer focus:ring-2 focus:ring-purple-200 w-1/2 md:w-48"
              >
                <option value="">Select Designation</option>
                {designations?.map((desig) => (
                  <option key={desig._id} value={desig._id}>
                    {desig.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 bg-white px-3 py-2 rounded outline-none cursor-pointer focus:ring-2 focus:ring-purple-200 w-1/2 md:w-48"
              >
                <option value="">Select Location</option>
                <option value="nagpur">Nagpur</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
              </select>

              <select
                value={selectedExperience}
                onChange={(e) => {
                  setSelectedExperience(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 bg-white px-3 py-2 rounded outline-none cursor-pointer focus:ring-2 focus:ring-purple-200 w-1/2 md:w-48"
              >
                <option value="">Select Experience</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>

              {(search || selectedCategory || selectedDesignation || selectedLocation || selectedExperience) && (
                <button
                  onClick={handleClearFilters}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded text-sm font-medium transition whitespace-nowrap"
                >
                  Clear Filters
                </button>
              )}
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
                      <div className="flex justify-center items-center">
                        <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  (candidates || []).map((item, index) => (
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
                          className="text-purple-600 cursor-pointer mx-auto hover:scale-110 transition-transform"
                          size={20}
                          onClick={() =>
                            navigate(
                              `/candidates/candidate-details/${item._id}`,
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))
                )}
                {!loading && (candidates || []).length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-5">
                      No Candidates Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer & Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-purple-600 text-sm font-medium">
              Showing {(candidates || []).length > 0 ? startIndex + 1 : 0} to{" "}
              {startIndex + (candidates || []).length} of {total || 0}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border rounded-full border-purple-300 text-purple-600 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>

              {[...Array(totalPages)].map((_, i) => {
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
