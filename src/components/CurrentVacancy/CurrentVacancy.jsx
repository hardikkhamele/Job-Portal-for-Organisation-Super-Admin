import React, { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ClipboardList,
  Search,
  Plus,
  Eye,
  Trash2,
  X,
  Users,
  TrendingUp,
  CheckCircle2,
  XCircle,
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Send,
  Filter,
  Building2
} from "lucide-react";
import Footer from "../Footer";
import Breadcrumb from "../common/Breadcrumb";
import { getVacancies, saveVacancies, addVacancy } from "./vacancyStore";

const stateOptions = [
  "Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Maharashtra",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];
const cityOptions = [
  "Ahmedabad", "Bengaluru", "Chennai", "Delhi", "Hyderabad",
  "Kolkata", "Mumbai", "New Delhi", "Noida", "Pune"
];
const workModeOptions = ["Remote", "Onsite", "Hybrid"];

const workModeBadge = {
  Remote: "bg-green-100 text-green-700 border border-green-300",
  Hybrid: "bg-orange-100 text-orange-700 border border-orange-300",
  Onsite: "bg-blue-100 text-blue-700 border border-blue-300"
};

function CurrentVacancy() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [vacancies, setVacancies] = useState(() => getVacancies());
  const itemsPerPage = 5;

  // Read URL search params in lowercase
  const statusFilter = (searchParams.get("status") || "all").toLowerCase();
  const categoryFilter = (searchParams.get("category") || "all").toLowerCase();
  const workModeFilter = (searchParams.get("workmode") || "all").toLowerCase();
  const searchQuery = searchParams.get("search") || "";
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  // Helper to update URL params in lowercase
  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);

    const merged = {
      status: statusFilter,
      category: categoryFilter,
      workmode: workModeFilter,
      search: searchQuery,
      page: currentPage,
      ...updates
    };

    Object.entries(merged).forEach(([key, val]) => {
      const strVal = String(val).trim().toLowerCase();
      if (!strVal || strVal === "all" || (key === "page" && Number(val) === 1)) {
        params.delete(key);
      } else {
        params.set(key, strVal);
      }
    });

    setSearchParams(params, { replace: true });
  };

  // Stats Counts
  const openCount = useMemo(() => vacancies.filter((v) => v.status === "Open").length, [vacancies]);
  const closedCount = useMemo(() => vacancies.filter((v) => v.status === "Closed").length, [vacancies]);
  const totalCount = vacancies.length;

  // Filtered Vacancies based on URL params
  const filteredVacancies = useMemo(() => {
    let list = vacancies;

    // Filter by Status (from Stat cards or URL status param)
    if (statusFilter === "open") {
      list = list.filter((v) => v.status === "Open");
    } else if (statusFilter === "closed") {
      list = list.filter((v) => v.status === "Closed");
    }

    // Filter by Category
    if (categoryFilter !== "all") {
      if (categoryFilter === "it") {
        list = list.filter((v) => v.category.toLowerCase() === "it");
      } else if (categoryFilter === "non-it" || categoryFilter === "non it") {
        list = list.filter((v) => v.category.toLowerCase().includes("non"));
      } else {
        list = list.filter((v) => v.category.toLowerCase() === categoryFilter);
      }
    }

    // Filter by Work Mode
    if (workModeFilter !== "all") {
      list = list.filter((v) => v.workMode.toLowerCase() === workModeFilter);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (v) =>
          v.companyName.toLowerCase().includes(q) ||
          v.profile.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          v.state.toLowerCase().includes(q) ||
          v.addedBy.toLowerCase().includes(q) ||
          v.technology.toLowerCase().includes(q)
      );
    }

    return list;
  }, [vacancies, statusFilter, categoryFilter, workModeFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredVacancies.length / itemsPerPage));
  const paginatedVacancies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVacancies.slice(start, start + itemsPerPage);
  }, [filteredVacancies, currentPage]);

  // Check if any filter is active
  const hasActiveFilters =
    statusFilter !== "all" ||
    categoryFilter !== "all" ||
    workModeFilter !== "all" ||
    searchQuery.trim() !== "";

  const [isAddVacancyModalOpen, setIsAddVacancyModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    contactNumber: "",
    state: "",
    city: "",
    category: "IT",
    subCategory: "",
    profile: "",
    technology: "",
    requirements: "",
    noOfVacancy: "",
    workMode: "Onsite",
    experience: "",
    budget: "",
    noticePeriod: "",
    deadline: "",
    addedBy: ""
  });

  // Extract unique existing company names for selection dropdown
  const existingCompanyNames = useMemo(() => {
    const names = vacancies.map((v) => v.companyName).filter(Boolean);
    return Array.from(new Set(names));
  }, [vacancies]);

  // Add Vacancy Modal Submit Handler
  const handleAddVacancySubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.profile.trim()) {
      alert("Please enter Company Name and Profile / Designation.");
      return;
    }
    const { allVacancies } = addVacancy(formData);
    setVacancies(allVacancies);
    setIsAddVacancyModalOpen(false);
    setFormData({
      companyName: "",
      email: "",
      contactNumber: "",
      state: "",
      city: "",
      category: "IT",
      subCategory: "",
      profile: "",
      technology: "",
      requirements: "",
      noOfVacancy: "",
      workMode: "Onsite",
      experience: "",
      budget: "",
      noticePeriod: "",
      deadline: "",
      addedBy: ""
    });
    updateParams({ page: 1 });
  };

  // Toggle Status Handler
  const handleToggleStatus = (id) => {
    const updated = vacancies.map((v) =>
      v.id === id ? { ...v, status: v.status === "Open" ? "Closed" : "Open" } : v
    );
    setVacancies(updated);
    saveVacancies(updated);
  };

  // Delete Vacancy Handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vacancy?")) {
      const updated = vacancies.filter((v) => v.id !== id);
      setVacancies(updated);
      saveVacancies(updated);
    }
  };

  // View Details Handler
  const handleView = (vacancy) => {
    navigate(`/current-vacancy/view/${vacancy.id}`, { state: { vacancy } });
  };

  return (
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-4">

        {/* --- BREADCRUMB (Below Top Navbar with Left Circular Back Icon) --- */}
        <Breadcrumb
          items={[
            { label: "Staffing Management", link: "/staffing-management" },
            { label: "Current Vacancy" }
          ]}
        />

        {/* --- HEADER WITH TWO BUTTONS --- */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-2xl font-bold text-black flex items-center gap-2">
                <ClipboardList className="text-purple-600" size={26} />
                Current Vacancy
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Browse current open positions and manage vacancy listings added by Sales Executives.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              {/* Button 1: Add Vacancy (Modal for existing company) */}
              <button
                type="button"
                onClick={() => setIsAddVacancyModalOpen(true)}
                className="bg-white border border-purple-600 text-purple-700 hover:bg-purple-50 font-bold px-4 py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer h-11 shadow-sm"
              >
                <Plus size={18} />
                <span>Add Vacancy</span>
              </button>

              {/* Button 2: Add Company (Full Page onboard company + requirements) */}
              <button
                type="button"
                onClick={() => navigate("/current-vacancy/add")}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer h-11 shadow-sm"
              >
                <Building2 size={18} />
                <span>Add Company</span>
              </button>
            </div>
          </div>
          <hr className="border-gray-200 mt-4" />
        </div>

        {/* --- 3 INTERACTIVE STAT CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Open Vacancy Card */}
          <div
            onClick={() => updateParams({ status: statusFilter === "open" ? "all" : "open", page: 1 })}
            className={`bg-white rounded-xl p-5 shadow-sm border transition cursor-pointer flex items-center justify-between hover:shadow-md ${
              statusFilter === "open"
                ? "ring-2 ring-green-500 bg-green-50/40 border-green-300 shadow-md"
                : "border-gray-100 hover:border-green-200"
            }`}
            title="Click to view only Open Vacancies"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Open Vacancy</span>
              <span className="text-2xl font-bold text-green-700 mt-2">{openCount}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600 font-medium">
                <TrendingUp size={14} />
                <span>{statusFilter === "open" ? "Showing Open Only" : "Not Filled Yet"}</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${statusFilter === "open" ? "bg-green-600 text-white" : "bg-green-50 text-green-600"}`}>
              <Briefcase size={24} />
            </div>
          </div>

          {/* Closed Vacancy Card */}
          <div
            onClick={() => updateParams({ status: statusFilter === "closed" ? "all" : "closed", page: 1 })}
            className={`bg-white rounded-xl p-5 shadow-sm border transition cursor-pointer flex items-center justify-between hover:shadow-md ${
              statusFilter === "closed"
                ? "ring-2 ring-red-500 bg-red-50/40 border-red-300 shadow-md"
                : "border-gray-100 hover:border-red-200"
            }`}
            title="Click to view only Closed Vacancies"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Closed Vacancy</span>
              <span className="text-2xl font-bold text-red-700 mt-2">{closedCount}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-red-500 font-medium">
                <CheckCircle2 size={14} />
                <span>{statusFilter === "closed" ? "Showing Closed Only" : "Position Filled"}</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${statusFilter === "closed" ? "bg-red-600 text-white" : "bg-red-50 text-red-50"}`}>
              <XCircle size={24} />
            </div>
          </div>

          {/* Total Vacancy Card */}
          <div
            onClick={() => updateParams({ status: "all", page: 1 })}
            className={`bg-white rounded-xl p-5 shadow-sm border transition cursor-pointer flex items-center justify-between hover:shadow-md ${
              statusFilter === "all"
                ? "ring-2 ring-purple-500 bg-purple-50/40 border-purple-300 shadow-md"
                : "border-gray-100 hover:border-purple-200"
            }`}
            title="Click to view All Vacancies"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Total Vacancy</span>
              <span className="text-2xl font-bold text-purple-700 mt-2">{totalCount}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-purple-600 font-medium">
                <BarChart3 size={14} />
                <span>{statusFilter === "all" ? "Showing All Positions" : "View All"}</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${statusFilter === "all" ? "bg-purple-600 text-white" : "bg-purple-50 text-purple-600"}`}>
              <ClipboardList size={24} />
            </div>
          </div>

        </div>

        {/* --- TABLE SECTION --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">

          {/* Title + Filters + Search */}
          <div className="p-6 pb-4">
            <h5 className="text-xl font-bold text-black mb-1">Job Vacancies</h5>
            <p className="text-xs text-gray-500 mb-4">Browse current open positions and submit candidate details with CV links.</p>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search input with URL sync */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search by profile, category, location..."
                  value={searchQuery}
                  onChange={(e) => updateParams({ search: e.target.value, page: 1 })}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium whitespace-nowrap flex items-center gap-1">
                    <Filter size={14} />
                    Category:
                  </span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => updateParams({ category: e.target.value, page: 1 })}
                    className="border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer text-xs font-semibold"
                  >
                    <option value="all">All Categories</option>
                    <option value="it">IT</option>
                    <option value="non-it">Non IT</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium whitespace-nowrap">Work Mode:</span>
                  <select
                    value={workModeFilter}
                    onChange={(e) => updateParams({ workmode: e.target.value, page: 1 })}
                    className="border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer text-xs font-semibold"
                  >
                    <option value="all">All Work Modes</option>
                    {workModeOptions.map((wm) => (
                      <option key={wm} value={wm.toLowerCase()}>{wm}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* --- ACTIVE FILTER CHIPS --- */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-500 mr-1 flex items-center gap-1">
                  <Filter size={13} className="text-purple-600" /> Active Filters:
                </span>

                {statusFilter !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                    Status: {statusFilter === "open" ? "Open" : "Closed"}
                    <button
                      onClick={() => updateParams({ status: "all", page: 1 })}
                      className="hover:text-purple-900 cursor-pointer ml-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {categoryFilter !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                    Category: {categoryFilter === "it" ? "IT" : "Non IT"}
                    <button
                      onClick={() => updateParams({ category: "all", page: 1 })}
                      className="hover:text-purple-900 cursor-pointer ml-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {workModeFilter !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200 capitalize">
                    Work Mode: {workModeFilter}
                    <button
                      onClick={() => updateParams({ workmode: "all", page: 1 })}
                      className="hover:text-purple-900 cursor-pointer ml-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {searchQuery !== "" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => updateParams({ search: "", page: 1 })}
                      className="hover:text-purple-900 cursor-pointer ml-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                <button
                  onClick={() => updateParams({ status: "all", category: "all", workmode: "all", search: "", page: 1 })}
                  className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer underline ml-2"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto px-6 pb-0">
            <table className="w-full text-sm border-collapse rounded-t-xl overflow-hidden">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="py-3.5 px-3 font-bold text-left text-xs uppercase tracking-wider rounded-tl-xl">Sr.</th>
                  <th className="py-3.5 px-3 font-bold text-left text-xs uppercase tracking-wider">Category</th>
                  <th className="py-3.5 px-3 font-bold text-left text-xs uppercase tracking-wider">Profile / Designation</th>
                  <th className="py-3.5 px-3 font-bold text-left text-xs uppercase tracking-wider">State</th>
                  <th className="py-3.5 px-3 font-bold text-left text-xs uppercase tracking-wider">Location / City</th>
                  <th className="py-3.5 px-3 font-bold text-center text-xs uppercase tracking-wider">No. of Vacancy</th>
                  <th className="py-3.5 px-3 font-bold text-center text-xs uppercase tracking-wider">Application Submitted</th>
                  <th className="py-3.5 px-3 font-bold text-center text-xs uppercase tracking-wider">Work Mode</th>
                  <th className="py-3.5 px-3 font-bold text-center text-xs uppercase tracking-wider">Deadline</th>
                  <th className="py-3.5 px-3 font-bold text-center text-xs uppercase tracking-wider rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedVacancies.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-12 text-center text-gray-400 text-sm">
                      No vacancies found matching your active filters.
                    </td>
                  </tr>
                ) : (
                  paginatedVacancies.map((v, idx) => (
                    <tr
                      key={v.id}
                      className="border-b border-gray-100 hover:bg-purple-50/30 transition-colors duration-150"
                    >
                      {/* Sr */}
                      <td className="py-4 px-3 text-gray-600 font-semibold">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-3">
                        <div className="flex flex-col">
                          <span className={`font-bold text-sm ${v.category === "IT" ? "text-purple-700" : "text-orange-700"}`}>
                            {v.category}
                          </span>
                          <span className="text-[11px] text-gray-400 mt-0.5">{v.subCategory}</span>
                        </div>
                      </td>

                      {/* Profile / Designation */}
                      <td className="py-4 px-3">
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-purple-700">{v.profile}</span>
                          <span className="text-[11px] text-gray-400 mt-0.5">ID: {v.vacancyId}</span>
                        </div>
                      </td>

                      {/* State */}
                      <td className="py-4 px-3 font-medium text-gray-800">{v.state}</td>

                      {/* City */}
                      <td className="py-4 px-3 font-medium text-gray-800">{v.city}</td>

                      {/* No. of Vacancy */}
                      <td className="py-4 px-3 text-center">
                        <span className="inline-flex items-center gap-1.5 text-purple-700 font-bold">
                          <Users size={14} className="text-purple-500" />
                          {v.noOfVacancy}
                        </span>
                      </td>

                      {/* Application Submitted */}
                      <td className="py-4 px-3 text-center">
                        <span className="inline-flex items-center gap-1.5 font-bold text-gray-700">
                          <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-black border border-green-300">
                            ✓
                          </span>
                          {v.applicationSubmitted}
                        </span>
                      </td>

                      {/* Work Mode */}
                      <td className="py-4 px-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${workModeBadge[v.workMode] || "bg-gray-100 text-gray-600"}`}>
                          {v.workMode}
                        </span>
                      </td>

                      {/* Deadline */}
                      <td className="py-4 px-3 text-center">
                        <span className="inline-flex items-center gap-1.5 text-gray-700 font-medium text-xs">
                          <Calendar size={13} className="text-purple-400" />
                          {v.deadline}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleView(v)}
                            className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 transition text-xs font-semibold cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={15} />
                            View
                          </button>
                          <button
                            onClick={() => handleToggleStatus(v.id)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shadow-sm ${
                              v.status === "Open"
                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                            title={v.status === "Open" ? "Mark as Closed" : "Re-open Vacancy"}
                          >
                            {v.status === "Open" ? (
                              <>
                                <Send size={12} />
                                Submit Details
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={12} />
                                Re-open
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              Showing {filteredVacancies.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(filteredVacancies.length, currentPage * itemsPerPage)} of {filteredVacancies.length} vacancies
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateParams({ page: Math.max(currentPage - 1, 1) })}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition cursor-pointer ${
                  currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-purple-50"
                }`}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => updateParams({ page })}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition cursor-pointer ${
                    page === currentPage
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-purple-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => updateParams({ page: Math.min(currentPage + 1, totalPages) })}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition cursor-pointer ${
                  currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-purple-50"
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- ADD VACANCY MODAL (FOR EXISTING / QUICK COMPANY VACANCY) --- */}
      {isAddVacancyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-purple-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus size={20} />
                <h3 className="font-bold text-lg">Add New Vacancy</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddVacancyModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleAddVacancySubmit} className="p-6 overflow-y-auto space-y-4">

              {/* Company Selection / Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-gray-700 block">Company Name *</label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    list="company-options"
                    placeholder="Select or enter company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                  />
                  <datalist id="company-options">
                    {existingCompanyNames.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Profile & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-gray-700 block">Profile / Designation *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.profile}
                    onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-gray-700 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 cursor-pointer font-medium"
                  >
                    <option value="IT">IT</option>
                    <option value="Non IT">Non IT</option>
                  </select>
                </div>
              </div>

              {/* Technology & Required Candidates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-gray-700 block">Technology / Sub Category</label>
                  <input
                    type="text"
                    placeholder="e.g. React, Node.js"
                    value={formData.technology}
                    onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-gray-700 block">No. of Vacancies *</label>
                  <input
                    required
                    type="number"
                    min="1"
                    placeholder="e.g. 5"
                    value={formData.noOfVacancy}
                    onChange={(e) => setFormData({ ...formData, noOfVacancy: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                  />
                </div>
              </div>

              {/* Experience & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-gray-700 block">Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 cursor-pointer font-medium"
                  >
                    <option value="">Select Experience</option>
                    <option value="0-1 Years">0-1 Years</option>
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="2-3 Years">2-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5-8 Years">5-8 Years</option>
                    <option value="8+ Years">8+ Years</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-gray-700 block">Budget / Salary</label>
                  <input
                    type="text"
                    placeholder="e.g. 800000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                  />
                </div>
              </div>

              {/* Work Mode & Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-gray-700 block">Work Mode</label>
                  <select
                    value={formData.workMode}
                    onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 cursor-pointer font-medium"
                  >
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-gray-700 block">Deadline Date</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                  />
                </div>
              </div>

              {/* Added By */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-gray-700 block">Added By (Sales Executive / Admin)</label>
                <input
                  type="text"
                  placeholder="e.g. Admin / Rahul Sharma"
                  value={formData.addedBy}
                  onChange={(e) => setFormData({ ...formData, addedBy: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                />
              </div>

              {/* Job Requirements */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-gray-700 block">Job Description & Requirements</label>
                <textarea
                  rows={2}
                  placeholder="Enter detailed job requirements..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 resize-none font-medium"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddVacancyModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  + Save Vacancy
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default CurrentVacancy;
