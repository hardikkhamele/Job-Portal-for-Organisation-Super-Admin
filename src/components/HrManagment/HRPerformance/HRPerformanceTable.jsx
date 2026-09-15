import React from "react";
import { useNavigate } from "react-router-dom";
import { Phone, UserPlus, Briefcase, Eye } from "lucide-react";
import HRStatusBadge from "./HRStatusBadge";
import HRPerformanceCard from "./HRPerformanceCard";

/**
 * HRPerformanceTable: desktop table + mobile card view for HR recruiters.
 * Switches to stacked card view on small screens.
 */
const HRPerformanceTable = ({ data, currentPage, itemsPerPage }) => {
  const avatarColors = [
    "bg-purple-100 text-purple-700",
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-indigo-100 text-indigo-700",
    "bg-pink-100 text-pink-700",
  ];

  const navigate = useNavigate();

  return (
    <>
      {/* Desktop Table — hidden on mobile */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse rounded-t-xl overflow-hidden">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="py-3.5 px-3 font-bold text-left text-xs uppercase tracking-wider rounded-tl-xl">
                Sr.
              </th>
              <th className="py-3.5 px-3 font-bold text-left text-xs uppercase tracking-wider">
                HR Name
              </th>
              <th className="py-3.5 px-3 font-bold text-center text-xs uppercase tracking-wider">
                Work Mode
              </th>
              <th className="py-3.5 px-3 font-bold text-center text-xs uppercase tracking-wider">
                Today's Status
              </th>
              <th className="py-3.5 px-3 font-bold text-center text-xs uppercase tracking-wider">
                Calls Today
              </th>
              <th className="py-3.5 px-3 font-bold text-center text-xs uppercase tracking-wider">
                Onboarded
              </th>
              <th className="py-3.5 px-3 font-bold text-center text-xs uppercase tracking-wider">
                Vacancies Filled
              </th>
              <th className="py-3.5 px-3 font-bold text-center text-xs uppercase tracking-wider rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-gray-400 text-sm"
                >
                  No HR records found matching your filters.
                </td>
              </tr>
            ) : (
              data.map((hr, idx) => {
                const initials = hr.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);
                const avatarColor = avatarColors[hr.id % avatarColors.length];

                return (
                  <tr
                    key={hr.id}
                    className="border-b border-gray-100 hover:bg-purple-50/30 transition-colors duration-150"
                  >
                    {/* Sr */}
                    <td className="py-4 px-3 text-gray-600 font-semibold">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>

                    {/* Name + Avatar */}
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full ${avatarColor} font-bold flex items-center justify-center text-xs shrink-0`}
                        >
                          {initials}
                        </div>
                        <span className="font-semibold text-sm text-gray-800">
                          {hr.name}
                        </span>
                      </div>
                    </td>

                    {/* Work Mode */}
                    <td className="py-4 px-3 text-center">
                      <HRStatusBadge type="workMode" value={hr.workMode} />
                    </td>

                    {/* Status */}
                    <td className="py-4 px-3 text-center">
                      <HRStatusBadge type="status" value={hr.isActiveToday} />
                    </td>

                    {/* Calls */}
                    <td className="py-4 px-3 text-center">
                      <span className="inline-flex items-center gap-1.5 text-purple-700 text-sm font-bold">
                        <Phone size={16} />
                        {hr.callsToday}
                      </span>
                    </td>

                    {/* Onboarded */}
                    <td className="py-4 px-3 text-center">
                      <span className="inline-flex items-center gap-1.5 text-blue-700 text-sm font-bold">
                        <UserPlus size={16} />
                        {hr.candidatesOnboarded}
                      </span>
                    </td>

                    {/* Vacancies Filled */}
                    <td className="py-4 px-3 text-center">
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 text-sm font-bold">
                        <Briefcase size={16} />
                        {hr.vacanciesFilled}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-3 text-center">
                      <button
                        onClick={() => navigate(`/hr-management/hr-view-details/${hr.id}`)}
                        className="p-1.5 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors inline-flex justify-center items-center"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View — visible only on small screens */}
      <div className="md:hidden flex flex-col gap-3" role="list" aria-label="HR Performance List">
        {data.length === 0 ? (
          <p className="py-12 text-center text-gray-400 text-sm">
            No HR records found matching your filters.
          </p>
        ) : (
          data.map((hr, idx) => (
            <HRPerformanceCard
              key={hr.id}
              hr={hr}
              index={(currentPage - 1) * itemsPerPage + idx}
              onView={(hr) => navigate(`/hr-management/hr-view-details/${hr.id}`)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default HRPerformanceTable;
