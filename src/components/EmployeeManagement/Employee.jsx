import React from "react";
import SummaryCard from "./summaryCard/Summary-Card";
import { FaUserTie, FaUsers, FaBriefcase, FaDollarSign } from "react-icons/fa";

import EmployeeTable from "./EmployeeTable";
import EmpVerificationRequests from "./EmpVerificationRequests";
import EmployeeReview from "./EmployeeReview";

function Employee() {
  return (
    <div className="p-5">
      {/* Header Text */}
       <h2 className="text-2xl font-semibold">
        <span className="text-xl">Hello! TechnoHire</span>
        <br />
        <br/>
        <span className="text-3xl font-bold">Employee Management</span>
      </h2>



      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-8 mt-5">
        <SummaryCard
          title="Total Employee"
          value="15k"
          icon={<FaBriefcase size={20} color="#FF6B6B" />}
        />
        <SummaryCard
          title="New Employee"
          value="1k"
          icon={<FaUsers size={20} color="#7C5CFF" />}
        />
        <SummaryCard
          title="Active Employee"
          value="10k"
          icon={<FaUserTie size={20} color="#3ED8A8" />}
        />
        <SummaryCard
          title="Inactive Employee"
          value="5k"
          icon={<FaDollarSign size={20} color="#F2C94C" />}
        />
      </div>

      {/* Remaining */}
      <div className="flex gap-6 mt-10 items-start">
        <div className="flex-1">
          <EmpVerificationRequests />
        </div>
        <EmployeeReview />
      </div>

      <EmployeeTable />
    </div>
  );
}


export default Employee;
