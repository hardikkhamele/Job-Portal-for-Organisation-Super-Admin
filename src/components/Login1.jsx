// import React, { useState } from "react";

// export default function Login1() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [ischeckded, setIschecked] = useState(true);
//   const handlesubmit = (e) => {
//     e.preventDefault();
//     alert("Submitted!");
//   };
//   return (
//     <div className=" sm:auto flex w-screen bg-white justify-center  h-screen ">
//       <div className=" justify-start items-center hidden sm:flex w-5/9 bg-[url(page1background.svg)]  bg-contain bg-no-repeat leftbox">
//         <img className="pl-10 w-5/10 " src="page1lefticon.svg" alt="" />
//       </div>
//       <div className=" flex flex-col gap-9 justify-center items-center w-full sm:w-4/9 ">
//         <img className=" hidden lg:block w-[157px] " src="logo.svg" alt="" />
//         <p className="   font-poppins whitespace-nowrap text-left text-xl lg:text-2xl font-medium">
//           Log Into <span className=" text-black lg:text-light">TechnoHire</span>{" "}
//           Super Admin
//         </p>
//         <p className=" block lg:hidden w-9/10 text-center text-gray-500">
//           Log in to Unlock your upper admin tools control jobs, track
//           opportunities, and optimize platform performance
//         </p>
//         <form
//           className=" w-9/10 lg:w-19/20 lg:w-8/10 flex flex-col gap-3 justify-center items-center"
//           onSubmit={handlesubmit}
//         >
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Email or Phone Number"
//             className="font-urbanist h-12 lg:h-10 w-full bg-input px-6 rounded-lg  text-black bg-white"
//           />
//           <input
//             type="tel"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Password"
//             className="font-urbanist h-12 lg:h-10 w-full bg-input px-6  rounded-lg  text-black bg-white"
//           />
//           <span className=" flex justify-between items-center w-full font-inter text-sm">
//             <span className="flex gap-2 items-center">
//               <input
//                 checked={ischeckded}
//                 onChange={() => setIschecked((pre) => !pre)}
//                 className="w-[14px] h-[14px] "
//                 type="checkbox"
//               />
//               <label htmlFor="checkbox" className="text-gray-400">
//                 Remember
//               </label>
//             </span>
//             <a href="/" className=" text-light">
//               Forget Password
//             </a>
//           </span>
//           <button
//             className="w-60 h-12 lg:h-10 rounded-[10px] border-gray-300 bg-dark text-white "
//             type="submit"
//           >
//             Login
//           </button>
//         </form>
//         <div className="flex flex-col w-full gap-4 items-center">
//           <div class="flex items-center justify-center w-full">
//             <div class="border-t w-1/4  border-gray-300"></div>
//             <span class="mx-4 text-gray-400 text-sm ">Or Login with</span>
//             <div class="border-t w-1/4 border-gray-300"></div>
//           </div>
//           <div className="flex gap-3 lg:gap-1">
//             <button className=" flex rounded-[5px] justify-center items-center w-20 h-12 lg:w-15 h-10 border-[1px] border-gray-300">
//               <img className="w-6 h-6" src="facebookicon.svg" alt="" />
//             </button>
//             <button className=" flex rounded-[5px] justify-center items-center w-20 h-12 lg: w-15 h-10 border-[1px] border-gray-300">
//               <img className="w-5 h-5" src="googleicon.svg" alt="" />
//             </button>
//             <button className=" flex rounded-[5px] justify-center items-center w-20 h-12 lg:w-15 h-10 border-[1px] border-gray-300">
//               <img className="w-6 h-6" src="linkedinicon.svg" alt="" />
//             </button>
//           </div>
//           <span className="font-urbanist text-sm text-gray-400 ">
//             Don't have an account?
//             <a href="/" className="text-light font-bold">
//               {" "}
//               Sign Up
//             </a>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  const navigator = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigator("/dashboard");
  };

  return (
    <div className="sm:auto flex w-screen bg-white justify-center h-screen">
      {/* Left Side (Hidden on Small Screens) */}
      <div className="hidden sm:flex w-5/9 bg-[url('/page1background.svg')] bg-contain bg-no-repeat leftbox items-center">
        <img className="pl-10 w-5/10" src="page1lefticon.svg" alt="Left Icon" />
      </div>

      {/* Right Side (Login Form) */}
      <div className="flex flex-col gap-9 justify-center items-center w-full sm:w-4/9">
        <img className="hidden lg:block w-[157px]" src="logo.svg" alt="Logo" />
        <p className="font-poppins text-xl lg:text-2xl font-medium">
          Log Into <span className="text-black lg:text-light">TechnoHire</span>{" "}
          Super Admin
        </p>
        <p className="block lg:hidden w-9/10 text-center text-gray-500">
          Log in to unlock your admin tools, control jobs, track opportunities,
          and optimize platform performance.
        </p>

        {/* Form */}
        <form
          className="w-9/10 lg:w-8/10 flex flex-col gap-3 items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email or Phone Number"
            className="font-urbanist h-12 lg:h-10 w-full bg-white px-6 rounded-lg text-black border border-gray-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="font-urbanist h-12 lg:h-10 w-full bg-white px-6 rounded-lg text-black border border-gray-300"
          />

          {/* Remember Me & Forgot Password */}
          <span className="flex justify-between items-center w-full font-inter text-sm">
            <label className="flex gap-2 items-center text-gray-400">
              <input
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
                className="w-[14px] h-[14px]"
                type="checkbox"
              />
              Remember
            </label>
            <Link to="/forgot-password" className="text-light">
              Forgot Password?
            </Link>
          </span>

          {/* Login Button */}
          <button
            className="w-60 h-12 lg:h-10 rounded-lg bg-dark bg-purple-950 text-white border border-gray-300"
            type="submit"
          >
            Login
          </button>
        </form>

        {/* Social Login */}
        <div className="flex flex-col w-full gap-4 items-center">
          <div className="flex items-center justify-center w-full">
            <div className="border-t w-1/4 border-gray-300"></div>
            <span className="mx-4 text-gray-400 text-sm">Or Login with</span>
            <div className="border-t w-1/4 border-gray-300"></div>
          </div>

          <div className="flex gap-3 lg:gap-1">
            <button className="flex rounded-[5px] justify-center items-center w-20 h-12 lg:w-15 lg:h-10 border border-gray-300">
              <img className="w-6 h-6" src="facebookicon.svg" alt="Facebook" />
            </button>
            <button className="flex rounded-[5px] justify-center items-center w-20 h-12 lg:w-15 lg:h-10 border border-gray-300">
              <img className="w-5 h-5" src="googleicon.svg" alt="Google" />
            </button>
            <button className="flex rounded-[5px] justify-center items-center w-20 h-12 lg:w-15 lg:h-10 border border-gray-300">
              <img className="w-6 h-6" src="linkedinicon.svg" alt="LinkedIn" />
            </button>
          </div>

          {/* Signup Link */}
          <span className="font-urbanist text-sm text-gray-400">
            Don't have an account?
            <Link to="/Signup1" className="text-light font-bold">
              {" "}
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
