import { useState, useEffect, useRef } from "react";
import { Search, Bell, MessageSquare, Moon, User, LogOut, ChevronDown } from "lucide-react";
import Ilogo from "../../assets/Ilogo.svg";
import Switch from "./DarkMode";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/auth/loginSlice";
import { getUnreadCount } from "../../utils/notificationHelper";

function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [unreadCount, setUnreadCount] = useState(getUnreadCount());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleUpdate = () => {
      setUnreadCount(getUnreadCount());
    };
    window.addEventListener("notificationsUpdated", handleUpdate);
    // Sync initially
    handleUpdate();
    return () => {
      window.removeEventListener("notificationsUpdated", handleUpdate);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("CURRENT_TOKEN:", token);
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        console.log("DECODED_TOKEN:", decoded);
      } catch (e) {
        console.error("DECODE_ERROR:", e);
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-14 justify-between items-center bg-white px-3 border-b border-purple-400">
      {/* Search Input */}
      {/* <div className="relative w-1/3">
        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search Anything"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-10 pr-3 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div> */}
      <div>
        <p className="text-xl font-semibold text-purple-800 tracking-tighter">Super Admin Panel</p>
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        {/* <Switch className="flex items-center" /> */}

        {/* Messages */}
        {/* <button className="p-2 bg-gray-100 rounded-full">
          <MessageSquare size={18} className="text-gray-700" />
        </button> */}

        {/* Notifications */}
        <button onClick={() => navigate("/notification-page")} className="relative p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
          <Bell size={20} className="text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border border-purple-300 hover:border-purple-500 transition-colors">
              <img src={Ilogo} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            <ChevronDown size={14} className={`text-gray-600 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2.5 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Super Admin</p>
                <p className="text-sm font-semibold text-gray-700 truncate">Administrator</p>
              </div>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/my-profile");
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <User size={16} />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  dispatch(logout());
                  navigate("/login");
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

