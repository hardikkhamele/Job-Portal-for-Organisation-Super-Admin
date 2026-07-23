import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,  
} from "react-router-dom";

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
import { useEffect, useState } from "react";
import axios from "axios";

// Global interceptor for unauthorized requests (401/403)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default function App() {
  function PublicRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? <Navigate to="/dashboard" replace /> : children;
  }

  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" replace />;
  }

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
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* <Route path="/" element={<LoginPage />} /> */}

        {/* <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} /> */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPage />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <OtpVerification />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-success"
          element={
            <PublicRoute>
              <ResetSuccess />
            </PublicRoute>
          }
        />

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


        {/* <Route path="/*" element={<DashboardLayout />} /> */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
