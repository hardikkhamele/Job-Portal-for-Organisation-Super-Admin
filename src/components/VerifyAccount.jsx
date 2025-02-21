import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import computer from "../assets/computer.svg";
import purpleback from "../assets/purpleback.svg";
import PhoneIcon from "../assets/PhoneIco";
import EmailIcon from "../assets/EmailIco";

const VerifyAccount = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [phone, setPhone] = useState("+91 9876543210");
  const [email, setEmail] = useState("techno@gmail.com");
  const [isEditing, setIsEditing] = useState({ phone: false, email: false });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Regex patterns
  const phoneRegex = /^\+91\s?[6-9]\d{9}$/; // Indian phone number format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation

  // Validate input
  const validateInput = () => {
    if (selectedMethod === "phone" && !phoneRegex.test(phone)) {
      setError("Invalid phone number. Use +91 followed by 10 digits.");
      return false;
    }
    if (selectedMethod === "email" && !emailRegex.test(email)) {
      setError("Invalid email address.");
      return false;
    }
    setError("");
    return true;
  };

  // Handle continue button
  // const handleContinue = () => {
  //   if (selectedMethod && validateInput()) {
  //     navigate("/EmailOTPVerification", {
  //       state: {
  //         method: selectedMethod,
  //         contact: selectedMethod === "phone" ? phone : email
  //       }
  //     });
  //   }
  // };

  const handleContinue = () => {
    if (selectedMethod && validateInput()) {
      const route =
        selectedMethod === "phone"
          ? "/PhoneOtpverification"
          : "/EmailOTPVerification";

      navigate(route, {
        state: {
          method: selectedMethod,
          contact: selectedMethod === "phone" ? phone : email
        }
      });
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <h2 className="text-2xl font-semibold">Verify Your Account</h2>
        <p className="text-gray-500 mt-2">
          Where should we send your verification code?
        </p>

        <div className="mt-6 w-full max-w-md">
          {["phone", "email"].map((method) => (
            <div
              key={method}
              className={`border rounded-lg p-4 mb-4 gap-3 flex flex-col items-center ${
                selectedMethod === method
                  ? "border-purple-600"
                  : "border-gray-300"
              }`}
            >
              <div className="flex items-center justify-center gap-4">
                {isEditing[method] ? (
                  <input
                    type={method === "phone" ? "tel" : "email"}
                    value={method === "phone" ? phone : email}
                    onChange={(e) =>
                      method === "phone"
                        ? setPhone(e.target.value)
                        : setEmail(e.target.value)
                    }
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  <span className="flex items-center gap-1">
                    {method === "phone" ? <PhoneIcon /> : <EmailIcon />}
                    <span>{method === "phone" ? phone : email}</span>
                  </span>
                )}
                <button
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  aria-label={`Edit ${method}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing((prev) => ({
                      ...prev,
                      [method]: !prev[method]
                    }));
                  }}
                >
                  ✎
                </button>
              </div>
              <button
                className="w-1/2 mt-2 bg-purple-900 text-white py-2 rounded-lg cursor-pointer hover:bg-purple-800"
                onClick={() => setSelectedMethod(method)}
              >
                Select {method === "phone" ? "Phone" : "Mail"}
              </button>
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          className={`w-full max-w-md mt-6 py-3 rounded-lg cursor-pointer ${
            selectedMethod
              ? "bg-purple-900 hover:bg-purple-800 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!selectedMethod}
          onClick={handleContinue}
        >
          Continue →
        </button>
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-full flex flex-col justify-center relative overflow-hidden">
        <img
          src={purpleback}
          alt="background"
          className="absolute top-0 right-0 bottom-0 w-5/6 h-full object-cover"
        />
        <div className="relative z-10 ml-20 h-4/5 justify-center text-white text-center flex flex-col items-center">
          <img src={computer} alt="computer" className="mt-4 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
