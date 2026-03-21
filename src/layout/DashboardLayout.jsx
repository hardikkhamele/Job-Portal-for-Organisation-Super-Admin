import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import SearchBar from "./navbar/Search-Bar";
import Dashboard from "../components/Dashboard/Dashboard";
import CandidatePage from "../components/Dashboard/dashboardCandidate/CandidatePage";
import JobsPage from "../components/Dashboard/dashboardJobs/JobsPage";
import RevenuePage from "../components/Dashboard/dashboardRevenue/RevenuePage";
import AllJobsPost from "../components/JobPostManagement/AllJobs-Post";
// import MainReven from "../components/RevenueModel/MainReven";
import MainsubMan from "../components/SubscriptionManagement/Main-sub-Management";
import SubscriptionManagementEdit from "../components/SubscriptionManagement/EditSubscription/SubscriptionManagementEdit";
import Candidate from "../components/CandidateManagement/Candidate";
import CandidateProfile from "../components/CandidateManagement/CanditateProfile";
import VerficationCandidate from "../components/CandidateManagement/VerficationCandidate";
import Employee from "../components/EmployeeManagement/Employee"; // Dashboard UI
import NotificationPage from "../components/NotificationPage";
import HRManagement from "../components/HrManagment/HrManagment";
import CreateHR from "../components/HrManagment/CreateHr";
import EditHr from "../components/HrManagment/EditHr";
import HRViewDetails from "../components/HrManagment/HRViewDetails";
import DailyWorkUpdate from "../components/HrManagment/DailyWorkUpdate";
import CandidateProfileDetail from "../components/HrManagment/CandidateProfile";
import CompanyDetails from "../components/EmployeeManagement/CompanyDetails";
import CreditModel from "../components/CreditManagement/CreditModel";
import RevenueModel from "../components/RevenueManagement/RevenueModel";
import DatabaseManagement from "../components/DatabaseManagement/DatabaseManagement";
import JobSeekerPlans from "../components/SubscriptionManagement/JobSeekerPlans";
import EmployerPlans from "../components/SubscriptionManagement/EmployerPlans";
import CustomPlans from "../components/SubscriptionManagement/CustomPlans";
import JobSeeker from "../components/Terms&Services/JobSeeker";
import Employer from "../components/Terms&Services/Employer";
import FAQs from "../components/Help&Support/FAQs";
import ChatSupport from "../components/Help&Support/ChatSupport";
import SocialLinks from "../components/Help&Support/SocialLinks";


function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <SearchBar />

        <div className="flex-1 overflow-y-auto no-scrollbar">
        
          <Routes>

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="dashboard" />} />

            {/* Main pages */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employee" element={<Employee />} />
            
            {/* Other pages */}
            <Route path="view-candidate" element={<CandidatePage />} />
            <Route path="view-jobs-posted" element={<JobsPage />} />
            <Route path="view-revenue" element={<RevenuePage />} />
            <Route path="alljobs-post" element={<AllJobsPost />} />
            {/* <Route path="revenue-model" element={<MainReven />} /> */}
            <Route path="subscription-management" element={<MainsubMan />} />
            <Route path="subscription-management/subscription-management-edit" element={<SubscriptionManagementEdit />} />
            <Route path="candidate" element={<Candidate />} />
            <Route path="candidateProfile" element={<CandidateProfile />} />
            <Route path="verification-candidate" element={<VerficationCandidate />} />
            <Route path="notification-page" element={<NotificationPage />} />
            <Route path="hr-managment" element={<HRManagement />} />
            <Route path="create-hr" element={<CreateHR />} />
            <Route path="edit-hr" element={<EditHr />} />
            <Route path="hr-view-details" element={<HRViewDetails />} />
            <Route path="daily-work-update" element={<DailyWorkUpdate />} />
            <Route path="candidate-profile" element={<CandidateProfileDetail />} />
            <Route path="company-details" element={<CompanyDetails />} />
            <Route path="credit-management" element={<CreditModel />}/>
            <Route path="database" element={<DatabaseManagement/>} />
            <Route path="job-seeker-plans" element={<JobSeekerPlans/>} />
            <Route path="employer-plans" element={<EmployerPlans/>} />
            <Route path="custom-plans" element={<CustomPlans/>} />
            <Route path="custom-plans" element={<CustomPlans/>} />
            <Route path="jobseeker" element={<JobSeeker/>} />
            <Route path="employer" element={<Employer/>} />
            <Route path="faqs" element={<FAQs/>} />
            <Route path="chat-support" element={<ChatSupport/>} />
            <Route path="social-links" element={<SocialLinks/>} />
            <Route path="revenue-management" element={<RevenueModel/>} />

            
            {/* Fallback */}
            <Route path="*" element={<Dashboard />} />

          </Routes>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;