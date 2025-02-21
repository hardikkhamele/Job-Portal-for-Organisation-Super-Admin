import React from "react";
import SummaryCard from "./Summary-Card";
import { FaUserTie, FaUsers, FaBriefcase, FaDollarSign } from "react-icons/fa";

import EmployeeTable from "./EmployeeTable";
import EmpVerificationRequests from "./EmpVerificationRequests";
import EmployeeReview from "./EmployeeReview";

function Employee() {
  return (
    <div className="p-5 ">
      <div className="mr-5 ml-5 h-30 mb-4 p-4 grid grid-cols-4 gap-12">
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

      <div className="flex rounded-lg shadow-md justify-center   w-300   mt-10 gap-4">
        <EmpVerificationRequests />
        <EmployeeReview />
      </div>

      <EmployeeTable />
    </div>
  );
}

export default Employee;
