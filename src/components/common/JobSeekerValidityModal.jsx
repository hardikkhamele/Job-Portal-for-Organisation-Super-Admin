// JobSeekerValidityModal.jsx
import { BadgePercent } from "lucide-react";
import React from "react";

const JobSeekerValidityModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Plan Details</h2>
        
        {!data ? (
          <p className="text-center py-4">Loading details...</p>
        ) : (
          <div className="space-y-2">
            <p><strong>Title:</strong> {data.title || data.name}</p>
            <p><strong>Price:</strong> {data.price ? (String(data.price).startsWith("₹") ? data.price : `₹${data.price}`) : "N/A"}</p>
            {data.discountedPrice !== undefined && <p><strong>Discounted Price:</strong> ₹{data.discountedPrice}</p>}
            {data.discount !== undefined && <p><strong>Discount:</strong> {String(data.discount).endsWith("%") ? data.discount : `${data.discount}%`}</p>}
            {data.planType && <p><strong>Type:</strong> {data.planType}</p>}
            <p><strong>Validity:</strong> {data.durationText || data.validity}</p>
            {data.jobCredits !== undefined && <p><strong>Job-Credit:</strong> {data.jobCredits}</p>}
            {data.databaseCredits !== undefined && <p><strong>Database Credit:</strong> {data.databaseCredits}</p>}
            {data.applyLimit !== undefined && <p><strong>Apply Limit:</strong> {data.applyLimit} Jobs/Month</p>}
            {data.profileBoost && <p><strong>Profile Boost:</strong> {data.profileBoost}</p>}
            {data.jobAlert && <p><strong>Job Alert:</strong> {data.jobAlert}</p>}
            {data.support && <p><strong>Support:</strong> {data.support}</p>}
          </div>
        )}

        <button 
          onClick={onClose} 
          className="mt-6 w-full bg-purple-600 text-white py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default JobSeekerValidityModal;