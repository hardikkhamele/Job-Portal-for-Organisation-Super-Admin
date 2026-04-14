import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogById,
  updateBlog,
  setSingleBlogFromState,
} from "../../redux/slice/blogManagement/getBlog";
import { ArrowLeft, Save, Upload, X, Loader2 } from "lucide-react";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleBlog, loading, blogs } = useSelector((state) => state.getblog);

  const [form, setForm] = useState({ title: "", description: "", image: null });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (id) {
      const existing = blogs.find((b) => b._id === id);
      existing
        ? dispatch(setSingleBlogFromState(id))
        : dispatch(fetchBlogById(id));
    }
  }, [id, dispatch, blogs]);

  useEffect(() => {
    if (singleBlog) {
      setForm({
        title: singleBlog.title,
        description: singleBlog.content,
        image: null,
      });
      setPreview(singleBlog.image);
    }
  }, [singleBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.description);
    if (form.image) formData.append("image", form.image);

    const res = await dispatch(updateBlog({ id, formData }));
    if (updateBlog.fulfilled.match(res)) navigate("/blog-management");
  };

  if (loading && !form.title)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="w-full bg-[#F4F6FA] min-h-screen p-6 flex justify-center items-start">
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-white px-8 py-5 border-b border-gray-100 flex items-center gap-4">
          <button
            onClick={() => navigate("/blog-management")}
            className="p-1.5 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={22} />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Edit Blog Details</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Update Title
            </label>
            <input
              type="text"
              required
              value={form.title}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-[#F9FAFB]"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Update Description
            </label>
            <textarea
              required
              rows={5}
              value={form.description}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-[#F9FAFB] resize-none"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Update Banner Image
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-[#F9FAFB] flex flex-col items-center justify-center min-h-[180px]">
              {preview ? (
                <div className="relative w-full max-w-sm h-48">
                  <img
                    src={preview}
                    className="w-full h-full object-cover rounded-lg"
                    alt="Preview"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setForm({ ...form, image: null });
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer">
                  <Upload size={32} className="text-purple-500 mb-2" />
                  <span className="text-sm font-medium text-gray-500">
                    Click to upload new image
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setForm({ ...form, image: file });
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8 pt-8 border-t">
            <button
              type="button"
              onClick={() => navigate("/blog-management")}
              className="px-8 py-2.5 bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-[#A855F7] text-white rounded-lg flex items-center gap-2"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}{" "}
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
