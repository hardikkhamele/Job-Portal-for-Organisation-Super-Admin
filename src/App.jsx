import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login1 from "./components/Login1";
import Login2 from "./components/Login2";
import Login3 from "./components/Login3";
import Login4 from "./components/Login4";
import DashboardLayout from "./DashboardLayout";
import Signup1 from "./components/Signup1";
import VerifyAccount from "./components/VerifyAccount";
import EmailOTPVerification from "./components/EmailOTPVerification";
import EmailSucessVerify from "./components/EmailSucessVerify";
import PhoneOtpverification from "./components/PhoneOTPVerification";
import PhoneVerifiedSuccess from "./components/PhoneVerifiedSuccess";

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
