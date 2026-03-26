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
import LogoutModal from "../../components/common/LogoutModal";
import sidebarlogo from "../../assets/sidebar.png";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  // const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleNavigation = (text, path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setOpenLogoutModal(true); // open modal only
  };
  // Clear all session data
  localStorage.clear();
   window.dispatchEvent(new Event("localStorageUpdate"))
  navigate("/", { replace: true });
};


  const confirmLogout = () => {
    sessionStorage.setItem("isLogout", "true"); // for isLogout not token
    setOpenLogoutModal(false);
    navigate("/", { replace: true }); // navigate only (NO token remove)
  };

  return (
    // <div className="h-screen w-[250px] bg-[#52395F] text-white flex flex-col p-4 overflow-y-auto no-scrollbar">
    <div
      className="
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
"
    >
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
      <div className="max-h-[80vh] overflow-y-auto pr-2 no-scrollbar">
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
            onClick={() => handleNavigation("HR Management", "/hr-managment")}
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
          <NavItem
            icon={<MdPostAdd />}
            text="Database Management"
            active={isActive("/database")}
            onClick={() => handleNavigation("Database Management", "/database")}
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
              <span className="text-xl">
                <MdSubscriptions />
              </span>
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
                <span className="text-xl">
                  <RiMoneyDollarCircleLine />
                </span>
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
                  onClick={() =>
                    handleNavigation("Chat Support", "/chat-support")
                  }
                >
                  Chat Support
                </div>

                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${
                    isActive("/social-links")
                      ? "bg-yellow-400 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() =>
                    handleNavigation("Social Links", "/social-links")
                  }
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
          <div className="flex items-center gap-1">
            <img src={sidebarlogo} alt="sidebarlogo" className="w-15" />
            <div className="">
              <h3>Tehnokrate Hire</h3>
              <p>Smart hiring,fastest carrier</p>
            </div>
          </div>
        </nav>
      </div>

      <LogoutModal
        isOpen={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        onConfirm={confirmLogout}
      />
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
