// JobSeekerValidityModal.jsx
import { BadgePercent } from "lucide-react";
import React from "react";

function JobSeekerValidityModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30  flex justify-center items-center z-50">
      
      <div className="bg-white rounded-xl w-[280px] p-5 shadow-lg">
        <div className="border border-gray-300 rounded-lg p-2">
        <h2 className="text-purple-600 font-semibold text-lg">Basic</h2>
        <p className="text-gray-500 text-sm">For Active Job Seekers</p>

        <h3 className="font-semibold mt-2">Validity: 1 Months</h3>
            <hr className="border-gray-300 mb-2 mt-2" />
        <div className="flex items-center justify-between gap-2 mt-2">
        <div className="flex items-center gap-2">
          <span className="line-through text-gray-400">₹199</span>
          <span className="font-bold">₹129</span>
        </div>
          <span className=" flex items-center gap-1 bg-[linear-gradient(269.95deg,_rgba(121,0,186,0.31)_-30.52%,_rgba(221,32,37,0.2)_45.48%,_rgba(235,153,110,0.1)_129.16%)] text-pink-600 text-xs px-1 py-1 rounded-full">
           <BadgePercent size={15} className="text-blue-400" /> 35% OFF
          </span>
        </div></div>
        <ul className="mt-4 text-sm text-gray-600 space-y-2">
          <li>› Apply to <b>50 Jobs</b>/Month</li>
          <li>› Profile Boost</li>
          <li>› Smart Job Alerts</li>
          <li>› Support Available</li>
        </ul>
        <div className="flex justify-center">
          <button
          onClick={onClose}
          className="mt-5 w-50  bg-[#D3AB2A] text-white py-2 rounded"
        >
          Close
        </button>
        </div>
      </div>
    </div>
  );
}

export default JobSeekerValidityModal;