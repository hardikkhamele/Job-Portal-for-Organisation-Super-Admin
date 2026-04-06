import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdPostAdd, MdSubscriptions } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { ChevronDown, ChevronUp } from "lucide-react";
import logo from "../../assets/Logo.jpg";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/auth/loginSlice";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname.startsWith(path);
  const dispatch = useDispatch();
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isDatabaseOpen, setIsDatabaseOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Modal State
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleNavigation = (text, path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      // window.location.href = "/login";
      navigate("/login")
    }, 500);
  };

  return (
    <>
      <div className="h-screen w-[310px] text-white flex flex-col p-3 overflow-y-auto no-scrollbar bg-gradient-to-b from-[#efe8f5] via-[#b07ad9] to-[#8e44c3]">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8 relative">
          <div className="absolute w-[190px] h-[90px] blur-xl opacity-50 rounded-lg"></div>
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
            active={isActive("/hr-management")}
            onClick={() => handleNavigation("HR Management", "/hr-management")}
          />
          <NavItem
            icon={<MdPostAdd />}
            text="Employee Management"
            active={isActive("/employee")}
            onClick={() => handleNavigation("Employee Management", "/employee")}
          />
          <NavItem
            icon={<MdPostAdd />}
            text="Job Seeker Management"
            active={isActive("/job-seeker")}
            onClick={() =>
              handleNavigation("Job Seeker Management", "/job-seeker")
            }
          />
         {/* Database Management Dropdown */}
            <div
              onClick={() => setIsDatabaseOpen(!isDatabaseOpen)}
              className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer
                ${isDatabaseOpen ? "bg-[#e9d5ff] text-[#7e22ce]" : "text-white hover:bg-white/10"}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  <MdPostAdd />
                </span>
                <span className="text">Database Management</span>
              </div>
              {isDatabaseOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
              
            {isDatabaseOpen && (
              <div className="ml-9 flex flex-col gap-2 mt-1">
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${
                    isActive("/candidates")
                      ? "bg-yellow-400 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() =>
                    handleNavigation("Database Candidate", "/candidates")
                  }
                >
                  Database Candidate
                </div>
                
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${
                    isActive("/accept-reject")
                      ? "bg-yellow-400 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() =>
                    handleNavigation("Accept Reject", "/accept-reject")
                  }
                >
                  Accept Reject
                </div>
              </div>
            )}
          <NavItem
            icon={<MdPostAdd />}
            text="Job Management"
            active={isActive("/job-management")}
            onClick={() =>
              handleNavigation("Job Management", "/job-management")
            }
          />

          {/* Subscription Dropdown */}
          <div
            onClick={() => setIsSubOpen(!isSubOpen)}
            className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer
              ${isSubOpen ? "bg-[#e9d5ff] text-[#7e22ce]" : "text-white hover:bg-white/10"}
            `}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">
                <MdSubscriptions />
              </span>
              <span className="text">Subscription Management</span>
            </div>
            {isSubOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {isSubOpen && (
            <div className="ml-9 flex flex-col gap-2 mt-1">
              <div
                className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/job-seeker-plans") ? "bg-yellow-400 text-white" : "text-white hover:bg-white/10"}`}
                onClick={() =>
                  handleNavigation("Job Seeker Plans", "/job-seeker-plans")
                }
              >
                Job Seeker Plans
              </div>
              <div
                className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/employer-plans") ? "bg-yellow-400 text-white" : "text-white hover:bg-white/10"}`}
                onClick={() =>
                  handleNavigation("Employer Plans", "/employer-plans")
                }
              >
                Employer Plans
              </div>
              <div
                className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/custom-plans") ? "bg-yellow-400 text-white" : "text-white hover:bg-white/10"}`}
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
            onClick={() =>
              handleNavigation("Credit Management", "/credit-management")
            }
          />

          <NavItem
            icon={<RiMoneyDollarCircleLine />}
            text="Revenue Managment"
            active={isActive("/revenue-management")}
            onClick={() =>
              handleNavigation("Revenue Management", "/revenue-management")
            }
          />

          {/* Terms Dropdown */}
          <div>
            <div
              onClick={() => setIsTermsOpen(!isTermsOpen)}
              className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer
                ${isTermsOpen ? "bg-[#e9d5ff] text-[#7e22ce]" : "text-white hover:bg-white/10"}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  <RiMoneyDollarCircleLine />
                </span>
                <span className="text-base">Terms & Services</span>
              </div>
              {isTermsOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>
            {isTermsOpen && (
              <div className="ml-10 flex flex-col gap-2 mt-2">
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/jobseeker") ? "bg-yellow-400 text-white" : "text-white hover:bg-white/10"}`}
                  onClick={() => handleNavigation("JobSeeker", "/jobseeker")}
                >
                  Job Seeker
                </div>
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/employer") ? "bg-yellow-400 text-white" : "text-white hover:bg-white/10"}`}
                  onClick={() => handleNavigation("Employer", "/employer")}
                >
                  Employer
                </div>
              </div>
            )}
          </div>

          {/* Help Dropdown */}
          <div>
            <div
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer
                ${isHelpOpen ? "bg-[#e9d5ff] text-[#7e22ce]" : "text-white hover:bg-white/10"}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  <RiMoneyDollarCircleLine />
                </span>
                <span className="text-base">Help & Support</span>
              </div>
              {isHelpOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {isHelpOpen && (
              <div className="ml-10 flex flex-col gap-2 mt-2">
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/faqs") ? "bg-yellow-400 text-white" : "text-white hover:bg-white/10"}`}
                  onClick={() => handleNavigation("FAQs", "/faqs")}
                >
                  FAQs
                </div>
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/chat-support") ? "bg-yellow-400 text-white" : "text-white hover:bg-white/10"}`}
                  onClick={() =>
                    handleNavigation("Chat Support", "/chat-support")
                  }
                >
                  Chat Support
                </div>
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/social-links") ? "bg-yellow-400 text-white" : "text-white hover:bg-white/10"}`}
                  onClick={() =>
                    handleNavigation("Social Links", "/social-links")
                  }
                >
                  Social Links
                </div>
              </div>
            )}
          </div>

          {/* Logout Button - Triggers Modal */}
          <NavItem
            icon={<FaSignOutAlt />}
            text="Logout"
            active={false}
            className="text-red-200 hover:bg-red-500/20"
            onClick={() => setShowLogoutModal(true)}
          />
        </nav>
      </div>

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/0 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSignOutAlt size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Confirm Logout
              </h3>
              <p className="text-gray-600 mt-2">
                Are you sure you want to logout? You will need to login again to
                access your account.
              </p>
            </div>

            <div className="bg-gray-50 p-4 flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-200 cursor-pointer text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-[#7e22cedd] cursor-pointer text-white rounded-lg font-semibold hover:bg-[#7b19d0] transition-colors shadow-lg shadow-red-200"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
