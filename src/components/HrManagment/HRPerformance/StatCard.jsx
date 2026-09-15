import React from "react";

/**
 * Reusable stat card for the HR Performance Tracking header row.
 * Matches the existing project card pattern (rounded-xl, shadow-sm, border, icon).
 */
const StatCard = ({ icon, label, value, subText, colorClass = "purple", onClick, isActive }) => {
  const colorMap = {
    purple: {
      border: "border-purple-700 hover:border-purple-600 border-opacity-70",
      text: "text-purple-700",
      iconBg: "bg-purple-50 text-purple-700",
      ring: "ring-2 ring-purple-400 bg-purple-50/20",
    },
    emerald: {
      border: "border-emerald-600 hover:border-emerald-500 border-opacity-70",
      text: "text-emerald-700",
      iconBg: "bg-emerald-50 text-emerald-700",
      ring: "ring-2 ring-emerald-400 bg-emerald-50/20",
    },
    blue: {
      border: "border-blue-600 hover:border-blue-500 border-opacity-70",
      text: "text-blue-700",
      iconBg: "bg-blue-50 text-blue-700",
      ring: "ring-2 ring-blue-400 bg-blue-50/20",
    },
    amber: {
      border: "border-amber-500 hover:border-amber-400 border-opacity-80",
      text: "text-amber-600",
      iconBg: "bg-amber-50 text-amber-600",
      ring: "ring-2 ring-amber-400 bg-amber-50/20",
    },
    pink: {
      border: "border-pink-600 hover:border-pink-500 border-opacity-70",
      text: "text-pink-600",
      iconBg: "bg-pink-50 text-pink-600",
      ring: "ring-2 ring-pink-400 bg-pink-50/20",
    },
  };

  const c = colorMap[colorClass] || colorMap.purple;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 border ${c.border} transition-all shadow-sm hover:shadow-md flex items-center justify-between group ${onClick ? 'cursor-pointer' : ''} ${isActive ? c.ring : ''}`}
    >
      <div>
        <span className="text-[11px] font-medium uppercase text-gray-500 tracking-wider block">
          {label}
        </span>
        <h3 className={`text-[26px] font-semibold tracking-tight ${c.text} mt-1.5`}>{value}</h3>
        {subText && (
          <span className="text-[11px] font-light text-gray-400 mt-1 block">
            {subText}
          </span>
        )}
      </div>
      <div
        className={`w-11 h-11 rounded-full ${c.iconBg} flex items-center justify-center transition-transform group-hover:scale-105`}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
