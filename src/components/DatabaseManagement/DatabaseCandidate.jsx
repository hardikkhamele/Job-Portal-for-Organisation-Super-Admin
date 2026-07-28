import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, ChevronLeft, ChevronRight, Send, X } from "lucide-react";
import { toast } from "react-toastify";
import { fetchCandidates } from "../../redux/slice/databaseManagement/getAllCandidate";
import {
  fetchCategories,
  fetchDesignations,
  clearDesignations,
} from "../../redux/slice/databaseManagement/dropdownSlice";

const DatabaseCandidate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();  

  // Selectors
  const { candidates, total, totalPages, loading, error } = useSelector(
    (state) => state.allCandidate,
  );
  const { categories, designations } = useSelector((state) => state.dropdown);

  // Local States
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [datePreset, setDatePreset] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferTarget, setTransferTarget] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
      if (location.state.designation) {
        dispatch(fetchDesignations(location.state.category));
        setSelectedDesignation(location.state.designation);
      }
    }
  }, [location.state, dispatch]);

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
        startDate,
        endDate,
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
    startDate,
    endDate,
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

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handlePresetChange = (preset) => {
    setDatePreset(preset);
    setCurrentPage(1);
    const today = new Date();

    if (preset === "today") {
      const todayStr = formatDateToYYYYMMDD(today);
      setStartDate(todayStr);
      setEndDate(todayStr);
    } else if (preset === "this_week") {
      const dayOfWeek = today.getDay();
      const distanceToMon = (dayOfWeek + 6) % 7;
      const monday = new Date(today);
      monday.setDate(today.getDate() - distanceToMon);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      setStartDate(formatDateToYYYYMMDD(monday));
      setEndDate(formatDateToYYYYMMDD(sunday));
    } else if (preset === "this_month") {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      setStartDate(formatDateToYYYYMMDD(firstDay));
      setEndDate(formatDateToYYYYMMDD(lastDay));
    } else if (preset === "") {
      setStartDate("");
      setEndDate("");
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedDesignation("");
    setSelectedLocation("");
    setSelectedExperience("");
    setDatePreset("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
    setSelectedCandidates([]);
    dispatch(clearDesignations());
  };

  const parseDateToMs = (dateInput, endOfDay = false) => {
    if (!dateInput) return null;
    if (typeof dateInput === "number") return dateInput;

    let str = String(dateInput).trim();

    // Handle YYYY-MM-DD or YYYY/MM/DD
    if (/^\d{4}[-/]\d{2}[-/]\d{2}/.test(str)) {
      const parts = str.substring(0, 10).split(/[-/]/).map(Number);
      const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
      if (endOfDay) {
        dateObj.setHours(23, 59, 59, 999);
      } else {
        dateObj.setHours(0, 0, 0, 0);
      }
      return dateObj.getTime();
    }

    // Handle DD-MM-YYYY or DD/MM/YYYY
    if (/^\d{2}[-/]\d{2}[-/]\d{4}/.test(str)) {
      const parts = str.substring(0, 10).split(/[-/]/).map(Number);
      const dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
      if (endOfDay) {
        dateObj.setHours(23, 59, 59, 999);
      } else {
        dateObj.setHours(0, 0, 0, 0);
      }
      return dateObj.getTime();
    }

    // Standard ISO string or generic date
    const dateObj = new Date(str);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.getTime();
    }

    return null;
  };

  const filteredCandidates = (candidates || []).filter((item) => {
    // 1. Search filter
    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      const name = (item.name || item.personalInfo?.name || "").toLowerCase();
      const email = (item.email || item.personalInfo?.email || "").toLowerCase();
      const phone = (item.phone || item.personalInfo?.phone || "").toLowerCase();
      const catName = (item.categoryName || item.category?.name || (typeof item.category === "string" ? item.category : "")).toLowerCase();
      const desigName = (item.designationName || item.designation?.name || (typeof item.designation === "string" ? item.designation : "")).toLowerCase();

      const matchesSearch =
        name.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        catName.includes(q) ||
        desigName.includes(q);

      if (!matchesSearch) return false;
    }

    // 2. Category filter
    if (selectedCategory) {
      const catObj = categories?.find(
        (c) => (c._id || c.id || c.name || c.categoryName) === selectedCategory
      );
      const catTargetName = (catObj?.name || catObj?.categoryName || selectedCategory).toLowerCase();

      const itemCatId = item.categoryId || item.category?._id || item.category?.id;
      const itemCatName = (item.categoryName || item.category?.name || (typeof item.category === "string" ? item.category : "")).toLowerCase();

      const matchesCat =
        (itemCatId && String(itemCatId) === String(selectedCategory)) ||
        (itemCatName && (itemCatName === catTargetName || itemCatName.includes(catTargetName) || catTargetName.includes(itemCatName)));

      if (!matchesCat) return false;
    }

    // 3. Designation filter
    if (selectedDesignation) {
      const desigObj = designations?.find(
        (d) => (d._id || d.id || d.name || d.designationName) === selectedDesignation
      );
      const desigTargetName = (desigObj?.name || desigObj?.designationName || selectedDesignation).toLowerCase();

      const itemDesigId = item.designationId || item.designation?._id || item.designation?.id;
      const itemDesigName = (item.designationName || item.designation?.name || (typeof item.designation === "string" ? item.designation : "")).toLowerCase();

      const matchesDesig =
        (itemDesigId && String(itemDesigId) === String(selectedDesignation)) ||
        (itemDesigName && (itemDesigName === desigTargetName || itemDesigName.includes(desigTargetName) || desigTargetName.includes(itemDesigName)));

      if (!matchesDesig) return false;
    }

    // 4. Location filter
    if (selectedLocation) {
      const targetLoc = selectedLocation.trim().toLowerCase();
      let itemLoc = "";
      if (typeof item.location === "string") {
        itemLoc = item.location.toLowerCase();
      } else if (item.location && typeof item.location === "object") {
        itemLoc = `${item.location.city || ""} ${item.location.state || ""}`.toLowerCase();
      } else if (item.city) {
        itemLoc = String(item.city).toLowerCase();
      } else if (item.personalInfo?.location) {
        itemLoc = typeof item.personalInfo.location === "string"
          ? item.personalInfo.location.toLowerCase()
          : `${item.personalInfo.location.city || ""} ${item.personalInfo.location.state || ""}`.toLowerCase();
      }

      if (!itemLoc || !itemLoc.includes(targetLoc)) return false;
    }

    // 5. Experience filter
    if (selectedExperience) {
      const targetExp = parseInt(selectedExperience, 10);
      const itemExpVal = item.experience ?? item.totalExperience ?? item.exp ?? item.professionalInfo?.totalExperience;
      if (itemExpVal !== undefined && itemExpVal !== null && itemExpVal !== "") {
        const parsedExp = parseInt(itemExpVal, 10);
        if (!isNaN(parsedExp) && parsedExp < targetExp) return false;
      }
    }

    // 6. Date Range filter
    if (startDate || endDate) {
      const candidateDateVal =
        item.createdAt ||
        item.created_at ||
        item.createdDate ||
        item.exceluploadedDate ||
        item.uploadedDate ||
        item.date ||
        item.registrationDate ||
        item.updatedAt;

      let itemMs = candidateDateVal ? parseDateToMs(candidateDateVal) : null;

      // Fallback: Extract creation timestamp from 24-character hex MongoDB _id if date is missing
      if (itemMs === null && item._id && typeof item._id === "string" && item._id.length === 24) {
        const timestamp = parseInt(item._id.substring(0, 8), 16) * 1000;
        if (!isNaN(timestamp)) {
          itemMs = timestamp;
        }
      }

      if (itemMs === null) {
        return false;
      }

      if (startDate) {
        const startMs = parseDateToMs(startDate, false);
        if (startMs !== null && itemMs < startMs) return false;
      }
      if (endDate) {
        const endMs = parseDateToMs(endDate, true);
        if (endMs !== null && itemMs > endMs) return false;
      }
    }

    return true;
  });

  const isAllSelected =
    filteredCandidates &&
    filteredCandidates.length > 0 &&
    filteredCandidates.every((item) => selectedCandidates.includes(item._id));

  const handleSelectAll = () => {
    if (!filteredCandidates || filteredCandidates.length === 0) return;
    const pageIds = filteredCandidates.map((item) => item._id);

    if (isAllSelected) {
      setSelectedCandidates((prev) =>
        prev.filter((id) => !pageIds.includes(id))
      );
    } else {
      setSelectedCandidates((prev) =>
        Array.from(new Set([...prev, ...pageIds]))
      );
    }
  };

  const handleSelectCandidate = (id) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirmTransfer = () => {
    if (!transferTarget) {
      toast.error("Please select a destination module");
      return;
    }
    toast.success(
      `${selectedCandidates.length} candidate(s) transferred successfully!`
    );
    setSelectedCandidates([]);
    setTransferTarget("");
    setIsTransferModalOpen(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 ">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold ">Database Candidate</h2>
              {selectedCandidates.length > 0 && (
                <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-3 py-1 rounded-full border border-purple-200">
                  {selectedCandidates.length} Selected
                </span>
              )}
            </div>

            {selectedCandidates.length > 0 && (
              <button
                onClick={() => setIsTransferModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold px-5 py-2 rounded-lg shadow-sm transition text-sm cursor-pointer whitespace-nowrap"
              >
                <Send size={16} />
                <span>Transfer</span>
              </button>
            )}
          </div>
          <hr className="border-gray-300 mt-3 mb-5" />

          {/* Search & Filters */}
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
              <input
                type="text"
                placeholder="Search by name, email, etc."
                className="border border-gray-300 bg-gray-100 px-3 py-2 rounded w-full lg:w-64 outline-none focus:ring-2 focus:ring-blue-400"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                {/* Category Dropdown */}
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="border border-gray-300 bg-white px-3 py-2 rounded outline-none cursor-pointer focus:ring-2 focus:ring-purple-200 w-full sm:w-auto min-w-[160px]"
                >
                  <option value="">Select category</option>
                  {categories?.map((cat, idx) => {
                    const catVal = cat._id || cat.id || cat.name || cat.categoryName;
                    const catLabel = cat.name || cat.categoryName || cat;
                    return (
                      <option key={catVal || idx} value={catVal}>
                        {catLabel}
                      </option>
                    );
                  })}
                </select>

                {/* Designation Dropdown */}
                <select
                  value={selectedDesignation}
                  onChange={(e) => {
                    setSelectedDesignation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 bg-white px-3 py-2 rounded outline-none cursor-pointer focus:ring-2 focus:ring-purple-200 w-full sm:w-auto min-w-[160px]"
                >
                  <option value="">Select Designation</option>
                  {designations?.map((desig, idx) => {
                    const desigVal = desig._id || desig.id || desig.name || desig.designationName;
                    const desigLabel = desig.name || desig.designationName || desig;
                    return (
                      <option key={desigVal || idx} value={desigVal}>
                        {desigLabel}
                      </option>
                    );
                  })}
                </select>

                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 bg-white px-3 py-2 rounded outline-none cursor-pointer focus:ring-2 focus:ring-purple-200 w-full sm:w-auto min-w-[150px]"
                >
                  <option value="">Select Location</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Nagpur">Nagpur</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Pune">Pune</option>
                  <option value="Bangalore">Bangalore</option>
                </select>

                <select
                  value={selectedExperience}
                  onChange={(e) => {
                    setSelectedExperience(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 bg-white px-3 py-2 rounded outline-none cursor-pointer focus:ring-2 focus:ring-purple-200 w-full sm:w-auto min-w-[150px]"
                >
                  <option value="">Select Experience</option>
                  <option value="0">0 Years</option>
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="4">4+ Years</option>
                </select>
              </div>
            </div>

            {/* Date Range & Quick Preset Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Filter:</span>
                
                {/* Date Preset Dropdown */}
                <select
                  value={datePreset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="border border-gray-300 bg-white px-3 py-1.5 rounded outline-none cursor-pointer focus:ring-2 focus:ring-purple-200 text-sm font-medium text-purple-700 bg-purple-50/50"
                >
                  <option value="">Select Date Range</option>
                  <option value="today">Today</option>
                  <option value="this_week">This Week</option>
                  <option value="this_month">This Month</option>
                  <option value="custom">Custom Range</option>
                </select>

                {/* From Date Input */}
                <div className="flex items-center gap-1.5 border border-gray-300 bg-white px-2.5 py-1.5 rounded focus-within:ring-2 focus-within:ring-purple-200">
                  <span className="text-xs font-medium text-gray-500">From:</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setDatePreset("custom");
                      setCurrentPage(1);
                    }}
                    className="outline-none text-sm text-gray-700 bg-transparent cursor-pointer"
                  />
                </div>

                {/* To Date Input */}
                <div className="flex items-center gap-1.5 border border-gray-300 bg-white px-2.5 py-1.5 rounded focus-within:ring-2 focus-within:ring-purple-200">
                  <span className="text-xs font-medium text-gray-500">To:</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setDatePreset("custom");
                      setCurrentPage(1);
                    }}
                    className="outline-none text-sm text-gray-700 bg-transparent cursor-pointer"
                  />
                </div>
              </div>

              {(search ||
                selectedCategory ||
                selectedDesignation ||
                selectedLocation ||
                selectedExperience ||
                startDate ||
                endDate ||
                datePreset ||
                selectedCandidates.length > 0) && (
                <button
                  onClick={handleClearFilters}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-1.5 rounded text-sm font-medium transition whitespace-nowrap"
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
                  <th className="p-3 text-sm text-center w-12">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      title="Select All"
                      className="w-4 h-4 text-purple-600 accent-purple-600 rounded cursor-pointer align-middle"
                    />
                  </th>
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
                    <td colSpan="8" className="text-center p-5">
                      <div className="flex justify-center items-center">
                        <div className="w-10 h-10 border-b border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" className="text-center p-5 text-red-500 font-medium">
                      {error}
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((item, index) => (
                    <tr
                      key={item._id}
                      className="border-t border-gray-300 text-center text-sm"
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedCandidates.includes(item._id)}
                          onChange={() => handleSelectCandidate(item._id)}
                          className="w-4 h-4 text-purple-600 accent-purple-600 rounded cursor-pointer align-middle"
                        />
                      </td>
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
                {!loading && filteredCandidates.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center p-5">
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
              Showing {filteredCandidates.length > 0 ? startIndex + 1 : 0} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredCandidates.length)} of {filteredCandidates.length}
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

      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Send size={18} className="text-purple-600" />
                Transfer Candidates
              </h3>
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-full p-1 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <p className="text-sm text-gray-600">
                You are transferring{" "}
                <strong className="text-purple-700 font-bold">
                  {selectedCandidates.length}
                </strong>{" "}
                selected candidate(s).
              </p>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Select Destination Module / Department
                </label>
                <select
                  value={transferTarget}
                  onChange={(e) => setTransferTarget(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                >
                  <option value="">Select Destination</option>
                  <option value="hr_pool">HR Pool</option>
                  <option value="accept_reject">Accept / Reject Pool</option>
                  <option value="it_category">IT Candidates Pool</option>
                  <option value="non_it_category">Non-IT Candidates Pool</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmTransfer}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold shadow-sm transition"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseCandidate;
