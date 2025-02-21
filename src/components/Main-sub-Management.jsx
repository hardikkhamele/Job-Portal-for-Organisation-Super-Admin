import React from "react";

import SubscriptionCard from "./SubscriptionCardd";
import Analytics from "./Analyticss";
import SubscriptionManagement from "./SubscriptionPlans";
import TotalSubscribers from "./TotalSubscribers";

import { Link } from "react-router";

const MainsubMan = () => {
  const subscriptionPlans = [
    {
      name: "Basic Plan",
      count: 500,
      change: -2.3,
      color: "bg-yellow-100",
      price: 99
    },
    {
      name: "Standard Plan",
      count: 700,
      change: 8.5,
      color: "bg-gray-100",
      price: 199
    },
    {
      name: "Premium Plan",
      count: 500,
      change: -4.3,
      color: "bg-yellow-200",
      price: 299
    },
    {
      name: "Enterprise Plan",
      count: 400,
      change: 1.3,
      color: "bg-red-100",
      price: 499
    }
  ];

  return (
    <div className="flex flex-col flex-1 h-[100vh]  bg-gray-100 ">
      <Link to="/" className="flex items-center space-x-2">
        <h2 className="text-2xl font-bold mb-1 text-black px-5 mt-2">
          Subscription Management
        </h2>
      </Link>

      {/* Subscription Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-72 w-full p-5 bg-gray-100 ">
        {subscriptionPlans.map((plan, index) => (
          <SubscriptionCard key={index} plan={plan} />
        ))}
      </div>

      {/* Analytics & Subscription Management Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1 bg-gray-100 mb-2  ">
        <div className="bg-white rounded-lg shadow h-72 px-  w-full">
          <Analytics />
          <div className="h-[184px] w-full  flex  mt-[5rem]  bg-gray-100 rounded-xl px-3 py-5">
            <TotalSubscribers total={1500} growth={2.5} />
          </div>
        </div>

        <div className="bg-white p-0 mt-0 rounded-xl shadow  ">
          <SubscriptionManagement />
        </div>
      </div>
    </div>
  );
};

export default MainsubMan;
