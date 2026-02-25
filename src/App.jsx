import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";

import LoginPage from "./components/auth/login/LoginPage";
import ForgotPage from "./components/auth/login/ForgotPage";
import OtpVerification from "./components/auth/login/OtpVerification";
import ResetPassword from "./components/auth/login/ResetPassword";
// import Login4 from "./components/auth/login/Login4";
import DashboardLayout from "./layout/DashboardLayout";
import Signup1 from "./components/auth/register/Signup1";
import VerifyAccount from "./components/auth/verification/VerifyAccount";
import EmailOTPVerification from "./components/auth/verification/EmailOTPVerification";
import EmailSucessVerify from "./components/auth/verification/EmailSucessVerify";
import PhoneOtpverification from "./components/auth/verification/PhoneOTPVerification";
import PhoneVerifiedSuccess from "./components/auth/verification/PhoneVerifiedSuccess";
import ResetSuccess from "./components/auth/login/ResetSuccess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


export default function App() {
   const token = sessionStorage.getItem("token");
  return (
    <Router>
   
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Routes>
     
        <Route
  path="/"
  element={
    sessionStorage.getItem("token")
      ? <Navigate to="/dashboard" replace />
      : <LoginPage />
  }
/>
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />

        {/* <Route path="/password-reset-success" element={<Login4 />} /> */}
        <Route path="/Signup1" element={<Signup1 />} />
        <Route path="/VerifyAccount" element={<VerifyAccount />} />
        <Route
          path="/EmailOTPVerification"
          element={<EmailOTPVerification />}
        />
        <Route path="/EmailSucessVerify" element={<EmailSucessVerify />} />
        <Route
          path="/PhoneOtpverification"
          element={<PhoneOtpverification />}
        />
        <Route
          path="/PhoneVerifiedSuccess"
          element={<PhoneVerifiedSuccess />}
        />
             {/* ✅ Protected Dashboard */}
       <Route
  path="/*"
  element={
    sessionStorage.getItem("token")
      ? <DashboardLayout />
      : <Navigate to="/" replace />
  }
/>
      </Routes>
    </Router>
  );
}
