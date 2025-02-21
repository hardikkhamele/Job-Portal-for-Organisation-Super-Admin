import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Emailver from "../assets/Emailver.svg";
import group from "../assets/group.svg"; // Icon for back button
import purpleback from "../assets/purpleback.svg";
import backbttn from "../assets/backbttn.svg";

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { method, contact } = location.state || {};
  const [otp, setOtp] = useState("");
  const [generatedOtp] = useState(Math.floor(100000 + Math.random() * 900000)); // Simulated OTP
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  console.log(generatedOtp);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleVerifyOTP = () => {
    if (otp === generatedOtp.toString()) {
      navigate("/EmailSucessVerify"); // Navigate to success page
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleResendOTP = () => {
    setTimer(30);
    setResendDisabled(true);
    alert(`New OTP sent to ${contact}`); // Simulating OTP resend
  };

  return (
    <div className="flex h-screen items-center">
      {/* Left Section - OTP Input */}
      <div className="w-1/2 h-5/6 ml-10 flex flex-col justify-center items-center p-10">
        <button
          className="self-start mb-0 text-gray-600 flex items-center"
          onClick={() => navigate(-1)}
        >
          <img
            src={backbttn}
            alt="Back"
            className="w-6/7 h-6/7 mr-2 cursor-pointer"
          />
        </button>
        <h2 className="text-2xl font-semibold">Email Verification</h2>
        <p className="text-gray-500 mt-2 text-center">
          We've sent a verification code to <strong>{contact}</strong>
        </p>
        <img src={Emailver} alt="Back" className="w-1/2 h-1/2 mr-2" />

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mt-4 w-80 text-center"
          placeholder="Enter OTP"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <p className="text-gray-500 mt-2">
          {timer > 0 ? `00:${timer}` : "Time expired"}
        </p>
        <button
          className={`text-purple-600 mt-2 ${
            resendDisabled ? "cursor-not-allowed opacity-50" : "hover:underline"
          }`}
          onClick={handleResendOTP}
          disabled={resendDisabled}
        >
          Resend Code
        </button>

        <button
          className="mt-4 bg-purple-900 text-white py-2 px-6 rounded-lg hover:bg-purple-800 cursor-pointer"
          onClick={handleVerifyOTP}
        >
          Verify My Account →
        </button>
      </div>

      {/* Right Section - Illustration */}
      <div className="w-1/2 h-full flex flex-col justify-center relative overflow-hidden">
        <img
          src={purpleback}
          alt="background"
          className="absolute top-0 right-0 bottom-0 w-4/5 h-full object-cover "
        />
        <div className="relative z-10 ml-20 h-2/3 justify-center text-white text-center flex flex-col items-center">
          <h2 className=" text-3xl font-bold ">
            Welcome to <span className="text-purple-300"> Super Admin!</span>
          </h2>
          <p className="text-center justify-center relative z-10  text-white flex flex-col">
            Steering the platform, unlocking endless opportunities.
          </p>
          <img
            src={group}
            alt="Illustration"
            className="mt-4 relative z-10 w-1/2 justify-center flex flex-col items-center mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
