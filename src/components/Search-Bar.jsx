import { useState } from "react";
import { Search, Bell, MessageSquare, Moon } from "lucide-react";
import Ilogo from "../assets/Ilogo.svg";
import Switch from "../components/DarkMode";

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex h-14 mb-2 justify-between items-center bg-white p-3  shadow-md">
      {/* Search Input */}
      <div className="relative w-1/3">
        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search Anything"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <Switch className="flex items-center" />

        {/* Messages */}
        <button className="p-2 bg-gray-100 rounded-full">
          <MessageSquare size={18} className="text-gray-700" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 bg-gray-100 rounded-full">
          <Bell size={18} className="text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            2
          </span>
        </button>

        {/* User Profile (Replace with actual user image) */}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <img src={Ilogo} alt="User Avatar" />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
