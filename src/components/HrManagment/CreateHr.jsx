import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import useCreateHr from "../../hooks/hr/useCreateHr";

function CreateHR() {
  const navigate = useNavigate();
  const { createHr, loading } = useCreateHr();

  const [formData, setFormData] = useState({
    hrName: "",
    designation: "",
    email: "",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createHr(formData);
    if (result) {
      // Navigate to the specific HR Management route on success
      navigate("/hr-management"); 
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#EDEDED] p-4">
      <div className="w-full bg-white rounded-xl p-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center bg-white"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Create HR</h1>
        </div>

        <div className="border-t border-gray-300 mt-4 mb-6"></div>

        <div className="border border-gray-300 rounded-lg p-6 min-h-[500px] flex flex-col justify-between">
          
          <form
            id="hrForm"
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-x-10 gap-y-6"
          >
            {/* HR Name */}
            <div>
              <label className="text-sm text-gray-700">HR Name</label>
              <input
                type="text"
                name="hrName"
                placeholder="Enter HR Name"
                value={formData.hrName}
                onChange={handleChange}
                className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
                required
              />
            </div>

            {/* Designation */}
            <div>
              <label className="text-sm text-gray-700">Designation</label>
              <input
                type="text"
                name="designation"
                placeholder="Enter Designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-700">Email id</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Id"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
                required
              />
            </div>

            {/* Upload Image */}
            <div className="col-span-2">
              <label className="text-sm text-gray-700">Upload Image</label>
              <div className="relative mt-2 w-[320px]">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm file:hidden focus:outline-none"
                />
                <Upload
                  size={18}
                  className="absolute right-3 top-3 text-purple-600 pointer-events-none"
                />
              </div>
              {formData.image && (
                <p className="text-xs text-green-600 mt-1">
                  Selected: {formData.image.name}
                </p>
              )}
            </div>
          </form>

          {/* Buttons */}
          <div className="flex justify-center gap-8 mt-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-12 py-2 rounded-md bg-purple-200 text-purple-700 font-medium"
            >
              Cancel
            </button>

            <button
              form="hrForm"
              type="submit"
              disabled={loading}
              className={`px-12 py-2 rounded-md bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          Copyright © 2024 TechnoHire. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default CreateHR;