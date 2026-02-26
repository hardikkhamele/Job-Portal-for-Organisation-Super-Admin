import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminDirectLogin from "../../../hooks/login/useAdminDirectLogin";
// ✅ Import your assets
import loginIllustration from "../../../assets/LoginPageShade.png"; // right side illustration
import gradientOverlay from "../../../assets/PurpleShadeBg.png"; // purple gradient overlay
import TechnoHireLogo from "../../../assets/TalentHire.png"; // logo

export default function Login1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { loginAdmin, loading } = useAdminDirectLogin();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("handle submit")
  await loginAdmin(email, password);
  // console.log("SUCCESS:", success); // should now be true on correct login
};
  return (
    <div className="w-screen h-screen flex font-sans">
      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white relative px-6">
        {/* Logo */}
        <img
          src={TechnoHireLogo}
          alt="TechnoHire Logo"
          className="w-[400px] mb-6"
        />

        {/* Login Card */}
        <div className="bg-white w-[400px] p-8 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-purple-300">
          <h2 className="text-3xl font-extrabold text-[#7900BA] mb-2 text-center">
            Log in
          </h2>

          <h2 className="text-gray-600  font-bold text-center">
            Technokrate hire Super Admin
          </h2>
          <h2 className="text-gray-600  font-bold text-center">Dashboard</h2>

          <h2 className=" mt-3 mb-6 leading-relaxed text-center">
            Log in to Unlock your super admin tools, control jobs, track
            opportunities, and optimize platform performance
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="text-xs text-gray-600">
                Enter Email Address
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-gray-600">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-xs mt-2">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="w-3 h-3"
                />
                Remember me
              </label>

              <span
                onClick={() => navigate("/forgot-password")}
                className="text-purple-600 font-medium cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 py-2 text-sm text-white rounded-md 
             bg-gradient-to-r from-purple-600 to-purple-800 
             hover:opacity-90 transition duration-300 w-full"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 relative flex items-center justify-center overflow-hidden">
        {/* Purple Background */}
        <img
          src={gradientOverlay}
          alt="Purple Background"
          className="absolute -top-32 -right-32 w-[900px] -translate-y-72 max-w-none"
        />

        {/* Illustration */}
        <img
          src={loginIllustration}
          alt="Illustration"
          className="relative z-10 w-[520px] -translate-x-6 translate-y-12"
        />
      </div>
    </div>
  );
}
