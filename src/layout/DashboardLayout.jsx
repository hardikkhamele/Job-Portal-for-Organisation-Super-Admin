import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import SearchBar from "./navbar/Search-Bar";
import Dashboard from "../components/Dashboard/Dashboard";
import CandidatePage from "../components/Dashboard/dashboardCandidate/CandidatePage";
import JobsPage from "../components/Dashboard/dashboardJobs/JobsPage";
import RevenuePage from "../components/Dashboard/dashboardRevenue/RevenuePage";
// import AllJobsPost from "../components/JobPostManagement/AllJobs-Post";
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
// import DatabaseManagement from "../components/DatabaseManagement/DatabaseManagement";
import JobSeekerPlans from "../components/SubscriptionManagement/JobSeekerPlans";
import EmployerPlans from "../components/SubscriptionManagement/EmployerPlans";
import CustomPlans from "../components/SubscriptionManagement/CustomPlans";
import JobSeeker from "../components/Terms&Services/JobSeeker";
import Employer from "../components/Terms&Services/Employer";
import FAQs from "../components/Help&Support/FAQs";
import ChatSupport from "../components/Help&Support/ChatSupport";
import SocialLinks from "../components/Help&Support/SocialLinks";
import ViewRevenue from "../components/RevenueManagement/ViewRevenue";
import EditJobSeeker from "../components/Terms&Services/EditJobSeeker";
import EditEmployer from "../components/Terms&Services/EditEmployer";
import ChatConversation from "../components/Help&Support/ChatConversation";
import EditSocialLinks from "../components/Help&Support/EditSocialLinks";

import JobManagment from "../components/JobManagement/JobManagment";
import JobViewDetails from "../components/JobManagement/JobViewDetails";
import CreateJobSeekerPlan from "../components/SubscriptionManagement/CreateJobSeekerPlan";
import EditJobSeekerPlan from "../components/SubscriptionManagement/EditJobSeekerPlan";
import CreateEmployerplan from "../components/SubscriptionManagement/CreateEmployerplan";
import EditEmployerPlan from "../components/EditEmployerPlan";
import EditCustomPlan from "../components/EditCustomPlan";
import CreateCustomPlan from "../components/CreateCustomPlan";
import JobSeekerManagement from "../components/JobSeekerManagement/JobSeekerManagement";
import ViewJobSeekerManagement from "../components/JobSeekerManagement/ViewJobSeekerManagement";
import ViewRoles from "../components/JobSeekerManagement/ViewRoles";
import CandidateJobView from "../components/JobSeekerManagement/CandidateJobView";
import AddEmployee from "../components/EmployeeManagement/AddEmployee";
// import CandidateJobView from "../components/JobSeekerManagement/CandidateJobView";
import DatabaseCandidate from "../components/DatabaseManagement/DatabaseCandidate";
import AcceptReject from "../components/DatabaseManagement/AcceptReject";
import CandidateDetails from "../components/DatabaseManagement/CandidateDetails";
import CandidateDetail from "../components/JobSeekerManagement/CandidateDetail";
import EditEmployee from "../components/EmployeeManagement/EditEmployee";

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <SearchBar />

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <Routes>
            {/* Default redirect */}
            {/* <Route path="/" element={<Navigate to="dashboard" />} /> */}
            <Route index element={<Dashboard />} />
            {/* Main pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="job-management" element={<JobManagment />} />
            <Route
              path="/job-management/job-view-details/:id"
              element={<JobViewDetails />}
            />
            {/* Other pages */}
            <Route path="view-candidate" element={<CandidatePage />} />
            <Route path="view-jobs-posted" element={<JobsPage />} />
            <Route path="view-revenue" element={<RevenuePage />} />
            {/* <Route path="alljobs-post" element={<AllJobsPost />} /> */}
            <Route path="job-seeker" element={<JobSeekerManagement />} />
            {/* <Route path="candidate-job-view" element={<CandidateJobView/>}/> */}
            {/* <Route path="revenue-model" element={<MainReven />} /> */}
            <Route path="subscription-management" element={<MainsubMan />} />
            <Route
              path="create-job-seeker-plan"
              element={<CreateJobSeekerPlan />}
            />
            <Route
              path="edit-job-seeker-plan"
              element={<EditJobSeekerPlan />}
            />
            <Route path="/edit-employer-plan/:id" element={<EditEmployerPlan />} />
            <Route
              path="create-employer-plan"
              element={<CreateEmployerplan />}
            />
            <Route path="create-custom-plan" element={<CreateCustomPlan />} />
            <Route path="edit-custom-plan" element={<EditCustomPlan />} />
            <Route
              path="subscription-management/subscription-management-edit"
              element={<SubscriptionManagementEdit />}
            />
            <Route path="candidate" element={<Candidate />} />
            <Route path="candidateProfile" element={<CandidateProfile />} />
            <Route
              path="verification-candidate"
              element={<VerficationCandidate />}
            />
            <Route path="notification-page" element={<NotificationPage />} />
            <Route path="/hr-management" element={<HRManagement />} />
            <Route path="/hr-management/create-hr" element={<CreateHR />} />
            <Route path="/hr-management/edit-hr/:id" element={<EditHr />} />
            <Route
              path="/hr-management/hr-view-details/:id"
              element={<HRViewDetails />}
            />
            <Route
              path="/hr-management/daily-work-update"
              element={<DailyWorkUpdate />}
            />
            <Route
              path="/hr-management/candidate-profile/:id"
              element={<CandidateProfileDetail />}
            />
            <Route path="employee" element={<Employee />} />
            <Route
              path="employee/company-details/:id"
              element={<CompanyDetails />}
            />
            <Route path="employee/edit-employee/:id" element={<EditEmployee/>} />
            <Route path="employee/add-employee" element={<AddEmployee />} />
            <Route path="credit-management" element={<CreditModel />} />
            {/* <Route path="database" element={<DatabaseManagement />} /> */}
            <Route path="/candidates/candidate-details/:id" element={<CandidateDetails />} />
            <Route path="job-seeker-plans" element={<JobSeekerPlans />} />
            <Route path="employer-plans" element={<EmployerPlans />} />
            {/* <Route path="custom-plans" element={<CustomPlans />} /> */}
            <Route path="custom-plans" element={<CustomPlans />} />
            <Route path="employer" element={<Employer />} />
            <Route path="faqs" element={<FAQs />} />
            <Route path="chat-support" element={<ChatSupport />} />
            <Route path="social-links" element={<SocialLinks />} />
            <Route path="revenue-management" element={<RevenueModel />} />
            <Route path="/revenue/view" element={<ViewRevenue />} />
            <Route path="jobseeker/edit" element={<EditJobSeeker />} />
            <Route path="/employer/edit" element={<EditEmployer />} />
            <Route path="chat-conversation" element={<ChatConversation />} />
            <Route path="/edit-social-links" element={<EditSocialLinks />} />
            <Route path="/candidates" element={<DatabaseCandidate />} />
            <Route path="/accept-reject" element={<AcceptReject />} />
            
            

            // Job Seeker Management
            <Route path="job-seeker" element={<JobSeekerManagement />} />
            {/* Changed categoryId to match the param name for consistency */}
            <Route
              path="view-job-seeker/:categoryId"
              element={<ViewJobSeekerManagement />}
            />
            <Route path="view-roles/:subCategoryId" element={<ViewRoles />} />
            <Route
              path="candidate-job-view/:designationId"
              element={<CandidateJobView />}
            />
            <Route
              path="candidate-profile/:userId"
              element={<CandidateDetail />}
            />
            {/* Fallback */}
            {/* <Route path="*" element={<Dashboard />} /> */}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
