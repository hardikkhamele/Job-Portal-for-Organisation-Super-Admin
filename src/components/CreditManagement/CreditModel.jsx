import React, { useState } from "react";
import { Search } from "lucide-react";
import Footer from "../Footer";

const CreditModel = () => {

  const [isOpen, setIsOpen] = useState(false);

  const CreditModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
        
        <h2 className="text-xl font-bold text-purple-700 text-center mb-4">
          Edit Required Credit
        </h2>

        <div className="mb-5">
          <label className="block mb-2 text-gray-900 font-semibold text-base">
            Credit Required
          </label>
          <input
            type="number"
            defaultValue="1"
            className="w-full rounded-md px-3 py-2 border border-[#D3D3D3] bg-[#F7F8F9] outline-none"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-purple-200 text-purple-700 px-15.5 py-2 rounded-md cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onClose}
            className="bg-purple-800 text-white px-15.5 py-2 rounded-md cursor-pointer"
          >
            Create
          </button>
        </div>

      </div>
    </div>
  );
};

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex flex-col pb-20">
      
      {/* CENTER CONTAINER */}
     <div className="bg-white p-6 rounded-lg shadow-sm">

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-3 text-gray-900">Credit Management</h1>
        <hr className="mb-6" />


          <div className="relative w-64">
  
          {/* Icon */}
          <Search className="absolute left-3 top-1/3 -translate-y-1/2 text-gray-400 w-5 h-5" />

          {/* Input */}
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-md w-full bg-[#F7F8F9] outline-none border border-[#D3D3D3] mb-4"
          />

        </div>

        {/* ================= Database Credit ================= */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Database Credit
        </h2>

        <div className="grid grid-cols-3 gap-6 mb-10 min-h-[200px]">

          {/* Profile Unlock */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-5">Profile Unlock</h3>
            <p className="text-gray-600 text-xl mb-10">
              Required 1 Database Credit Per Profile
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-yellow-500 text-white px-25 py-2 rounded-md cursor-pointer"
            >
              Edit
            </button>
          </div>

          {/* Excel Download */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-5">Excel Download</h3>
            <p className="text-gray-600 text-xl mb-10">
              Required 2 Database Credit Per Profile
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-yellow-500 text-white px-25 py-2 rounded-md cursor-pointer"
            >
              Edit
            </button>
          </div>

        </div>

        {/* ================= Job Post Credit ================= */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Job Post Credit
        </h2>

        <div className="grid grid-cols-3 gap-6">

          {/* Classic */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-5">Classic Job Post</h3>
            <p className="text-gray-600 text-xl mb-10">
              Required 1 Job Credit Per Job Post
            </p>
           <button
            onClick={() => setIsOpen(true)}
            className="bg-yellow-500 text-white px-25 py-2 rounded-md cursor-pointer"
          >
            Edit
          </button>
          </div>

          {/* Premium */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-5">Premium Job Post</h3>
            <p className="text-gray-600 text-xl mb-10">
              Required 2 Job Credit Per Job Post
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-yellow-500 text-white px-25 py-2 rounded-md cursor-pointer"
            >
              Edit
            </button>
          </div>

          {/* Super Premium */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-5">
              Super Premium Job Post
            </h3>
            <p className="text-gray-600 text-xl mb-10">
              Required 3 Job Credit Per Job Post
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-yellow-500 text-white px-25 py-2 rounded-md cursor-pointer"
            >
              Edit
            </button>
          </div>

        </div>

      </div>
      <CreditModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

         <Footer />  
    </div>
    
  );
};

export default CreditModel;