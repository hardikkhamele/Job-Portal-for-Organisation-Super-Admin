import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Trash2,
  Code,
  Palette,
  Database,
  Shield,
  Edit,
  ChevronRight,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SubCategoryModal from "../common/SubCategoryModal";
import DeleteModal from "../common/DeleteModal";
function ViewJobSeekerManagement() {
  const navigate = useNavigate();

  const [openSub, setOpenSub] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleDelete = () => {
    console.log("Deleting:", selectedItem);
    setDeleteOpen(false);
  };

  const roles = [
    {
      title: "Developer",
      count: "12 specialized roles",
      icon: <Code size={20} />,
    },
    {
      title: "Designer",
      count: "7 specialized roles",
      icon: <Palette size={20} />,
    },
    {
      title: "QA/Testing",
      count: "5 specialized roles",
      icon: <Globe size={20} />,
    },
    { title: "DevOps", count: "4 specialized roles", icon: <Code size={20} /> },
    {
      title: "Data Science",
      count: "5 specialized roles",
      icon: <Database size={20} />,
    },
    {
      title: "CyberSecurity",
      count: "3 specialized roles",
      icon: <Shield size={20} />,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="border rounded-full p-2 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
          </div>
          <h2 className="text-xl font-semibold">Job seeker Management</h2>
        </div>

        <hr className="border-gray-300 mt-2 mb-5" />


        {/* Box */}
        <div className="border border-gray-300 rounded-lg p-6">
          {/* Top */}
          <div className="flex justify-between mb-6">
            <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-65 h-11">
              <Search size={18} className="text-[#D3D3D3] mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
            <button
              onClick={() => {
                setMode("create");
                setSelectedSubCategory(null);
                setOpenSub(true);
              }}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Create Sub-Category
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-6">
            {roles.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300  rounded-lg p-4 shadow-[0px_4px_4px_0px_#00000040]"
              >
                <div className="flex justify-between mb-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded">
                    {item.icon}
                  </div>

                  <div className="flex gap-2">
                    <Edit
                      size={16}
                      className="text-purple-600 cursor-pointer"
                      onClick={() => {
                        setMode("edit");
                        setSelectedSubCategory({
                          name: item.title,
                        });
                        setOpenSub(true);
                      }}
                    />
                    <Trash2
                      size={16}
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        setSelectedItem(item);
                        setDeleteOpen(true);
                      }}
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{item.count}</p>

                <p className="flex items-center gap-1 text-purple-600 text-xs cursor-pointer">
                  View Roles <ChevronRight size={14}
                  onClick={()=>navigate("/view-roles")}
                   />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
      <SubCategoryModal
        open={openSub}
        setOpen={setOpenSub}
        mode={mode}
        initialData={selectedSubCategory}
      />
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ViewJobSeekerManagement;
