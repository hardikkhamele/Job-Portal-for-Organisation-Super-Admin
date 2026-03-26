import { Search, Pencil, Edit, Code, Briefcase } from "lucide-react";
import React, { useState } from "react";
import CreateCategoryModal from "../common/CreateCategoryModal";
import { useNavigate } from "react-router";
function JobSeekerManagement() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Container */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Header */}
        <h2 className="text-2xl font-semibold mb-2">Job seeker Management</h2>
        <hr className="border-gray-300 mt-2 mb-5" />

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          {/* Search */}
          <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-65 h-11">
            <Search size={20} className="text-[#D3D3D3] mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* Button */}
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-md"
            onClick={() => {
              setMode("create");
              setSelectedCategory(null);
              setOpen(true);
            }}
          >
            Create Category
          </button>
          <CreateCategoryModal
            open={open}
            setOpen={setOpen}
            mode={mode}
            initialData={selectedCategory}
          />
        </div>

        {/* Cards */}
        <div className="flex justify-around items-center">
          {/* Card 1 */}
          <div className="bg-white border border-[#D3D3D3] shadow-[0px_4px_4px_0px_#00000040] rounded-lg p-5 w-90 relative">
            {/* Edit Icon */}
            <Edit
              size={20}
              className="absolute top-3 right-3 text-purple-600 cursor-pointer"
              onClick={() => {
                setMode("edit");
                setSelectedCategory({
                  name: "IT & Technology",
                  description: "Software development...",
                });
                setOpen(true);
              }}
            />

            {/* Icon */}
            <div className="flex justify-center mb-3">
              <div className="bg-purple-600 text-white p-3 rounded-lg">
                <Code size={30} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-center text-xl font-semibold mb-2">
              IT & Technology
            </h3>

            {/* Description */}
            <p className="text-center  text-gray-500 mb-4 text-lg">
              Software development, Design, Data Science, DevOps and more
            </p>

            {/* Buttons */}
            <div className="flex gap-3 justify-center ">
              <button className="bg-red-500 text-white text-sm px-4 py-1 w-30 rounded">
                Delete
              </button>
              <button className="bg-purple-600 text-white text-sm px-4 py-1 w-30 rounded"
              onClick={()=>navigate("/view-job-seeker")}
              >
                View
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#D3D3D3] shadow-[0px_4px_4px_0px_#00000040] rounded-lg p-5 w-90 relative">
            {/* Edit Icon */}
            <Edit
              size={20}
              className="absolute top-3 right-3 text-purple-600 cursor-pointer"
              onClick={() => {
                setMode("edit");
                setSelectedCategory({
                  name: "IT & Technology",
                  description: "Software development...",
                });
                setOpen(true);
              }}
            />

            {/* Icon */}
            <div className="flex justify-center mb-3">
              <div className="bg-purple-600 text-white p-3 rounded-lg">
                <Briefcase size={30} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-center font-semibold mb-2 text-xl">
              Non-IT Sectors
            </h3>

            {/* Description */}
            <p className="text-center text-lg text-gray-500 mb-4">
              Sales, Marketing, Finance, HR Operations, Recruiter and more
            </p>

            {/* Buttons */}
            <div className="flex gap-3 justify-center">
              <button className="bg-red-500 text-white text-sm px-4 py-1 w-30 rounded">
                Delete
              </button>
              <button className="bg-purple-600 text-white text-sm px-4 py-1 w-30 rounded">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSeekerManagement;
