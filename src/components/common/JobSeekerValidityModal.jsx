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
            <p><strong>Title:</strong> {data.title}</p>
            <p><strong>Price:</strong> ₹{data.price}</p>
            <p><strong>Discounted Price:</strong> ₹{data.discountedPrice}</p>
            <p><strong>Type:</strong> {data.planType}</p>
            <p><strong>Validity:</strong> {data.durationText}</p>
            <p><strong>Job-Credit:</strong> {data.jobCredits}</p>
            <p><strong>Database Credit:</strong> {data.databaseCredits}</p>
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