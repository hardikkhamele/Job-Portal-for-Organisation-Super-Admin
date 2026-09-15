import React, { useState, useMemo } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import Breadcrumb from "../../common/Breadcrumb";
import Footer from "../../Footer";
import StatCard from "./StatCard";
import FilterBar from "./FilterBar";
import HRPerformanceTable from "./HRPerformanceTable";
import hrPerformanceData from "./hrPerformanceData";

const ITEMS_PER_PAGE = 10;

function HRPerformanceTracking() {
  // Filters & Sort
  const [searchQuery, setSearchQuery] = useState("");
  const [workModeFilter, setWorkModeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Computed Stats — from full dataset
  const totalHR = hrPerformanceData.length;
  const activeHR = hrPerformanceData.filter((h) => h.isActiveToday).length;
  const totalOnboarded = hrPerformanceData.reduce(
    (sum, h) => sum + h.candidatesOnboarded,
    0
  );
  const totalVacancyFilled = hrPerformanceData.reduce(
    (sum, h) => sum + h.vacanciesFilled,
    0
  );

  // Filtered + Sorted Data
  const filteredData = useMemo(() => {
    let list = [...hrPerformanceData];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((h) => h.name.toLowerCase().includes(q));
    }

    // Work Mode Filter
    if (workModeFilter !== "all") {
      list = list.filter((h) => h.workMode === workModeFilter);
    }

    // Status Filter
    if (statusFilter === "active") {
      list = list.filter((h) => h.isActiveToday);
    } else if (statusFilter === "inactive") {
      list = list.filter((h) => !h.isActiveToday);
    }

    // Sort
    list.sort((a, b) => {
      let valA, valB;
      if (sortField === "name") {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else if (sortField === "callsToday") {
        valA = a.callsToday;
        valB = b.callsToday;
      } else {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [searchQuery, workModeFilter, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // Reset page when filters change
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };
  const handleWorkModeChange = (val) => {
    setWorkModeFilter(val);
    setCurrentPage(1);
  };
  const handleStatusChange = (val) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };
  const handleSortChange = (field, dir) => {
    setSortField(field);
    setSortDirection(dir);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* --- HEADER --- */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-2xl font-bold text-black flex items-center gap-2">
              <BarChart3 className="text-purple-600" size={26} />
              HR Performance Tracking
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Track and monitor daily recruiter activity — calls made,
              candidates onboarded, vacancies filled across the team.
            </p>
          </div>
        </div>

        <hr className="border-gray-200 mt-4 mb-5" />

        {/* --- 4 STAT CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<Users size={22} />}
            label="Total HR"
            value={totalHR}
            subText="All recruiters"
            colorClass="purple"
          />
          <StatCard
            icon={<UserCheck size={22} />}
            label="Active HR (Today)"
            value={activeHR}
            subText="Currently working"
            colorClass="emerald"
          />
          <StatCard
            icon={<UserPlus size={22} />}
            label="Total Onboarded"
            value={totalOnboarded}
            subText="Candidates onboarded"
            colorClass="blue"
          />
          <StatCard
            icon={<Briefcase size={22} />}
            label="Total Vacancy Filled"
            value={totalVacancyFilled}
            subText="Positions filled"
            colorClass="amber"
          />
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 pb-4">
          <h5 className="text-xl font-bold text-black mb-1">
            HR Recruiter List
          </h5>
          <p className="text-xs text-gray-500 mb-4">
            Performance summary for each HR recruiter. Use filters and search
            to narrow results.
          </p>

          {/* Filter Bar */}
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            workModeFilter={workModeFilter}
            onWorkModeChange={handleWorkModeChange}
            statusFilter={statusFilter}
            onStatusChange={handleStatusChange}
            sortField={sortField}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Table / Card View */}
        <div className="px-6 pb-0">
          <HRPerformanceTable
            data={paginatedData}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Showing{" "}
            {filteredData.length > 0
              ? (currentPage - 1) * ITEMS_PER_PAGE + 1
              : 0}{" "}
            to {Math.min(filteredData.length, currentPage * ITEMS_PER_PAGE)}{" "}
            of {filteredData.length} HR recruiters
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition cursor-pointer ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-purple-50"
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition cursor-pointer ${
                    page === currentPage
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-purple-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition cursor-pointer ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-purple-50"
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HRPerformanceTracking;
