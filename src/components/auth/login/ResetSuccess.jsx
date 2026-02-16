import React from "react";
import { useNavigate } from "react-router-dom";

// ✅ Import your assets
import successIllustration from "../../../assets/ResetSuccessIllustration.png"; // right side illustration
import gradientOverlay from "../../../assets/PurpleShadeBg.png";               // purple background
import TechnoHireLogo from "../../../assets/TalentHire.png";                   // logo
import CheckIcon from "../../../assets/CheckIcon.png";                         // purple checkmark icon

export default function ResetSuccess() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex font-sans">
      
      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white relative px-6">
        
        {/* Logo */}
        <img
          src={TechnoHireLogo}
          alt="TechnoHire Logo"
          className="w-[400px] mb-5"
        />

        {/* Success Card */}
        <div className="bg-white w-[400px] p-8 rounded-sm  flex flex-col items-center">
          
          {/* Check Icon */}
          <img
            src={CheckIcon}
            alt="Success Icon"
            className="w-16 h-16 mb-4"
          />

          <h2 className="text-2xl font-bold  mb-4 text-center">
            Password Reset 
          </h2>
           <h2 className="text-2xl font-bold mb-4 text-center">
            Successful!
          </h2>

          {/* Login Button */}
          <button
            onClick={() => navigate("/")}
            className="mt-2 py-2 text-sm text-white rounded-md 
                       bg-gradient-to-r from-purple-600 to-purple-800 
                       hover:opacity-90 transition duration-300 w-[220px]"
          >
            Login Now
          </button>
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
          src={successIllustration}
          alt="Success Illustration"
          className="relative z-10 w-[500px] translate-y-12"
        />
      </div>
    </div>
  );
}
