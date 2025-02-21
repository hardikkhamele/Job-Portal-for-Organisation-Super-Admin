import React from "react";
import { ArrowUpRight } from "lucide-react";

const GradientButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick} // ✅ Handle onClick event
      className="flex items-center justify-between px-6 py-3 rounded-lg shadow-md bg-gradient-to-r from-[#52395F] to-purple-700 text-white text-lg font-semibold transition-transform hover:scale-105"
    >
      {label}
      <ArrowUpRight
        className="ml-2 h-7 w-7 bg-amber-50 rounded-full text-purple-600"
        size={20}
      />
    </button>
  );
};

export default GradientButton;
