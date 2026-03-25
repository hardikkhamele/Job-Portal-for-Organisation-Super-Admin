import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../Footer";

const EditSocialLinks = () => {
  const navigate = useNavigate();

  return (
    
     <div className="p-10 bg-gray-100 min-h-screen pb-20">
      <div className="bg-white rounded-xl p-6 shadow">
      
     
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6 text-black cursor-pointer"  />
            </button>
            <h2 className="text-2xl font-bold">Edit Social Links</h2>
          </div>

          <hr className="mb-6" />

          {/* Form */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-6">

            {/* Row */}
            {[
              {
                name: "Official Website",
                placeholder: "https://www.officalwebsite.com/",
              },
              {
                name: "Facebook",
                placeholder: "https://www.facebook.com/",
              },
              {
                name: "Instagram",
                placeholder: "https://www.instagram.com/",
              },
              {
                name: "WhatsApp",
                placeholder: "https://web.whatsapp.com/",
              },
              {
                name: "Twitter",
                placeholder: "https://x.com/",
              },
            ].map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-6">
                
                {/* Left */}
                <div>
                  <label className="text-lg text-gray-900">
                    Select Social Media
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    readOnly
                    className="w-full mt-3 p-3 border border-gray-200 rounded-md p-2 bg-[#F7F8F9] text-sm text-[#666666] outline-none"
                  />
                </div>

                {/* Right */}
                <div>
                  <label className="text-lg text-gray-900">
                    Add Link
                  </label>
                  <input
                    type="text"
                    placeholder={item.placeholder}
                    className="w-full mt-3 p-3 border border-gray-200 rounded-md p-2 bg-[#F7F8F9] text-sm text-[#666666] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => navigate(-1)}
              className="px-15 py-2 rounded-md bg-purple-200 text-purple-700 cursor-pointer"
            >
              Cancel
            </button>

            <button 
            onClick={() => navigate(-1)}
            className="px-15 py-2 rounded-md bg-purple-700 text-white cursor-pointer">
              Save
            </button>
          </div>
       
      </div>

     <Footer/>
    </div>
  );
};

export default EditSocialLinks;