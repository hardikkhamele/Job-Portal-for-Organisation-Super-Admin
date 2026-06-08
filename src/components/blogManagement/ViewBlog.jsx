import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogById,
  setSingleBlogFromState,
} from "../../redux/slice/blogManagement/getBlog";
import { ArrowLeft, Calendar, BookOpen, Loader2 } from "lucide-react";

const ViewBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleBlog, loading, blogs } = useSelector((state) => state.getblog);

  useEffect(() => {
    if (id) {
      const existingBlog = blogs.find((b) => b._id === id);
      if (existingBlog) {
        dispatch(setSingleBlogFromState(id));
      } else {
        dispatch(fetchBlogById(id));
      }
    }
  }, [id, dispatch, blogs]);

  if (loading && !singleBlog) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#F4F6FA]">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    );
  }

  if (!singleBlog) {
    return (
      <div className="w-full text-center py-20 text-gray-500 bg-[#F4F6FA] min-h-screen">
        <p>Blog data not available.</p>
        <button
          onClick={() => navigate("/blog-management")}
          className="text-purple-600 underline mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F4F6FA] min-h-screen p-3 flex justify-center items-start">
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-white px-8 py-5 border-b border-gray-100 flex items-center gap-4">
          <button
            onClick={() => navigate("/blog-management")}
            className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
          >
            <ArrowLeft size={25} className="text-black" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">View Blog Details</h2>
        </div>

        <div className="p-8 space-y-8">
          {/* Blog Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2">
              Blog Title
            </label>
            <div className="w-full border border-gray-100 rounded-lg px-4 py-3 text-lg font-bold text-gray-800 bg-[#F9FAFB]">
              {singleBlog.title}
            </div>
          </div>

          {/* Published Date */}
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-semibold text-gray-500 mb-2">
              Published Date
            </label>
            <div className="flex items-center gap-2 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 bg-[#F9FAFB]">
              <Calendar size={16} className="text-purple-500" />
              {new Date(singleBlog.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>

          {/* Blog Content Section - FIXED FOR LISTS */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2">
              Content
            </label>
            <div
              className="w-full border border-gray-100 rounded-lg px-6 py-5 text-sm leading-relaxed text-gray-700 bg-[#F9FAFB] min-h-[200px] blog-view-content"
              dangerouslySetInnerHTML={{ __html: singleBlog.content }}
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2">
              Featured Image
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-[#F9FAFB] flex flex-col items-center justify-center min-h-[300px]">
              {singleBlog.image ? (
                <img
                  src={singleBlog.image}
                  alt="Blog"
                  className="max-w-full h-auto max-h-[500px] rounded-lg shadow-md object-contain"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <BookOpen size={48} className="mx-auto mb-2 opacity-20" />
                  <p>No featured image found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;