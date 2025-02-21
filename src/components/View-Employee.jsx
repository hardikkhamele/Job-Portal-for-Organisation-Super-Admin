import { useState } from "react";
import SummaryCard from "./Summary-Card";
import AnalyticsChart from "./Analytics-Chart";
import { FaUserTie, FaUsers, FaBriefcase, FaDollarSign } from "react-icons/fa";
import GradientButton from "./Button";
import { Calendar, Clock } from "lucide-react"; // Lucide icons for date and time
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "./Footer";
import { useNavigate } from "react-router";

function ViewEmployee() {
  const [selectedFilter, setSelectedFilter] = useState("Monthly");
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  return (
    <div className="p-2">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2 h-8">
        <h1 className=" text-3xl font-bold">Dashboard </h1>
        <h4 className="ml-5 text-2xl ">Hello! TechnoHire</h4>

        {/* Filter & Date Picker Section */}
        <div className="flex items-center space-x-6 p-1 h-8   rounded-lg shadow-md">
          {/* Filter Tabs */}
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
          <div className="flex items-center space-x-3 border-l pl-4">
            <div className="flex items-center space-x-2">
              <Calendar size={10} className="text-purple-600" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="text-sm text-gray-700 focus:outline-none"
                dateFormat="MMM dd, yyyy"
              />
            </div>
            <div className="flex items-center space-x-2">
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
      <div className="mr-5 ml-5 h-30 p-2  grid grid-cols-4 gap-12">
        <SummaryCard
          title="Employers"
          value="2,000"
          icon={
            <FaUserTie
              size={22}
              className="bg-blue-100 rounded-lg box-content"
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
              className="bg-yellow-100 rounded-lg box-content"
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
              className="bg-green-100 rounded-lg box-content"
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
              className="bg-red-100 rounded-lg box-content"
              color="#F69368"
            />
          }
          growth="1.8%"
        />
      </div>
      {/* Action Buttons */}
    </div>
  );
}

export default ViewEmployee;
