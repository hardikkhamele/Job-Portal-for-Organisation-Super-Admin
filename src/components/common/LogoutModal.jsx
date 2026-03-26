import React from "react";

function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">

      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">

        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-3 text-black">
          Logout
        </h2>

        {/* Message */}
        <p className="text-gray-500 text-sm text-center mb-6">
          Are you sure you want to logout?
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-purple-200 text-purple-700 font-medium w-1/2"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium w-1/2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;