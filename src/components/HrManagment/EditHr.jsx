import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getHrForEdit, updateHrDetails, resetUpdateState } from "../../redux/slice/hrManagement/updateHr";
import CopyRight from "../common/CopyRight";
import toast from "react-hot-toast"; // Agar toast use kar rahe ho toh
import Footer from "../Footer";

function EditHR() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams(); // URL se ID lene ke liye

  // Redux States
  const { hrData, loading, updateLoading, success } = useSelector((state) => state.updateHr);

  const [formData, setFormData] = useState({
    hrName: "",
    designation: "",
    email: "",
    password: "",
    image: null,
  });

  // 1. Fetch data if not passed through state (Direct URL access)
  useEffect(() => {
    if (id) {
      dispatch(getHrForEdit(id));
    }
  }, [dispatch, id]);

  // 2. Auto-fill logic
  useEffect(() => {
    const hr = location.state?.hr || hrData;
    if (hr) {
      setFormData({
        hrName: hr.hrName || "",
        designation: hr.designation || "",
        email: hr.email || "",
        password: "",
        image: null, // Image field ko null rakhein jab tak user change na kare
      });
    }
  }, [location.state, hrData]);

  // 3. Handle Success
  useEffect(() => {
    if (success) {
      toast.success("HR Updated Successfully");
      dispatch(resetUpdateState());
      navigate(-1);
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) return;

    // Create FormData object
    const data = new FormData();
    data.append("hrName", formData.hrName);
    data.append("designation", formData.designation);
    data.append("email", formData.email);
    if (formData.password) data.append("password", formData.password);
    if (formData.image) data.append("image", formData.image);

    dispatch(updateHrDetails({ id, formData: data }));
  };

  if (loading) return <div className="p-10 text-center">Loading HR Details...</div>;

  return (
    <div className="w-full min-h-screen bg-[#EDEDED] p-4">
      <div className="w-full bg-white rounded-xl p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center bg-white hover:bg-gray-50 transition"
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
                name="hrName"
                placeholder="Enter HR Name"
                value={formData.hrName}
                onChange={handleChange}
                className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
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
                className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
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
                className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
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
                className="w-full mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm text-gray-700">Upload Image</label>
              <div className="relative mt-2 w-[320px]">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm file:hidden focus:outline-none cursor-pointer"
                />
                <Upload size={18} className="absolute right-3 top-3 text-purple-600 pointer-events-none" />
              </div>
              {formData.image ? (
                <p className="text-xs text-green-500 mt-1">New image selected: {formData.image.name}</p>
              ) : (
                <p className="text-xs text-gray-400 mt-1">Current image will be kept if no new file is chosen</p>
              )}
            </div>
          </form>

          <div className="flex justify-center gap-8 mt-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-12 py-2 rounded-md bg-purple-200 text-purple-700 font-medium disabled:opacity-50 hover:bg-purple-300 transition"
              disabled={updateLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="px-12 py-2 rounded-md bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium disabled:opacity-50 hover:opacity-90 transition shadow-md"
              disabled={updateLoading}
            >
              {updateLoading ? "Updating..." : "Edit"}
            </button>
          </div>
        </div>
       <Footer/>
      </div>
    </div>  
  );
}

export default EditHR;