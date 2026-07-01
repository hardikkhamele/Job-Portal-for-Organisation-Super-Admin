import { FaUserTie, FaUsers, FaBriefcase, FaDollarSign } from "react-icons/fa";
import SummaryCard from "../../EmployeeManagement/summaryCard/Summary-Card.jsx";
import AnalyticsDashboard from "../../../Chart/Analytics.jsx";
import Footer from "../../Footer.jsx";

export default function EmployerPage() {
  return (
    <div className="p-2">
      {/* Header Section */}
      <div className="mb-6">
        <h4 className="mb-2 ml-5 text-2xl font-semibold">Hello! TechnoHire</h4>
        <h1 className="text-3xl ml-5 font-bold">Dashboard - Employee</h1>
      </div>
      {/* Summary Cards */}
      <div className="mr-5 ml-5 p-2 grid grid-cols-4 gap-12">
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

      {/* Analytics */}
      <div className="flex items-center justify-center mt-6">
        <AnalyticsDashboard />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
