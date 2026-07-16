import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrowLeft } from "lucide-react";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { updateTermsAndService, clearTermsState } from "../../redux/slice/terms/termsSlice";
import { toast } from "react-toastify";

// ─── JobSeeker Terms & Service document ID ────────────────────────────────────
// Replace with the actual document ID from your backend for the JobSeeker T&S
const JOBSEEKER_TERMS_ID = "jobseeker";

const EditJobSeeker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.terms);

  const [value, setValue] = useState(`
    <p>1) Users must be at least 18 years old or the minimum age required for employment in their jurisdiction.</p>
    <p>2) Users must provide accurate and truthful information during registration and when using the App.</p>
    <p>3) Users are required to create an account to access certain features of the App.</p>
    <p>4) Users are responsible for keeping their account information secure and confidential.</p>
    <p>5) The App is not liable for any unauthorized access to your account resulting from your negligence.</p>
    <p>6) Provide accurate and up-to-date information in their profiles, resumes, and applications.</p>
    <p>7) Apply only for positions are qualified for and genuinely interested in.</p>
    <p>8) Refrain from engaging in any fraudulent or unethical activities.</p>
    <p>9) Job Seekers agree to:</p>
    <p>a. Provide accurate and up-to-date information in their profiles, resumes, and applications.</p>
    <p>b. Apply only for positions they are qualified for and genuinely interested in.</p>
    <p>c. Refrain from engaging in any fraudulent or unethical activities.</p>
  `);

  //  MODULES
  const modules = {
    toolbar: [
      // Row 1
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],

      // Row 2
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],

      // Row 3
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  //  FORMATS
  const formats = [
    "font", "size",
    "bold", "italic", "underline", "strike",
    "color", "background",
    "script",
    "blockquote", "code-block",
    "header",
    "list", "bullet",
    "indent",
    "align",
    "link", "image", "video",
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
    dispatch(updateTermsAndService({ id: JOBSEEKER_TERMS_ID, content: value }));
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      
      {/* MAIN CONTAINER */}
      <div className="w-full bg-white rounded-xl shadow-md p-6">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">

              {/* ICON */}
              <div
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-100"
              >
                <ArrowLeft size={25} className="text-black" />
              </div>

              {/* TEXT */}
              <h1 className="text-2xl font-bold">
                Edit Terms &amp; Service For Job Seeker
              </h1>

            </div>

        <hr className="mb-5" />

        {/* Editor */}
        <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[450px]">
          <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
              formats={formats}
              className="custom-quill"
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

export default EditJobSeeker;