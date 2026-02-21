import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import otpIllustration from "../../../assets/OtpIllustration.png";
import gradientOverlay from "../../../assets/PurpleShadeBg.png";
import TechnoHireLogo from "../../../assets/TalentHire.png";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]); // 4 digits
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto focus next box
      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    // alert(`OTP entered: ${otpValue}`);
    navigate("/reset-password");
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

        {/* OTP Card */}
        <div className="bg-white w-[400px] h-[500px] p-8 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-purple-300">
          <h2 className="text-3xl font-extrabold text-[#7900BA] mb-2 text-center mt-7">
            Enter OTP
          </h2>

          <p className="text-gray-700 text-sm text-center">
            We've sent a verification code to{" "}
            <span className="font-medium">emailaddress@gmail.com</span>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
            {/* OTP Boxes */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md 
                             focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              ))}
            </div>

            {/* Resend + Timer */}
            <div className="flex flex-col items-center text-xs text-gray-500 mt-2">
              <div>
                Didn't receive any code?
                <span className="cursor-pointer text-purple-600 hover:underline ml-1">
                  Resend Code
                </span>
              </div>
              <div className="mt-1">00:120 Sec</div>
            </div>

            {/* Go back to login */}
            <div className="flex justify-center text-xs mt-2">
              <span
                onClick={() => navigate("/")}
                className="text-purple-600 font-medium cursor-pointer "
              >
                Go back to <span className="text-orange-300">Login</span>
              </span>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="mt-4 py-2 text-sm text-white rounded-md 
                         bg-gradient-to-r from-purple-600 to-purple-800 
                         hover:opacity-90 transition duration-300 w-full"
            >
              Verify OTP
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
          src={otpIllustration}
          alt="OTP Illustration"
          className="relative z-10 w-[500px] translate-y-12"
        />
      </div>
    </div>
  );
}
