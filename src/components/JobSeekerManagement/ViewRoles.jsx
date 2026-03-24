import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Edit,
  Trash2,
  Smartphone,
  Globe,
  Code,
  Monitor,
  Server,
  Layers,
  Cpu,
  Database,
  Gamepad2,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DesignationModal from "../common/DesignationModal";
import DeleteModal from "../common/DeleteModal";
function ViewRoles() {
  const navigate = useNavigate();
  const [openDesignation, setOpenDesignation] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = () => {
    console.log("Deleted:", selectedItem);

    setDeleteOpen(false);
  };

  const roles = [
    { title: "Android Developer", icon: <Smartphone size={20} /> },
    { title: "iOS Developer", icon: <Smartphone size={20} /> },
    { title: "Web Developer", icon: <Globe size={20} /> },
    { title: "Frontend Developer", icon: <Monitor size={20} /> },
    { title: "Backend Developer", icon: <Server size={20} /> },
    { title: "Full Stack Developer", icon: <Layers size={20} /> },
    { title: "React Developer", icon: <Code size={20} /> },
    { title: "Node.js Developer", icon: <Cpu size={20} /> },
    { title: "Python Developer", icon: <Database size={20} /> },
    { title: "Java Developer", icon: <Code size={20} /> },
    { title: "Mobile App Developer", icon: <Smartphone size={20} /> },
    { title: "Game Developer", icon: <Gamepad2 size={20} /> },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Container */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            onClick={() => navigate(-1)}
            className="border rounded-full p-2 cursor-pointer hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
          </div>
          <h2 className="text-xl font-semibold">Job seeker Management</h2>
        </div>

        <hr className="border-gray-300 mt-2 mb-5" />

        {/* Box */}
        <div className="border border-gray-300 rounded-lg p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            {/* Search */}
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-64 bg-gray-50">
              <Search size={16} className="text-gray-400 mr-2" />
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
                setSelectedDesignation(null);
                setOpenDesignation(true);
              }}
            >
              Create Designation
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-6">
            {roles.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-[#D3D3D3] rounded-lg p-4 shadow-[0px_4px_4px_0px_#00000040]"
              >
                {/* Top */}
                <div className="flex justify-between items-center mb-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-md">
                    {item.icon}
                  </div>

                  <div className="flex gap-2">
                    <Edit
                      size={16}
                      className="text-purple-600 cursor-pointer"
                      onClick={() => {
                        setMode("edit");
                        setSelectedDesignation({
                          name: item.title,
                        });
                        setOpenDesignation(true);
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

                {/* Title */}
                <h3 className="font-semibold text-sm mb-2">{item.title}</h3>

                {/* View */}
                <p className="flex items-center gap-1 text-purple-600 text-xs cursor-pointer"
                onClick={() => navigate("/candidate-job-view")}
                >
                  View <ChevronRight size={15}/>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DesignationModal
        open={openDesignation}
        setOpen={setOpenDesignation}
        mode={mode}
        initialData={selectedDesignation}
      />
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ViewRoles;
