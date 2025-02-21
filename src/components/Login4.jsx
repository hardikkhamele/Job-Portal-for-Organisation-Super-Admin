import React from "react";
export default function Login4() {
  return (
    <div className=" sm:auto flex auto  bg-white justify-center w-screen h-screen ">
      <div className=" justify-start items-center hidden sm:flex w-5/9 bg-[url('/page1background.svg')]  bg-contain bg-no-repeat leftbox">
        <img
          className="pl-10 w-9/20 lg:w-4/10 md:w-7/10 "
          src="page4lefticon.svg"
          alt=""
        />
      </div>
      <div className=" flex flex-col gap-9 justify-center items-center w-full sm:w-4/9 ">
        <img className="w-20 h-20" src="page4righticon.svg" alt="" />
        <div className="flex flex-col gap-2 justify-center items-center w-full">
          <p className="   font-poppin whitespace-nowrap text-left text-xl lg:text-2xl font-medium">
            Password Reset Successful!
          </p>
          <p className="  w-9/10 text-center text-sm text-gray-500">
            You can Log in with your new password
          </p>
        </div>

        <button
          className=" flex justify-center items-center gap-5 w-60 h-10 rounded-[10px] border-gray-300 bg-dark text-white "
          type="submit"
        >
          {" "}
          Login
        </button>
      </div>
    </div>
  );
}
