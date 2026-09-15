import React from "react";
import { Phone, UserPlus, Briefcase, Eye } from "lucide-react";
import HRStatusBadge from "./HRStatusBadge";

/**
 * Mobile stacked card view for a single HR recruiter.
 * Used on small screens instead of horizontal table scroll.
 */
const HRPerformanceCard = ({ hr, index, onView }) => {
  const initials = hr.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarColors = [
    "bg-purple-100 text-purple-700",
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-indigo-100 text-indigo-700",
    "bg-pink-100 text-pink-700",
  ];
  const avatarColor = avatarColors[hr.id % avatarColors.length];

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3"
      role="article"
      aria-label={`HR Performance card for ${hr.name}`}
    >
      {/* Top: Avatar + Name + Badges */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full ${avatarColor} font-bold flex items-center justify-center text-sm shrink-0`}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-gray-800 truncate">{hr.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <HRStatusBadge type="workMode" value={hr.workMode} />
            <HRStatusBadge type="status" value={hr.isActiveToday} />
          </div>
        </div>
        
        <button
          onClick={() => onView(hr)}
          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors shrink-0"
          title="View Details"
        >
          <Eye size={18} />
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-purple-50 rounded-lg p-2.5 text-center">
          <Phone size={14} className="text-purple-500 mx-auto mb-1" />
          <p className="text-lg font-extrabold text-purple-700">{hr.callsToday}</p>
          <p className="text-[10px] text-gray-500 font-medium">Calls Today</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-2.5 text-center">
          <UserPlus size={14} className="text-blue-500 mx-auto mb-1" />
          <p className="text-lg font-extrabold text-blue-700">{hr.candidatesOnboarded}</p>
          <p className="text-[10px] text-gray-500 font-medium">Onboarded</p>
        </div>
        <div className="bg-emerald-50 rounded-lg p-2.5 text-center">
          <Briefcase size={14} className="text-emerald-500 mx-auto mb-1" />
          <p className="text-lg font-extrabold text-emerald-700">{hr.vacanciesFilled}</p>
          <p className="text-[10px] text-gray-500 font-medium">Filled</p>
        </div>
      </div>
    </div>
  );
};

export default HRPerformanceCard;
