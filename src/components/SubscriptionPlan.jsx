import React from "react";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

const plans = [
  {
    name: "Basic Plan",
    price: "₹99",
    description:
      "Access a limited pool of job postings and candidate profiles with essential hiring tools.",
    iconColor: "text-yellow-500",
  },
  {
    name: "Standard Plan",
    price: "₹299",
    description:
      "Unlock advanced job posting features and a wider talent pool for streamlined hiring.",
    iconColor: "text-gray-500",
  },
  {
    name: "Premium Plan",
    price: "₹499",
    description:
      "Gain priority visibility, comprehensive analytics, and premium support for hiring success.",
      iconColor: "text-gray-500",
    },
];

const SubscriptionPlans = () => {
  return (
    <div className="p-6 mb-5">
      <h2 className="text-xl font-semibold mb-2">Manage Subscription</h2>
      <div className="flex overflow-x-auto space-x-8 p-2 scrollbar-hide px-16">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`w-[300px] h-[350px] border-2 ${plan.color} rounded-lg p-4 shadow-xl flex-shrink-0 hover:border-purple-500`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            <p className="text-2xl font-bold mb-2">{plan.price}</p>
            <p className="text-sm text-gray-500 mb-4">per month</p>
            <button className="bg-purple-600 text-white px- py-2 rounded-lg w-[40%] hover:bg-purple-700">
              Start Trial →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;