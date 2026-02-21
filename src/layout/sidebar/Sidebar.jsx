
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdPostAdd, MdSubscriptions } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsPersonSquare } from "react-icons/bs";
import { MdPersonSearch } from "react-icons/md";

import logo from "../../assets/Logo.jpg";
import profile from "../../assets/profile.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleNavigation = (text, path) => {
    setActiveTab(text);
    navigate(path);
  };

  return (
    // <div className="h-screen w-[250px] bg-[#52395F] text-white flex flex-col p-4 overflow-y-auto no-scrollbar">
    <div className="
  h-screen 
  w-[300px] 
  text-white 
  flex 
  flex-col 
  p-4 
  overflow-y-auto 
  no-scrollbar
  bg-gradient-to-b 
  from-[#efe8f5] 
  via-[#b07ad9] 
  to-[#8e44c3]
">


      {/* Logo Section */}
      <div className="flex flex-col items-center mb-8 relative">
        <div className="absolute w-[190px] h-[90px]  blur-xl opacity-50 rounded-lg"></div>
        <img
        src={logo}
        alt="TechnoHire Logo"
        className="relative w-[270px] h-[80px] mb-2 mix-blend-multiply"
        />

      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col flex-grow gap-5">
        <NavItem
          icon={<MdDashboard />}
          text="Dashboard"
          active={activeTab === "Dashboard"}
          onClick={() => handleNavigation("Dashboard", "/dashboard")}
        />
       <NavItem
          icon={<MdPostAdd />}
          text="HR Management"
          active={activeTab === "HR Management"}
          onClick={() =>
            handleNavigation("HR Management", "/hr-managment")
          }
        />
        <NavItem
          icon={<MdPostAdd />}
          text="Job seeker Management"
          active={activeTab === "Job Post Management"}
          onClick={() =>
            handleNavigation("Job Post Management", "/alljobs-post")
          }
        />
       <NavItem
          icon={<MdPostAdd />}
          text="Database Managment"
          active={activeTab === "Job Post Management"}
          onClick={() =>
            handleNavigation("Job Post Management", "/alljobs-post")
          }
        />
                <NavItem
          icon={<MdSubscriptions />}
          text="Subscription Management"
          active={activeTab === "Subscription Management"}
          onClick={() =>
            handleNavigation(
              "Subscription Management",
              "/subscription-management"
            )
          }
        />
            <NavItem
          icon={<RiMoneyDollarCircleLine />}
          text="Credit Managment"
          active={activeTab === "Revenue Model"}
          onClick={() => handleNavigation("Revenue Model", "/revenue-model")}
        />
        <NavItem
          icon={<RiMoneyDollarCircleLine />}
          text="Revenue Managment"
          active={activeTab === "Revenue Model"}
          onClick={() => handleNavigation("Revenue Model", "/revenue-model")}
        />
        <NavItem
          icon={<RiMoneyDollarCircleLine />}
          text="Terms & Services"
          active={activeTab === "Revenue Model"}
          onClick={() => handleNavigation("Revenue Model", "/revenue-model")}
        />
                <NavItem
          icon={<RiMoneyDollarCircleLine />}
          text="Help & Support"
          active={activeTab === "Revenue Model"}
          onClick={() => handleNavigation("Revenue Model", "/revenue-model")}
        />

                       <NavItem
          icon={<RiMoneyDollarCircleLine />}
          text="Logout"
          active={activeTab === "Revenue Model"}
          onClick={() => handleNavigation("Revenue Model", "/revenue-model")}
        />

        {/* <NavItem
          icon={<BsPersonSquare />}
          text="Employer Management"
          active={activeTab === "Employer Management"}
          onClick={() => handleNavigation("Employer Management", "/employee")}
        />
        <NavItem
          icon={<MdPersonSearch />}
          text="Candidate Management"
          active={activeTab === "Candidate Management"}
          onClick={() => handleNavigation("Candidate Management", "/candidate")}
        /> */}
      </nav>

      {/* Bottom Section (Profile & Logout) */}
      {/* <div className="mt-auto border-t border-gray-600 pt-4">
       
        <div className="flex items-center gap-3 mb-4">
          <img className="w-10 h-10 rounded-full" src={profile} alt="Profile" />
          <div>
            <div className="text-sm">TechnoHire</div>
            <div className="bg-orange-500 text-xs text-center rounded-full px-2">
              Admin
            </div>
          </div>
        </div>

      
        <NavItem
          icon={<FaSignOutAlt />}
          text="Log out"
          className="text-red-400 hover:bg-red-700"
          onClick={() => handleNavigation("Log out", "/logout")}
        />
      </div> */}
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick, className }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all
        ${
          active
            ? "bg-[#e9d5ff] text-[#7e22ce] font-semibold"
            : "text-white hover:bg-white/10"
        }
        ${className}
      `}
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  );
};


export default Sidebar;
