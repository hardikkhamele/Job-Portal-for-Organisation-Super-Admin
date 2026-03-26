import React from "react";
import Footer from "./Footer";

const notifications = [
  {
    id: 1,
    title: "Payment received",
    message: "A payment has been successfully completed.",
    time: "Today 6:30 AM",
    type: "success",
  },
  {
    id: 2,
    title: "Your Payment has been successful",
    message: "1 new message received.",
    time: "Today 6:30 AM",
    type: "danger",
  },
  {
    id: 3,
    title: "Job post updated",
    message: "Changes made to an existing job post.",
    time: "Today 6:30 AM",
    type: "success",
  },
  {
    id: 4,
    title: "Database updated successfully.",
    message: "1 new message received.",
    time: "Today 6:30 AM",
    type: "danger",
  },
];

function Notifications() {
  return (
    <div className="w-full bg-[#F4F6FA] p-10 pb-20">
      <div className="w-full mx-auto">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Notifications
          </h1>
       

        {/* Notifications List */}
        <div className="space-y-5 p-6">
          {notifications.map((item) => (
            <NotificationCard key={item.id} {...item} />
          ))}
        </div>

      </div>
    </div>
     </div>
  );
}

function NotificationCard({ title, message, time, type }) {
  const bgColor =
    type === "success"
      ? "bg-green-100"
      : "bg-red-100";

  return (
    <div
      className={`rounded-xl p-8 shadow-sm flex justify-between items-center ${bgColor}`}
    >
      <div>
        <h3 className="font-semibold text-gray-800 text-xl">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mt-4">
          {message}
        </p>
      </div>

      <div className="text-sm text-gray-500 whitespace-nowrap">
        {time}
      </div>
      <Footer/>
    </div>
  );
}

export default Notifications;
