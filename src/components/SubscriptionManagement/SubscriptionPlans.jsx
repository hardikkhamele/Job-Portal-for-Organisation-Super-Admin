import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const SubscriptionPlanCard = ({ plan, price, description, badgeColor }) => {
  return (
    <div className="bg-white  min-h-[270px] min-w-[200px] gap-4 shadow-xl rounded-2xl p-6 ">
      {/* Badge */}
      <div className={`w-8 h-8 rounded-full ${badgeColor} mb-2`} />

      {/* Plan Title */}
      <h3 className="text-lg font-semibold">{plan}</h3>

      {/* Plan Description */}
      <p className="text-gray-500 text-sm mt-2 ">{description.slice(0, 52)}</p>

      {/* Pricing */}
      <div className="text-xl font-bold mt-4 ">
        ₹{price} <span className="text-sm font-normal">per month</span>
      </div>

      {/* Action Button */}
      <div className="">
        <button className="mt-12  w-full relative  bg-purple-700 text-white p-2 rounded-lg hover:bg-purple-800 transition">
          Start Trial →
        </button>
      </div>
    </div>
  );
};

const SubscriptionSlider = () => {
  const plans = [
    {
      plan: "Basic Plan",
      price: 99,
      description:
        "Access a limited pool of job postings and candidate profiles.",
      badgeColor: "bg-yellow-500"
    },
    {
      plan: "Standard Plan",
      price: 299,
      description: "Unlock advanced features and streamline hiring.",
      badgeColor: "bg-gray-500"
    },
    {
      plan: "Premium Plan",
      price: 499,
      description: "Full access to all hiring tools and analytics.",
      badgeColor: "bg-yellow-400"
    },
    {
      plan: "Enterprise Plan",
      price: 799,
      description: "Customized solutions for large-scale hiring.",
      badgeColor: "bg-red-500"
    }
  ];

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className=" relative  rounded-lg  h-[157%] bg-white">
      <div className="flex justify-between items-center h-[20%]  px-5  ">
        <h2 className="text-2xl font-semibold mb-4 text-slate-600">
          Set Subscription Plans
        </h2>
        <Link
          to="subscription-management-edit"
          className="mb-2 text-slate-600 text-xl"
        >
          Edit
        </Link>
      </div>
      <div className="relative h-56  ">
        {/* Left Scroll Button */}
        {/* <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2   rounded-full shadow-md hover:bg-gray-300 z-10 "
        >
          <ChevronLeft className="w-6 h-6 text-black"  />
        </button> */}

        {/* Plan Cards Layout */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto px-2 scroll-smooth scrollbar-hide"
        >
          {plans.map((plan, index) => (
            <SubscriptionPlanCard key={index} {...plan} />
          ))}
        </div>

        {/* Right Scroll Button */}
        {/* <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 z-10"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button> */}
      </div>
    </div>
  );
};

export default SubscriptionSlider;
