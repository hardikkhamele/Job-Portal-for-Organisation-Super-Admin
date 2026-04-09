import { configureStore } from "@reduxjs/toolkit";

// ─── Auth ────────────────────────────────────────────────────
import loginReducer from "../slice/auth/loginSlice";
import forgotPassReducer from "../slice/auth/forgotPassSlice";
import verifyReducer from "../slice/auth/verifySlice";
import resetReducer from "../slice/auth/resetSlice";

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

// ─── Job Management ──────────────────────────────────────────
import getAllJobReducer from "../slice/jobManagement/getAllJob";
import jobByIdReducer from "../slice/jobManagement/getJobId";

// ─── Job Seeker ───────────────────────────────────────────────
import jobseekerReducer from "../slice/jobseeker/jobseekerSlice";

// ─── Credit ──────────────────────────────────────────────────
import getCreditReducer from "../slice/credit/getCredit";

// ─── Category (Job Seeker Management) ────────────────────────
import categoryReducer from "../slice/category/categorySlice";

import getAllCandidateReducer from "../slice/databaseManagement/getAllCandidate"
import candidateByIdReducer from "../slice/databaseManagement/getCandidateByIdSlice"
import acceptRejectReducer from "../slice/databaseManagement/getAcceptRejectSlice"
import acceptCandidateReducer from "../slice/databaseManagement/acceptCandidate"
import rejectCandidateReducer from "../slice/databaseManagement/rejectCandidate"
import dropdownReducer from "../slice/databaseManagement/dropdownSlice"
export const store = configureStore({
  reducer: {
    // Auth
    login: loginReducer,
    forgotPass: forgotPassReducer,
    verify: verifyReducer,
    reset: resetReducer,

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


    // Job Management
    allJobs: getAllJobReducer,
    jobDetail: jobByIdReducer,

    // Credit
    getCredit: getCreditReducer,

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
  },
});