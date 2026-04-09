import React from "react";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const SocialLinks = () => {
  const navigate = useNavigate();
  return (
     <div className="p-5 bg-gray-100 min-h-screen pb-20">
      <div className="bg-white rounded-xl p-6 shadow">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">
          Social Links
        </h2>
        {/* Divider */}
        <hr className="mb-6 border-gray-300" />
        {/* Inner Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {/* Row */}
          {[
            { name: "Official Website", link: "https://www.officialwebsite.com/" },
            { name: "Facebook", link: "https://www.facebook.com/" },
            { name: "Instagram", link: "https://www.instagram.com/" },
            { name: "WhatsApp", link: "https://web.whatsapp.com/" },
            { name: "Twitter", link: "https://x.com/" },
          ].map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-6 mb-5">

              {/* Left */}
              <div>
                <label className="text-lg text-gray-900">
                  Select Social Media
                </label>
                <input
                  type="text"
                  value={item.name}
                  readOnly
                  className="w-full mt-3 p-3 border border-gray-200 rounded-md bg-[#F7F8F9] text-sm text-[#666666] outline-none"
                />
              </div>

              {/* Right */}
              <div>
                <label className="text-lg text-gray-900">
                  Add Link
                </label>
                <input
                  type="text"
                  value={item.link}
                  readOnly
                  className="w-full mt-3 p-3 border border-gray-200 rounded-md bg-[#F7F8F9] text-sm text-[#666666] outline-none"
                />
              </div>

            </div>
          ))}

        </div>

        {/* Button */}
        <div className="flex justify-center mt-6">
          <button 
           onClick={() => navigate("/edit-social-links")}
          className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-15 py-2 rounded-md shadow-sm cursor-pointer">
            Edit
          </button>
        </div>

      </div>
      <Footer/>
    </div>
  );
};

export default SocialLinks;