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
import ConfirmationModel from "../../components/common/ConfirmationModel";

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const BlogManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blogs, loading, pagination } = useSelector((state) => state.getblog);
  // pagination shape from slice: { currentPage, pageSize, totalRecords, totalPages, hasNextPage, hasPrevPage }
  const {
    currentPage = 1,
    totalPages = 1,
    totalRecords = 0,
    hasNextPage = false,
    hasPrevPage = false,
    pageSize = 10,
  } = pagination || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch whenever page changes
  useEffect(() => {
    dispatch(fetchBlogs(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    dispatch(fetchBlogs(page));
  };

  // Client-side search filters only the current page's loaded blogs
  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Derived display range (based on server pagination)
  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, totalRecords);

  const handleView = (id) => navigate(`/view-blog/${id}`);
  const handleEdit = (id) => navigate(`/edit-blog/${id}`);

  const openDeleteModal = (id) => {
    setSelectedBlogId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    await dispatch(deleteBlog(selectedBlogId));
    setIsDeleting(false);
    setIsModalOpen(false);
    setSelectedBlogId(null);
    // After delete, re-fetch current page (deleteBlog already calls fetchBlogs() internally,
    // but if this was the last item on the page, go back one page)
    const newPage = filtered.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
    dispatch(fetchBlogs(newPage));
  };

  // Ellipsis page number builder
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-2xl font-bold text-black">Blog Management</h4>
          <hr className="border-gray-300 mt-3 mb-5" />

          <div className="border border-[rgba(211,211,211,1)] rounded-lg p-6">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center border border-[#D3D3D3] rounded-lg px-4 bg-[#F7F8F9] w-64 h-11 focus-within:border-purple-400 transition">
                <Search size={18} className="text-[#D3D3D3] mr-2" />
                <input
                  type="text"
                  placeholder="Search Blog..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="py-3 px-4 font-semibold text-sm">Sr.No.</th>
                    <th className="py-3 px-4 font-semibold text-sm text-left">Title</th>
                    <th className="py-3 px-4 font-semibold text-sm text-left">Description</th>
                    <th className="py-3 px-4 font-semibold text-sm">Date</th>
                    <th className="py-3 px-4 font-semibold text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-purple-600">Loading...</td>
                    </tr>
                  ) : filtered.length > 0 ? (
                    filtered.map((blog, idx) => (
                      <tr
                        key={blog._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          {/* Serial number accounts for server page offset */}
                          {(currentPage - 1) * pageSize + idx + 1}
                        </td>
                        <td className="py-4 px-4 text-gray-800 text-left font-semibold">
                          {blog.title}
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-left font-medium text-sm max-w-[300px] truncate">
                          {stripHtml(blog.content)}
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
                              onClick={() => openDeleteModal(blog._id)}
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

            {/* Pagination Footer */}
            <div className="flex justify-between items-center mt-6">
              {/* Range info */}
              <p className="text-[14px] text-[#A855F7] font-medium">
                {totalRecords > 0
                  ? `Showing ${startRange} to ${endRange} of ${totalRecords} Blogs`
                  : "No Blogs"}
              </p>

              {/* Page controls */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  {/* Prev */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!hasPrevPage}
                    className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 disabled:opacity-30 hover:bg-gray-50 transition"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {/* Page Numbers with ellipsis */}
                  {getPageNumbers().map((page, idx) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm select-none"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-9 h-9 rounded-full text-sm font-bold transition ${
                          currentPage === page
                            ? "bg-[#A855F7] text-white shadow-sm"
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  {/* Next */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNextPage}
                    className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center text-[#A855F7] disabled:opacity-30 hover:bg-gray-50 transition"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <ConfirmationModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone and the blog will be permanently removed."
        loading={isDeleting}
      />
    </div>
  );
};

export default BlogManagement;