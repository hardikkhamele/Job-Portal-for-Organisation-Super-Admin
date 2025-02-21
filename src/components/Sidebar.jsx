// import React from "react";

// import { Link, useNavigate } from "react-router-dom";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   return (
//     <div className=" w-1/5 relative flex flex-col gap-5 justify-start items-center bg-[#52395F]">
//       <div className="w-full flex  bg-radial to-75% from-[#f2f2f2]  to-transparent justify-center items-center  aspect-5/4">
//         <img className="w-40 " src="logo.svg" alt="" />
//       </div>
//       <div className="flex justify-center gap-2 items-center rounded-lg w-4/5 h-10 bg-[#9952BF]">
//         <img className="w-3 " src="sidebartop1.svg" alt="" />
//         <p className="text-white font-semibold text-[13px] ">Dashboard</p>
//       </div>
//       <li className="w-full flex items-center gap-2 px-3">
//         <img
//           className="w-4 cursor-pointer"
//           onClick={() => navigate("/alljobs-post")}
//           src="sidebartop2.svg"
//           alt="Job Management Icon"
//         />
//         <Link
//           to="/alljobs-post"
//           className="font-urbanist font-semibold text-white text-[12px]"
//         >
//           Job Post Management
//         </Link>
//       </li>
//       <li className="w-full flex justify-start px-3 gap-2 items-center">
//         <img className="w-4 " src="sidebartop3.svg" alt="" />
//         <a
//           href="/"
//           className="font-urbanist font-semibold text-white text-[12px]"
//         >
//           Revenue Model
//         </a>
//       </li>
//       <li className="w-full flex justify-start px-3 gap-2 items-center">
//         <img className="w-4 " src="sidebartop4.svg" alt="" />
//         <a
//           href="/"
//           className="font-urbanist font-semibold text-white text-[12px]"
//         >
//           Subscription Management{" "}
//         </a>
//       </li>
//       <li className="w-full flex justify-start px-3 gap-2 items-center">
//         <img className="w-4 " src="sidebartop5.svg" alt="" />
//         <a
//           href="/"
//           className="font-urbanist font-semibold text-white text-[12px]"
//         >
//           Employer Management{" "}
//         </a>
//       </li>
//       <li className="w-full flex justify-start px-3 gap-2 items-center">
//         <img className="w-4 " src="sidebartop6.svg" alt="" />
//         <a
//           href="/"
//           className="font-urbanist font-semibold text-white text-[12px]"
//         >
//           Candidate Management{" "}
//         </a>
//       </li>
//       <div className="absolute p-4 flex   flex-col gap-2 bottom-0 left-0 w-full aspect-5/2 ">
//         <div className="flex gap-3 items-center">
//           <img
//             className="w-10 h-10 rounded-[50%] "
//             src="dashboard3left1.svg"
//             alt=""
//           />
//           <span className="font-urbanist text-white text-sm ">
//             TechnoHire
//             <br />
//             <span className="text-[12px] mt-[-9px] px-1 bg-yellow-500 text-black rounded">
//               Admin
//             </span>
//           </span>
//         </div>
//         <a
//           href="/"
//           className=" px-2 flex items-center gap-3 text-red-400 text-md"
//         >
//           <img className="w-5 h-5" src="logout.svg" alt="" />
//           Log out
//         </a>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdPostAdd, MdSubscriptions } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsPersonSquare } from "react-icons/bs";
import { MdPersonSearch } from "react-icons/md";

import logo from "../assets/Logo.png";
import profile from "../assets/profile.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleNavigation = (text, path) => {
    setActiveTab(text);
    navigate(path);
  };

  return (
    <div className="h-screen w-[250px] bg-[#52395F] text-white flex flex-col p-4 overflow-y-auto">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-8 relative">
        <div className="absolute w-[190px] h-[90px] bg-white blur-xl opacity-50 rounded-lg"></div>
        <img
          src={logo}
          alt="TechnoHire Logo"
          className="relative w-[240px] h-[100px] shadow-white mb-2"
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
          text="Job Post Management"
          active={activeTab === "Job Post Management"}
          onClick={() =>
            handleNavigation("Job Post Management", "/alljobs-post")
          }
        />
        <NavItem
          icon={<RiMoneyDollarCircleLine />}
          text="Revenue Model"
          active={activeTab === "Revenue Model"}
          onClick={() => handleNavigation("Revenue Model", "/revenue-model")}
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
        />
      </nav>

      {/* Bottom Section (Profile & Logout) */}
      <div className="mt-auto border-t border-gray-600 pt-4">
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-4">
          <img className="w-10 h-10 rounded-full" src={profile} alt="Profile" />
          <div>
            <div className="text-sm">TechnoHire</div>
            <div className="bg-orange-500 text-xs text-center rounded-full px-2">
              Admin
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <NavItem
          icon={<FaSignOutAlt />}
          text="Log out"
          className="text-red-400 hover:bg-red-700"
          onClick={() => handleNavigation("Log out", "/logout")}
        />
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick, className }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
        active ? "bg-[#9952BF]" : "hover:bg-[#673A82]"
      } ${className}`}
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Sidebar;
