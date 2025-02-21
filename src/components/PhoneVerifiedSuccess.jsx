import React from "react";
import { useNavigate } from "react-router-dom";
import SuccessIcon from "../assets/SuccessIco"; // Placeholder for success icon
import SucessIllusion from "../assets/SucessIllusio"; // Placeholder for success illustration
import purpleback from "../assets/purpleback.svg";
import { Phone } from "lucide-react";

const PhoneVerifiedSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Left Section - Success Message */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <SuccessIcon className="w-16" />
        <h2 className="text-2xl font-semibold mt-4">
          Phone Verified Successfully!
        </h2>
        <p className="text-gray-500 mt-2">
          You're all set! Thanks for confirming your phone.
        </p>

        <button
          className="mt-4 bg-purple-900 text-white py-2 px-6 rounded-lg hover:bg-purple-800"
          onClick={() => navigate("/dashboard")}
        >
          Login
        </button>
      </div>

      {/* Right Section - Illustration */}
      <div className="w-1/2 flex flex-col justify-center items-center relative overflow-hidden">
        <img
          src={purpleback}
          alt="background"
          className="absolute top-0 right-0 bottom-0 w-5/6 h-full object-cover"
        />
        <div className="relative z-10 w-1/2 h-2/3 ml-30 justify-center text-white text-center flex flex-col items-center ">
          <h2 className=" relative z-10text-3xl font-bold text-center">
            Welcome to <span className="text-purple-300">Super Admin!</span>
          </h2>
          <p className="text-center">
            The keyholder to a world of endless opportunities.
          </p>
          <SucessIllusion className=" relative z-10 mt-4 " />
        </div>
      </div>
    </div>
  );
};

export default PhoneVerifiedSuccess;
