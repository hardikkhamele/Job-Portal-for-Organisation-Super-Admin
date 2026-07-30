import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../redux/slice/blogManagement/addBlog";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.blog);

  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", image: null });
  const [errors, setErrors] = useState({ title: "", description: "" });

  const validate = () => {
    let valid = true;
    const newErrors = { title: "", description: "" };

    const titleText = form.title.trim();
    if (!titleText) {
      newErrors.title = "Blog Title is required";
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(titleText)) {
      newErrors.title = "Only alphabets are allowed";
      valid = false;
    }

    const strippedDescription = form.description.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
    if (!strippedDescription) {
      newErrors.description = "Description is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.description);
    if (form.image) {
      formData.append("image", form.image);
    }

    const result = await dispatch(createBlog(formData));
    if (createBlog.fulfilled.match(result)) {
      navigate("/blog-management");
    }
  };

  return (
    <div className="w-full bg-[#F4F6FA] min-h-screen p-6">
      <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden pb-8">
        <div className="bg-white px-8 py-5 border-b border-gray-100 flex items-center gap-4">
          <button
            onClick={() => navigate("/blog-management")}
            className="p-1.5 hover:bg-gray-100 rounded-full transition cursor-pointer"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Add New Blog</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-500 mb-2">Blog Title</label>
            <input
              type="text"
              required
              placeholder="Enter blog title..."
              className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:border-purple-400 outline-none transition ${
                errors.title ? "border-red-500" : "border-gray-200"
              }`}
              value={form.title}
              onChange={(e) => {
                const val = e.target.value;
                setForm({ ...form, title: val });
                let err = "";
                if (!val.trim()) err = "Blog Title is required";
                else if (!/^[A-Za-z\s]+$/.test(val)) err = "Only alphabets are allowed";
                setErrors((prev) => ({ ...prev, title: err }));
              }}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-500 mb-2">Description</label>
            {/* 
              FIX: Don't set a fixed height on the wrapper div.
              Instead, let Quill's editor area (.ql-editor) have the fixed height via the style prop.
              The `mb-10` accounts for the Quill toolbar height so content below doesn't overlap.
            */}
            <div className={`border rounded-lg overflow-hidden mb-10 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}>
              <ReactQuill
                theme="snow"
                value={form.description}
                onChange={(content) => {
                  setForm({ ...form, description: content });
                  const stripped = content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
                  let err = "";
                  if (!stripped) err = "Description is required";
                  setErrors((prev) => ({ ...prev, description: err }));
                }}
                modules={modules}
                placeholder="Write content here..."
                style={{ height: "280px" }}
              />
            </div>
            {errors.description && <p className="text-red-500 text-xs mt-1 -mt-8 mb-8">{errors.description}</p>}
          </div>

          <div className="pt-2">
            <label className="block text-sm font-bold text-gray-500 mb-2">Banner Image</label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center">
              {preview ? (
                <div className="relative w-full max-w-xs h-32">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => { setPreview(null); setForm({ ...form, image: null }); }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full text-[10px]"
                  >✕</button>
                </div>
              ) : (
                <label className="flex flex-col items-center py-4 cursor-pointer w-full text-center">
                  <Upload size={20} className="text-purple-500 mb-2" />
                  <span className="text-xs font-medium text-gray-600">Upload Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-6">
            <button
              type="button"
              onClick={() => navigate("/blog-management")}
              className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
            >Discard</button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-[#A855F7] text-white rounded-lg text-sm font-bold hover:bg-purple-700 shadow-md disabled:opacity-70 flex items-center gap-2"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;