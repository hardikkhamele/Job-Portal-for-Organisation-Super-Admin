import React from "react";

function HrModal({ isOpen, onClose, onConfirm, loading = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white w-[420px] rounded-2xl p-6 shadow-lg text-center">
        
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Delete
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6">
          Are you sure you want to delete? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-40 py-2 rounded-lg bg-purple-200 text-purple-700 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-40 py-2 rounded-lg bg-purple-700 text-white font-medium"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HrModal;
