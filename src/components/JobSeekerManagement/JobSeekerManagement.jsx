import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Edit, Code, Briefcase, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import CreateCategoryModal from "../common/CreateCategoryModal";
import DeleteModal from "../common/DeleteModal";
import {
  getAllCategories,
  deleteCategory,
  setActiveCategoryId,
} from "../../redux/slice/category/categorySlice";

function JobSeekerManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, categoriesLoading, categoryActionLoading } = useSelector(
    (state) => state.category
  );

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const filtered = (categories || []).filter((c) =>
    c.categoryName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete.id)).then(() => {
        setDeleteOpen(false);
        setCategoryToDelete(null);
      });
    }
  };

  const getCategoryIcon = (name) => {
    if (name?.toLowerCase().includes("it") || name?.toLowerCase().includes("tech"))
      return <Code size={30} />;
    return <Briefcase size={30} />;
  };

  return (
    <div className="m-3 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-2">Job Seeker Management</h2>
        <hr className="border-gray-300 mt-2 mb-5" />

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-65 h-11">
            <Search size={20} className="text-[#D3D3D3] mr-2" />
            <input
              type="text"
              placeholder="Search categories..."
              className="bg-transparent outline-none text-sm w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-md"
            onClick={() => { setMode("create"); setSelectedCategory(null); setOpen(true); }}
          >
            + Create Category
          </button>
        </div>

        {/* Loading */}
        {categoriesLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-purple-600" size={36} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No categories found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cat) => (
              <div
                key={cat.id}
                className="bg-white border border-[#D3D3D3] shadow-[0px_4px_4px_0px_#00000040] rounded-lg p-5 relative"
              >
                <Edit
                  size={18}
                  className="absolute top-3 right-3 text-purple-600 cursor-pointer"
                  onClick={() => {
                    setMode("edit");
                    setSelectedCategory(cat);
                    setOpen(true);
                  }}
                />
                <div className="flex justify-center mb-3">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.categoryName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="bg-purple-600 text-white p-3 rounded-lg">
                      {getCategoryIcon(cat.categoryName)}
                    </div>
                  )}
                </div>
                <h3 className="text-center text-xl font-semibold mb-1">{cat.categoryName}</h3>
                {cat.description && (
                  <p className="text-center text-gray-500 text-sm mb-4 line-clamp-2">
                    {cat.description}
                  </p>
                )}
                <div className="flex gap-3 justify-center mt-3">
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-1 w-28 rounded transition cursor-pointer"
                    onClick={() => {
                      setMode("edit");
                      setSelectedCategory(cat);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-1 w-28 rounded transition cursor-pointer"
                    onClick={() => {
                      dispatch(setActiveCategoryId(cat.id));
                      navigate(`/job-seeker/view-job-seeker/${cat.id}`);
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateCategoryModal open={open} setOpen={setOpen} mode={mode} initialData={selectedCategory} />
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => { setDeleteOpen(false); setCategoryToDelete(null); }}
        onConfirm={handleDelete}
        loading={categoryActionLoading}
      />
    </div>
  );
}

export default JobSeekerManagement;