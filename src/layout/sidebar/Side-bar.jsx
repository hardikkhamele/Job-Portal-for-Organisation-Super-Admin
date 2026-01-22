import Icon from "../assets/Icon.svg";
import { Link } from "react-router-dom";
import { MdDashboard, MdOutlineMonetizationOn } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const Sidebar = () => {
  //   const menuItems = [
  //     { icon: <MdDashboard size={18} />, label: "Dashboard" },
  //     { icon: <ContactMailIcon size={15} />, label: "Job Post Management" },
  //     { icon: <MdOutlineMonetizationOn size={18} />, label: "Revenue Model" },
  //     { icon: <FaRegMoneyBillAlt size={18} />, label: "Subscription Management" },
  //     { icon: <EngineeringIcon size={18} />, label: "Employer Management" },
  //     { icon: <ManageAccountsIcon size={18} />, label: "Candidate Management" }
  //   ];

  //   return (
  //     <div className="w-75 text-white h-screen p-2 flex flex-col bg-gradient-to-b bg-[#41274f] ">
  //       {/* Logo Section */}
  //       <div className="mb-2  flex items-center">
  //         <img
  //           src={Icon}
  //           alt="Logo"
  //           className="w-full from-[#52395F] to-purple-400"
  //         />
  //       </div>

  //       {/* Sidebar Menu */}
  //       <ul className="space-y-3  ">
  //         {menuItems.map((item, index) => (
  //           <li
  //             key={index}
  //             className="flex items-center h-12 w-full justify-start gap-2 text-lg cursor-pointer p-2 rounded-md hover:bg-purple-700 transition "
  //           >
  //             {item.icon}
  //             <span>{item.label}</span>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };

  return (
    <div className="w-1/6 relative flex flex-col gap-5 justify-start items-center bg-[#52395F]">
      <div className="w-full flex  bg-radial to-50% from-[#e1c0f0]  to-transparent justify-center items-center ">
        <img className="w-100" src={Icon} alt="" />
      </div>
      <div className="flex justify-center gap-2 items-center rounded-lg w-5/6 h-10 bg-[#9952BF]">
        <img className="w-3 " src="sidebartop1.svg" alt="" />
        <p className="text-white font-semibold text-[15px] ">Dashboard</p>
      </div>
      <li className="w-full flex items-center gap-2 px-3">
        <img className="w-4" src="sidebartop2.svg" alt="Job Management Icon" />
        <Link
          to="/alljobs-post"
          className="font-urbanist font-semibold text-white text-[15px]"
          aria-label="Job Post Management"
        >
          Job Post Management
        </Link>
      </li>

      <li className="w-full flex justify-start px-3 gap-2 items-center">
        <img className="w-4 " src="sidebartop3.svg" alt="" />
        <a
          href="/"
          className="font-urbanist font-semibold text-white text-[15px]"
        >
          Revenue Model
        </a>
      </li>
      <li className="w-full flex justify-start px-3 gap-2 items-center">
        <img className="w-4 " src="sidebartop4.svg" alt="" />
        <a
          href="/"
          className="font-urbanist font-semibold text-white text-[15px]"
        >
          Subscription Management{" "}
        </a>
      </li>
      <li className="w-full flex justify-start px-3 gap-2 items-center">
        <img className="w-4 " src="sidebartop5.svg" alt="" />
        <a
          href="/"
          className="font-urbanist font-semibold text-white text-[15px]"
        >
          Employer Management{" "}
        </a>
      </li>
      <li className="w-full flex justify-start px-3 gap-2 items-center">
        <img className="w-4 " src="sidebartop6.svg" alt="" />
        <a
          href="/"
          className="font-urbanist font-semibold text-white text-[15px]"
        >
          Candidate Management{" "}
        </a>
      </li>
      <div className="absolute p-4 flex   flex-col gap-2 bottom-0 left-0 w-full aspect-5/2 ">
        <div className="flex gap-3 items-center">
          <img
            className="w-10 h-10 rounded-[50%] "
            src="dashboard3left1.svg"
            alt=""
          />
          <span className="font-urbanist text-white text-sm ">
            TechnoHire
            <br />
            <span className="text-[12px] mt-[-9px] px-1 bg-yellow-500 text-black rounded">
              Admin
            </span>
          </span>
        </div>
        <a
          href="/"
          className=" px-2 flex items-center gap-3 text-red-400 text-md"
        >
          <img className="w-5 h-5" src="logout.svg" alt="" />
          Log out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
