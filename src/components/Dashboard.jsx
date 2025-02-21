import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import SummaryCard from "./Summary-Card";
import AnalyticsChart from "./Analytics-Chart";
import { FaUserTie, FaUsers, FaBriefcase, FaDollarSign } from "react-icons/fa";
import GradientButton from "./Button";
import { Calendar, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("Monthly");
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate(); // ✅ Initialize navigation function

  return (
    <div className="p-2">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2 h-8">
        <h1 className="text-2xl font-bold ml-5">Dashboard</h1>
        <h4 className="ml-0 pl-0 text-1xl">Hello! TechnoHire</h4>
        <div className="flex items-center space-x-6 p-1 h-8   rounded-lg shadow-md">
          <div className="flex space-x-3  text-gray-500 text-sm font-medium">
            {["Daily", "Weekly", "Monthly", "Yearly"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 ${
                  selectedFilter === filter
                    ? "text-purple-600 font-bold"
                    : "text-gray-500"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          {/* Date Picker */}
          <div className="flex items-center space-x-1 border-l pl-4">
            <div className="flex items-center space-x-2">
              <Calendar size={10} className="text-purple-600" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="text-sm text-gray-700 focus:outline-none"
                dateFormat="MMM dd, yyyy"
              />
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={10} className="text-purple-600" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="text-sm text-gray-700 focus:outline-none"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mr-5 ml-5 h-30 p-4 grid grid-cols-4 gap-12">
        <SummaryCard
          title="Employers"
          value="2,000"
          icon={
            <FaUserTie
              size={22}
              className="bg-blue-100 rounded-lg"
              color="#8280FF"
            />
          }
          growth="8.5%"
        />
        <SummaryCard
          title="Candidates"
          value="55,000"
          icon={
            <FaUsers
              size={22}
              className="bg-yellow-100 rounded-lg"
              color="#FEC53D"
            />
          }
          growth="1.3%"
        />
        <SummaryCard
          title="Jobs Posted"
          value="10,000"
          icon={
            <FaBriefcase
              size={22}
              className="bg-green-100 rounded-lg"
              color="#4AD991"
            />
          }
          growth="-4.3%"
        />
        <SummaryCard
          title="Revenue"
          value="$3.42M"
          icon={
            <FaDollarSign
              size={22}
              className="bg-red-100 rounded-lg"
              color="#F69368"
            />
          }
          growth="1.8%"
        />
      </div>

      {/* Action Buttons with Navigation */}
      <div className="mr-5 ml-5 p-4 grid grid-cols-4 h-12 gap-14 mt-4">
        <GradientButton
          onClick={() => navigate("/view-employer")}
          label="View Employer"
        />
        <GradientButton
          onClick={() => navigate("/view-candidate")}
          label="View Candidate"
        />
        <GradientButton
          onClick={() => navigate("/view-jobs-posted")}
          label="View Jobs Posted"
        />
        <GradientButton
          onClick={() => navigate("/view-revenue")}
          label="View Revenue"
        />
      </div>

      {/* Analytics Chart */}
      <div className="mr-5 ml-5  p-2">
        <AnalyticsChart filter={selectedFilter} date={startDate} />
      </div>

      {/* Footer */}
      <h6>Copyright © 2024 TechnoHire. All rights reserved.</h6>
    </div>
  );
}

export default Dashboard;
