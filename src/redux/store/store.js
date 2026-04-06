import { configureStore } from "@reduxjs/toolkit";

// ─── Auth ────────────────────────────────────────────────────
import loginReducer from "../slice/auth/loginSlice";
import forgotPassReducer from "../slice/auth/forgotPassSlice";
import verifyReducer from "../slice/auth/verifySlice";
import resetReducer from "../slice/auth/resetSlice";

// ─── HR Management ───────────────────────────────────────────
import createHrReducer from "../slice/hrManagement/createHr";
import getAllHrReducer from "../slice/hrManagement/getAllHr";
import getHrByIdReducer from "../slice/hrManagement/getHrById";
import updateStatusReducer from "../slice/hrManagement/updateStatus";
import updateHrReducer from "../slice/hrManagement/updateHr";
import deleteHrReducer from "../slice/hrManagement/deleteHr";
import hrReportsReducer from "../slice/hrManagement/getReportofHr";

// ─── Employer ────────────────────────────────────────────────
import getAllEmployerReducer from "../slice/employer/getAllEmployer";
import getEmployeeByIdReducer from "../slice/employer/getEmployeeById";

// ─── Job Management ──────────────────────────────────────────
import getAllJobReducer from "../slice/jobManagement/getAllJob";
import jobByIdReducer from "../slice/jobManagement/getJobId";

// ─── Credit ──────────────────────────────────────────────────
import getCreditReducer from "../slice/credit/getCredit";

// ─── Category (Job Seeker Management) ────────────────────────
import categoryReducer from "../slice/category/categorySlice";

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
    hrReports: hrReportsReducer,

    // Employer
    allEmployer: getAllEmployerReducer,
    employeeDetails: getEmployeeByIdReducer,

    // Job Management
    allJobs: getAllJobReducer,
    jobDetail: jobByIdReducer,

    // Credit
    getCredit: getCreditReducer,

    // Category (Job Seeker Management)
    category: categoryReducer,
  },
});