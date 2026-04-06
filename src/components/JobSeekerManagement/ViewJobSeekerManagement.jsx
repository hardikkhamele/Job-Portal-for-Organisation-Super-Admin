import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Search, Trash2, Edit, ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SubCategoryModal from "../common/SubCategoryModal";
import DeleteModal from "../common/DeleteModal";
import {
  getSubCategoriesByCategoryId,
  deleteSubCategory,
  setActiveSubCategoryId,
} from "../../redux/slice/category/categorySlice";

function ViewJobSeekerManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subCategories, subCategoriesLoading, subCategoryActionLoading, activeCategoryId } =
    useSelector((state) => state.category);

  const [openSub, setOpenSub] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (activeCategoryId) dispatch(getSubCategoriesByCategoryId(activeCategoryId));
  }, [activeCategoryId, dispatch]);

  const filtered = subCategories.filter((s) =>
    s.subCategoryName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    if (itemToDelete) {
      dispatch(deleteSubCategory(itemToDelete.id)).then(() => {
        setDeleteOpen(false);
        setItemToDelete(null);
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="border rounded-full p-2 cursor-pointer hover:bg-gray-100" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </div>
          <h2 className="text-xl font-semibold">Job Seeker Management</h2>
        </div>
        <hr className="border-gray-300 mt-2 mb-5" />

        <div className="border border-gray-300 rounded-lg p-6">
          <div className="flex justify-between mb-6">
            <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-65 h-11">
              <Search size={18} className="text-[#D3D3D3] mr-2" />
              <input
                type="text"
                placeholder="Search sub-categories..."
                className="bg-transparent outline-none text-sm w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => { setMode("create"); setSelectedSubCategory(null); setOpenSub(true); }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              + Create Sub-Category
            </button>
          </div>

          {subCategoriesLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-purple-600" size={36} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No sub-categories found.</div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div key={item.id} className="border border-gray-300 rounded-lg p-4 shadow-[0px_4px_4px_0px_#00000040]">
                  <div className="flex justify-between mb-3">
                    {item.image ? (
                      <img src={item.image} alt={item.subCategoryName} className="w-10 h-10 rounded object-cover" />
                    ) : (
                      <div className="bg-purple-100 text-purple-600 p-2 rounded">
                        <Edit size={20} />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Edit
                        size={16}
                        className="text-purple-600 cursor-pointer"
                        onClick={() => { setMode("edit"); setSelectedSubCategory(item); setOpenSub(true); }}
                      />
                      <Trash2
                        size={16}
                        className="text-red-500 cursor-pointer"
                        onClick={() => { setItemToDelete(item); setDeleteOpen(true); }}
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm">{item.subCategoryName}</h3>
                  {item.description && <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.description}</p>}
                  <p
                    className="flex items-center gap-1 text-purple-600 text-xs cursor-pointer mt-2"
                    onClick={() => { dispatch(setActiveSubCategoryId(item.id)); navigate("/view-roles"); }}
                  >
                    View Roles <ChevronRight size={14} />
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <SubCategoryModal
        open={openSub}
        setOpen={setOpenSub}
        mode={mode}
        initialData={selectedSubCategory}
        categoryId={activeCategoryId}
      />
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => { setDeleteOpen(false); setItemToDelete(null); }}
        onConfirm={handleDelete}
        loading={subCategoryActionLoading}
      />
    </div>
  );
}

export default ViewJobSeekerManagement;