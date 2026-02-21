import React from "react";
import { useNavigate } from "react-router";
import { Eye, Download } from "lucide-react";

function CandidateProfile() {

  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">

      {/* SAME WHITE PARENT CARD */}
      <div className="bg-white p-5 rounded-2xl">

        {/* HEADER */}
        <div className="flex bg-white p-4 rounded-2xl items-center gap-3 mb-5">
          <button onClick={() => navigate(-1)}>←</button>
          <h1 className="text-xl font-semibold">
            Candidate Profile
          </h1>
        </div>

        <hr />

        {/* MAIN PROFILE CARD */}
        <div className="bg-[#F9FAFB] rounded-xl p-6 mt-4 border">

          <div className="grid grid-cols-2 gap-6">

            {/* LEFT SIDE */}
            <div>

              {/* PROFILE */}
              <div className="flex gap-4 items-center mb-4">
                <img
                  src="https://i.pravatar.cc/70"
                  className="w-16 h-16 rounded-full"
                  alt=""
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    Aman Kumar
                  </h2>
                  <p className="text-sm text-gray-500">
                    Android Developer
                  </p>
                  <p className="text-xs text-gray-400">
                    Nagpur, Maharashtra, India
                  </p>
                </div>
              </div>

              {/* ABOUT */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-sm text-gray-600">
                  Android Developer with a passion for building scalable,
                  high-performance mobile applications that deliver seamless
                  and user-centric experiences...
                </p>
              </div>

              {/* SKILLS */}
              <div className="border rounded-lg p-3 mb-4">
                <h3 className="text-sm font-medium mb-1">
                  Top skills
                </h3>
                <p className="text-sm text-gray-600">
                  Java, Kotlin, Angular
                </p>
              </div>

              {/* EDUCATION */}
              <div>
                <h3 className="font-medium mb-3">
                  Education
                </h3>

                <p className="text-sm font-medium">
                  Anna University, Chennai
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Master of Technology
                </p>

                <p className="text-sm font-medium">
                  Anna University, Chennai
                </p>
                <p className="text-xs text-gray-500">
                  Artificial Intelligence
                </p>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="border-l pl-6">

              {/* EXPERIENCE */}
              <h3 className="font-medium mb-4">
                Experience
              </h3>

              <div className="mb-4">
                <p className="text-sm font-medium">
                  Senior Android Developer - Full-time
                </p>
                <p className="text-xs text-gray-500">
                  Jul 2024 - Present · 5 mos
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium">
                  Junior Android Developer - Full-time
                </p>
                <p className="text-xs text-gray-500">
                  Jan 2023 - Jun 2024
                </p>
              </div>

              {/* CERTIFICATIONS */}
              <h3 className="font-medium mt-6 mb-3">
                Certifications
              </h3>

              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm font-medium">
                    Android Developer
                  </p>
                  <p className="text-xs text-gray-500">
                    Google
                  </p>
                </div>

                <div className="flex gap-3 text-purple-600">
                  <Eye size={18} />
                  <Download size={18} />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">
                    Java Full Stack
                  </p>
                  <p className="text-xs text-gray-500">
                    Google
                  </p>
                </div>

                <div className="flex gap-3 text-purple-600">
                  <Eye size={18} />
                  <Download size={18} />
                </div>
              </div>

                {/* Resume */}
              <h3 className="font-medium mt-6 mb-3">
                Resume
              </h3>

                 <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm font-medium">
                    Charlie_CV.Pdf
                  </p>
               
                </div>

                <div className="flex gap-3 text-purple-600">
                  <Eye size={18} />
                  <Download size={18} />
                </div>
              </div>

            </div>

          </div>

        </div>

        
      </div>
    </div>
  );
}

export default CandidateProfile;