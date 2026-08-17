import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Send, 
  ArrowLeft, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle,
  History
} from "lucide-react";
import { toast } from "react-toastify";
import Footer from "../Footer";
import { 
  addNotification, 
  getNotifications, 
  deleteNotification, 
  clearNotifications 
} from "../../utils/notificationHelper";

function SendNotification() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "success"
  });
  const [errors, setErrors] = useState({});

  // Load sent notifications
  const loadNotifications = () => {
    setList(getNotifications());
  };

  useEffect(() => {
    loadNotifications();

    const handleUpdate = () => {
      loadNotifications();
    };
    window.addEventListener("notificationsUpdated", handleUpdate);
    return () => {
      window.removeEventListener("notificationsUpdated", handleUpdate);
    };
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Notification Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.length > 50) {
      newErrors.title = "Title must not exceed 50 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Notification Message is required";
    } else if (formData.message.length < 5) {
      newErrors.message = "Message must be at least 5 characters";
    } else if (formData.message.length > 250) {
      newErrors.message = "Message must not exceed 250 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the validation errors");
      return;
    }

    try {
      addNotification(formData.title.trim(), formData.message.trim(), formData.type);
      toast.success("Notification sent successfully!");
      setFormData({
        title: "",
        message: "",
        type: "success"
      });
    } catch (error) {
      toast.error("Failed to send notification. Please try again.");
    }
  };

  const handleDelete = (id) => {
    try {
      deleteNotification(id);
      toast.success("Notification deleted successfully");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      clearNotifications();
      toast.success("All notifications cleared");
    }
  };

  // Preset notification triggers to seed quickly
  const triggerPreset = (title, message, type) => {
    try {
      addNotification(title, message, type);
      toast.success(`Preset notification "${title}" triggered!`);
    } catch (e) {
      toast.error("Failed to trigger preset notification");
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50 text-green-700 border-green-200",
          icon: <CheckCircle2 className="w-5 h-5 text-green-600" />
        };
      case "info":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          icon: <Info className="w-5 h-5 text-blue-600" />
        };
      case "warning":
        return {
          bg: "bg-yellow-50 text-yellow-700 border-yellow-200",
          icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />
        };
      case "error":
        return {
          bg: "bg-red-50 text-red-700 border-red-200",
          icon: <AlertCircle className="w-5 h-5 text-red-600" />
        };
      default:
        return {
          bg: "bg-gray-50 text-gray-700 border-gray-200",
          icon: <Bell className="w-5 h-5 text-gray-600" />
        };
    }
  };

  return (
    <div className="w-full bg-[#F4F6FA] min-h-screen p-6 md:p-10 pb-20 flex flex-col justify-between">
      <div className="w-full mx-auto max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Bell className="text-purple-600 w-6 h-6" />
                Send Notification
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Compose and dispatch real-time system notifications to users.
              </p>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Compose Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
              <Send size={18} className="text-purple-600" />
              Compose New Notification
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Notification Title *
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. System Maintenance Update"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={50}
                  className={`w-full bg-gray-50 border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.title ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-purple-200 focus:border-purple-500"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Notification Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all"
                  >
                    <option value="success">Success (Green)</option>
                    <option value="info">Info (Blue)</option>
                    <option value="warning">Warning (Yellow)</option>
                    <option value="error">Error (Red)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Message Body *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Describe the details of the notification clearly..."
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={250}
                  className={`w-full bg-gray-50 border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.message ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-purple-200 focus:border-purple-500"
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.message ? (
                    <p className="text-red-500 text-xs">{errors.message}</p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-gray-400">
                    {formData.message.length}/250 characters
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
                >
                  <Send size={16} />
                  Send Notification
                </button>
              </div>
            </form>

            {/* Quick Seeds */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Quick Simulation Actions (Preset Seeds)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  onClick={() => triggerPreset("Maintenance Scheduled", "System will undergo security updates tonight at 12:00 AM IST.", "warning")}
                  className="p-3 bg-yellow-50/50 hover:bg-yellow-50 text-left border border-yellow-200 rounded-lg text-xs transition cursor-pointer"
                >
                  <span className="font-semibold text-yellow-800 block mb-1">🔧 Maintenance Alert</span>
                  Trigger warning notification.
                </button>
                <button
                  onClick={() => triggerPreset("Database Backup Success", "Weekly database sync has been compiled and saved to AWS S3.", "success")}
                  className="p-3 bg-green-50/50 hover:bg-green-50 text-left border border-green-200 rounded-lg text-xs transition cursor-pointer"
                >
                  <span className="font-semibold text-green-800 block mb-1">💾 DB Backup Success</span>
                  Trigger success notification.
                </button>
                <button
                  onClick={() => triggerPreset("Server API Error", "Third-party payment gateway endpoint returned code 503.", "error")}
                  className="p-3 bg-red-50/50 hover:bg-red-50 text-left border border-red-200 rounded-lg text-xs transition cursor-pointer"
                >
                  <span className="font-semibold text-red-800 block mb-1">🚨 Gateway Error</span>
                  Trigger error notification.
                </button>
              </div>
            </div>
          </div>

          {/* Recent Sent Notifications */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <History size={18} className="text-purple-600" />
                History
              </h2>
              {list.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-red-600 hover:text-red-800 font-semibold transition flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={12} />
                  Clear
                </button>
              )}
            </div>

            <div className="max-h-[500px] overflow-y-auto pr-1 no-scrollbar space-y-3">
              {list.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400 text-center">
                  <Bell className="w-10 h-10 text-gray-300 mb-2" />
                  <p className="text-sm font-medium">No history yet</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Notifications sent by admins will appear here.
                  </p>
                </div>
              ) : (
                list.map((item) => {
                  const style = getTypeStyle(item.type);
                  return (
                    <div 
                      key={item.id} 
                      className={`p-3 border rounded-lg flex items-start gap-2.5 transition relative group hover:shadow-sm ${style.bg}`}
                    >
                      <div className="mt-0.5 flex-shrink-0">{style.icon}</div>
                      <div className="flex-grow pr-5">
                        <h4 className="text-xs font-bold text-gray-800 break-words">{item.title}</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-3">{item.message}</p>
                        <span className="text-[9px] text-gray-400 block mt-1">{item.time}</span>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="absolute right-2 top-2 p-1 text-gray-400 hover:text-red-600 rounded transition opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Delete notification"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default SendNotification;
