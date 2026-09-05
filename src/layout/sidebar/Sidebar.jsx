// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaSignOutAlt } from "react-icons/fa";
// import { MdDashboard, MdPostAdd, MdSubscriptions } from "react-icons/md";
// import { RiMoneyDollarCircleLine } from "react-icons/ri";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import logo from "../../assets/Logo.svg";
// import { useDispatch } from "react-redux";
// import { logout } from "../../redux/slice/auth/loginSlice";
// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   // const isActive = (path) => location.pathname.startsWith(path);
//   const isActive = (path) => location.pathname === path;
//   const dispatch = useDispatch();
//   const [isSubOpen, setIsSubOpen] = useState(false);
//   const [isDatabaseOpen, setIsDatabaseOpen] = useState(false);
//   const [isTermsOpen, setIsTermsOpen] = useState(false);
//   const [isHelpOpen, setIsHelpOpen] = useState(false);

//   // Modal State
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const handleNavigation = (text, path) => {
//     navigate(path);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     setTimeout(() => {
//       // window.location.href = "/login";
//       navigate("/login");
//     }, 500);
//   };

//   return (
//     <>
//       <div className="h-screen w-[300px] text-white flex flex-col  overflow-y-auto no-scrollbar bg-gradient-to-b from-[#efe8f5] via-[#b07ad9] to-[#8e44c3] border-r border-purple-400">
//         {/* Logo Section */}
//         <div className="sticky top-0 z-10 flex bg-white flex-col items-center mb-2 border-b border-purple-400 ">
//           <div className="absolute w-[190px] h-[90px] blur-xl opacity-50 rounded-lg"></div>
//           <img
//             src={logo}
//             alt="TechnoHire Logo"
//             className="relative w-[270px] h-[80px] mb-2 mix-blend-multiply"
//           />
//         </div>

//         {/* Navigation Menu */}
//         <nav className="flex flex-col flex-grow gap-1 px-2 ">
//           <NavItem
//             icon={<MdDashboard />}
//             text="Dashboard"
//             active={isActive("/dashboard")}
//             onClick={() => handleNavigation("Dashboard", "/dashboard")}
//           />
//           <NavItem
//             icon={<MdPostAdd />}
//             text="HR Management"
//             active={isActive("/hr-management")}
//             onClick={() => handleNavigation("HR Management", "/hr-management")}
//           />
//           <NavItem
//             icon={<MdPostAdd />}
//             text="Employee Management"
//             active={isActive("/employee")}
//             onClick={() => handleNavigation("Employee Management", "/employee")}
//           />
//           <NavItem
//             icon={<MdPostAdd />}
//             text="Job Seeker Management"
//             active={isActive("/job-seeker")}
//             onClick={() =>
//               handleNavigation("Job Seeker Management", "/job-seeker")
//             }
//           />
//           {/* Database Management Dropdown */}
//           <div
//             onClick={() => setIsDatabaseOpen(!isDatabaseOpen)}
//             className={`flex items-center font-semibold justify-between px-4 py-3 rounded-xl cursor-pointer
//                 ${isDatabaseOpen ? "bg-[#ffffff] text-[#7e22ce] font-semibold border-l-6 px-2 py-2" : "text-white hover:bg-white/10"}
//               `}
//           >
//             <div className="flex items-center gap-3">
//               <span className="text-xl">
//                 <MdPostAdd />
//               </span>
//               <span className="text">Database Management</span>
//             </div>
//             {isDatabaseOpen ? (
//               <ChevronUp size={18} />
//             ) : (
//               <ChevronDown size={18} />
//             )}
//           </div>

//           {isDatabaseOpen && (
//             <div className="ml-9 flex flex-col gap-2 mt-1">
//               <div
//                 className={`px-3 py-2 rounded-md cursor-pointer ${
//                   isActive("/candidates")
//                     ? "bg-white text-purple-700 font-semibold rounded-xl border-l-6 px-2 py-2"
//                     : "text-white hover:bg-white/10"
//                 }`}
//                 onClick={() =>
//                   handleNavigation("Database Candidate", "/candidates")
//                 }
//               >
//                 Database Candidate
//               </div>

//               <div
//                 className={`px-3 py-2 rounded-md cursor-pointer ${
//                   isActive("/accept-reject")
//                     ? "bg-white text-purple-700 font-semibold rounded-xl border-l-6 px-2 py-2"
//                     : "text-white hover:bg-white/10"
//                 }`}
//                 onClick={() =>
//                   handleNavigation("Accept Reject", "/accept-reject")
//                 }
//               >
//                 Accept Reject
//               </div>
//             </div>
//           )}

//           <NavItem
//             icon={<MdPostAdd />}
//             text="Job Management"
//             active={isActive("/job-management")}
//             onClick={() =>
//               handleNavigation("Job Management", "/job-management")
//             }
//           />

//           {/* Subscription Dropdown */}
//           {/* <div
//             onClick={() => setIsSubOpen(!isSubOpen)}
//             className={`flex font-semibold items-center justify-between px-4 py-2 rounded-xl cursor-pointer
//               ${isSubOpen ? "bg-[#ffffff] text-[#7e22ce] font-semibold border-l-6 px-2 py-3" : "text-white hover:bg-white/10"}
//             `}
//           > */}
//           <div
//             onClick={() => setIsSubOpen(!isSubOpen)}
//             className={`flex font-semibold items-center justify-between px-4 py-2 rounded-xl cursor-pointer
//     /* Yahan change hai: sirf tab active dikhao jab dropdown khula ho lekin koi child selected NA ho */
//     /* Ya fir simple rakho: sirf hover effect do, background white mat karo */
//     ${isSubOpen ? "bg-white/10 text-white" : "text-white hover:bg-white/10"}
//   `}
//           >
//             <div className="flex items-center gap-3">
//               <span className="text-xl">
//                 <MdSubscriptions />
//               </span>
//               <span className="text">Subscription Management</span>
//             </div>
//             {isSubOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//           </div>

//           {isSubOpen && (
//             <div className="ml-9 flex flex-col gap-2 mt-1">
//               <div
//                 className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/job-seeker-plans") ? "bg-white text-purple-700 font-semibold rounded-xl border-l-6 px-2 py-2" : "text-white hover:bg-white/10"}`}
//                 onClick={() =>
//                   handleNavigation("Job Seeker Plans", "/job-seeker-plans")
//                 }
//               >
//                 Job Seeker Plans
//               </div>
//               <div
//                 className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/employer-plans") ? "bg-white text-purple-700 font-semibold rounded-xl border-l-6 px-2 py-2" : "text-white hover:bg-white/10"}`}
//                 onClick={() =>
//                   handleNavigation("Employer Plans", "/employer-plans")
//                 }
//               >
//                 Employer Plans
//               </div>
//               <div
//                 className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/custom-plans") ? "bg-white text-purple-700 font-semibold rounded-xl border-l-6 px-2 py-2" : "text-white hover:bg-white/10"}`}
//                 onClick={() =>
//                   handleNavigation("Custom Plans", "/custom-plans")
//                 }
//               >
//                 Custom Plans
//               </div>
//             </div>
//           )}

//           <NavItem
//             icon={<RiMoneyDollarCircleLine />}
//             text="Credit Managment"
//             active={isActive("/credit-management")}
//             onClick={() =>
//               handleNavigation("Credit Management", "/credit-management")
//             }
//           />

//           <NavItem
//             icon={<RiMoneyDollarCircleLine />}
//             text="Revenue Managment"
//             active={isActive("/revenue-management")}
//             onClick={() =>
//               handleNavigation("Revenue Management", "/revenue-management")
//             }
//           />

//           {/* Terms Dropdown */}
//           <div>
//             <div
//               onClick={() => setIsTermsOpen(!isTermsOpen)}
//               className={`flex font-semibold items-center justify-between px-4 py-2 rounded-xl cursor-pointer
//                 ${isTermsOpen ? "bg-[#ffffff] text-[#7e22ce] font-semibold border-l-6 px-2 py-3" : "text-white hover:bg-white/10"}
//               `}
//             >
//               <div className="flex items-center gap-3">
//                 <span className="text-xl">
//                   <RiMoneyDollarCircleLine />
//                 </span>
//                 <span className="text-base">Terms & Services</span>
//               </div>
//               {isTermsOpen ? (
//                 <ChevronUp size={18} />
//               ) : (
//                 <ChevronDown size={18} />
//               )}
//             </div>
//             {isTermsOpen && (
//               <div className="ml-10 flex flex-col gap-2 mt-2">
//                 <div
//                   className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/jobseeker") ? "bg-white text-purple-700 font-semibold rounded-xl border-l-6 px-2 py-2" : "text-white hover:bg-white/10"}`}
//                   onClick={() => handleNavigation("JobSeeker", "/jobseeker")}
//                 >
//                   Job Seeker
//                 </div>
//                 <div
//                   className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/employer") ? "bg-white text-purple-700 font-semibold rounded-xl border-l-6 px-2 py-2" : "text-white hover:bg-white/10"}`}
//                   onClick={() => handleNavigation("Employer", "/employer")}
//                 >
//                   Employer
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Help Dropdown */}
//           <div>
//             <div
//               onClick={() => setIsHelpOpen(!isHelpOpen)}
//               className={`flex font font-semibold items-center justify-between px-4 py-2 rounded-xl cursor-pointer
//                 ${isHelpOpen ? "bg-[#ffffff] text-[#7e22ce] font-semibold border-l-6 px-2 py-3" : "text-white hover:bg-white/10"}
//               `}
//             >
//               <div className="flex items-center gap-3">
//                 <span className="text-xl">
//                   <RiMoneyDollarCircleLine />
//                 </span>
//                 <span className="text-base">Help & Support</span>
//               </div>
//               {isHelpOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//             </div>
//             {isHelpOpen && (
//               <div className="ml-10 flex flex-col gap-2 mt-2">
//                 <div
//                   className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/faqs") ? "bg-white text-purple-700 font-semibold rounded-xl border-l-6 px-2 py-2" : "text-white hover:bg-white/10"}`}
//                   onClick={() => handleNavigation("FAQs", "/faqs")}
//                 >
//                   FAQs
//                 </div>
//                 <div
//                   className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/chat-support") ? "bg-white text-purple-700 font-semibold rounded-xl border-l-6 px-2 py-2" : "text-white hover:bg-white/10"}`}
//                   onClick={() =>
//                     handleNavigation("Chat Support", "/chat-support")
//                   }
//                 >
//                   Chat Support
//                 </div>
//                 <div
//                   className={`px-3 py-2 rounded-md cursor-pointer ${isActive("/social-links") ? "bg-white text-purple-700 font-semibold rounded-xl border-l-6 px-2 py-2" : "text-white hover:bg-white/10"}`}
//                   onClick={() =>
//                     handleNavigation("Social Links", "/social-links")
//                   }
//                 >
//                   Social Links
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Logout Button - Triggers Modal */}
//           <NavItem
//             icon={<FaSignOutAlt />}
//             text="Logout"
//             active={false}
//             className="text-red-200 hover:bg-red-500/20"
//             onClick={() => setShowLogoutModal(true)}
//           />
//         </nav>
//       </div>

