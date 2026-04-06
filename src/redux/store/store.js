import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/auth/loginSlice"
import forgotPassReducer from "../slice/auth/forgotPassSlice"
import verifyReducer from "../slice/auth/verifySlice"
import resetReducer from "../slice/auth/resetSlice"
import createHrReducer from "../slice/hrManagement/createHr"
import getAllHrReducer from "../slice/hrManagement/getAllHr"
import candidateProfileReducer from "../slice/hrManagement/getProfile"
import getHrByIdReducer from "../slice/hrManagement/getHrById"
import updateStatusReducer from "../slice/hrManagement/updateStatus"
import updateHrReducer from "../slice/hrManagement/updateHr"
import deleteHrReducer from "../slice/hrManagement/deleteHr"
import getAllEmployerReducer from "../slice/employer/getAllEmployer"
import addEmployeeReducer from "../slice/employer/addEmployeeSlice"
import getEmployeeByIdReducer from "../slice/employer/getEmployeeById"
import getAllJobReducer from "../slice/jobManagement/getAllJob"
import jobByIdReducer from "../slice/jobManagement/getJobId"
import getCreditReducer from "../slice/credit/getCredit"
import hrReportsReducer from "../slice/hrManagement/getReportofHr"
export const store = configureStore({
  reducer: {
    // auth
    login: loginReducer,
    forgotPass: forgotPassReducer,
    verify: verifyReducer,
    reset: resetReducer,

    // hr manangement
    hr: createHrReducer,
    allHr: getAllHrReducer,
    hrDetails: getHrByIdReducer,
    updateHr: updateHrReducer,
    deleteHr: deleteHrReducer,
    updateStatus: updateStatusReducer,
    candidateProfile: candidateProfileReducer,
      hrReports: hrReportsReducer,

    // employer
    allEmployer: getAllEmployerReducer,
    employeeDetails: getEmployeeByIdReducer,
    addEmployee: addEmployeeReducer,


    // job Management
    allJobs: getAllJobReducer,
    jobDetail: jobByIdReducer,

    // credit
    getCredit: getCreditReducer,
  },

});