import { FaUserTie, FaUsers, FaBriefcase, FaDollarSign } from "react-icons/fa";
import SummaryCard from "./Summary-Card";
import AnalyticsDashboard from "../Chart/Analytics.jsx";

export default function EmployerPage() {
  return (
    <div className="p-2">
      {/* Header Section */}
      <div className=" items-center mb-2 h-8">
        <h4 className="mb-5 ml-5 text-1xl">Hello! TechnoHire</h4>
        <h1 className="text-2xl ml-10 font-bold">Dashboard- Employee</h1>
        {/* Summary Cards */}
        <div className="mr-5 ml-5 h-30 p-2 grid grid-cols-4 gap-12">
          <SummaryCard
            title="New Employers"
            value="10"
            icon={
              <FaUserTie
                size={22}
                className="bg-blue-100 rounded-lg"
                color="#8280FF"
              />
            }
            growth="2.3%"
          />
          <SummaryCard
            title="Total Employees"
            value="2000"
            icon={
              <FaUsers
                size={22}
                className="bg-yellow-100 rounded-lg"
                color="#FEC53D"
              />
            }
            growth="8.5%"
          />
          <SummaryCard
            title="Active Employers"
            value="195"
            icon={
              <FaBriefcase
                size={22}
                className="bg-green-100 rounded-lg"
                color="#4AD991"
              />
            }
            growth="4.3%"
          />
          <SummaryCard
            title="Top Employer"
            value="Infosys"
            icon={
              <FaDollarSign
                size={22}
                className="bg-red-100 rounded-lg"
                color="#F69368"
              />
            }
            growth="1.3%"
          />
        </div>
        <div className="  flex items-center pt-2 justify-center mt-2">
          <AnalyticsDashboard />
        </div>

        {/* Footer */}
        <footer className=" text-gray-500 text-sm mt-1">
          © 2024 TechnoHire. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
