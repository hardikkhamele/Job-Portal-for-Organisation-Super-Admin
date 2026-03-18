import React from "react";

function BlockModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      
      {/* MODAL BOX */}
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg border border-purple-300">
        
        
        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center mb-3">
          Block
        </h2>

        {/* TEXT */}
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to block?
        </p>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-15 py-2 rounded-lg bg-purple-200 text-purple-700 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-15 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium"
          >
            Block
          </button>
        </div>

      </div>
    </div>
  );
}

export default BlockModal;