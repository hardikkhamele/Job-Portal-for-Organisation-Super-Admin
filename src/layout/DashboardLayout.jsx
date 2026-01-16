import { Route, Routes } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import SearchBar from "./navbar/Search-Bar";
import Dashboard from "../components/Dashboard/Dashboard";
import EmployerPage from "../components/Dashboard/dasboardEmployer/EmployerPage";
import CandidatePage from "../components/Dashboard/dashboardCandidate/CandidatePage";
import JobsPage from "../components/Dashboard/dashboardJobs/JobsPage";
import RevenuePage from "../components/Dashboard/dashboardRevenue/RevenuePage";
import AllJobsPost from "../components/JobPostManagement/AllJobs-Post";
import MainReven from "../components/RevenueModel/MainReven";
import MainsubMan from "../components/SubscriptionManagement/Main-sub-Management";
import SubscriptionManagementEdit from "../components/SubscriptionManagement/EditSubscription/SubscriptionManagementEdit";
import Candidate from "../components/CandidateManagement/Candidate";
import CandidateProfile from "../components/CandidateManagement/CanditateProfile";
import VerficationCandidate from "../components/CandidateManagement/VerficationCandidate";
import Employee from "../components/EmployeeManagement/Employee";

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <SearchBar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/view-employer" element={<EmployerPage />} />
          <Route path="/view-candidate" element={<CandidatePage />} />
          <Route path="/view-jobs-posted" element={<JobsPage />} />
          <Route path="/view-revenue" element={<RevenuePage />} />
          <Route path="/alljobs-post" element={<AllJobsPost />} />
          <Route path="/revenue-model" element={<MainReven />} />
          <Route path="/subscription-management" element={<MainsubMan />} />
          <Route
            path="subscription-management/subscription-management-edit"
            element={<SubscriptionManagementEdit />}
          />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/candidateProfile" element={<CandidateProfile />} />
          <Route
            path="/VerificationCandiate"
            element={<VerficationCandidate />}
          />
          <Route path="/employee" element={<Employee />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
