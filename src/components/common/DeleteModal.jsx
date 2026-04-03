import React from "react";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">

      {/* MODAL BOX */}
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg border border-purple-300">
        
        {/* Title */}
        <h2 className="text-xl font-semibold mb-3 text-center">Delete</h2>

        {/* Message */}
        <p className="text-gray-500 text-sm mb-6 text-center">
          Are you sure you want to delete? This action cannot be undone.
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
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium w-1/2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;