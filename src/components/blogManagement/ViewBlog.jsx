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
      // Step 1: Pehle check karo kya hamare paas list mein ye blog pehle se hai?
      const existingBlog = blogs.find((b) => b._id === id);

      if (existingBlog) {
        dispatch(setSingleBlogFromState(id));
      } else {
        // Step 2: Agar list khali hai (jaise refresh karne par), tabhi API call karo
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
    <div className="w-full bg-[#F4F6FA] min-h-screen p-6 flex justify-center items-start">
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-white px-8 py-5 border-b border-gray-100 flex items-center gap-4">
          <button
            onClick={() => navigate("/blog-management")}
            className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <ArrowLeft size={22} className="text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">View Blog Details</h2>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <label className="block text-sm font-semibold text-gray-600  mb-2">
              Blog Title
            </label>
            <div className="w-full border border-gray-100 rounded-lg px-4 py-3 text-lg font-bold text-gray-800 bg-[#F9FAFB]">
              {singleBlog.title}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-600  mb-2">
                Published Date
              </label>
              <div className="flex items-center gap-2 w-full border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 bg-[#F9FAFB]">
                <Calendar size={16} className="text-purple-500" />
                {new Date(singleBlog.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600  mb-2">
              Content
            </label>
            <div className="w-full border border-gray-100 rounded-lg px-4 py-3 text-sm leading-relaxed text-gray-600 bg-[#F9FAFB] min-h-[150px] whitespace-pre-line">
              {singleBlog.content}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600  mb-2">
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
                  <p>No image available</p>
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