//       {/* --- LOGOUT CONFIRMATION MODAL --- */}
//       {showLogoutModal && (
//         <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/0 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
//             <div className="p-6 text-center">
//               <div className="w-16 h-16 bg-red-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaSignOutAlt size={28} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">
//                 Confirm Logout
//               </h3>
//               <p className="text-gray-600 mt-2">
//                 Are you sure you want to logout? You will need to login again to
//                 access your account.
//               </p>
//             </div>

//             <div className="bg-gray-50 p-4 flex gap-3">
//               <button
//                 onClick={() => setShowLogoutModal(false)}
//                 className="flex-1 px-4 py-2.5 bg-gray-200 cursor-pointer text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex-1 px-4 py-2.5 bg-[#7e22cedd] cursor-pointer text-white rounded-lg font-semibold hover:bg-[#7b19d0] transition-colors shadow-lg shadow-red-200"
//               >
//                 Yes, Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const NavItem = ({ icon, text, active, onClick, className }) => {
//   return (
//     <div
//       className={`flex items-center font-semibold gap-2 px-4 py-3 rounded-xl cursor-pointer transition-all 
//         ${
//           active
//             ? "bg-[#ffffff] text-[#7e22ce] font-semibold border-l-6 px-2 py-2"
//             : "text-white  hover:bg-white/10 px-3 py-2"
//         }
//         ${className}
//       `}
//       onClick={onClick}
//     >
//       <span className="text-lg">{icon}</span>
//       <span className="text-base">{text}</span>
//     </div>
//   );
// };

