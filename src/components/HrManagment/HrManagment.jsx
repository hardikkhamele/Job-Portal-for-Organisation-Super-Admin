import React, { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Users,
  UserCheck,
  UserPlus,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Plus,
  ClipboardList,
  X
} from "lucide-react";
import Breadcrumb from "../common/Breadcrumb";
import Footer from "../Footer";
import StatCard from "./HRPerformance/StatCard";
import FilterBar from "./HRPerformance/FilterBar";
import HRPerformanceTable from "./HRPerformance/HRPerformanceTable";
import hrPerformanceData from "./HRPerformance/hrPerformanceData";

const ITEMS_PER_PAGE = 10;

function HRManagement() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters & Sort via URL Params
  const searchQuery = searchParams.get("search") || "";
  const workModeFilter = searchParams.get("workMode") || "all";
  const statusFilter = searchParams.get("status") || "all";
  const statBoxFilter = searchParams.get("statBox") || "all";
  const sortField = searchParams.get("sortField") || "name";
  const sortDirection = searchParams.get("sortDirection") || "asc";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const updateParams = (newParams) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "" || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      // Specific constraint: reset page to 1 when changing filters
      if (newParams.page === undefined) {
        params.set("page", "1");
      }
      return params;
    }, { replace: true });
  };

  const removeFilter = (key) => updateParams({ [key]: "all" });

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
  // Fake calculation for pending vacancies across all HRs
  const totalPendingVacancy = hrPerformanceData.reduce(
    (sum, h) => sum + ((h.id % 5) + 3),
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

    // Status Filter (Dropdown Override)
    if (statusFilter === "active") {
      list = list.filter((h) => h.isActiveToday);
    } else if (statusFilter === "inactive") {
      list = list.filter((h) => !h.isActiveToday);
    }

    // Stat Box Filter
    if (statBoxFilter === "active") {
      list = list.filter((h) => h.isActiveToday);
    } else if (statBoxFilter === "onboarded") {
      list = list.filter((h) => h.candidatesOnboarded > 0);
    } else if (statBoxFilter === "filled") {
      list = list.filter((h) => h.vacanciesFilled > 0);
    } else if (statBoxFilter === "pending") {
      list = list.filter((h) => ((h.id % 5) + 3) > 0);
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
  }, [searchQuery, workModeFilter, statusFilter, statBoxFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleSearchChange = (val) => updateParams({ search: val });
  const handleWorkModeChange = (val) => updateParams({ workMode: val });
  const handleStatusChange = (val) => updateParams({ status: val });
  const handleSortChange = (field, dir) => updateParams({ sortField: field, sortDirection: dir });

  // Chip logic
  const hasActiveFilters = searchQuery || workModeFilter !== "all" || statusFilter !== "all" || statBoxFilter !== "all";

  return (
    <div className="w-full bg-[#F4F6FA] p-3 pb-20 min-h-screen flex flex-col justify-between">
      <div className="w-full mx-auto flex flex-col gap-4">
        {/* --- BREADCRUMB --- */}
        <Breadcrumb
          items={[
            { label: "HR Management" }
          ]}
        />

        {/* --- HEADER --- */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-2xl font-bold text-black flex items-center gap-2">
                <BarChart3 className="text-purple-600" size={26} />
                HR Management 
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Track and monitor daily recruiter activity — calls made,
                candidates onboarded, vacancies filled across the team.
              </p>
            </div>
            
            {/* Add HR Button Restored for functionality access */}
            <button
              onClick={() => navigate("/hr-management/create-hr")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer self-start sm:self-auto shrink-0"
            >
              <Plus size={18} />
              + Add HR
            </button>
          </div>

          <hr className="border-gray-200 mt-4 mb-5" />

          {/* --- 5 STAT CARDS --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <StatCard
              icon={<Users size={22} />}
              label="Total HR"
              value={totalHR}
              subText="All recruiters"
              colorClass="purple"
              isActive={statBoxFilter === "all"}
              onClick={() => updateParams({ statBox: "all" })}
            />
            <StatCard
              icon={<UserCheck size={22} />}
              label="Active HR"
              value={activeHR}
              subText="Currently working"
              colorClass="emerald"
              isActive={statBoxFilter === "active"}
              onClick={() => updateParams({ statBox: "active" })}
            />
            <StatCard
              icon={<UserPlus size={22} />}
              label="Total Onboarded"
              value={totalOnboarded}
              subText="Candidates onboarded"
              colorClass="blue"
              isActive={statBoxFilter === "onboarded"}
              onClick={() => updateParams({ statBox: "onboarded" })}
            />
            <StatCard
              icon={<Briefcase size={22} />}
              label="Filled Vacancy"
              value={totalVacancyFilled}
              subText="Positions filled"
              colorClass="amber"
              isActive={statBoxFilter === "filled"}
              onClick={() => updateParams({ statBox: "filled" })}
            />
            <StatCard
              icon={<ClipboardList size={22} />}
              label="Pending Vacancy"
              value={totalPendingVacancy}
              subText="Awaiting fulfillment"
              colorClass="pink"
              isActive={statBoxFilter === "pending"}
              onClick={() => updateParams({ statBox: "pending" })}
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

            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-400 mr-1">Active Filters:</span>
                {searchQuery && (
                  <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-[13px] font-semibold border border-purple-100 shadow-sm">
                    Search: "{searchQuery}"
                    <button onClick={() => removeFilter("search")} className="hover:bg-purple-200 rounded-full p-0.5 transition cursor-pointer">
                      <X size={13} />
                    </button>
                  </div>
                )}
                {workModeFilter !== "all" && (
                  <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-[13px] font-semibold border border-purple-100 shadow-sm">
                    Work Mode: {workModeFilter}
                    <button onClick={() => removeFilter("workMode")} className="hover:bg-purple-200 rounded-full p-0.5 transition cursor-pointer">
                      <X size={13} />
                    </button>
                  </div>
                )}
                {statusFilter !== "all" && (
                  <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-[13px] font-semibold border border-purple-100 shadow-sm">
                    Status: <span className="capitalize">{statusFilter}</span>
                    <button onClick={() => removeFilter("status")} className="hover:bg-purple-200 rounded-full p-0.5 transition cursor-pointer">
                      <X size={13} />
                    </button>
                  </div>
                )}
                {statBoxFilter !== "all" && (
                  <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-[13px] font-semibold border border-purple-100 shadow-sm">
                    Stat: <span className="capitalize text-purple-800">{statBoxFilter}</span>
                    <button onClick={() => removeFilter("statBox")} className="hover:bg-purple-200 rounded-full p-0.5 transition cursor-pointer">
                      <X size={13} />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setSearchParams(new URLSearchParams())}
                  className="text-xs text-gray-500 hover:text-purple-700 underline font-semibold ml-2 cursor-pointer transition"
                >
                  Clear All
                </button>
              </div>
            )}
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
                onClick={() => updateParams({ page: Math.max(currentPage - 1, 1) })}
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
                    onClick={() => updateParams({ page })}
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
                  updateParams({ page: Math.min(currentPage + 1, totalPages) })
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

      <Footer />
    </div>
  );
}

export default HRManagement;
