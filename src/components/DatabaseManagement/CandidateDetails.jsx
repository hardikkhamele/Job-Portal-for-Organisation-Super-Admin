import React from "react";
import { ArrowLeft, Eye, Download, Gem } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import universityImg from "../../assets/university.png";
import profile from "../../assets/cadidate.png"
import profile2 from "../../assets/cadidate2.png"
import profile3 from "../../assets/cadidate3.png"

const CandidateDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const data = state || {
    name: "Aman Kumar",
    role: "Android Developer",
    location: "Nagpur, Maharashtra, India",
    about:
      "Android Developer with a passion for building scalable, high-performance mobile applications that deliver seamless and user-centric experiences Android Developer with a passion for building scalable...",
    skills: ["Java", "Kotlin", "Angular"],
  };

  return (
    <div className="p-3 bg-gray-100 min-h-screen">

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow p-6">

        {/* Header INSIDE */}
        <div className="flex items-center gap-3 mb-4">
          <div
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 cursor-pointer hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5"  />
          </div>

          <h2 className="text-2xl font-bold">Candidate Profile</h2>
        </div>

        <hr className="mb-6 border-gray-300" />

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div>
            {/* Profile */}
            <div className="flex gap-4 items-center">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="profile"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg">{data.name}</h3>
                <p className="text-gray-600">{data.role}</p>
                <p className="text-sm text-gray-400">{data.location}</p>
              </div>
            </div>

            {/* About */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">About</h4>
              <p className="text-gray-600 text-sm">{data.about}</p>
            </div>

            {/* Skills */}
            <div className="mt-6 border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Gem className="w-4 h-4 text-gray-700" />
                <h4 className="font-semibold">Top skills</h4>
              </div>
              <p className="text-gray-600">{data.skills.join(", ")}</p>
            </div>

            {/* Education */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Education</h4>

              {/* Item 1 */}
              <div className="flex gap-3 items-start mb-3">
                <img
                  src={universityImg}
                  alt="university"
                  className="w-7 h-7 mt-1"
                />
                <div>
                  <p className="font-medium">Anna University, Chennai</p>
                  <p className="text-sm text-gray-500">Master of Technology</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-3 items-start">
                <img
                  src={universityImg}
                  alt="university"
                  className="w-7 h-7 mt-1"
                />
                <div>
                  <p className="font-medium">Anna University, Chennai</p>
                  <p className="text-sm text-gray-500">
                    Artificial Intelligence
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="border-l pl-6">

            {/* Experience */}
            <div>
              <h4 className="font-semibold mb-3">Experience</h4>

              {/* Experience 1 */}
              <div className="flex gap-3 mb-4">
                <img
                  src={profile}
                  alt="EY"
                  className="w-10 h-10 object-contain"
                />

                <div>
                  <p className="font-medium">
                    Senior Android Developer - Full-time
                  </p>
                  <p className="text-sm text-gray-500">
                    Jul 2024 - Present · 5 mos
                  </p>
                  <p className="text-sm text-gray-400">
                    Bangalore, Karnataka, India · On-site
                  </p>
                </div>
              </div>

              <hr className="my-3 border-gray-300" />

              {/* Experience 2 */}
              <div className="flex gap-3">
                <img
                  src={profile2}
                  alt="Infosys"
                  className="w-10 h-10 object-contain"
                />

                <div>
                  <p className="font-medium">
                    Junior Android Developer - Full-time
                  </p>
                  <p className="text-sm text-gray-500">
                    Jan 2023 - Jun 2024
                  </p>
                </div>
              </div>
              <hr className="my-3 border-gray-300" />
            </div>

            {/* Certifications */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Certifications</h4>

              {/* Certification 1 */}
              <div className="flex justify-between items-center mb-4">

                {/* LEFT SIDE (image + text) */}
                <div className="flex gap-3 items-center">
                  <img
                    src={profile3}
                    alt="google"
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <p className="font-medium">Android Developer</p>
                    <p className="text-sm text-gray-500">Google</p>
                  </div>
                </div>

                {/* RIGHT SIDE ICONS */}
                <div className="flex gap-3 text-purple-600">
                  <Eye className="cursor-pointer w-5 h-5" />
                  <Download className="cursor-pointer w-5 h-5" />
                </div>
              </div>

              {/* Certification 2 */}
              <div className="flex justify-between items-center">

                <div className="flex gap-3 items-center">
                  <img
                    src={profile3}
                    alt="google"
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <p className="font-medium">Java Full Stack</p>
                    <p className="text-sm text-gray-500">Google</p>
                  </div>
                </div>

                <div className="flex gap-3 text-purple-600">
                  <Eye className="cursor-pointer w-5 h-5" />
                  <Download className="cursor-pointer w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Resume */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-lg text-gray-900">Resume</h4>

              <div className="flex justify-between items-center">
                <p className="text-gray-900 font-semibold text-sm">Charlie_CV.pdf</p>
                <div className="flex gap-3 text-purple-600">
                  <Eye className="cursor-pointer w-5 h-5" />
                  <Download className="cursor-pointer w-5 h-5" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CandidateDetails;