import React from "react";
import { FaTrash, FaEnvelope, FaPhone, FaGlobe, FaCalendar, FaBuilding, FaUsers, FaIndustry } from "react-icons/fa";

const Company_Details = () => {
  return (
    <div className="p-4  bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold text-gray-700 mb-4">Hello! TechnoHire</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Details</h2>      

      <div className="p-4 bg-white rounded-2xl shadow-md max-w-4xl w-full ml-[10px] mr-[10px]">






        <div className="flex items-center gap-4 mb-4 justify-between">
          {/* Company Logo & Name */}
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-3 rounded-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram Logo"
                className="w-12 h-12"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">Instagram</h2>
              <p className="text-gray-500">Information Technology</p>
            </div>
          </div>

          {/* Action Buttons in One Line */}
          <div className="flex flex-row gap-4">
            <button className="bg-red-500 text-white px-4 py-0 rounded-lg flex items-center gap-2">
              <FaTrash /> Delete Company
            </button>
            <button className="bg-green-500 text-white px-4 py-0 rounded-lg flex items-center gap-2">
              Message Company
            </button>
          </div>
        </div>

        {/* Layout Sections */}
        <div className="flex gap-6 mb-6">
          {/* Left Section - Company Details */}
          <div className="w-1/2">
            <section className="mb-6">
              <h3 className="text-lg font-semibold">Company Detail</h3>
              <p className="text-gray-600 mt-2">
                Instagram, a part of Meta, is a global platform that connects people through the power of visual storytelling.
                With over 2 billion active users worldwide, Instagram enables individuals and businesses to create, share,
                and discover content across a variety of formats, including photos, videos, and stories.
              </p>
            </section>
            <section className="mb-6">
              <h3 className="text-lg font-semibold">Company Vision</h3>
              <p className="text-gray-600 mt-2">
                To empower people to create and share content that inspires, connects, and enables communities to thrive.
              </p>
            </section>
            <section className="mb-6">
              <h3 className="text-lg font-semibold">Company Benefits</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Career Growth and Learning</li>
                <li>Work-Life Balance</li>
                <li>Competitive Salary and Stock Options</li>
              </ul>
            </section>
          </div>

          {/* Right Section - Company Info & Contact */}
          <div className="w-1/2">
            {/* Company Info */}
            <section className="bg-gray-100 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold">Company Info</h3>
              <p className="flex items-center gap-2 mt-2"><FaCalendar /> <strong>Founded:</strong> 14 June, 2021</p>
              <p className="flex items-center gap-2 mt-2"><FaBuilding /> <strong>Organization Type:</strong> Private Company</p>
              <p className="flex items-center gap-2 mt-2"><FaUsers /> <strong>Team Size:</strong> 120-300 Candidates</p>
              <p className="flex items-center gap-2 mt-2"><FaIndustry /> <strong>Industry Type:</strong> Technology</p>
            </section>

            {/* Contact Information */}
            <section className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <p className="flex items-center gap-4 mt-2">
                <FaGlobe /> <a href="https://www.estherhoward.com" className="text-blue-600">www.estherhoward.com</a>
              </p>
              <p className="flex items-center gap-2 mt-2">
                <FaPhone /> +91 1234567890
              </p>
              <p className="flex items-center gap-2 mt-2">
                <FaEnvelope /> esther.howard@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default Company_Details;
