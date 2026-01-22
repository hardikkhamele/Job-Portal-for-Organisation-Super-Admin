import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login1 from "./components/auth/login/Login1";
import Login2 from "./components/auth/login/Login2";
import Login3 from "./components/auth/login/Login3";
import Login4 from "./components/auth/login/Login4";
import DashboardLayout from "./layout/DashboardLayout";
import Signup1 from "./components/auth/register/Signup1";
import VerifyAccount from "./components/auth/verification/VerifyAccount";
import EmailOTPVerification from "./components/auth/verification/EmailOTPVerification";
import EmailSucessVerify from "./components/auth/verification/EmailSucessVerify";
import PhoneOtpverification from "./components/auth/verification/PhoneOTPVerification";
import PhoneVerifiedSuccess from "./components/auth/verification/PhoneVerifiedSuccess";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Authentication) */}
        <Route path="/" element={<Login1 />} />
        <Route path="/forgot-password" element={<Login2 />} />
        <Route path="/reset-password" element={<Login3 />} />
        <Route path="/password-reset-success" element={<Login4 />} />
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

        {/* Protected Routes (Dashboard) */}
        <Route path="/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}
