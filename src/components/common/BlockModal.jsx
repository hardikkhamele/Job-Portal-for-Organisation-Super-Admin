import React from "react";

function BlockModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  loading, 
  title, 
  message, 
  buttonText, 
  variant 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      
      {/* MODAL BOX */}
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg border border-purple-300">
        
        {/* 🔹 Dynamic Title (Static "Block" ki jagah title use kiya) */}
        <h2 className={`text-xl font-semibold text-center mb-3 ${variant === 'danger' ? 'text-red-600' : 'text-purple-700'}`}>
          {title || "Action"}
        </h2>

        {/* 🔹 Dynamic Message (Static text ki jagah message use kiya) */}
        <p className="text-center text-gray-600 mb-6 px-2">
          {message || "Are you sure you want to perform this action?"}
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={onClose}
            className="px-8 py-2 rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-8 py-2 rounded-lg text-white font-medium transition disabled:opacity-50 ${
              variant === 'danger' 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800'
            }`}
          >
            {loading ? "Processing..." : (buttonText || "Confirm")}
          </button>
        </div>

      </div>
    </div>
  );
}

export default BlockModal;