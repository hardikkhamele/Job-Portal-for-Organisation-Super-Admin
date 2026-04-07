import { Loader2, Trash2 } from "lucide-react";

function DeleteModal({ isOpen, onClose, onConfirm, loading = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg border border-purple-300">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Trash2 size={24} className="text-red-500" />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2 text-center">Confirm Delete</h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Are you sure you want to delete this? This action cannot be undone.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-purple-200 text-purple-700 font-medium w-1/2 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium w-1/2 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Deleting...</>
            ) : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;