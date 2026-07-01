import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import {
  getNotifications,
  markAllAsRead,
  clearNotifications,
} from "../utils/notificationHelper";
import {
  Bell,
  CheckCircle2,
  Info,
  Trash2,
  ShieldCheck,
  Mail,
  CreditCard
} from "lucide-react";

function Notifications() {
  const [list, setList] = useState([]);

  // Load notifications from helper
  const loadNotifications = () => {
    setList(getNotifications());
  };

  useEffect(() => {
    loadNotifications();

    // Reset notification count on panel open by marking all as read
    markAllAsRead();

    // Listen to real-time notification updates
    const handleUpdate = () => {
      loadNotifications();
    };
    window.addEventListener("notificationsUpdated", handleUpdate);
    return () => {
      window.removeEventListener("notificationsUpdated", handleUpdate);
    };
  }, []);

  const handleClearAll = () => {
    clearNotifications();
    setList([]);
  };

  return (
    <div className="w-full bg-[#F4F6FA] min-h-screen p-6 md:p-10 pb-20 flex flex-col justify-between">
      <div className="w-full mx-auto max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Bell className="text-purple-600 w-6 h-6 animate-swing" />
              Notifications
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Stay updated with your latest account activity and system events
            </p>
          </div>
          {list.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-semibold transition cursor-pointer border border-red-200"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[400px]">
          {list.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <Bell className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-lg font-semibold">No notifications yet</p>
              <p className="text-sm mt-1 text-gray-500">
                You will see updates here when transactions or changes occur.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {list.map((item) => (
                <NotificationCard key={item.id} {...item} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

function NotificationCard({ title, message, time, type }) {
  // Select matching premium icons and colors based on notification title/type
  const getStyle = () => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("job")) {
      return {
        bgColor: "bg-green-50 border-green-150 text-green-700 hover:bg-green-100/50",
        icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
      };
    }
    if (titleLower.includes("payment")) {
      return {
        bgColor: "bg-emerald-50 border-emerald-150 text-emerald-700 hover:bg-emerald-100/50",
        icon: <CreditCard className="w-6 h-6 text-emerald-600" />,
      };
    }
    if (titleLower.includes("email")) {
      return {
        bgColor: "bg-blue-50 border-blue-150 text-blue-700 hover:bg-blue-100/50",
        icon: <Mail className="w-6 h-6 text-blue-600" />,
      };
    }
    if (titleLower.includes("password")) {
      return {
        bgColor: "bg-purple-50 border-purple-150 text-purple-700 hover:bg-purple-100/50",
        icon: <ShieldCheck className="w-6 h-6 text-purple-600" />,
      };
    }
    return {
      bgColor: "bg-gray-50 border-gray-150 text-gray-700 hover:bg-gray-100/50",
      icon: <Info className="w-6 h-6 text-gray-500" />,
    };
  };

  const { bgColor, icon } = getStyle();

  return (
    <div
      className={`rounded-xl p-5 border flex items-start gap-4 transition duration-200 hover:shadow-sm ${bgColor}`}
    >
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div className="flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-gray-800 text-base">{title}</h3>
          <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
        </div>
        <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

export default Notifications;
