import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
  faArrowLeft,
  faArrowRight,
  faLink,
  faLocationPin,
  faPhone,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

function CandidateProfile() {
  return (
    <div className="flex">
      <div className="flex flex-col w-[100%] ">
        <div className="space-y-6 bg-slate-100 h-full p-6 rounded-xl">
          <div className="flex flex-col items-left">
            <div className="flex flex-col space-y-3 mb-2">
              <Link to="/" className="flex items-center space-x-2 ">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-purple-600"
                />
                <h1 className="text-lg text-black font-semibold">
                  Hello! TechnoHire
                </h1>
              </Link>
              <h4 className="text-2xl font-bold mt-2">
                Verification Candidate Profile
              </h4>
            </div>
            <div className="bg-white p-4 rounded-t-lg  border-b  border-slate-400 shadow-md flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-4">
                <img
                  src="profile-image.jpg"
                  alt="User"
                  className="w-16 h-16 rounded-full border"
                />
                <div>
                  <div className="flex justify-between items-center space-x-4">
                    <h3 className="text-xl font-semibold">John Doe</h3>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-purple-500 cursor-pointer"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                  <p className="text-gray-500">Software Developer</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="px-9 py-2 bg-red-200 font-bold text-red-800 rounded-md">
                  Remove Account
                </button>
                <button className="px-9 py-2 bg-green-200 font-bold text-green-600 rounded-md">
                  Send Message
                </button>
              </div>
            </div>
            <div className="bg-white p-4 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-6 text-justify w-full mt-8">
                <div className="space-y-2 w-full p-6">
                  <h4 className="text-lg font-semibold uppercase">Biography</h4>
                  <p className="text-gray-600">
                    I've been passionate about graphic design and digital art
                    from an early age with a keen interest in Website and Mobile
                    Application User Interfaces. I can create high-quality and
                    aesthetically pleasing designs in a quick turnaround time.
                    Check out the portfolio section of my profile to see samples
                    of my work and feel free to discuss your designing needs. I
                    mostly use Adobe Photoshop, Illustrator, XD and Figma.
                    *Website User Experience and Interface (UI/UX) Design - for
                    all kinds of Professional and Personal websites. *Mobile
                    Application User Experience and Interface Design - for all
                    kinds of IOS/Android and Hybrid Mobile Applications.
                    *Wireframe Designs.
                  </p>
                </div>
                <div className="space-y-2 w-full p-6">
                  <h4 className="text-lg font-semibold uppercase">
                    Cover Letter
                  </h4>
                  <p className="text-gray-600">
                    <p>Dear Sir,</p>I am writing to express my interest in the
                    fourth grade instructional position that is currently
                    available in the Fort Wayne Community School System. I
                    learned of the opening through a notice posted on JobZone,
                    IPFW’s job database. I am confident that my academic
                    background and curriculum development skills would be
                    successfully utilized in this teaching position.{" "}
                  </p>
                  <p className="text-gray-600">Sincerely,</p>
                  <p className="text-gray-600">Esther Howard</p>
                </div>
              </div>
              <div className="space-y-6 p-6 w-full">
                <div className="space-y-6 ml-10 p-10 w-30 min-w-[250px]">
                  {/* Contact Information */}
                  <div className="p-4 border border-gray-300 rounded-md">
                    <div className="flex justify-between items-center overflow-hidden mb-4">
                      <h4 className="text-lg font-semibold">
                        Contact Information
                      </h4>
                      <div className="flex space-x-4">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-purple-500 cursor-pointer"
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-500 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      {/* Website */}
                      <div className="flex items-start space-x-4 border-b border-gray-300">
                        {/* Icon Column */}
                        <FontAwesomeIcon
                          icon={faLink}
                          className="text-purple-600 mt-1"
                        />
                        {/* Content Column */}
                        <div className="flex flex-col w-full">
                          <span className="text-gray-600 ">Website</span>
                          <input
                            type="text"
                            value="www.estherhoward.com"
                            className="w-full py-2 font-semibold"
                          />
                        </div>
                      </div>
                      {/* Location */}
                      <div className="flex items-start space-x-4 border-b border-gray-300">
                        {/* Icon Column */}
                        <FontAwesomeIcon
                          icon={faLocationPin}
                          className="text-purple-600 mt-1"
                        />
                        {/* Content Column */}
                        <div className="flex flex-col w-[264px] h-[120px]  p-2">
                          <span className="text-gray-600">Location</span>
                          <textarea
                            value="Beverly Hills, California 90202"
                            className="w-full text-left font-semibold resize-none overflow-hidden break-words"
                            rows="2"
                            readOnly
                          />
                          <textarea
                            value="Zone/Block Basement 1 Unit B2, 1372 Spring Avenue, Portland"
                            className="w-full text-gray-600 resize-none overflow-hidden break-words"
                            rows="3"
                            readOnly
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start space-x-4 border-b border-gray-300">
                        {/* Icon Column */}
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-purple-600 mt-1"
                        />
                        {/* Content Column */}
                        <div className="flex flex-col w-full">
                          <span className="text-gray-600">Phone</span>
                          <input
                            type="text"
                            value="+1-202-555-0141"
                            className="px-1"
                          />
                          <div className="text-gray-600">Secondary Phone</div>
                          <input
                            type="text"
                            value="+1-202-555-0189"
                            className="w-full px-1 mb-2"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start space-x-4">
                        {/* Icon Column */}
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-purple-600 mt-1"
                        />
                        {/* Content Column */}
                        <div className="flex flex-col w-full">
                          <span className="text-gray-600">Email Address</span>
                          <input
                            type="email"
                            value="esther.howard@gmail.com"
                            className="w-full font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="space-y-2 border border-gray-300 p-6 rounded-md w-full overflow-hidden">
                    <h4 className="text-lg font-semibold">Documents</h4>
                    <div className="flex justify-between items-center space-x-2  border-gray-300 pb-2">
                      <span className="text-gray-600 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        Resume.pdf
                      </span>
                      <div className="flex space-x-5">
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-purple-600 cursor-pointer"
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center space-x-2    border-gray-300 ">
                      <span className="text-gray-600 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        Cover Letter.pdf
                      </span>
                      <div className="flex space-x-5">
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-purple-600 cursor-pointer"
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-4 p-10 bg-white rounded-b-xl">
              <button className="px-4 py-2 bg-purple-300 text-purple-800 font-semibold rounded-md flex items-center space-x-2">
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Previous Candidate</span>
              </button>
              <button className="px-4 py-2 bg-purple-800 text-white font-semibold rounded-md flex items-center space-x-2">
                <span>View Next Candidate</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateProfile;
