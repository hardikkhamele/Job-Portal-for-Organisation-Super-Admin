import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Import your assets
import forgotIllustration from "../../../assets/forgotIllustration.png"; // right side illustration
import gradientOverlay from "../../../assets/PurpleShadeBg.png";         // purple gradient background
import TechnoHireLogo from "../../../assets/TalentHire.png";             // logo

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="w-screen h-screen flex font-sans">
      
      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white relative px-6">
        
        {/* Logo */}
        <img
          src={TechnoHireLogo}
          alt="TechnoHire Logo"
          className="w-[400px] mb-6"
        />

        {/* Forgot Card */}
        <div className="bg-white w-[400px]  h-[500px] p-8 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-purple-300">
          
          <h2 className="text-3xl font-extrabold text-[#7900BA] mb-2 mt-10 text-center">
            Forgot
          </h2>
          <h2 className="text-3xl font-extrabold text-[#7900BA] mb-2 text-center">
             Password?
          </h2>

          <p className="text-gray-700 font-bold text-center">
            Enter your registered email address
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            
            {/* Email */}
            <div>
              <label className="text-xs text-gray-600">Enter Email Address</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>

            {/* Go back to login */}
            <div className="flex justify-center text-xs mt-2">
              <span
                onClick={() => navigate("/")}
                className="text-purple-600 font-medium cursor-pointer "
              >
                Go back to <span className="text-amber-500">Login</span>
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              onClick={() => navigate ("/verify-otp")}
              className="mt-4 py-2 text-sm text-white rounded-md 
                         bg-gradient-to-r from-purple-600 to-purple-800 
                         hover:opacity-90 transition duration-300 w-full"
            >
              Get OTP
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 relative flex items-center justify-center overflow-hidden">
        
        {/* Purple Background */}
        <img
          src={gradientOverlay}
          alt="Purple Background"
          className="absolute -top-32 -right-32 w-[900px] -translate-y-72 max-w-none"
        />

        {/* Illustration */}
        <img
          src={forgotIllustration}
          alt="Forgot Illustration"
          className="relative z-0 w-[500px]  -translate-x-15 translate-y-12"
        />
      </div>
    </div>
  );
}
