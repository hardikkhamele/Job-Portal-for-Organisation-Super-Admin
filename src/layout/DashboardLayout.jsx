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
import EditCustomPlan from "../components/SubscriptionManagement/customPlan/EditCustomPlan";
import CreateCustomPlan from "../components/SubscriptionManagement/customPlan/CreateCustomPlan";
import JobSeekerManagement from "../components/JobSeekerManagement/JobSeekerManagement";
import ViewJobSeekerManagement from "../components/JobSeekerManagement/ViewJobSeekerManagement";
import ViewRoles from "../components/JobSeekerManagement/ViewRoles";
import CandidateJobView from "../components/JobSeekerManagement/CandidateJobView";
import AddEmployee from "../components/EmployeeManagement/AddEmployee";
// import CandidateJobView from "../components/JobSeekerManagement/CandidateJobView";
import DatabaseCandidate from "../components/DatabaseManagement/DatabaseCandidate";
import TransferHistory from "../components/DatabaseManagement/TransferHistory";
import AcceptReject from "../components/DatabaseManagement/AcceptReject";
import ViewExcelData from "../components/DatabaseManagement/ViewExcelData";
import CandidateDetails from "../components/DatabaseManagement/CandidateDetails";
import CandidateDetail from "../components/JobSeekerManagement/CandidateDetail";
import EditEmployee from "../components/EmployeeManagement/EditEmployee";
import EmployeeCandidate from "../components/EmployeeManagement/Candidate";
import BlogManagement from "../components/blogManagement/BlogManagement";
import AddBlog from "../components/blogManagement/AddBlog";
import ViewBlog from "../components/blogManagement/ViewBlog";
import EditBlog from "../components/blogManagement/UpdateBlog";
// customPlan
import CustomPlans from "../components/SubscriptionManagement/customPlan/CustomPlans";
import CustomPlanDetail from "../components/SubscriptionManagement/customPlan/CustomPlanDetail";
import EditCreditModel from "../components/CreditManagement/EditCreditModel";
import MyProfile from "../components/auth/MyProfile";
import SendNotification from "../components/NotificationManagement/SendNotification";
import SalesTeamOnboarding from "../components/SalesTeamOnboarding/SalesTeamOnboarding";
import StaffingOnboarding from "../components/SalesTeamOnboarding/StaffingOnboarding";
import StaffingManagement from "../components/StaffingManagement/StaffingManagement";
import StaffingEmployeeCompanies from "../components/StaffingManagement/StaffingEmployeeCompanies";
import StaffingCompanyDetails from "../components/StaffingManagement/StaffingCompanyDetails";
import SalesEmployeeCompanies from "../components/SalesTeamOnboarding/SalesEmployeeCompanies";
import SalesCompanyDetails from "../components/SalesTeamOnboarding/SalesCompanyDetails";
import VendorModule from "../components/VendorModule/VendorModule";
import VendorCompanyDetails from "../components/VendorModule/VendorCompanyDetails";

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
            <Route
              path="/edit-employer-plan/:id"
              element={<EditEmployerPlan />}
            />
            <Route
              path="create-employer-plan"
              element={<CreateEmployerplan />}
            />

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
            <Route
              path="employee/edit-employee/:id"
              element={<EditEmployee />}
            />
            <Route path="employee/add-employee" element={<AddEmployee />} />
            <Route
              path="employee/candidates/:id"
              element={<EmployeeCandidate />}
            />
            <Route
              path="employee/transferred-candidates/:id"
              element={<EmployeeCandidate />}
            />
            <Route path="sales-team-onboarding" element={<SalesTeamOnboarding />} />
            <Route path="sales-team-onboarding/staffing" element={<StaffingOnboarding />} />
            <Route path="staffing-management" element={<StaffingManagement />} />
            <Route path="staffing-management/create-staffing" element={<StaffingOnboarding />} />
            <Route path="staffing-management/:employeeId" element={<StaffingEmployeeCompanies />} />
            <Route path="staffing-management/:employeeId/company/:companyId" element={<StaffingCompanyDetails />} />
            <Route path="sales-team-onboarding/:employeeId" element={<SalesEmployeeCompanies />} />
            <Route path="sales-team-onboarding/:employeeId/company/:companyId" element={<SalesCompanyDetails />} />
            <Route path="sales-team-onboarding/vendors" element={<VendorModule />} />
            <Route path="sales-team-onboarding/vendors/company/:companyId" element={<VendorCompanyDetails />} />
            <Route path="credit-management" element={<CreditModel />} />
            <Route
              path="credit-management/edit"
              element={<EditCreditModel />}
            />
            {/* <Route path="database" element={<DatabaseManagement />} /> */}
            <Route
              path="candidates/candidate-details/:id"
              element={<CandidateDetails />}
            />
            <Route path="job-seeker-plans" element={<JobSeekerPlans />} />
            <Route path="employer-plans" element={<EmployerPlans />} />
            {/* <Route path="custom-plans" element={<CustomPlans />} /> */}
            {/* customPlan */}
            <Route path="custom-plans" element={<CustomPlans />} />
            <Route
              path="custom-plans/view/:id"
              element={<CustomPlanDetail />}
            />
            <Route path="create-custom-plan" element={<CreateCustomPlan />} />
            <Route path="edit-custom-plan/:id" element={<EditCustomPlan />} />

            <Route path="jobseeker" element={<JobSeeker />} />
            <Route path="employer" element={<Employer />} />
            <Route path="faqs" element={<FAQs />} />
            <Route path="chat-support" element={<ChatSupport />} />
            <Route path="social-links" element={<SocialLinks />} />
            <Route path="revenue-management" element={<RevenueModel />} />
            <Route
              path="/revenue-management/view/:id"
              element={<ViewRevenue />}
            />
            <Route path="jobseeker/edit" element={<EditJobSeeker />} />
            <Route path="/employer/edit" element={<EditEmployer />} />
            <Route path="chat-conversation" element={<ChatConversation />} />
            <Route path="/edit-social-links" element={<EditSocialLinks />} />
            <Route path="candidates" element={<DatabaseCandidate />} />
            <Route path="candidates/transfer-history" element={<TransferHistory />} />
            <Route path="/accept-reject" element={<AcceptReject />} />
            <Route path="/accept-reject/view/:id" element={<ViewExcelData />} />

            <Route path="/blog-management" element={<BlogManagement />} />
            <Route path="/blog-management/add-blog" element={<AddBlog />} />
            <Route path="/blog-management/view-blog/:id" element={<ViewBlog />} />
            <Route path="/blog-management/edit-blog/:id" element={<EditBlog />} />

            {/* // Job Seeker Management */}
            <Route path="/job-seeker" element={<JobSeekerManagement />} />
            {/* Changed categoryId to match the param name for consistency */}
            <Route
              path="/job-seeker/view-job-seeker/:categoryId"
              element={<ViewJobSeekerManagement />}
            />
            <Route
              path="/job-seeker/view-roles/:subCategoryId"
              element={<ViewRoles />}
            />
            <Route
              path="/job-seeker/candidate-job-view/:designationId"
              element={<CandidateJobView />}
            />
            <Route
              path="/job-seeker/candidate-profile/:userId"
              element={<CandidateDetail />}
            />
            {/* My Profile */}
            <Route path="/my-profile" element={<MyProfile />} />
            {/* Send Notification */}
            <Route path="/notification-management/send-notification" element={<SendNotification />} />
            {/* Fallback */}
            {/* <Route path="*" element={<Dashboard />} /> */}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
