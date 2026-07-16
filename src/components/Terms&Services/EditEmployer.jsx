import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrowLeft } from "lucide-react";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { updateTermsAndService, clearTermsState } from "../../redux/slice/terms/termsSlice";
import { toast } from "react-toastify";

// ─── Employer Terms & Service document ID ─────────────────────────────────────
// Replace with the actual document ID from your backend for the Employer T&S
const EMPLOYER_TERMS_ID = "employer";

const EditEmployer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.terms);

  const [value, setValue] = useState(`
    <p>1) Employers must be legally authorized to hire and operate in their jurisdiction.</p>
    <p>2) Employers must provide accurate, complete, and up-to-date company information during registration and usage of the platform.</p>
    <p>3) Employers must not post misleading, discriminatory, or fraudulent job listings.</p>
    <p>4) The platform is not responsible for hiring decisions, candidate performance, or employment outcomes.</p>
    <p>5) Job credits and subscription plans are non-transferable and subject to the platform's billing policy.</p>
    <p>6) Employers agree to use candidate data solely for recruitment purposes and handle it confidentially.</p>
    <p>7) Any misuse of the platform, including spamming candidates or unethical hiring practices, may result in account suspension.</p>
  `);

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "font","size","bold","italic","underline","strike",
    "color","background","script",
    "blockquote","code-block","header",
    "list","bullet","indent","align",
    "link","image","video"
  ];

  // ─── Handle success / error toasts ───────────────────────────────────────────
  useEffect(() => {
    if (success) {
      toast.success("Terms And Service updated successfully!");
      dispatch(clearTermsState());
      navigate(-1);
    }
    if (error) {
      toast.error(error || "Failed to update Terms And Service");
      dispatch(clearTermsState());
    }
  }, [success, error, dispatch, navigate]);

  // ─── Handle Save ─────────────────────────────────────────────────────────────
  const handleSave = () => {
    if (!value || value === "<p><br></p>") {
      toast.warning("Content cannot be empty.");
      return;
    }
    dispatch(updateTermsAndService({ id: EMPLOYER_TERMS_ID, content: value }));
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <div className="bg-white rounded-xl shadow-md p-6">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <div
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft size={25} />
          </div>

          <h1 className="text-2xl font-bold">
            Edit Terms &amp; Service For Employer
          </h1>
        </div>

        <hr className="mb-5 " />

        {/* EDITOR */}
        <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[450px] ">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
            className="custom-quill "
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate(-1)}
            disabled={loading}
            className="bg-purple-200 text-purple-700 px-15 py-2 rounded-md cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-purple-700 text-white px-15 py-2 rounded-md cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>

      </div>
      <Footer/>
    </div>
  );
};

export default EditEmployer;