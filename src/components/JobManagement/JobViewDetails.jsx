// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Globe,
//   Phone,
//   Mail,
//   Calendar,
//   Briefcase,
//   MapPin,
//   GraduationCap,
//   Wallet,
//   CircleChevronLeft,
//   CircleCheck,
//   Link,
// } from "lucide-react";

// function JobViewDetails() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const job = location.state;

//   if (!job) return <div>No Data Found</div>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="bg-white p-6 rounded-xl shadow">
//         {/* 🔹 Header */}
//         <div className="flex items-center gap-3 mb-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-8 h-8 flex items-center justify-center rounded-full"
//           >
//             <CircleChevronLeft size={28} />
//           </button>
//           <h2 className="text-lg font-semibold">View Details</h2>
//         </div>

//         <hr className="border-gray-300 mt-2 mb-5" />

//         {/* 🔹 Company Section */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-4">
//             <img src={job.logo} alt="logo" />
//             <div>
//               <h3 className="font-semibold text-lg">
//                 Talentrise {job.employer}
//               </h3>
//               <p className="text-sm text-gray-500">
//                 IT Services and IT Consulting
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 text-sm">
//             <span className="text-red-500">1858 Spam Reports</span>
//             <span className="text-green-600 flex items-center gap-1">
//               <CircleCheck size={20} />
//               Active
//             </span>
//           </div>
//         </div>

//         <hr className="border-gray-300 mt-2 mb-5" />

//         {/* 🔹 Job Title */}
//         <div className="mb-4 flex items-center gap-2">
//           <h2 className="text-xl font-semibold">{job.job}</h2>
//           <div className="flex gap-2 mt-2">
//             <span className="text-xs px-3 py-1 rounded-xl bg-[rgba(211,211,211,1)] text-gray-700">
//               Classic
//             </span>
//             <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1  rounded-xl">
//               Full time
//             </span>
//           </div>
//         </div>

//         {/* 🔹 Contact Info */}
//         <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">

//   {/* Website */}
//   <a
//     href="https://technokrate.com"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="flex items-center gap-2 hover:text-blue-600"
//   >
//     <Link size={16} className="text-blue-400" />
//     https://Technokrate.com
//   </a>

//   {/* Phone */}
//   <a
//     href="tel:4065550120"
//     className="flex items-center gap-2 hover:text-blue-600"
//   >
//     <Phone size={16} className="text-blue-400" />
//     (406) 555-0120
//   </a>

//   {/* Email */}
//   <a
//     href="mailto:career@technokrate.com"
//     className="flex items-center gap-2 hover:text-blue-600"
//   >
//     <Mail size={16} className="text-blue-400" />
//     career@Technokrate.com
//   </a>

// </div>

//         {/* 🔹 Main Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* LEFT */}
//           <div className="md:col-span-2">
//             <h3 className="font-semibold mb-2">Job Description</h3>
//             <p className="text-sm text-gray-600 leading-relaxed">
//               As a Senior UI/UX Designer, you will craft intuitive and visually
//               compelling designs that elevate user experiences. Collaborating
//               closely with product managers and developers, you'll lead the
//               end-to-end design process, including research, wire framing,
//               prototyping, and high-fidelity visuals. You possess a deep
//               understanding of design principles, user psychology, and industry
//               trends. With exceptional proficiency in Figma and similar tools,
//               you ensure designs are both innovative and practical. Your
//               expertise in solving complex problems and delivering pixel-perfect
//               designs will play a critical role in shaping our digital products
//               and achieving business goals.
//               <br />
//               <br />
//               As a Senior UI/UX Designer, you’ll create seamless designs
//               tailored to user needs. You will oversee every design stage—from
//               research and wireframes to interactive prototypes and final
//               visuals. With expertise in user-centric design, tools like Figma,
//               and cross-functional collaboration, you’ll craft experiences that
//               balance innovation, functionality, and business goals.
//             </p>
//           </div>

//           {/* RIGHT CARD */}
//           <div className="border border-[rgba(220,189,237,1)] rounded-xl p-4">
//             <h3 className="font-semibold mb-4">Job Overview</h3>

//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div className="flex flex-col gap-2 items-start">
//                 <Calendar size={16} className="text-purple-600" />
//                 <div>
//                   <p className="text-gray-500">Job Posted</p>
//                   <p>Jan 7, 2026</p>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2 items-start">
//                 <Calendar size={16} className="text-purple-600" />
//                 <div>
//                   <p className="text-gray-500">Job Expire</p>
//                   <p>Feb 7, 2026</p>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2 items-start">
//                 <GraduationCap size={16} className="text-purple-600" />
//                 <div>
//                   <p className="text-gray-500">Education</p>
//                   <p>Graduation</p>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2 items-start">
//                 <Wallet size={16} className="text-purple-600" />
//                 <div>
//                   <p className="text-gray-500">Salary</p>
//                   <p>{job.salary}</p>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2 items-start">
//                 <MapPin size={16} className="text-purple-600" />
//                 <div>
//                   <p className="text-gray-500">Location</p>
//                   <p>{job.location}</p>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2 items-start">
//                 <Briefcase size={16} className="text-purple-600" />
//                 <div>
//                   <p className="text-gray-500">Job Type</p>
//                   <p>Full Time</p>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2 items-start">
//                 <Briefcase size={16} className="text-purple-600" />
//                 <div>
//                   <p className="text-gray-500">Experience</p>
//                   <p>4–5 Years</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobViewDetails;

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Phone,
  Mail,
  Calendar,
  Briefcase,
  MapPin,
  GraduationCap,
  Wallet,
  CircleChevronLeft,
  CircleCheck,
  Link,
} from "lucide-react";
import useJobById from "../../hooks/jobManagement/useJobById";

function JobViewDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialJobData = location.state;
  const { getJobById, jobDetail, loading } = useJobById();

  useEffect(() => {
    if (initialJobData?._id) {
      getJobById(initialJobData._id);
    }
  }, [initialJobData?._id, getJobById]);

  if (loading)
    return (
     <div className="flex flex-col justify-center items-center min-h-[80vh] w-full gap-3">
      <div className="w-10 h-10 border-b border-3 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="font-medium text-purple-600 animate-pulse">
        Loading Job Details...
      </span>
    </div>
    );
  if (!jobDetail) return <div className="p-10 text-center">No Data Found</div>;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow">
        {/* 🔹 Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition"
          >
            <CircleChevronLeft size={28} />
          </button>
          <h2 className="text-lg font-semibold">View Details</h2>
        </div>

        <hr className="border-gray-300 mt-2 mb-5" />

        {/* 🔹 Company Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <img
              src={
                initialJobData?.companyLogo?.[0] ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="logo"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">
                {initialJobData?.employerName || "N/A"}
              </h3>
              <p className="text-sm text-gray-500">
                IT Services and IT Consulting
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-red-500 font-medium">
              {initialJobData?.spamCount || 0} Spam Reports
            </span>
            <span
              className={`flex items-center gap-1 font-medium ${jobDetail.status === "active" ? "text-green-600" : "text-orange-500"}`}
            >
              <CircleCheck size={20} />
              {jobDetail.status
                ? jobDetail.status.charAt(0).toUpperCase() +
                  jobDetail.status.slice(1)
                : "Pending"}
            </span>
          </div>
        </div>

        <hr className="border-gray-300 mt-2 mb-5" />

        {/* 🔹 Job Title */}
        <div className="mb-4 flex flex-col items-start gap-2">
          <h2 className="text-2xl font-bold text-gray-800">
            {jobDetail.jobTitle}
          </h2>
          <div className="flex gap-2">
            <span className="text-xs px-3 py-1 rounded-xl bg-gray-200 text-gray-700 font-medium">
              {jobDetail.jobRole}
            </span>
            <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-xl font-medium">
              {jobDetail.advanceInformation?.jobType}
            </span>
          </div>
        </div>

        {/* 🔹 Contact Info */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6 border-b pb-6">
          <div className="flex items-center gap-2">
            <Link size={16} className="text-blue-400" />
            <span className="hover:text-blue-600 cursor-pointer">
              https://Technokrate.com
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-blue-400" />
            <span>(406) 555-0120</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-blue-400" />
            <span>career@Technokrate.com</span>
          </div>
        </div>

        {/* 🔹 Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Job Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">
                {jobDetail.jobDescription}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">
                Job Responsibilities
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">
                {jobDetail.jobResponsibilities}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {jobDetail.skillsRequired?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 border rounded-lg text-xs text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CARD: Overview */}
          <div className="border border-purple-200 rounded-xl p-5 bg-purple-50/30">
            <h3 className="font-bold text-gray-800 mb-5">Job Overview</h3>

            <div className="grid grid-cols-2 gap-y-6 gap-x-2 text-sm">
              <div className="flex flex-col gap-1 items-start">
                <Calendar size={18} className="text-purple-600 mb-1" />
                <p className="text-gray-500 text-xs uppercase font-semibold">
                  Job Posted
                </p>
                <p className="font-medium">{formatDate(jobDetail.createdAt)}</p>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <Calendar size={18} className="text-purple-600 mb-1" />
                <p className="text-gray-500 text-xs uppercase font-semibold">
                  Job Expire
                </p>
                <p className="font-medium">
                  {formatDate(jobDetail.advanceInformation?.expireDate)}
                </p>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <GraduationCap size={18} className="text-purple-600 mb-1" />
                <p className="text-gray-500 text-xs uppercase font-semibold">
                  Education
                </p>
                <p className="font-medium">
                  {jobDetail.advanceInformation?.education || "N/A"}
                </p>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <Wallet size={18} className="text-purple-600 mb-1" />
                <p className="text-gray-500 text-xs uppercase font-semibold">
                  Salary
                </p>
                <p className="font-medium">
                  ₹{jobDetail.salaryRange?.minSalary} - ₹
                  {jobDetail.salaryRange?.maxSalary}
                </p>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <MapPin size={18} className="text-purple-600 mb-1" />
                <p className="text-gray-500 text-xs uppercase font-semibold">
                  Location
                </p>
                <p className="font-medium capitalize">
                  {/* FIX: Object ko directly render nahi kar sakte, specific field use karein */}
                  {typeof jobDetail.jobLocation === "object"
                    ? jobDetail.jobLocation.name
                    : jobDetail.jobLocation || "N/A"}
                </p>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <Briefcase size={18} className="text-purple-600 mb-1" />
                <p className="text-gray-500 text-xs uppercase font-semibold">
                  Job Type
                </p>
                <p className="font-medium">
                  {jobDetail.advanceInformation?.jobType}
                </p>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <Briefcase size={18} className="text-purple-600 mb-1" />
                <p className="text-gray-500 text-xs uppercase font-semibold">
                  Experience
                </p>
                <p className="font-medium">
                  {jobDetail.advanceInformation?.experience}
                </p>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <Briefcase size={18} className="text-purple-600 mb-1" />
                <p className="text-gray-500 text-xs uppercase font-semibold">
                  Job Level
                </p>
                <p className="font-medium">
                  {jobDetail.advanceInformation?.jobLevel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobViewDetails;
