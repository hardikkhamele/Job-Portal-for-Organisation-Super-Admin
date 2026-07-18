import { configureStore } from "@reduxjs/toolkit";

// ─── Auth ────────────────────────────────────────────────────
import loginReducer from "../slice/auth/loginSlice";
import forgotPassReducer from "../slice/auth/forgotPassSlice";
import verifyReducer from "../slice/auth/verifySlice";
import resetReducer from "../slice/auth/resetSlice";
import adminProfileReducer from "../slice/auth/adminProfileSlice";

// ─── HR Management ───────────────────────────────────────────
import createHrReducer from "../slice/hrManagement/createHr";
import getAllHrReducer from "../slice/hrManagement/getAllHr";
import candidateProfileReducer from "../slice/hrManagement/getProfile"
import updateStatusReducer from "../slice/hrManagement/updateStatus"
import updateHrReducer from "../slice/hrManagement/updateHr"
import deleteEmployeeReducer from "../slice/employer/deleteEmployeeSlice"
import updateempStatusReducer from "../slice/employer/updateStatusSlice"
import getHrByIdReducer from "../slice/hrManagement/getHrById";
import deleteHrReducer from "../slice/hrManagement/deleteHr";
import hrReportsReducer from "../slice/hrManagement/getReportofHr";

// ─── Employer ────────────────────────────────────────────────
import getAllEmployerReducer from "../slice/employer/getAllEmployer";
import updateEmployeeReducer from "../slice/employer/updateEmployeeSlice"
import addEmployeeReducer from "../slice/employer/addEmployeeSlice"
import getEmployeeByIdReducer from "../slice/employer/getEmployeeById";
import updateCompanyTypeReducer from "../slice/employer/updateCompanyTypeSlice";

// ─── Job Management ──────────────────────────────────────────
import getAllJobReducer from "../slice/jobManagement/getAllJob";
import jobByIdReducer from "../slice/jobManagement/getJobId";

// ─── Job Seeker ───────────────────────────────────────────────
import jobseekerReducer from "../slice/jobseeker/jobseekerSlice";

// ─── Category (Job Seeker Management) ────────────────────────
import categoryReducer from "../slice/category/categorySlice";

import getAllCandidateReducer from "../slice/databaseManagement/getAllCandidate"
import candidateByIdReducer from "../slice/databaseManagement/getCandidateByIdSlice"
import acceptRejectReducer from "../slice/databaseManagement/getAcceptRejectSlice"
import acceptCandidateReducer from "../slice/databaseManagement/acceptCandidate"
import rejectCandidateReducer from "../slice/databaseManagement/rejectCandidate"
import dropdownReducer from "../slice/databaseManagement/dropdownSlice"

// subscriptions management
import employerPlansReducer from "../slice/subscriptions/employerPlans/getEmployerPlans"
import planTypeDropdownReducer from "../slice/subscriptions/employerPlans/plantypeDropdown"
import durationDropdownReducer from "../slice/subscriptions/employerPlans/durationDropdown"
import jobseekerPlansReducer from "../slice/subscriptions/jobseekerPlans/jobseekerPlansSlice"

// customPlan
import customPlanReducer from "../slice/subscriptions/customPlan/customPlanSlice"
import employerReducer from "../slice/subscriptions/employerPlans/getAllEmployerDropdown"

//blogmanagement
import blogReducer from '../slice/blogManagement/addBlog';
import { getreducer } from "../slice/blogManagement/getBlog";

// credit management
import creditManagementReducer from "../slice/creditManagement/creditSlice";

// revenue management
import revenueReducer from "../slice/RevenueManagement/revenueSlice"

import allDropdownReducer from "../slice/databaseManagement/acceptRejUploadDatabase/acceptRejectSlice"

// terms and service
import termsReducer from "../slice/terms/termsSlice";

export const store = configureStore({
  reducer: {
    // Auth
    login: loginReducer,
    forgotPass: forgotPassReducer,
    verify: verifyReducer,
    reset: resetReducer,
    adminProfile: adminProfileReducer,

    // HR Management
    hr: createHrReducer,
    allHr: getAllHrReducer,
    hrDetails: getHrByIdReducer,
    updateHr: updateHrReducer,
    deleteHr: deleteHrReducer,
    updateStatus: updateStatusReducer,
    candidateProfile: candidateProfileReducer,
    hrReports: hrReportsReducer,

    // Employer
    allEmployer: getAllEmployerReducer,
    employeeDetails: getEmployeeByIdReducer,
    addEmployee: addEmployeeReducer,
    updateEmpStatus: updateempStatusReducer,
    deleteEmployee: deleteEmployeeReducer,
    updateEmployee: updateEmployeeReducer,
    updateCompanyType: updateCompanyTypeReducer,

    // Job Management
    allJobs: getAllJobReducer,
    jobDetail: jobByIdReducer,

    // Category (Job Seeker Management)
    category: categoryReducer,

    // Job Seeker
    jobseeker: jobseekerReducer,

    // database management
    allCandidate: getAllCandidateReducer,
    candidateDetail: candidateByIdReducer,
    acceptReject: acceptRejectReducer,
    acceptCandidate: acceptCandidateReducer, 
    rejectCandidate: rejectCandidateReducer,
    dropdown: dropdownReducer,
    allDropdown: allDropdownReducer,

    // subscriptions management
    employerPlans: employerPlansReducer,
    planTypeDropdown: planTypeDropdownReducer,
    durationDropdown: durationDropdownReducer,
    jobseekerPlans: jobseekerPlansReducer,

    //customPlan
    customPlan: customPlanReducer,
    employer: employerReducer,

    //blogmanagement
    blog: blogReducer,
    getblog: getreducer,   

    // credit management
    creditManagement: creditManagementReducer,

    // revenue management 
    revenue: revenueReducer,

    // terms and service
    terms: termsReducer,
  },
});
