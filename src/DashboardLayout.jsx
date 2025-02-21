import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/Search-Bar";
import Dashboard from "./components/Dashboard";
import EmployerPage from "./components/EmployerPage";
import CandidatePage from "./components/CandidatePage";
import JobsPage from "./components/JobsPage";
import RevenuePage from "./components/RevenuePage";
import AllJobsPost from "./components/AllJobs-Post";
import MainReven from "./components/MainReven";
import MainsubMan from "./components/Main-sub-Management";
import SubscriptionManagementEdit from "./components/SubscriptionManagementEdit";
import Candidate from "./components/Candidate";
import CandidateProfile from "./components/CanditateProfile";
import VerficationCandidate from "./components/VerficationCandidate";
import Employee from "./components/Employee";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 pt-1">
        <SearchBar />
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
      </main>
    </div>
  );
}

export default DashboardLayout;