// export default Sidebar;







import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdPostAdd, MdSubscriptions, MdHelpOutline } from "react-icons/md";
import { RiMoneyDollarCircleLine, RiShieldLine } from "react-icons/ri";
import { Banknote, Briefcase, Building2, ChevronDown, ChevronUp, Database, FolderKanban, ShieldCheck, Users, UserSearch,NotebookPen } from "lucide-react";
import logo from "../../assets/Logo.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/auth/loginSlice";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isActive = (path) => location.pathname === path;

  // Dropdown States
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isDatabaseOpen, setIsDatabaseOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Function to close all dropdowns when clicking outside
  const closeAllDropdowns = () => {
    setIsSubOpen(false);
    setIsDatabaseOpen(false);
    setIsTermsOpen(false);
    setIsHelpOpen(false);
  };

  // Improved Navigation Handler
  const handleNavigation = (path) => {
    closeAllDropdowns(); // Dashboard etc pe click karte hi dropdown band
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const isGroupActive = (paths) => paths.some(path => location.pathname === path);

  return (
    <>
      <div className="h-screen w-[300px] text-white flex flex-col overflow-y-auto no-scrollbar bg-gradient-to-b from-[#efe8f5] via-[#b07ad9] to-[#8e44c3] border-r border-purple-400">
        
        {/* Logo Section */}
        <div className="sticky top-0 z-10 flex bg-white flex-col items-center mb-4 border-b border-purple-400">
          <img src={logo} alt="Logo" className="w-[270px] h-[80px] mix-blend-multiply" />
        </div>

        <nav className="flex flex-col flex-grow gap-1 px-3 pb-10">
          
          {/* 1. Dashboard */}
          <NavItem icon={<MdDashboard />} text="Dashboard" active={isActive("/dashboard")} onClick={() => handleNavigation("/dashboard")} />
          
          {/* 2. HR Management */}
          <NavItem icon={<Users />} text="HR Management" active={window.location.pathname.startsWith("/hr-management")} onClick={() => handleNavigation("/hr-management")} />
          
          {/* 3. Employer Management */}
          <NavItem icon={<Briefcase />} text="Employer Management" active={window.location.pathname.startsWith("/employee")} onClick={() => handleNavigation("/employee")} />
          
          {/* 3.5. Sales Team Onboarding */}
          <NavItem icon={<Users />} text="Sales Team Onboarding" active={window.location.pathname.startsWith("/sales-team-onboarding")} onClick={() => handleNavigation("/sales-team-onboarding")} />
          <NavItem icon={<Building2 />} text="Vendor Module" active={isActive("/sales-team-onboarding/vendors")} onClick={() => handleNavigation("/sales-team-onboarding/vendors")} />
          
          {/* 4. Job Seeker Management */}
          <NavItem icon={<UserSearch />} text="Job Seeker Management" active={window.location.pathname.startsWith("/job-seeker")} onClick={() => handleNavigation("/job-seeker")} />

          {/* 5. Database Management Dropdown */}
          <div>
            <DropdownHeader 
              icon={<Database />} 
              text="Database Management" 
              isOpen={isDatabaseOpen} 
              active={isGroupActive(["/candidates", "/accept-reject"])}
              onClick={() => {
                const state = !isDatabaseOpen;
                closeAllDropdowns();
                setIsDatabaseOpen(state);
              }} 
            />
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDatabaseOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
              <div className="ml-9 flex flex-col gap-1">
                <SubNavItem text="Database Candidate" active={isActive("/candidates")} onClick={() => navigate("/candidates")} />
                <SubNavItem text="Accept Reject" active={isActive("/accept-reject")} onClick={() => navigate("/accept-reject")} />
              </div>
            </div>
          </div>

          {/* 6. Job Management */}
          <NavItem icon={<FolderKanban />} text="Job Management" active={window.location.pathname.startsWith("/job-management")} onClick={() => handleNavigation("/job-management")} />

          {/* 7. Subscription Dropdown */}
          <div>
            <DropdownHeader 
              icon={<MdSubscriptions />} 
              text="Subscription Management" 
              isOpen={isSubOpen} 
              active={isGroupActive(["/job-seeker-plans", "/employer-plans", "/custom-plans"])}
              onClick={() => {
                const state = !isSubOpen;
                closeAllDropdowns();
                setIsSubOpen(state);
              }} 
            />
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSubOpen ? "max-h-60 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
              <div className="ml-9 flex flex-col gap-1">
                <SubNavItem text="Job Seeker Plans" active={isActive("/job-seeker-plans")} onClick={() => navigate("/job-seeker-plans")} />
                <SubNavItem text="Employer Plans" active={isActive("/employer-plans")} onClick={() => navigate("/employer-plans")} />
                <SubNavItem text="Custom Plans" active={isActive("/custom-plans")} onClick={() => navigate("/custom-plans")} />
              </div>
            </div>
          </div>

          {/* 8. Credit Management */}
          <NavItem icon={<RiMoneyDollarCircleLine />} text="Credit Management" active={isActive("/credit-management")} onClick={() => handleNavigation("/credit-management")} />
          
          {/* 9. Revenue Management */}
          <NavItem icon={<Banknote />} text="Revenue Management" active={isActive("/revenue-management")} onClick={() => handleNavigation("/revenue-management")} />

            <NavItem
            icon={<NotebookPen />}
            text="Blog Management"
            active={window.location.pathname.startsWith("/blog-management")}
            onClick={() => handleNavigation("/blog-management")}
          />

          {/* 10. Terms Dropdown */}
          <div>
            <DropdownHeader 
              icon={<RiShieldLine />} text="Terms & Services" isOpen={isTermsOpen} 
              active={isGroupActive(["/jobseeker", "/employer"])}
              onClick={() => { 
                const state = !isTermsOpen;
                closeAllDropdowns();
                setIsTermsOpen(state);
              }} 
            />
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isTermsOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
              <div className="ml-9 flex flex-col gap-1">
                <SubNavItem text="Job Seeker" active={isActive("/jobseeker")} onClick={() => navigate("/jobseeker")} />
                <SubNavItem text="Employer" active={isActive("/employer")} onClick={() => navigate("/employer")} />
              </div>
            </div>
          </div>

          {/* 11. Help & Support Dropdown */}
          <div>
            <DropdownHeader 
              icon={<MdHelpOutline />} text="Help & Support" isOpen={isHelpOpen} 
              active={isGroupActive(["/faqs", "/chat-support", "/social-links"])}
              onClick={() => { 
                const state = !isHelpOpen;
                closeAllDropdowns();
                setIsHelpOpen(state);
              }} 
            />
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isHelpOpen ? "max-h-60 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
              <div className="ml-9 flex flex-col gap-1">
                <SubNavItem text="FAQs" active={isActive("/faqs")} onClick={() => navigate("/faqs")} />
                <SubNavItem text="Chat Support" active={isActive("/chat-support")} onClick={() => navigate("/chat-support")} />
                <SubNavItem text="Social Links" active={isActive("/social-links")} onClick={() => navigate("/social-links")} />
              </div>
            </div>
          </div>

          {/* 12. Logout */}
          <div className="mt-1 border-t border-white/20 pt-2">
            <NavItem icon={<FaSignOutAlt />} text="Logout" active={false} className="text-red-100 hover:bg-red-500/20" onClick={() => setShowLogoutModal(true)} />
          </div>
        </nav>
      </div>

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSignOutAlt size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Confirm Logout</h3>
              <p className="text-gray-600 mt-2">Are you sure you want to logout? You will need to login again to access your account.</p>
            </div>
            <div className="bg-gray-50 p-4 flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 px-4 py-2.5 bg-gray-200 cursor-pointer text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Cancel</button>
              <button onClick={handleLogout} className="flex-1 px-4 py-2.5 bg-[#7e22cedd] cursor-pointer text-white rounded-lg font-semibold hover:bg-[#7b19d0] transition-colors shadow-lg">Yes, Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


const NavItem = ({ icon, text, active, onClick, className }) => (
  <div
    onClick={onClick}
    className={`flex items-center font-semibold gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
      ${active ? "bg-white text-[#7e22ce] shadow-md border-l-[6px] border-purple-800" : "text-white hover:bg-white/10"} 
      ${className}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-base">{text}</span>
  </div>
);

const DropdownHeader = ({ icon, text, isOpen, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center font-semibold justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
      ${active ? "bg-white/20 text-white" : "text-white hover:bg-white/10"}`}
  >
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <span className="text-base">{text}</span>
    </div>
    <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
      <ChevronDown size={18} />
    </div>
  </div>
);

const SubNavItem = ({ icon, text, active, onClick }) => (
  <div
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 text-sm font-medium
      ${active ? "bg-white text-[#7e22ce] font-bold shadow-sm border-l-4 border-purple-700" : "text-white/90 hover:bg-white/10"}`}
  >
    <span className="flex items-center gap-2">{icon}{text}</span>
  </div>
);

export default Sidebar; 
