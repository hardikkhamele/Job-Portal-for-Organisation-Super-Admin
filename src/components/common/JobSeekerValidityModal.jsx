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
            <p><strong>Plan Name:</strong> {data.title || data.name || data.planName}</p>
            {(data.planTag || data.tag) && <p><strong>Tag:</strong> {data.planTag || data.tag}</p>}
            <p>
              <strong>Plan Price:</strong>{" "}
              {(() => {
                const priceVal = data.price !== undefined ? data.price : data.planPrice;
                return priceVal !== undefined && priceVal !== null ? (String(priceVal).startsWith("₹") ? priceVal : `₹${priceVal}`) : "N/A";
              })()}
            </p>
            {data.discountedPrice !== undefined && <p><strong>Discounted Price:</strong> ₹{data.discountedPrice}</p>}
            {data.discount !== undefined && <p><strong>Discount:</strong> {String(data.discount).endsWith("%") ? data.discount : `${data.discount}%`}</p>}
            {data.planType && <p><strong>Type:</strong> {data.planType}</p>}
            <p>
              <strong>Validity:</strong>{" "}
              {data.durationText || 
               (typeof data.validity === "number" || (typeof data.validity === "string" && String(data.validity).trim() !== "") 
                 ? `${data.validity} Month${data.validity > 1 ? "s" : ""}` 
                 : "N/A")}
            </p>
            {data.jobCredits !== undefined && <p><strong>Job-Credit:</strong> {data.jobCredits}</p>}
            {data.databaseCredits !== undefined && <p><strong>Database Credit:</strong> {data.databaseCredits}</p>}
            {(data.applyLimit !== undefined || data.canApplyJobsPerMonth !== undefined) && (
              <p><strong>Apply Limit:</strong> {data.applyLimit ?? data.canApplyJobsPerMonth} Jobs/Month</p>
            )}
            {data.profileBoost !== undefined && (
              <p><strong>Profile Boost:</strong> {typeof data.profileBoost === "boolean" ? (data.profileBoost ? "Yes" : "No") : data.profileBoost}</p>
            )}
            {data.jobAlert !== undefined && (
              <p><strong>Job Alert:</strong> {typeof data.jobAlert === "boolean" ? (data.jobAlert ? "Yes" : "No") : data.jobAlert}</p>
            )}
            {data.support !== undefined && (
              <p><strong>Support:</strong> {typeof data.support === "boolean" ? (data.support ? "Yes" : "No") : data.support}</p>
            )}
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