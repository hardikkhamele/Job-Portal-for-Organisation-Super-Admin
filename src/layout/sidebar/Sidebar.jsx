
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdPostAdd, MdSubscriptions } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsPersonSquare } from "react-icons/bs";
import { MdPersonSearch } from "react-icons/md";
import { ChevronDown, ChevronUp } from "lucide-react";
import logo from "../../assets/Logo.jpg";
import profile from "../../assets/profile.png";



const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  // const [activeTab, setActiveTab] = useState("Dashboard");
    const [isSubOpen, setIsSubOpen] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
  

  const handleNavigation = (text, path) => {
    
    navigate(path);
  };

  const handleLogout = () => {
  // Clear all session data
  localStorage.clear();
   window.dispatchEvent(new Event("localStorageUpdate"))
  navigate("/", { replace: true });
};



  return (
    // <div className="h-screen w-[250px] bg-[#52395F] text-white flex flex-col p-4 overflow-y-auto no-scrollbar">
    <div className="
  h-screen 
  w-[310px] 
  text-white 
  flex 
  flex-col 
  p-3 
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
          active={isActive("/dashboard")}
          onClick={() => handleNavigation("Dashboard", "/dashboard")}
        />
       <NavItem
          icon={<MdPostAdd />}
          text="HR Management"
          active={isActive("/hr-managment")}
          onClick={() =>
            handleNavigation("HR Management", "/hr-managment")
          }
        />

        <NavItem
          icon={<MdPostAdd />}
          text="Employee Management"
           active={isActive("/employee")}
          onClick={() =>
            handleNavigation("Employee Management", "/employee")
          }
        />

        <NavItem
          icon={<MdPostAdd />}
          text="Job Seeker Management"
          active={isActive("/alljobs-post")}
          onClick={() =>
            handleNavigation("Job Seeker Management", "/alljobs-post")
          }

        />
       <NavItem
          icon={<MdPostAdd />}
          text="Database Management"
          active={isActive("/database")}
          onClick={() =>
            handleNavigation("Database Management", "/database")
          }
        />

        <NavItem
          icon={<MdPostAdd />}
          text="Job Management"
          active={isActive("/job-management")}
          onClick={() =>
            handleNavigation("Job Management", "/job-management")
          }
        />


         {/*Subscription Dropdown with Arrow */}
        
          <div
            onClick={() => setIsSubOpen(!isSubOpen)}
            className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer
              ${isSubOpen ? "bg-[#e9d5ff] text-[#7e22ce]" : "text-white hover:bg-white/10"}
            `}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl"><MdSubscriptions /></span>
              <span className="text">Subscription Management</span>
            </div>

            {/* Arrow */}
            {isSubOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {/* Dropdown */}
          {isSubOpen && (
            <div className="ml-9 flex flex-col gap-2 mt-1">

              <div
                className={`px-3 py-2 rounded-md cursor-pointer ${
                  isActive("/job-seeker-plans")
                    ? "bg-yellow-400 text-white"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() =>
                  handleNavigation("Job Seeker Plans", "/job-seeker-plans")
                }
              >
                Job Seeker Plans
              </div>

              <div
              className={`px-3 py-2 rounded-md cursor-pointer ${
                isActive("/employer-plans")
                  ? "bg-yellow-400 text-white"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() =>
                handleNavigation("Employer Plans", "/employer-plans")
              }
            >
              Employer Plans
            </div>
            
              <div
              className={`px-3 py-2 rounded-md cursor-pointer ${
                isActive("/custom-plans")
                  ? "bg-yellow-400 text-white"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() =>
                handleNavigation("Custom Plans", "/custom-plans")
              }
            >
              Custom Plans
            </div>
            </div>
          )}

          
        <NavItem
        icon={<RiMoneyDollarCircleLine />}
        text="Credit Managment"
        active={isActive("/credit-management")}
        onClick={() => handleNavigation("Credit Management", "/credit-management")}
        />

        <NavItem
        icon={<RiMoneyDollarCircleLine />}
        text="Revenue Managment"
        active={isActive("/revenue-management")}
        onClick={() => handleNavigation("Revenue Management", "/revenue-management")}
        />

        <div>
            <div
              onClick={() => setIsTermsOpen(!isTermsOpen)}
              className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer
                ${isTermsOpen ? "bg-[#e9d5ff] text-[#7e22ce]" : "text-white hover:bg-white/10"}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl"><RiMoneyDollarCircleLine /></span>
                <span className="text-base">Terms & Services</span>
              </div>
              
              {isTermsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
              
            {/* Dropdown */}
            {isTermsOpen && (
              <div className="ml-10 flex flex-col gap-2 mt-2">
              
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${
                    isActive("/jobseeker")
                      ? "bg-yellow-400 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => handleNavigation("JobSeeker", "/jobseeker")}
                >
                  Job Seeker
                </div>
                
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${
                    isActive("/employer")
                      ? "bg-yellow-400 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => handleNavigation("Employer", "/employer")}
                >
                  Employer
                </div>
                
              </div>
            )}
          </div>
          
          <div>
            <div
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer
                ${isHelpOpen ? "bg-[#e9d5ff] text-[#7e22ce]" : "text-white hover:bg-white/10"}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl"><RiMoneyDollarCircleLine /></span>
                <span className="text-base">Help & Support</span>
              </div>
              
              {isHelpOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
              
           {/* Dropdown */}
            {isHelpOpen && (
              <div className="ml-10 flex flex-col gap-2 mt-2">
              
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${
                    isActive("/faqs")
                      ? "bg-yellow-400 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => handleNavigation("FAQs", "/faqs")}
                >
                  FAQs
                </div>
                
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${
                    isActive("/chat-support")
                      ? "bg-yellow-400 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => handleNavigation("Chat Support", "/chat-support")}
                >
                  Chat Support
                </div>
                
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${
                    isActive("/social-links")
                      ? "bg-yellow-400 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => handleNavigation("Social Links", "/social-links")}
                >
                  Social Links
                </div>
                
              </div>
            )}
          </div>

        <NavItem
          icon={<RiMoneyDollarCircleLine />}
          text="Logout"
          active={false}
          onClick={handleLogout}
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
      className={`flex items-center gap-3 px-4 py-1 rounded-md cursor-pointer transition-all 
        ${
          active
            ? "bg-[#e9d5ff] text-[#7e22ce] font-semibold px-2 py-2"
            : "text-white hover:bg-white/10 px-3 py-2"
        }
        ${className}
      `}
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-base">{text}</span>
    </div>
  );
};


export default Sidebar;
