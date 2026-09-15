import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";

/**
 * Reusable Breadcrumb component with circular Back button at left side.
 * @param {Array<{label: string, link?: string}>} items
 * @param {Function} [onBack] - optional custom back handler
 */
const Breadcrumb = ({ items = [], onBack }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center gap-3 px-1 py-0.5">
      {/* Circular Back Icon Button */}
      <button
        onClick={handleBack}
        type="button"
        className="w-8 h-8 rounded-full bg-white text-purple-700 hover:bg-purple-100 hover:text-purple-900 border border-purple-200 shadow-sm flex items-center justify-center transition cursor-pointer shrink-0"
        title="Go Back"
      >
        <ArrowLeft size={16} />
      </button>

      {/* Breadcrumb links */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 pt-[2px]">
        <Link
          to="/dashboard"
          className="flex items-center gap-1 text-gray-500 hover:text-purple-700 transition font-medium"
        >
          <Home size={14} className="text-purple-600" />
          <span>Dashboard</span>
        </Link>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight size={13} className="text-gray-400" />
            {item.link ? (
              <Link
                to={item.link}
                className="text-gray-500 hover:text-purple-700 transition font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-purple-700">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;
