import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useDropzone } from "react-dropzone";
export default function Signup1() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isshown1, setIsshown1] = useState(false);
  const [isshown2, setIsshown2] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const navigate = useNavigate();
  const onDropFirst = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile1(acceptedFiles[0]);
      setError1("");
      console.log(acceptedFiles[0].name);
    } else {
      setError1("File size exceeds!");
      setFile1("");
      console.log("found err");
    }
  }, []);
  const onDropSecond = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      setFile2(acceptedFiles[0]);
      setError2("");
    } else {
      setError2("File size exceeds!");
      setFile2("");
    }
  }, []);
  const { getRootProps: getRootPropsFirst, getInputProps: getInputPropsFirst } =
    useDropzone({
      onDrop: onDropFirst,
      maxSize: 2 * 1024 * 1024,
      multiple: false
    });
  const {
    getRootProps: getRootPropsSecond,
    getInputProps: getInputPropsSecond
  } = useDropzone({
    onDrop: onDropSecond,
    maxSize: 2 * 1024 * 1024,
    multiple: false
  });
  const handlesubmit = (e) => {
    e.preventDefault();
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (regex.test(password) && password === confirmpassword) {
      navigate("/VerifyAccount");
    } else {
      alert("Password is invalid");
    }

    // alert('submitted!')
  };

  return (
    <div className=" bg-white sm:auto flex    justify-center  h-screen w-screen ">
      <div className=" flex flex-col gap-5 lg:gap-3 justify-center items-center lg:items-start w-full sm:w-4/9 pl-0 lg:pl-13">
        <img className="hidden lg:block w-35 " src="logo.svg" alt="" />
        <p className=" font-poppin whitespace-nowrap text-left text-xl lg:text-2xl font-medium">
          Signup to{" "}
          <span className=" text-black lg:text-light">TechnoHire</span> Super
          Admin
        </p>
        <span className="block lg:hidden font-urbanist text-[13px] text-gray-900 ">
          Already have an account?
          <a href="/" className="text-light ">
            {" "}
            Log in
          </a>
        </span>
        <div className=" hidden lg:flex w-full gap-5 ">
          <div>
            <p className="text-[#18191C] text-[14px]">Upload your Photo</p>
            <div
              {...getRootPropsFirst()}
              className=" h-15 w-50 flex items-center flex-col justify-center border border-dashed border-gray-400 rounded-md text-center"
            >
              <input
                onChange={(e) => setFile1(e.target.files[0])}
                {...getInputPropsFirst()}
              />
              {file1 ? (
                <p className="text-gray-400 text-[13px]">{file1.name}</p>
              ) : (
                <>
                  {error1 ? (
                    "file size ig large"
                  ) : (
                    <>
                      <img src="inputcloud.svg" alt="" />{" "}
                      <p className="text-[12px] text-gray-500">
                        <span className="text-gray-900 text-bold">
                          Browse File
                        </span>{" "}
                        or drop here Max 2MB
                      </p>
                    </>
                  )}{" "}
                </>
              )}
            </div>
          </div>
          <div>
            <p className="text-[14px]">Cover Photo</p>
            <div
              {...getRootPropsSecond()}
              className=" h-15 w-50 flex items-center flex-col justify-center border border-dashed border-gray-400 rounded-md text-center"
            >
              <input
                onChange={(e) => setFile2(e.target.files[0])}
                {...getInputPropsSecond()}
              />
              {file2 ? (
                <p className="text-gray-400 text-[13px]">{file2.name}</p>
              ) : (
                <>
                  {error2 ? (
                    "file size ig large"
                  ) : (
                    <>
                      <img src="inputcloud.svg" alt="" />{" "}
                      <p className="text-[12px] text-gray-500">
                        <span className="text-gray-900 text-bold">
                          Browse File
                        </span>{" "}
                        or drop here Max 2MB
                      </p>
                    </>
                  )}{" "}
                </>
              )}
            </div>
          </div>
        </div>
        <form
          className="w-9/10 lg:w-full flex flex-col gap-3 lg:gap-2 items-left "
          onSubmit={handlesubmit}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Full Name"
            className="font-urbanist text-[12px] h-12 lg:h-10 w-full bg-input px-6 rounded-lg  text-black bg-white"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
            className="font-urbanist text-[12px] h-12 lg:h-10 w-full bg-input px-6 rounded-lg  text-black bg-white"
          />
          <div className="relative w-full">
            <input
              type={isshown1 ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              // pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/"
              placeholder="Password"
              className="font-urbanist text-[12px] h-12 lg:h-10 w-full bg-input px-6 rounded-lg  text-black bg-white"
            />
            <img
              onClick={() => setIsshown1(!isshown1)}
              className="absolute top-[50%] translate-y-[-50%] right-3 "
              src={!isshown1 ? "passwordhide.svg" : "passwordshow.svg"}
              alt=""
            />
          </div>
          <table className="hidden lg:table w-full">
            <tbody>
              <tr className="flex w-full    ">
                <td className="w-1/3 flex gap-1 items-center text-gray-400 text-[10px]">
                  <span className="text-light text-lg"> &#8226; </span>Use 8 or
                  more character
                </td>
                <td className="w-1/3 flex gap-1 items-center text-gray-400 text-[10px]">
                  <span className="text-light text-lg"> &#8226; </span>One
                  Uppercase character
                </td>
                <td className="w-1/3 flex gap-1 items-center text-gray-400 text-[10px]">
                  <span className="text-light text-lg"> &#8226; </span>One
                  Lowercase character
                </td>
              </tr>
              <tr className="flex w-full justify-start ">
                <td className="w-1/3 flex gap-1 items-center text-gray-400 text-[10px]">
                  <span className="text-light text-lg"> &#8226; </span>One
                  special character
                </td>
                <td className="w-1/3 flex gap-1 items-center text-gray-400 text-[10px]">
                  <span className="text-light text-lg"> &#8226; </span>One
                  number
                </td>
              </tr>
            </tbody>
          </table>
          <div className="relative w-full ">
            <input
              type={isshown2 ? "text" : "password"}
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              required
              placeholder="Confirm Password"
              className="font-urbanist text-[12px] h-12 lg:h-10 w-full bg-input px-6 rounded-lg  text-black bg-white"
            />
            <img
              onClick={() => setIsshown2(!isshown2)}
              className="absolute top-[50%] translate-y-[-50%] right-3 "
              src={!isshown2 ? "passwordhide.svg" : "passwordshow.svg"}
              alt=""
            />
          </div>
          <span className="font-urbanist text-[13px] text-gray-900 ">
            By creating an account, you agree to the
            <a href="/" className="text-light ">
              {" "}
              Terms of use{" "}
            </a>
            and
            <a href="/" className="text-light ">
              {" "}
              Privacy Policy
            </a>
          </span>
          <button
            className="w-full lg:w-60 h-12 lg:h-10 rounded-[10px] border-gray-300 bg-dark bg-purple-950 text-white "
            type="/"
          >
            Create an account
          </button>

          <span className="hidden lg:block font-urbanist text-[13px] text-gray-900 ">
            Already have an account?
            <a href="/" className="text-light ">
              {" "}
              Log in
            </a>
          </span>
        </form>
        <div className="flex flex-col w-full gap-3 items-center">
          <div className="flex items-center justify-center w-full">
            <div className="border-t w-1/4  border-gray-300"></div>
            <span className="mx-4 text-gray-600 text-sm ">Or Signup with</span>
            <div className="border-t w-1/4 border-gray-300"></div>
          </div>
          <div className="flex gap-3 lg:gap-1">
            <button className=" flex rounded-[5px] justify-center items-center w-20 h-9 lg:w-15 h-8 border-[1px] border-gray-300">
              <img
                className="w-8 h-8 lg:w-6 h-6"
                src="facebookicon.svg"
                alt=""
              />
            </button>
            <button className=" flex rounded-[5px] justify-center items-center w-20 h-9 lg:w-15 h-8 border-[1px] border-gray-300">
              <img className="w-7 h-7 lg:w-5 h-5" src="googleicon.svg" alt="" />
            </button>
            <button className=" flex rounded-[5px] justify-center items-center w-20 h-9 lg:w-15 h-8 border-[1px] border-gray-300">
              <img
                className="w-8 h-8 lg:w-6 h-6"
                src="linkedinicon.svg"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>

      <div className=" justify-end items-center hidden sm:flex w-5/9 bg-[url('/Signup1background.svg')]  bg-contain bg-right bg-no-repeat leftbox">
        <img className="pl-10 w-5/11  " src="Signup1righticon.svg" alt="" />
      </div>
    </div>
  );
}
