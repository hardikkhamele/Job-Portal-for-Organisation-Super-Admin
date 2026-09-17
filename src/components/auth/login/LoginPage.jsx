import React, { useState, useEffect } from "react";
import loginIllustration from "../../../assets/LoginPageShade.png";
import gradientOverlay from "../../../assets/PurpleShadeBg.png";
import TechnoHireLogo from "../../../assets/TalentHire.png";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { adminSendOtp, clearError } from "../../../redux/slice/auth/loginSlice";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, otpSent } = useSelector((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminSendOtp({ mobile }));
  };

  useEffect(() => {
    if (otpSent) {
      navigate("/verify-otp", { state: { mobile } });
    }
  }, [otpSent, mobile, navigate]);

  return (
    <div className="w-screen h-screen flex font-sans">
      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white relative px-6">
        <img
          src={TechnoHireLogo}
          alt="TechnoHire Logo"
          className="w-[400px] mb-6"
        />

        <div className="bg-white w-[400px] p-8 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-purple-300">
          <h2 className="text-3xl font-extrabold text-[#7900BA] mb-2 text-center">
            Log in
          </h2>

          <h2 className="text-gray-600 font-bold text-center">
            Technokrate hire Super Admin
          </h2>
          <h2 className="text-gray-600 font-bold text-center">Dashboard</h2>

          <h2 className="mt-3 mb-6 leading-relaxed text-center text-sm text-gray-500">
            Log in to Unlock your super admin tools, control jobs, track
            opportunities, and optimize platform performance
          </h2>

          {error && (
            <p className="text-red-600 bg-red-50 p-2 rounded text-center text-sm mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-1 block">
                Enter Mobile Number
              </label>
              <input
                type="tel"
                placeholder="+919876543210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full mt-1 px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-md 
                           focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-700"
                required
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`mt-2 py-3 text-base font-semibold text-white rounded-md 
              bg-[#7900BA] hover:bg-purple-800 
              transition duration-300 w-full flex items-center justify-center ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Requesting..." : "Request OTP"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 relative flex items-center justify-center overflow-hidden">
        <img
          src={gradientOverlay}
          alt="Purple Background"
          className="absolute -top-32 -right-32 w-[900px] -translate-y-72 max-w-none"
        />

        <img
          src={loginIllustration}
          alt="Illustration"
          className="relative z-10 w-[520px] -translate-x-6 translate-y-12"
        />
      </div>
    </div>
  );
}