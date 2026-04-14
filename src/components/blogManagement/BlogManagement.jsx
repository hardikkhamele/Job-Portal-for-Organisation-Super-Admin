import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  deleteBlog,
} from "../../redux/slice/blogManagement/getBlog";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Footer from "../Footer";

const PAGE_SIZE = 10;

const BlogManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux State
  const { blogs, loading } = useSelector((state) => state.getblog);

  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Filtering based on API response structure
  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paginated = filtered.slice(
    pageIndex * PAGE_SIZE,
    (pageIndex + 1) * PAGE_SIZE,
  );

  const startRange = pageIndex * PAGE_SIZE + 1;
  const endRange = Math.min((pageIndex + 1) * PAGE_SIZE, total);

  const handleView = (id) => navigate(`/view-blog/${id}`);
  const handleEdit = (id) => navigate(`/edit-blog/${id}`);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-2xl font-bold text-black">Blog Management</h4>
          <hr className="border-gray-300 mt-3 mb-5" />

          <div className="border border-[rgba(211,211,211,1)] rounded-lg p-6">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-64 h-11 focus-within:border-purple-400 transition">
                <Search size={18} className="text-[#D3D3D3] mr-2" />
                <input
                  type="text"
                  placeholder="Search Blog..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPageIndex(0);
                  }}
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>

              <button
                className="bg-[rgba(211,171,42,1)] rounded-lg hover:bg-yellow-600 text-white px-5 py-2 text-sm font-medium transition cursor-pointer shadow-sm"
                onClick={() => navigate("/add-blog")}
              >
                Create Blog
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="py-3 px-4 font-semibold text-sm">Sr.No.</th>
                    <th className="py-3 px-4 font-semibold text-sm text-left">
                      Title
                    </th>
                    <th className="py-3 px-4 font-semibold text-sm text-left">
                      Description
                    </th>
                    <th className="py-3 px-4 font-semibold text-sm">Date</th>
                    <th className="py-3 px-4 font-semibold text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-purple-600">
                        Loading...
                      </td>
                    </tr>
                  ) : paginated.length > 0 ? (
                    paginated.map((blog, idx) => (
                      <tr
                        key={blog._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          {pageIndex * PAGE_SIZE + idx + 1}
                        </td>
                        <td className="py-4 px-4 text-gray-800 text-left font-semibold">
                          {blog.title}
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-left font-semibold text-sm ">
                          {blog.content}
                        </td>
                        <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-center gap-4 text-purple-600">
                            <Eye
                              size={18}
                              className="cursor-pointer hover:opacity-70"
                              onClick={() => handleView(blog._id)}
                            />
                            <Edit
                              size={18}
                              className="cursor-pointer hover:opacity-70"
                              onClick={() => handleEdit(blog._id)}
                            />
                            <Trash2
                              size={18}
                              className="cursor-pointer text-red-500 hover:opacity-70"
                              onClick={() => handleDelete(blog._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-10 text-gray-400 italic">
                        No blogs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination UI */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-[14px] text-[#A855F7] font-medium">
                Showing {total > 0 ? `${startRange} to ${endRange}` : "0"} of{" "}
                {total} Blogs
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                  disabled={pageIndex === 0}
                  className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 disabled:opacity-30 hover:bg-gray-50"
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(pageCount)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPageIndex(i)}
                    className={`w-9 h-9 rounded-full text-sm font-bold transition ${
                      pageIndex === i
                        ? "bg-[#A855F7] text-white"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setPageIndex((p) => Math.min(pageCount - 1, p + 1))
                  }
                  disabled={pageIndex >= pageCount - 1}
                  className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center text-[#A855F7] disabled:opacity-30 hover:bg-gray-50"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BlogManagement;
