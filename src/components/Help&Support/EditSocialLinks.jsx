import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSocialLinks,
  updateSocialLinks,
  resetSocialLinksState,
} from "../../redux/slice/helpAndSupport/socialLinksSlice";
import { toast } from "react-toastify";

const FIELDS = [
  { label: "Official Website", key: "officialWebsite", placeholder: "https://www.officialwebsite.com/" },
  { label: "Facebook",         key: "facebook",        placeholder: "https://www.facebook.com/" },
  { label: "Instagram",        key: "instagram",       placeholder: "https://www.instagram.com/" },
  { label: "WhatsApp",         key: "whatsapp",        placeholder: "https://web.whatsapp.com/" },
  { label: "Twitter",          key: "twitter",         placeholder: "https://x.com/" },
];

const EditSocialLinks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, updateLoading, updateSuccess, error } = useSelector(
    (state) => state.socialLinks
  );

  const [form, setForm] = useState({
    officialWebsite: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
    twitter: "",
  });

  // Fetch existing social links on mount
  useEffect(() => {
    dispatch(fetchSocialLinks());
  }, [dispatch]);

  // Populate form when data loads
  useEffect(() => {
    if (data) {
      setForm({
        officialWebsite: data.officialWebsite || "",
        facebook:        data.facebook        || "",
        instagram:       data.instagram       || "",
        whatsapp:        data.whatsapp        || "",
        twitter:         data.twitter         || "",
      });
    }
  }, [data]);

  // Handle success / error
  useEffect(() => {
    if (updateSuccess) {
      dispatch(resetSocialLinksState());
      navigate(-1);
    }
    if (error) {
      dispatch(resetSocialLinksState());
    }
  }, [updateSuccess, error, dispatch, navigate]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Basic check — at least one link must be filled
    const hasValue = Object.values(form).some((v) => v.trim() !== "");
    if (!hasValue) {
      toast.warning("Please enter at least one social link.");
      return;
    }
    dispatch(updateSocialLinks(form));
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen pb-20">
      <div className="bg-white rounded-xl p-6 shadow">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-black cursor-pointer" />
          </button>
          <h2 className="text-2xl font-bold">Edit Social Links</h2>
        </div>

        <hr className="mb-6 border-gray-300" />

        {/* Form */}
        <div className="border border-gray-200 rounded-lg p-6 space-y-6">
          {FIELDS.map((field) => (
            <div key={field.key} className="grid grid-cols-2 gap-6">
              {/* Left — platform name (read-only) */}
              <div>
                <label className="text-lg text-gray-900">Select Social Media</label>
                <input
                  type="text"
                  value={field.label}
                  readOnly
                  className="w-full mt-3 p-3 border border-gray-200 rounded-md bg-[#F7F8F9] text-sm text-[#666666] outline-none"
                />
              </div>

              {/* Right — editable link */}
              <div>
                <label className="text-lg text-gray-900">Add Link</label>
                <input
                  type="text"
                  value={form[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full mt-3 p-3 border border-gray-200 rounded-md bg-[#F7F8F9] text-sm text-[#666666] outline-none focus:border-purple-400"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate(-1)}
            disabled={updateLoading}
            className="px-15 py-2 rounded-md bg-purple-200 text-purple-700 cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={updateLoading}
            className="px-15 py-2 rounded-md bg-purple-700 text-white cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            {updateLoading ? (
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
      <Footer />
    </div>
  );
};

export default EditSocialLinks;