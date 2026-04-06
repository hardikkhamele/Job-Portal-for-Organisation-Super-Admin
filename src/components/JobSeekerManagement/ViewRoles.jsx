import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Search, Edit, Trash2, ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DesignationModal from "../common/DesignationModal";
import DeleteModal from "../common/DeleteModal";
import {
  getDesignationsBySubCategoryId,
  deleteDesignation,
} from "../../redux/slice/category/categorySlice";

function ViewRoles() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { designations, designationsLoading, designationActionLoading, activeSubCategoryId } =
    useSelector((state) => state.category);

  const [openDesignation, setOpenDesignation] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (activeSubCategoryId) dispatch(getDesignationsBySubCategoryId(activeSubCategoryId));
  }, [activeSubCategoryId, dispatch]);

  const filtered = designations.filter((d) =>
    d.designationName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    if (itemToDelete) {
      dispatch(deleteDesignation(itemToDelete.id)).then(() => {
        setDeleteOpen(false);
        setItemToDelete(null);
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-3">
          <div onClick={() => navigate(-1)} className="border rounded-full p-2 cursor-pointer hover:bg-gray-100">
            <ArrowLeft size={18} />
          </div>
          <h2 className="text-xl font-semibold">Job Seeker Management</h2>
        </div>
        <hr className="border-gray-300 mt-2 mb-5" />

        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-64 bg-gray-50">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search designations..."
                className="bg-transparent outline-none text-sm w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-md"
              onClick={() => { setMode("create"); setSelectedDesignation(null); setOpenDesignation(true); }}
            >
              + Create Designation
            </button>
          </div>

          {designationsLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-purple-600" size={36} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No designations found.</div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div key={item.id} className="bg-white border border-[#D3D3D3] rounded-lg p-4 shadow-[0px_4px_4px_0px_#00000040]">
                  <div className="flex justify-between items-center mb-3">
                    {item.image ? (
                      <img src={item.image} alt={item.designationName} className="w-10 h-10 rounded object-cover" />
                    ) : (
                      <div className="bg-purple-100 text-purple-600 p-2 rounded-md">
                        <Edit size={20} />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Edit
                        size={16}
                        className="text-purple-600 cursor-pointer"
                        onClick={() => { setMode("edit"); setSelectedDesignation(item); setOpenDesignation(true); }}
                      />
                      <Trash2
                        size={16}
                        className="text-red-500 cursor-pointer"
                        onClick={() => { setItemToDelete(item); setDeleteOpen(true); }}
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{item.designationName}</h3>
                  {item.description && <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</p>}
                  <p
                    className="flex items-center gap-1 text-purple-600 text-xs cursor-pointer"
                    onClick={() => navigate("/candidate-job-view")}
                  >
                    View <ChevronRight size={15} />
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DesignationModal
        open={openDesignation}
        setOpen={setOpenDesignation}
        mode={mode}
        initialData={selectedDesignation}
        categoryId={useSelector((s) => s.category.activeCategoryId)}
        subCategoryId={activeSubCategoryId}
      />
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => { setDeleteOpen(false); setItemToDelete(null); }}
        onConfirm={handleDelete}
        loading={designationActionLoading}
      />
    </div>
  );
}

export default ViewRoles;