import React from "react";
import { useNavigate } from "react-router-dom";


const JobSeeker = () => {
  
  const navigate = useNavigate();
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      
      <div className="bg-white p-6 rounded-xl shadow-md">

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-4">
          Terms & Service For Job Seeker
        </h1>
        <hr className="mb-4" />

        {/* Content Box */}
        <div className="border  border-gray-200 rounded-lg p-6 text-gray-900 leading-8 text-lg">

          <p>1) Users must be at least 18 years old or the minimum age required for employment in their jurisdiction.</p>
          <p>2) Users must provide accurate and truthful information during registration and when using the App.</p>
          <p>3) Users are required to create an account to access certain features of the App.</p>
          <p>4) Users are responsible for keeping their account information secure and confidential.</p>
          <p>5) The App is not liable for any unauthorized access to your account resulting from your negligence.</p>
          <p>6) Provide accurate and up-to-date information in their profiles, resumes, and applications.</p>
          <p>7) Apply only for positions are qualified for and genuinely interested in.</p>
          <p>8) Refrain from engaging in any fraudulent or unethical activities.</p>
          <p>9) Job Seekers agree to:</p>

          <div className="ml-4">
            <p>a. Provide accurate and up-to-date information in their profiles, resumes, and applications.</p>
            <p>b. Apply only for positions they are qualified for and genuinely interested in.</p>
            <p>c. Refrain from engaging in any fraudulent or unethical activities.</p>
          </div>

        </div>

        {/* Button */}
        <div className="flex justify-center mt-6 ">
          <button
            onClick={() => navigate("/jobseeker/edit")}
            className="bg-purple-700 text-white px-25 py-2 rounded-md"
          >
            Edit
          </button>
        </div>

      </div>

      {/* Footer */}
      <p className="text-center text-gray-400 text-sm mt-6">
        Copyright © 2024 TechnoHire. All rights reserved.
      </p>

    </div>
  );
};

export default JobSeeker;