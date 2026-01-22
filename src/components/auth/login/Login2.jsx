import React, { useState } from "react";
export default function Login2() {
  const [email, setEmail] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault();
    alert("Submitted!");
  };
  return (
    <div className=" sm:auto flex  bg-white justify-center w-screen h-screen  ">
      <div className=" justify-start items-center hidden sm:flex w-5/9 bg-[url('/page1background.svg')]  bg-contain bg-no-repeat leftbox">
        <img className="pl-10 w-5/10 " src="page2lefticon.svg" alt="" />
      </div>
      <div className=" flex flex-col gap-15 justify-start lg:justify-center items-center w-full sm:w-4/9  mt-25 lg:mt-0">
        <div className="flex flex-col gap-3 justify-center items-center w-full">
          <p className="   font-poppin whitespace-nowrap text-left text-xl lg:text-2xl font-medium">
            Forget Password
          </p>
          <p className="  w-9/10 text-center text-gray-500">
            Enter your registered email to receive a password reset link
          </p>
        </div>
        <form
          className=" w-9/10 lg:w-7/10 lg:w-8/10 flex flex-col gap-6 lg:gap-3 justify-center items-center"
          onSubmit={handlesubmit}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email or Phone Number"
            className="font-urbanist h-12 lg:h-10 w-full bg-input px-6 rounded-lg  text-black bg-white"
          />
          <span className=" flex justify-end w-full font-inter text-sm">
            <pre className="font-inter text-gray-400"> Go back to </pre>
            <a href="/" className="text-light">
              Login
            </a>
          </span>
          <button
            className="flex justify-center items-center gap-3 w-60 h-12 lg:h-10 rounded-[10px] border-gray-300 bg-dark text-white "
            type="submit"
          >
            Reset Password <img src="arrow.svg" alt="" />
          </button>
        </form>

        <span className="font-urbanist text-sm text-gray-400 ">
          Don't have an account?
          <a href="/" className="text-light font-bold">
            {" "}
            Sign Up
          </a>
        </span>
      </div>
    </div>
  );
}
