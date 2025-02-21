import React, { useState } from "react";
export default function Login1() {
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [isshown1, setisshown1] = useState(false);
  const [isshown2, setisshown2] = useState(false);
  const handlesubmit = (e) => {
    e.preventDefault();
    alert("Submitted!");
  };
  return (
    <div className=" sm:auto flex 4 bg-white justify-center w-screen  h-screen  ">
      <div className=" justify-start items-center hidden sm:flex w-5/9 bg-[url('/page1background.svg')]  bg-contain bg-no-repeat leftbox">
        <img className="pl-10 w-5/10 " src="page3lefticon.svg" alt="" />
      </div>
      <div className=" flex flex-col gap-9 justify-center items-center w-full sm:w-4/9 ">
        <div className="flex flex-col gap-3 justify-center items-center w-full">
          <p className="   font-poppin whitespace-nowrap text-left text-xl lg:text-2xl font-medium">
            Reset Password
          </p>
          <p className="  w-9/10 text-center text-gray-500">
            Set a new password to access your account
          </p>
        </div>
        <form
          className=" w-9/10 lg:w-19/20 lg:w-8/10 flex flex-col gap-3 justify-center items-center"
          onSubmit={handlesubmit}
        >
          <div className="relative w-full lg:w-8/10">
            <input
              type={isshown1 ? "text" : "password"}
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              required
              placeholder="New Password"
              className="font-urbanist h-12 lg:h-10 w-full bg-input px-6 rounded-lg  text-black bg-white"
            />
            <img
              onClick={() => setisshown1(!isshown1)}
              className="absolute top-[50%] translate-y-[-50%] right-3 "
              src={!isshown1 ? "passwordhide.svg" : "passwordshow.svg"}
              alt=""
            />
          </div>
          <div className="relative w-full lg:w-8/10">
            <input
              type={isshown2 ? "text" : "password"}
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              required
              placeholder="Confirm Password"
              className="font-urbanist h-12 lg:h-10 w-full bg-input px-6 rounded-lg  text-black bg-white"
            />
            <img
              onClick={() => setisshown2(!isshown2)}
              className="absolute top-[50%] translate-y-[-50%] right-3 "
              src={!isshown2 ? "passwordhide.svg" : "passwordshow.svg"}
              alt=""
            />
          </div>
          <button
            className=" flex justify-center items-center gap-5 w-60 h-12 lg:h-10 rounded-[10px] border-gray-300 bg-dark text-white "
            type="submit"
          >
            Reset Password
            <img src="arrow.svg" alt="" />
          </button>
        </form>

        <span className="font-urbanist text-sm text-gray-400 ">
          Go back to
          <a href="/" className="text-light ">
            {" "}
            Login
          </a>
        </span>
      </div>
    </div>
  );
}
