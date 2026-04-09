import React from "react";
import BannerTwo from "../../assets/BannerTwo.svg";

const ViewRevenue = () => {
  return (
    <div className="p-5 bg-gray-100 min-h-[90vh]">
      <div className="bg-white p-6 rounded-xl shadow-md">

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-4">View Revenue</h1>
        <hr className="mb-6" />

        {/* Company Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-15 h-15 rounded-full bg-gray-200 flex items-center justify-center shadow-lg">
            <img
              src={BannerTwo} 
              alt="company logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              Talentrise Technokrate
            </h2>
            <p className="text-gray-500 text-base">
              IT Services and IT Consulting
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="shadow-xl rounded-xl p-5">

          {/* Status */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700">Payment Status</h3>
            <span className="text-green-600 font-medium">Success</span>
          </div>

            <div className="border-t border-dashed border-green-500 py-3"></div>

          {/* General Info */}
          <h4 className="font-semibold mb-2 text-lg">General Info</h4>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 mb-4">
            <span className="text-base">Transaction Id</span>
            <span className="text-right text-base">PYM782390HJF</span>

            <span className="text-base">Company Name</span>
            <span className="text-right text-base">Technokrate</span>

            <span className="text-base">Payment Date & Time</span>
            <span className="text-right text-base">Feb 2, 2026 19:28</span>

            <span className="text-base">Payment Method</span>
            <span className="text-right text-base">GPay</span>
          </div>

          {/* Billing */}
          <h4 className="font-semibold mb-2 text-lg">General Billing Details</h4>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 mb-4">
            <span className="text-base">Description</span>
            <span className="text-right text-base">
              x1 (Basic 1 Month Bundle Plan)
            </span>

            <span className="text-base">Plan Charges</span>
            <span className="text-right text-base">₹2330.00</span>
          </div>

          {/* Total */}
          <div className="flex justify-between border-dashed border-green-500 items-center border-t pt-4">
            <span className="font-semibold text-lg">Total Amount Paid</span>
            <span className="text-green-600 font-bold text-lg">₹2330.00</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ViewRevenue;