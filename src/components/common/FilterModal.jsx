import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

const Dropdown = ({ label, options, value, setValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 relative">
      <p className="text-sm mb-2 text-gray-700">{label}</p>

      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center border border-gray-300 rounded-lg px-4 py-3 bg-[#F7F8F9] cursor-pointer"
      >
        <span className="text-sm text-gray-600">{value || `Select ${label}`}</span>
        <ChevronDown size={18} className="text-gray-500" />
      </div>

      {open && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow max-h-40 overflow-y-auto">
          <div
            onClick={() => {
              setValue("");
              setOpen(false);
            }}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-400 italic"
          >
            Clear
          </div>
          {options.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setValue(item);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function FilterModal({ isOpen, onClose, onSearch }) {
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");

  if (!isOpen) return null;

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ education, experience, location });
    }
    onClose();
  };

  const handleCancel = () => {
    setEducation("");
    setExperience("");
    setLocation("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-xl shadow-lg p-5">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filter</h2>
          <X className="cursor-pointer" onClick={handleCancel} />
        </div>

        {/* Fields */}
        <Dropdown
          label="Education"
          options={["B.A", "B.Sc", "B.Tech"]}
          value={education}
          setValue={setEducation}
        />

        <Dropdown
          label="Experience"
          options={["Fresher", "1 - 2 Years", "2 - 4 Years", "4 - 6 Years"]}
          value={experience}
          setValue={setExperience}
        />

        <Dropdown
          label="Location"
          options={["Nagpur", "Delhi", "Kolkata", "Mumbai"]}
          value={location}
          setValue={setLocation}
        />

        {/* Buttons */}
        <div className="flex justify-between gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="w-1/2 py-2 rounded-lg bg-purple-200 text-purple-700 font-medium hover:bg-purple-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSearch}
            className="w-1/2 py-2 rounded-lg bg-purple-700 text-white font-medium hover:bg-purple-800 transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;