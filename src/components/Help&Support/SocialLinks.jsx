import React, { useEffect } from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSocialLinks } from "../../redux/slice/helpAndSupport/socialLinksSlice";

const FIELDS = [
  { label: "Official Website", key: "officialWebsite" },
  { label: "Facebook",         key: "facebook" },
  { label: "Instagram",        key: "instagram" },
  { label: "WhatsApp",         key: "whatsapp" },
  { label: "Twitter",          key: "twitter" },
];

const SocialLinks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, fetchLoading } = useSelector((state) => state.socialLinks);

  // Fetch social links on mount
  useEffect(() => {
    dispatch(fetchSocialLinks());
  }, [dispatch]);

  return (
     <div className="p-5 bg-gray-100 min-h-screen pb-20">
      <div className="bg-white rounded-xl p-6 shadow">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">Social Links</h2>
        {/* Divider */}
        <hr className="mb-6 border-gray-300" />

        {/* Inner Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {fetchLoading ? (
            <div className="flex justify-center py-10">
              <span className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : (
            FIELDS.map((field, index) => (
              <div key={index} className="grid grid-cols-2 gap-6 mb-5">
                {/* Left */}
                <div>
                  <label className="text-lg text-gray-900">Select Social Media</label>
                  <input
                    type="text"
                    value={field.label}
                    readOnly
                    className="w-full mt-3 p-3 border border-gray-200 rounded-md bg-[#F7F8F9] text-sm text-[#666666] outline-none"
                  />
                </div>

                {/* Right */}
                <div>
                  <label className="text-lg text-gray-900">Add Link</label>
                  <input
                    type="text"
                    value={data?.[field.key] || ""}
                    readOnly
                    className="w-full mt-3 p-3 border border-gray-200 rounded-md bg-[#F7F8F9] text-sm text-[#666666] outline-none"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/edit-social-links")}
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-15 py-2 rounded-md shadow-sm cursor-pointer"
          >
            Edit
          </button>
        </div>

      </div>
      <Footer/>
    </div>
  );
};

export default SocialLinks;