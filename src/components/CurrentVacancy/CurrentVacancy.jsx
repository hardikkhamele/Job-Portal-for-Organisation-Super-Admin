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
  Layers,
  Pencil,
  AlertCircle
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

const workModeText = {
  Remote: "text-green-700",
  Hybrid: "text-yellow-700",
  Onsite: "text-blue-700"
};

function CurrentVacancy() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [vacancies, setVacancies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  // Read URL search params in lowercase
  const statusFilter = (searchParams.get("status") || "all").toLowerCase();
  const categoryFilter = (searchParams.get("category") || "all").toLowerCase();
  const workModeFilter = (searchParams.get("workmode") || "all").toLowerCase();
  const priorityFilter = (searchParams.get("priority") || "all").toLowerCase();
  const deadlineFrom = searchParams.get("deadlineFrom") || "";
  const deadlineTo = searchParams.get("deadlineTo") || "";
  const searchQuery = searchParams.get("search") || "";
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  // Helper to update URL params in lowercase
  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);

    const merged = {
      status: statusFilter,
      category: categoryFilter,
      workmode: workModeFilter,
      priority: priorityFilter,
      deadlineFrom: deadlineFrom,
      deadlineTo: deadlineTo,
      search: searchQuery,
      page: currentPage,
      ...updates
    };

    Object.entries(merged).forEach(([key, val]) => {
      const strVal = String(val).trim();
      const lowerVal = strVal.toLowerCase();
      if (!strVal || lowerVal === "all" || (key === "page" && Number(val) === 1)) {
        params.delete(key);
      } else {
        params.set(key, key === "deadlineFrom" || key === "deadlineTo" ? strVal : lowerVal);
      }
    });

    setSearchParams(params, { replace: true });
  };

  // Fetch from API
  useEffect(() => {
    const fetchVacancies = async () => {
      setLoading(true);
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
        if (priorityFilter && priorityFilter !== "all") {
           params.set("priority", priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1));
        }
        
        const headers = {};
        if (token && token !== "null") {
          headers["Authorization"] = `Bearer ${token}`;
        }
        
        const res = await axios.get(`${BASE_URL}/api/admin/vacancies?${params.toString()}`, {
          headers
        });
        
        let data = res.data;
        if (data.success && data.data) {
          let results = data.data;
          // Client-side deadline date range filter
          if (deadlineFrom) {
            const from = new Date(deadlineFrom);
            results = results.filter(v => v.deadline && new Date(v.deadline) >= from);
          }
          if (deadlineTo) {
            const to = new Date(deadlineTo);
            to.setHours(23, 59, 59, 999);
            results = results.filter(v => v.deadline && new Date(v.deadline) <= to);
          }
          setVacancies(results);
          setTotalPages(data.pagination?.totalPages || 1);
          setTotalCount(data.pagination?.total || data.data.length);
        } else {
          setVacancies([]);
          setTotalPages(1);
          setTotalCount(0);
        }
      } catch (error) {
        console.error("Fetch vacancies failed:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVacancies();
  }, [currentPage, searchQuery, categoryFilter, workModeFilter, statusFilter, priorityFilter, deadlineFrom, deadlineTo]);

  // Stats Counts (from current visible page limit due to lack of a stats endpoint)
  const openCount = useMemo(() => vacancies.filter((v) => (v.status || "active").toLowerCase() === "active").length, [vacancies]);
  const closedCount = useMemo(() => vacancies.filter((v) => (v.status || "").toLowerCase() !== "active").length, [vacancies]);
  const itCount = useMemo(() => vacancies.filter((v) => (v.category || "").toLowerCase() === "it").length, [vacancies]);
  const nonItCount = useMemo(() => vacancies.filter((v) => (v.category || "").toLowerCase().includes("non")).length, [vacancies]);
  const highPriorityCount = useMemo(() => vacancies.filter((v) => (v.priority || "").toLowerCase() === "high").length, [vacancies]);
  const mediumPriorityCount = useMemo(() => vacancies.filter((v) => (v.priority || "").toLowerCase() === "medium").length, [vacancies]);
  const lowPriorityCount = useMemo(() => vacancies.filter((v) => (v.priority || "").toLowerCase() === "low").length, [vacancies]);

  // API handles filtering and pagination
  const filteredVacancies = vacancies;
  const paginatedVacancies = vacancies;

  // Check if any filter is active
  const hasActiveFilters =
    statusFilter !== "all" ||
    categoryFilter !== "all" ||
    workModeFilter !== "all" ||
    priorityFilter !== "all" ||
    deadlineFrom !== "" ||
    deadlineTo !== "" ||
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

        {/* --- 6 INTERACTIVE STAT CARDS --- */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2.5 flex-1">
                    <div className="h-3.5 w-20 bg-gray-200 rounded" />
                    <div className="h-7 w-10 bg-gray-200 rounded mt-1" />
                    <div className="h-3 w-24 bg-gray-100 rounded mt-1" />
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">

          {/* Open Vacancy Card */}
          <div
            onClick={() => {
              const isActive = statusFilter === "open" && categoryFilter === "all";
              updateParams({ status: isActive ? "all" : "open", category: "all", page: 1 });
            }}
            className={`bg-white rounded-xl p-4 shadow-sm border transition cursor-pointer flex items-center justify-between hover:shadow-md ${
              statusFilter === "open" && categoryFilter === "all"
                ? "ring-2 ring-green-500 bg-green-50/40 border-green-300 shadow-md"
                : "border-gray-100 hover:border-green-200"
            }`}
            title="Click to view only Open Vacancies"
          >
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500">Open Vacancy</span>
              <span className="text-2xl font-bold text-green-700 mt-1">{openCount}</span>
              <div className="flex items-center gap-1 mt-1.5 text-[11px] text-green-600 font-medium">
                <TrendingUp size={13} />
                <span>{statusFilter === "open" && categoryFilter === "all" ? "Showing Open" : "Not Filled"}</span>
              </div>
            </div>
            <div className={`p-2.5 rounded-lg ${statusFilter === "open" && categoryFilter === "all" ? "bg-green-600 text-white" : "bg-green-50 text-green-600"}`}>
              <Briefcase size={20} />
            </div>
          </div>

          {/* Closed Vacancy Card */}
          <div
            onClick={() => {
              const isActive = statusFilter === "closed" && categoryFilter === "all";
              updateParams({ status: isActive ? "all" : "closed", category: "all", page: 1 });
            }}
            className={`bg-white rounded-xl p-4 shadow-sm border transition cursor-pointer flex items-center justify-between hover:shadow-md ${
              statusFilter === "closed" && categoryFilter === "all"
                ? "ring-2 ring-red-500 bg-red-50/40 border-red-300 shadow-md"
                : "border-gray-100 hover:border-red-200"
            }`}
            title="Click to view only Closed Vacancies"
          >
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500">Closed Vacancy</span>
              <span className="text-2xl font-bold text-red-700 mt-1">{closedCount}</span>
              <div className="flex items-center gap-1 mt-1.5 text-[11px] text-red-500 font-medium">
                <CheckCircle2 size={13} />
                <span>{statusFilter === "closed" && categoryFilter === "all" ? "Showing Closed" : "Filled"}</span>
              </div>
            </div>
            <div className={`p-2.5 rounded-lg ${statusFilter === "closed" && categoryFilter === "all" ? "bg-red-600 text-white" : "bg-red-50 text-red-500"}`}>
              <XCircle size={20} />
            </div>
          </div>

          {/* IT Vacancy Card */}
          <div
            onClick={() => {
              const isActive = categoryFilter === "it" && statusFilter === "all";
              updateParams({ category: isActive ? "all" : "it", status: "all", page: 1 });
            }}
            className={`bg-white rounded-xl p-4 shadow-sm border transition cursor-pointer flex items-center justify-between hover:shadow-md ${
              categoryFilter === "it" && statusFilter === "all"
                ? "ring-2 ring-indigo-500 bg-indigo-50/40 border-indigo-300 shadow-md"
                : "border-gray-100 hover:border-indigo-200"
            }`}
            title="Click to view only IT Vacancies"
          >
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500">IT Vacancy</span>
              <span className="text-2xl font-bold text-indigo-700 mt-1">{itCount}</span>
              <div className="flex items-center gap-1 mt-1.5 text-[11px] text-indigo-600 font-medium">
                <Monitor size={13} />
                <span>{categoryFilter === "it" && statusFilter === "all" ? "Showing IT" : "Tech Roles"}</span>
              </div>
            </div>
            <div className={`p-2.5 rounded-lg ${categoryFilter === "it" && statusFilter === "all" ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600"}`}>
              <Monitor size={20} />
            </div>
          </div>

          {/* Non IT Vacancy Card */}
          <div
            onClick={() => {
              const isNonIt = categoryFilter === "non-it" || categoryFilter === "non it";
              const isActive = isNonIt && statusFilter === "all";
              updateParams({ category: isActive ? "all" : "non-it", status: "all", page: 1 });
            }}
            className={`bg-white rounded-xl p-4 shadow-sm border transition cursor-pointer flex items-center justify-between hover:shadow-md ${
              (categoryFilter === "non-it" || categoryFilter === "non it") && statusFilter === "all"
                ? "ring-2 ring-amber-500 bg-amber-50/40 border-amber-300 shadow-md"
                : "border-gray-100 hover:border-amber-200"
            }`}
            title="Click to view only Non-IT Vacancies"
          >
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500">Non IT Vacancy</span>
              <span className="text-2xl font-bold text-amber-700 mt-1">{nonItCount}</span>
              <div className="flex items-center gap-1 mt-1.5 text-[11px] text-amber-600 font-medium">
                <Layers size={13} />
                <span>{(categoryFilter === "non-it" || categoryFilter === "non it") && statusFilter === "all" ? "Showing Non-IT" : "Other Roles"}</span>
              </div>
            </div>
            <div className={`p-2.5 rounded-lg ${(categoryFilter === "non-it" || categoryFilter === "non it") && statusFilter === "all" ? "bg-amber-600 text-white" : "bg-amber-50 text-amber-600"}`}>
              <Layers size={20} />
            </div>
          </div>

          {/* Priority Vacancies Card */}
          <div
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-orange-200 transition flex items-center justify-between h-full hover:shadow-md"
            title="Priority Breakup"
          >
            <div className="flex flex-col h-full justify-between flex-1">
              <span className="text-xs font-semibold text-gray-500">Priority</span>
              <div className="flex flex-col mt-1.5 flex-1 justify-between">
                <span className="text-[12px] font-bold text-orange-500 tracking-wide">High - {String(highPriorityCount).padStart(2, '0')}</span>
                <span className="text-[12px] font-bold text-yellow-500 tracking-wide">Med - {String(mediumPriorityCount).padStart(2, '0')}</span>
                <span className="text-[12px] font-bold text-green-500 tracking-wide">Low - {String(lowPriorityCount).padStart(2, '0')}</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-orange-50 text-orange-600 shrink-0">
              <AlertCircle size={20} />
            </div>
          </div>

          {/* Total Vacancy Card */}
          <div
            onClick={() => {
              updateParams({ status: "all", category: "all", page: 1 });
            }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-purple-200 transition cursor-pointer flex items-center justify-between hover:shadow-md"
            title="Click to view All Vacancies"
          >
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500">Total Vacancy</span>
              <span className="text-2xl font-bold text-purple-700 mt-1">{totalCount}</span>
              <div className="flex items-center gap-1 mt-1.5 text-[11px] text-purple-600 font-medium">
                <BarChart3 size={13} />
                <span>View All</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600">
              <ClipboardList size={20} />
            </div>
          </div>

        </div>
        )}

        {/* --- TABLE SECTION --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">

          {/* Filters + Search */}
          <div className="px-6 pt-5 pb-3">
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
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500 font-medium whitespace-nowrap flex items-center gap-1 text-xs">
                    <Filter size={13} />
                    Category:
                  </span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => updateParams({ category: e.target.value, page: 1 })}
                    className="border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer text-xs font-semibold"
                  >
                    <option value="all">All</option>
                    <option value="it">IT</option>
                    <option value="non-it">Non IT</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500 font-medium whitespace-nowrap text-xs">Work Mode:</span>
                  <select
                    value={workModeFilter}
                    onChange={(e) => updateParams({ workmode: e.target.value, page: 1 })}
                    className="border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer text-xs font-semibold"
                  >
                    <option value="all">All</option>
                    {workModeOptions.map((wm) => (
                      <option key={wm} value={wm.toLowerCase()}>{wm}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500 font-medium whitespace-nowrap text-xs">Priority:</span>
                  <select
                    value={priorityFilter}
                    onChange={(e) => updateParams({ priority: e.target.value, page: 1 })}
                    className="border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer text-xs font-semibold"
                  >
                    <option value="all">All</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500 font-medium whitespace-nowrap text-xs">Deadline:</span>
                  <input
                    type="date"
                    value={deadlineFrom}
                    onChange={(e) => updateParams({ deadlineFrom: e.target.value, page: 1 })}
                    className="border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 text-xs font-semibold w-[120px]"
                    title="From Date"
                  />
                  <span className="text-gray-400 text-xs">to</span>
                  <input
                    type="date"
                    value={deadlineTo}
                    onChange={(e) => updateParams({ deadlineTo: e.target.value, page: 1 })}
                    className="border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 text-xs font-semibold w-[120px]"
                    title="To Date"
                  />
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

                {priorityFilter !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200 capitalize">
                    Priority: {priorityFilter}
                    <button
                      onClick={() => updateParams({ priority: "all", page: 1 })}
                      className="hover:text-purple-900 cursor-pointer ml-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {(deadlineFrom || deadlineTo) && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                    Deadline: {deadlineFrom || "..."} → {deadlineTo || "..."}
                    <button
                      onClick={() => updateParams({ deadlineFrom: "", deadlineTo: "", page: 1 })}
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
                  onClick={() => updateParams({ status: "all", category: "all", workmode: "all", priority: "all", deadlineFrom: "", deadlineTo: "", search: "", page: 1 })}
                  className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer underline ml-2"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto px-6 pb-0">
            <table className="w-full text-sm border-collapse rounded-t-xl overflow-hidden table-fixed">
              <colgroup>
                <col className="w-[4%]" />
                <col className="w-[12%]" />
                <col className="w-[18%]" />
                <col className="w-[11%]" />
                <col className="w-[10%]" />
                <col className="w-[7%]" />
                <col className="w-[8%]" />
                <col className="w-[7%]" />
                <col className="w-[9%]" />
                <col className="w-[8%]" />
                <col className="w-[6%]" />
              </colgroup>
              <thead>
                <tr className="bg-purple-600 text-white divide-x divide-purple-400/60">
                  <th className="py-3 px-2 font-bold text-left text-[11px] uppercase tracking-wider rounded-tl-xl">Sr.</th>
                  <th className="py-3 px-3 font-bold text-left text-[11px] uppercase tracking-wider">Category</th>
                  <th className="py-3 px-3 font-bold text-left text-[11px] uppercase tracking-wider">Profile / Designation</th>
                  <th className="py-3 px-3 font-bold text-left text-[11px] uppercase tracking-wider">State</th>
                  <th className="py-3 px-3 font-bold text-left text-[11px] uppercase tracking-wider">City</th>
                  <th className="py-3 px-2 font-bold text-center text-[11px] uppercase tracking-wider">Vacancy</th>
                  <th className="py-3 px-2 font-bold text-center text-[11px] uppercase tracking-wider">Priority</th>
                  <th className="py-3 px-2 font-bold text-center text-[11px] uppercase tracking-wider">Applied</th>
                  <th className="py-3 px-2 font-bold text-center text-[11px] uppercase tracking-wider">Work Mode</th>
                  <th className="py-3 px-2 font-bold text-center text-[11px] uppercase tracking-wider">Deadline</th>
                  <th className="py-3 px-2 font-bold text-center text-[11px] uppercase tracking-wider rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(6)].map((_, i) => (
                    <tr key={i} className="border-b border-gray-100 animate-pulse">
                      <td className="py-3.5 px-2"><div className="h-3.5 w-5 bg-gray-200 rounded" /></td>
                      <td className="py-3.5 px-2">
                        <div className="flex flex-col gap-1.5">
                          <div className="h-3.5 w-12 bg-gray-200 rounded" />
                          <div className="h-2.5 w-20 bg-gray-100 rounded" />
                        </div>
                      </td>
                      <td className="py-3.5 px-2">
                        <div className="flex flex-col gap-1.5">
                          <div className="h-3.5 w-28 bg-gray-200 rounded" />
                          <div className="h-2.5 w-16 bg-gray-100 rounded" />
                        </div>
                      </td>
                      <td className="py-3.5 px-2"><div className="h-3.5 w-20 bg-gray-200 rounded" /></td>
                      <td className="py-3.5 px-2"><div className="h-3.5 w-16 bg-gray-200 rounded" /></td>
                      <td className="py-3.5 px-2"><div className="h-3.5 w-8 bg-gray-200 rounded mx-auto" /></td>
                      <td className="py-3.5 px-2"><div className="h-5 w-14 bg-gray-200 rounded mx-auto" /></td>
                      <td className="py-3.5 px-2"><div className="h-3.5 w-8 bg-gray-200 rounded mx-auto" /></td>
                      <td className="py-3.5 px-2"><div className="h-3.5 w-14 bg-gray-200 rounded mx-auto" /></td>
                      <td className="py-3.5 px-2"><div className="h-3.5 w-16 bg-gray-200 rounded mx-auto" /></td>
                      <td className="py-3.5 px-2">
                        <div className="flex items-center justify-center gap-3">
                          <div className="h-4 w-4 bg-gray-200 rounded" />
                          <div className="h-4 w-4 bg-gray-200 rounded" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : paginatedVacancies.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-12 text-center text-gray-400 text-sm">
                      No vacancies found matching your active filters.
                    </td>
                  </tr>
                ) : (
                  paginatedVacancies.map((v, idx) => {
                    const formattedDeadline = (() => {
                      if (!v.deadline) return "";
                      if (typeof v.deadline === "string") {
                        const cleanStr = v.deadline.split("T")[0];
                        if (/^\d{4}-\d{2}-\d{2}$/.test(cleanStr)) {
                          const [year, month, day] = cleanStr.split("-");
                          return `${day}-${month}-${year}`;
                        }
                      }
                      const d = new Date(v.deadline);
                      if (isNaN(d.getTime())) return String(v.deadline);
                      const day = String(d.getDate()).padStart(2, "0");
                      const month = String(d.getMonth() + 1).padStart(2, "0");
                      const year = d.getFullYear();
                      return `${day}-${month}-${year}`;
                    })();
                    return (
                    <tr
                      key={v._id || idx}
                      className="border-b border-gray-100 hover:bg-purple-50/30 transition-colors duration-150 cursor-pointer"
                    >
                      {/* Sr */}
                      <td className="py-3.5 px-2 text-gray-600 font-semibold text-xs">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-2">
                        <div className="flex flex-col min-w-0">
                          <span className={`font-bold text-xs truncate block ${v.category === "IT" ? "text-purple-700" : "text-orange-700"}`} title={v.category}>
                            {v.category}
                          </span>
                          <span className="text-[10px] text-gray-400 mt-0.5 truncate block" title={Array.isArray(v.subCategory) ? v.subCategory.join(", ") : (v.subCategory || "")}>
                            {Array.isArray(v.subCategory) ? v.subCategory.join(", ") : (v.subCategory || "")}
                          </span>
                        </div>
                      </td>

                      {/* Profile / Designation */}
                      <td className="py-3.5 px-2">
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-xs text-purple-700 truncate block" title={v.designation || v.profile}>{v.designation || v.profile}</span>
                          <span className="text-[10px] text-gray-400 mt-0.5 truncate block">ID: {v.vacancyId}</span>
                        </div>
                      </td>

                      {/* State */}
                      <td className="py-3.5 px-2 font-medium text-gray-800 text-xs truncate" title={v.state}>{v.state}</td>

                      {/* City */}
                      <td className="py-3.5 px-2 font-medium text-gray-800 text-xs truncate" title={v.city}>{v.city}</td>

                      {/* No. of Vacancy */}
                      <td className="py-3.5 px-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-700 font-bold text-xs">
                          <Users size={13} className="text-gray-400 shrink-0" />
                          {v.numberOfVacancies || v.noOfVacancy}
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-2 text-center">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          (v.priority || "").toLowerCase() === "high" ? "text-red-700 bg-red-50" :
                          (v.priority || "").toLowerCase() === "low" ? "text-green-700 bg-green-50" :
                          "text-yellow-700 bg-yellow-50"
                        }`}>
                          {v.priority || "Medium"}
                        </span>
                      </td>

                      {/* Application Submitted */}
                      <td className="py-3.5 px-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-700 font-bold text-xs">
                          <CheckCircle2 size={13} className="text-gray-400 shrink-0" />
                          {v.applicationSubmittedCount || v.applicationSubmitted || 0}
                        </div>
                      </td>

                      {/* Work Mode */}
                      <td className="py-3.5 px-2 text-center">
                        <span className={`text-xs font-bold ${workModeText[v.workMode] || "text-gray-600"}`}>
                          {v.workMode}
                        </span>
                      </td>

                      {/* Deadline */}
                      <td className="py-3.5 px-2 text-center">
                        <span className="inline-flex items-center gap-1 text-gray-700 font-medium text-[11px] whitespace-nowrap">
                          <Calendar size={12} className="text-purple-400 shrink-0" />
                          {formattedDeadline}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-2 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleView(v)}
                            className="text-gray-500 hover:text-purple-600 transition cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => navigate(`/current-vacancy/edit-vacancy/${v._id || v.vacancyId}`, { state: { vacancy: v } })}
                            className="text-gray-500 hover:text-blue-600 transition cursor-pointer"
                            title="Edit Vacancy"
                          >
                            <Pencil size={16} />
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
