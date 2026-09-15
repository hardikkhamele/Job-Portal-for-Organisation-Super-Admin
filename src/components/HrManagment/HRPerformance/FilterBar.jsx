import React from "react";
import { Search, Filter } from "lucide-react";

/**
 * FilterBar component for search-by-name, filter by work mode, filter by status,
 * and sort controls for HR Performance table.
 */
const FilterBar = ({
  searchQuery,
  onSearchChange,
  workModeFilter,
  onWorkModeChange,
  statusFilter,
  onStatusChange,
  sortField,
  sortDirection,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Search */}
      <div className="relative w-full md:w-80">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          type="text"
          placeholder="Search by HR name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-gray-50"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {/* Work Mode Filter */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-medium whitespace-nowrap flex items-center gap-1">
            <Filter size={14} />
            Work Mode:
          </span>
          <select
            value={workModeFilter}
            onChange={(e) => onWorkModeChange(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer text-xs font-semibold"
          >
            <option value="all">All</option>
            <option value="Onsite">Onsite</option>
            <option value="Offsite">Offsite (Remote)</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-medium whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer text-xs font-semibold"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-medium whitespace-nowrap">Sort:</span>
          <select
            value={`${sortField}-${sortDirection}`}
            onChange={(e) => {
              const [field, dir] = e.target.value.split("-");
              onSortChange(field, dir);
            }}
            className="border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer text-xs font-semibold"
          >
            <option value="name-asc">Name (A→Z)</option>
            <option value="name-desc">Name (Z→A)</option>
            <option value="callsToday-desc">Calls (High→Low)</option>
            <option value="callsToday-asc">Calls (Low→High)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
