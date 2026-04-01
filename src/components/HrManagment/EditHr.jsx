// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, Upload } from "lucide-react";

// function CreateHR() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     designation: "",
//     email: "",
//     password: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData({ ...formData, image: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#EDEDED] p-4">
//       <div className="w-full bg-white rounded-xl p-6">

//         {/* Header */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center bg-white"
//           >
//             <ArrowLeft size={18} />
//           </button>
//           <h1 className="text-xl font-semibold text-gray-800">
//             Edit HR
//           </h1>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-gray-300 mt-4 mb-6"></div>

//         {/* Inner Form Box */}
//         <div className="border border-gray-300 rounded-lg p-6 min-h-[500px] flex flex-col justify-between">

//           {/* Form */}
//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-2 gap-x-10 gap-y-6"
//           >
//             {/* HR Name */}
//             <div>
//               <label className="text-sm text-gray-700">HR Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter HR Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
//               />
//             </div>

//             {/* Designation */}
//             <div>
//               <label className="text-sm text-gray-700">Designation</label>
//               <input
//                 type="text"
//                 name="designation"
//                 placeholder="Enter Designation"
//                 value={formData.designation}
//                 onChange={handleChange}
//                 className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-sm text-gray-700">Email id</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter Email Id"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-sm text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
//               />
//             </div>

//             {/* Upload Image */}
//             <div className="col-span-2">
//               <label className="text-sm text-gray-700">Upload Image</label>
//               <div className="relative mt-2 w-[320px]">
//                 <input
//                   type="file"
//                   name="image"
//                   onChange={handleChange}
//                   className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm file:hidden focus:outline-none"
//                 />
//                 <Upload
//                   size={18}
//                   className="absolute right-3 top-3 text-purple-600"
//                 />
//               </div>
//             </div>
//           </form>

//           {/* Buttons */}
//           <div className="flex justify-center gap-8 mt-10">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="px-12 py-2 rounded-md bg-purple-200 text-purple-700 font-medium"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className="px-12 py-2 rounded-md bg-gradient-to-r  from-purple-600 to-purple-800 text-white  font-medium"
//             >
//               Edit
//             </button>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center text-gray-500 text-sm mt-8">
//           Copyright © 2024 TechnoHire. All rights reserved.
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateHR;






import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import useUpdateHr from "../../hooks/hr/useUpdateHr";
function EditHR() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateHr, loading } = useUpdateHr();

  const existingHr = location.state?.hr;

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    password: "",
    image: null,
  });

  useEffect(() => {
    if (existingHr) {
      setFormData({
        name: existingHr.hrName || "",
        designation: existingHr.designation || "",
        email: existingHr.email || "",
        password: "", 
        image: existingHr.image?.url || null,
      });
    }
  }, [existingHr]);

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
    if (!existingHr?._id) return;

    const result = await updateHr(existingHr._id, formData);
    if (result) {
      navigate(-1);
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
          <h1 className="text-xl font-semibold text-gray-800">Edit HR</h1>
        </div>

        <div className="border-t border-gray-300 mt-4 mb-6"></div>

        <div className="border border-gray-300 rounded-lg p-6 min-h-[500px] flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-10 gap-y-6">
            <div>
              <label className="text-sm text-gray-700">HR Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter HR Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Designation</label>
              <input
                type="text"
                name="designation"
                placeholder="Enter Designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Id"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Password (Leave Blank To Keep Current)</label>
              <input
                type="password"
                name="password"
                placeholder="Enter New Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm text-gray-700">Upload Image</label>
              <div className="relative mt-2 w-[320px]">
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm file:hidden focus:outline-none"
                />
                <Upload size={18} className="absolute right-3 top-3 text-purple-600" />
              </div>
              {/* Image Preview Helper */}
              {typeof formData.image === "string" && (
                <p className="text-xs text-gray-400 mt-1">Current Image Exists</p>
              )}
            </div>
          </form>

          <div className="flex justify-center gap-8 mt-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-12 py-2 rounded-md bg-purple-200 text-purple-700 font-medium disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="px-12 py-2 rounded-md bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Updating..." : "Edit"}
            </button>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          Desing And Developed By Talentrise Technokrate Copyright © 2024 TechnoHire Job Portal Super Admin. All Rights Are Reserved.
        </div>
      </div>
    </div>
  );
}

export default EditHR;