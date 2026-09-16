import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
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
  Building2,
  Monitor,
  Layers
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
  Remote: "bg-green-100 text-green-700",
  Hybrid: "bg-yellow-100 text-yellow-700",
  Onsite: "bg-blue-100 text-blue-700"
};

function CurrentVacancy() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [vacancies, setVacancies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

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

  // Fetch from API
  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        let token = localStorage.getItem("token");
        if (!token) {
          const match = document.cookie.match(/(?:^|;)\s*(?:token|access_token)\s*=\s*([^;]+)/);
          if (match) token = match[1];
        }
        
        const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://new-job-portal-be.onrender.com";
      
        const params = new URLSearchParams({
          page: currentPage,
          limit: itemsPerPage
        });
        
        if (searchQuery) params.set("search", searchQuery);
        if (categoryFilter && categoryFilter !== "all") {
           params.set("category", categoryFilter === "it" ? "IT" : "Non IT");
        }
        if (workModeFilter && workModeFilter !== "all") {
           params.set("workMode", workModeFilter.charAt(0).toUpperCase() + workModeFilter.slice(1));
        }
        if (statusFilter && statusFilter !== "all") {
           params.set("status", statusFilter === "open" ? "active" : "closed");
        }
        
        const headers = {};
        if (token && token !== "null") {
          headers["Authorization"] = `Bearer ${token}`;
        }
        
        const res = await axios.get(`${BASE_URL}/api/admin/vacancies?${params.toString()}`, {
          headers
        });
        
        const data = res.data;
        if (data.success && data.data) {
          setVacancies(data.data);
          setTotalPages(data.pagination?.totalPages || 1);
          setTotalCount(data.pagination?.total || data.data.length);
        } else {
          setVacancies([]);
          setTotalPages(1);
          setTotalCount(0);
        }
      } catch (error) {
        console.error("Fetch vacancies failed:", error);
      }
    };
    
    fetchVacancies();
  }, [currentPage, searchQuery, categoryFilter, workModeFilter, statusFilter]);

  // Stats Counts (from current visible page limit due to lack of a stats endpoint)
  const openCount = useMemo(() => vacancies.filter((v) => (v.status || "active").toLowerCase() === "active").length, [vacancies]);
  const closedCount = useMemo(() => vacancies.filter((v) => (v.status || "").toLowerCase() !== "active").length, [vacancies]);
  const itCount = useMemo(() => vacancies.filter((v) => (v.category || "").toLowerCase() === "it").length, [vacancies]);
  const nonItCount = useMemo(() => vacancies.filter((v) => (v.category || "").toLowerCase().includes("non")).length, [vacancies]);

  // API handles filtering and pagination
  const filteredVacancies = vacancies;
  const paginatedVacancies = vacancies;

  // Check if any filter is active
  const hasActiveFilters =
    statusFilter !== "all" ||
    categoryFilter !== "all" ||
    workModeFilter !== "all" ||
    searchQuery.trim() !== "";

  const handleToggleStatus = (id) => {
    const updated = vacancies.map((v) =>
      v._id === id ? { ...v, status: v.status === "active" ? "inactive" : "active" } : v
    );
    setVacancies(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vacancy?")) {
      const updated = vacancies.filter((v) => v._id !== id);
      setVacancies(updated);
    }
  };

  const handleView = (vacancy) => {
    navigate(`/current-vacancy/view/${vacancy._id || vacancy.vacancyId}`, { state: { vacancy } });
  };

  return (
    <div className="w-full bg-[#F4F6FA] p-4 pb-20 min-h-screen flex flex-col justify-between">
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
              <h4 className="text-2xl font-bold text-gray-900 tracking-tight">
                Job Vacancies
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Browse current open positions and submit candidate details with CV links.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              {/* Button 1: Add Vacancy (Navigates to Full Page for Single Vacancy) */}
              <button
                type="button"
                onClick={() => navigate("/current-vacancy/add-vacancy")}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer h-11 shadow-sm"
              >
                <Plus size={18} />
                <span>Add Vacancy</span>
              </button>
            </div>
          </div>
          <hr className="border-gray-200 mt-4" />
        </div>

        {/* --- 5 INTERACTIVE STAT CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

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

          {/* IT Vacancy Card */}
          <div
            onClick={() => updateParams({ category: categoryFilter === "it" ? "all" : "it", page: 1 })}
            className={`bg-white rounded-xl p-5 shadow-sm border transition cursor-pointer flex items-center justify-between hover:shadow-md ${
              categoryFilter === "it"
                ? "ring-2 ring-indigo-500 bg-indigo-50/40 border-indigo-300 shadow-md"
                : "border-gray-100 hover:border-indigo-200"
            }`}
            title="Click to view only IT Vacancies"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">IT Vacancy</span>
              <span className="text-2xl font-bold text-indigo-700 mt-2">{itCount}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-indigo-600 font-medium">
                <Monitor size={14} />
                <span>{categoryFilter === "it" ? "Showing IT Only" : "Tech Roles"}</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${categoryFilter === "it" ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600"}`}>
              <Monitor size={24} />
            </div>
          </div>

          {/* Non IT Vacancy Card */}
          <div
            onClick={() => updateParams({ category: (categoryFilter === "non-it" || categoryFilter === "non it") ? "all" : "non-it", page: 1 })}
            className={`bg-white rounded-xl p-5 shadow-sm border transition cursor-pointer flex items-center justify-between hover:shadow-md ${
              (categoryFilter === "non-it" || categoryFilter === "non it")
                ? "ring-2 ring-amber-500 bg-amber-50/40 border-amber-300 shadow-md"
                : "border-gray-100 hover:border-amber-200"
            }`}
            title="Click to view only Non-IT Vacancies"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Non IT Vacancy</span>
              <span className="text-2xl font-bold text-amber-700 mt-2">{nonItCount}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-amber-600 font-medium">
                <Layers size={14} />
                <span>{(categoryFilter === "non-it" || categoryFilter === "non it") ? "Showing Non-IT Only" : "Other Roles"}</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${(categoryFilter === "non-it" || categoryFilter === "non it") ? "bg-amber-600 text-white" : "bg-amber-50 text-amber-600"}`}>
              <Layers size={24} />
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
                  paginatedVacancies.map((v, idx) => {
                    const formattedDeadline = v.deadline ? new Date(v.deadline).toISOString().split('T')[0] : '';
                    return (
                    <tr
                      key={v._id || idx}
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
                          <span className="font-semibold text-sm text-purple-700">{v.designation || v.profile}</span>
                          <span className="text-[11px] text-gray-400 mt-0.5">ID: {v.vacancyId}</span>
                        </div>
                      </td>

                      {/* State */}
                      <td className="py-4 px-3 font-medium text-gray-800">{v.state}</td>

                      {/* City */}
                      <td className="py-4 px-3 font-medium text-gray-800">{v.city}</td>

                      {/* No. of Vacancy */}
                      <td className="py-4 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                          <Users size={12} />
                          {v.numberOfVacancies || v.noOfVacancy}
                        </span>
                      </td>

                      {/* Application Submitted */}
                      <td className="py-4 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                          <CheckCircle2 size={12} />
                          {v.applicationSubmittedCount || v.applicationSubmitted || 0}
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
                          {formattedDeadline}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleView(v)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-xs font-bold cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={14} className="text-purple-600" />
                            View
                          </button>
                          <button
                            onClick={() => handleToggleStatus(v._id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shadow-sm ${
                              v.status === "active" || v.status === "Open"
                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                            title={v.status === "active" || v.status === "Open" ? "Mark as Closed" : "Re-open Vacancy"}
                          >
                            {v.status === "active" || v.status === "Open" ? (
                              <>
                                <Send size={14} />
                                Submit Details
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={14} />
                                Re-open
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )})
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              Showing {filteredVacancies.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(totalCount, currentPage * itemsPerPage)} of {totalCount} vacancies
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

      <Footer />
    </div>
  );
}

export default CurrentVacancy;
