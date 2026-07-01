// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { resetPasswordApi, clearResetState } from "../../../redux/slice/auth/resetSlice";
// import { toast } from "react-toastify";

// import resetIllustration from "../../../assets/ResetIllustration.png"; 
// import gradientOverlay from "../../../assets/PurpleShadeBg.png"; 
// import TechnoHireLogo from "../../../assets/TalentHire.png"; 

// export default function ResetPassword() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const email = location.state?.email;

//   const { loading, success } = useSelector((state) => state.reset);

//   useEffect(() => {
//     if (!email) {
//       navigate("/forgot-password");
//     }
//   }, [email, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     // API Call dispatch
//     dispatch(resetPasswordApi({ email, newPassword }));
//   };

//   // Success hone par next page par bhej dena
//   useEffect(() => {
//     if (success) {
//       navigate("/reset-success");
//       dispatch(clearResetState());
//     }
//   }, [success, navigate, dispatch]);

//   return (
//     <div className="w-screen h-screen flex font-sans">
//       {/* LEFT SIDE */}
//       <div className="w-1/2 flex flex-col justify-center items-center bg-white relative px-6">
//         {/* Logo */}
//         <img
//           src={TechnoHireLogo}
//           alt="TechnoHire Logo"
//           className="w-[400px] mb-6"
//         />

//         {/* Reset Card */}
//         <div className="bg-white w-[400px] h-[500px] p-8 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-purple-300">
//           <h2 className="text-3xl font-extrabold text-[#7900BA] mb-2 text-center mt-9">
//             Reset Password
//           </h2>

//           <p className="text-gray-700 text-sm text-center">
//             Set a new password to access your account
//           </p>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
//             {/* New Password */}
//             <div>
//               <label className="text-xs text-gray-600">New Password</label>
//               <input
//                 type="password"
//                 placeholder="********"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md 
//                            focus:outline-none focus:ring-1 focus:ring-purple-500"
//                 required
//               />
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="text-xs text-gray-600">
//                 Confirm New Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="********"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md 
//                            focus:outline-none focus:ring-1 focus:ring-purple-500"
//                 required
//               />
//             </div>

//             {/* Go back to login */}
//             <div className="flex justify-center text-xs mt-2">
//               <span
//                 onClick={() => navigate("/")}
//                 className="text-purple-600 font-medium cursor-pointer "
//               >
//                 Go back to <span className="text-orange-300">Login</span>
//               </span>
//             </div>

//             {/* Reset Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`mt-4 py-2 text-sm text-white rounded-md 
//                          bg-gradient-to-r from-purple-600 to-purple-800 
//                          hover:opacity-90 transition duration-300 w-full flex items-center justify-center ${
//                            loading ? "opacity-70 cursor-not-allowed" : ""
//                          }`}
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="w-1/2 relative flex items-center justify-center overflow-hidden">
//         {/* Purple Background */}
//         <img
//           src={gradientOverlay}
//           alt="Purple Background"
//           className="absolute -top-32 -right-32 w-[900px] -translate-y-72 max-none"
//         />

//         {/* Illustration */}
//         <img
//           src={resetIllustration}
//           alt="Reset Illustration"
//           className="relative z-10 w-[500px] translate-y-12 -translate-x-14"
//         />
//       </div>
//     </div>
//   );
// }







import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordApi, clearResetState } from "../../../redux/slice/auth/resetSlice";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // Icons import ki gayi hain
import { addNotification } from "../../../utils/notificationHelper";

import resetIllustration from "../../../assets/ResetIllustration.png"; 
import gradientOverlay from "../../../assets/PurpleShadeBg.png"; 
import TechnoHireLogo from "../../../assets/TalentHire.png"; 

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Password visibility states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const email = location.state?.email;

  const { loading, success } = useSelector((state) => state.reset);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(resetPasswordApi({ email, newPassword }));
  };

  useEffect(() => {
    if (success) {
      addNotification(
        "Password Reset Successful",
        "Password reset has been completed successfully via OTP verification.",
        "success"
      );
      navigate("/reset-success");
      dispatch(clearResetState());
    }
  }, [success, navigate, dispatch]);

  return (
    <div className="w-screen h-screen flex font-sans">
      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white relative px-6">
        <img
          src={TechnoHireLogo}
          alt="TechnoHire Logo"
          className="w-[400px] mb-6"
        />

        <div className="bg-white w-[400px] h-[500px] p-8 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-purple-300">
          <h2 className="text-3xl font-extrabold text-[#7900BA] mb-2 text-center mt-9">
            Reset Password
          </h2>

          <p className="text-gray-700 text-sm text-center">
            Set a new password to access your account
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            {/* New Password */}
            <div>
              <label className="text-xs text-gray-600">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="********"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md 
                             focus:outline-none focus:ring-1 focus:ring-purple-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 focus:outline-none mt-0.5"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs text-gray-600">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md 
                             focus:outline-none focus:ring-1 focus:ring-purple-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 focus:outline-none mt-0.5"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Go back to login */}
            <div className="flex justify-center text-xs mt-2">
              <span
                onClick={() => navigate("/")}
                className="text-purple-600 font-medium cursor-pointer "
              >
                Go back to <span className="text-orange-300">Login</span>
              </span>
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-4 py-2 text-sm text-white rounded-md 
                         bg-gradient-to-r from-purple-600 to-purple-800 
                         hover:opacity-90 transition duration-300 w-full flex items-center justify-center ${
                           loading ? "opacity-70 cursor-not-allowed" : ""
                         }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 relative flex items-center justify-center overflow-hidden">
        <img
          src={gradientOverlay}
          alt="Purple Background"
          className="absolute -top-32 -right-32 w-[900px] -translate-y-72 max-none"
        />

        <img
          src={resetIllustration}
          alt="Reset Illustration"
          className="relative z-10 w-[500px] translate-y-12 -translate-x-14"
        />
      </div>
    </div>
  );
}