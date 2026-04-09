import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const Employer = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 bg-gray-100 min-h-screen pb-20">
      
      <div className="bg-white rounded-xl shadow-md p-6">

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-2">
          Terms & Service For Employer
        </h1>

        <hr className="mb-6 border-gray-300" />

        {/* Content Box */}
       <div className="border border-gray-200 rounded-lg p-6 text-gray-800 leading-8 min-h-[450px] bg-white text-lg">

          <p>1) Employers must be legally authorized to hire and operate in their jurisdiction.</p>
          <p>2) Employers must provide accurate, complete, and up-to-date company information during registration and usage of the platform.</p>
          <p>3) Employers must not post misleading, discriminatory, or fraudulent job listings.</p>
          <p>4) The platform is not responsible for hiring decisions, candidate performance, or employment outcomes.</p>
          <p>5) Job credits and subscription plans are non-transferable and subject to the platform’s billing policy.</p>
          <p>6) Employers agree to use candidate data solely for recruitment purposes and handle it confidentially.</p>
          <p>7) Any misuse of the platform, including spamming candidates or unethical hiring practices, may result in account suspension.</p>

        </div>

        {/* Button */}
          <div className="flex justify-center mt-6">
            <button
            onClick={() => navigate("/employer/edit")}
            className="bg-purple-700 text-white px-25 py-2 rounded-md cursor-pointer"
            >
            Edit
          </button>
        </div>

      </div>
      <Footer/>
    </div>
  );
};

export default Employer;