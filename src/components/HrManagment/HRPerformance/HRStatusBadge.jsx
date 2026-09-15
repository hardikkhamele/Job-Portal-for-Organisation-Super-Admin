import React from "react";

/**
 * Badge component for HR work mode (Onsite / Offsite) and status (Active / Inactive).
 */
const HRStatusBadge = ({ type, value }) => {
  if (type === "workMode") {
    const isOnsite = value === "Onsite";
    return (
      <span
        className={`inline-flex items-center justify-center gap-1.5 text-sm font-bold ${
          isOnsite
            ? "text-blue-700"
            : "text-orange-700"
        }`}
      >
        {isOnsite ? (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/></svg>
        ) : (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
        )}
        {isOnsite ? "Onsite" : "Remote"}
      </span>
    );
  }

  if (type === "status") {
    const isActive = value === true;
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isActive ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
          }`}
        />
        <span className={isActive ? "text-emerald-700" : "text-gray-500"}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </span>
    );
  }

  return null;
};

export default HRStatusBadge;
