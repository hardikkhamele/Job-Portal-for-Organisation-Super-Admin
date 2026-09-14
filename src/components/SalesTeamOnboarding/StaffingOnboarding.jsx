import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Footer from "../Footer";
import { createStaffing } from "../StaffingManagement/staffingApi";

function StaffingOnboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    staffingName: "",
    designation: "",
    email: "",
    password: "",
    mobileNumber: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.staffingName.trim()) {
      newErrors.staffingName = "Staffing Name is required";
    }
    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required";
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Please enter a valid mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const memberPayload = {
        staffingName: formData.staffingName.trim(),
        name: formData.staffingName.trim(),
        designation: formData.designation.trim(),
        email: formData.email.trim(),
        password: formData.password,
        mobileNumber: formData.mobileNumber.trim()
      };
      await createStaffing(memberPayload);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/staffing-management");
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      setErrors((prev) => ({
        ...prev,
        submit: error.response?.data?.message || "Unable to create staffing. Please try again."
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between p-6 md:p-8">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
        
        {/* Header with Circle Back Arrow and Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer shadow-sm"
            title="Go Back"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Create Staffing</h2>
        </div>

        {/* Success Alert Banner */}
        {showSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800 animate-in fade-in duration-200">
            <CheckCircle2 size={22} className="text-emerald-600 flex-shrink-0" />
            <div>
              <h5 className="font-bold text-sm">Staffing Created Successfully!</h5>
              <p className="text-xs text-emerald-700 mt-0.5">Redirecting to Staffing Management...</p>
            </div>
          </div>
        )}

        {/* Main Form Container Card */}
        <div className="w-full bg-white rounded-2xl border border-gray-200/80 p-8 md:p-10 shadow-sm">
          <form onSubmit={handleSubmit}>
            {errors.submit && <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">{errors.submit}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Staffing Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Staffing Name</label>
                <input
                  type="text"
                  name="staffingName"
                  value={formData.staffingName}
                  onChange={handleChange}
                  placeholder="Enter Staffing Name"
                  className={`w-full bg-[#EEF3FB] border ${
                    errors.staffingName ? "border-red-400 focus:ring-red-200" : "border-gray-200/70 focus:ring-purple-300 focus:bg-white"
                  } rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
                />
                {errors.staffingName && <p className="text-red-500 text-xs mt-1">{errors.staffingName}</p>}
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Enter Designation"
                  className={`w-full bg-[#EEF3FB] border ${
                    errors.designation ? "border-red-400 focus:ring-red-200" : "border-gray-200/70 focus:ring-purple-300 focus:bg-white"
                  } rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
                />
                {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="pihu@gmail.com"
                  className={`w-full bg-[#EEF3FB] border ${
                    errors.email ? "border-red-400 focus:ring-red-200" : "border-gray-200/70 focus:ring-purple-300 focus:bg-white"
                  } rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full bg-[#EEF3FB] border ${
                      errors.password ? "border-red-400 focus:ring-red-200" : "border-gray-200/70 focus:ring-purple-300 focus:bg-white"
                    } rounded-xl px-4 py-3 pr-11 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className={`w-full bg-[#EEF3FB] border ${
                    errors.mobileNumber ? "border-red-400 focus:ring-red-200" : "border-gray-200/70 focus:ring-purple-300 focus:bg-white"
                  } rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
                />
                {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-10 py-2.5 bg-[#F3E8FF] hover:bg-[#E9D5FF] text-[#7E22CE] font-semibold rounded-xl text-sm transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-2.5 bg-[#7E22CE] hover:bg-[#6B21A8] text-white font-semibold rounded-xl text-sm transition cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default StaffingOnboarding;
