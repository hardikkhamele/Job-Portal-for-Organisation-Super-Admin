import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
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

function JobViewDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state;

  if (!job) return <div>No Data Found</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow">
        {/* 🔹 Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full"
          >
            <CircleChevronLeft size={28} />
          </button>
          <h2 className="text-lg font-semibold">View Details</h2>
        </div>

        <hr className="border-gray-300 mt-2 mb-5" />

        {/* 🔹 Company Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <img src={job.logo} alt="logo" />
            <div>
              <h3 className="font-semibold text-lg">
                Talentrise {job.employer}
              </h3>
              <p className="text-sm text-gray-500">
                IT Services and IT Consulting
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-red-500">1858 Spam Reports</span>
            <span className="text-green-600 flex items-center gap-1">
              <CircleCheck size={20} />
              Active
            </span>
          </div>
        </div>

        <hr className="border-gray-300 mt-2 mb-5" />

        {/* 🔹 Job Title */}
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-xl font-semibold">{job.job}</h2>
          <div className="flex gap-2 mt-2">
            <span className="text-xs px-3 py-1 rounded-xl bg-[rgba(211,211,211,1)] text-gray-700">
              Classic
            </span>
            <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1  rounded-xl">
              Full time
            </span>
          </div>
        </div>

        {/* 🔹 Contact Info */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">

  {/* Website */}
  <a
    href="https://technokrate.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 hover:text-blue-600"
  >
    <Link size={16} className="text-blue-400" />
    https://Technokrate.com
  </a>

  {/* Phone */}
  <a
    href="tel:4065550120"
    className="flex items-center gap-2 hover:text-blue-600"
  >
    <Phone size={16} className="text-blue-400" />
    (406) 555-0120
  </a>

  {/* Email */}
  <a
    href="mailto:career@technokrate.com"
    className="flex items-center gap-2 hover:text-blue-600"
  >
    <Mail size={16} className="text-blue-400" />
    career@Technokrate.com
  </a>

</div>

        {/* 🔹 Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-2">Job Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              As a Senior UI/UX Designer, you will craft intuitive and visually
              compelling designs that elevate user experiences. Collaborating
              closely with product managers and developers, you'll lead the
              end-to-end design process, including research, wire framing,
              prototyping, and high-fidelity visuals. You possess a deep
              understanding of design principles, user psychology, and industry
              trends. With exceptional proficiency in Figma and similar tools,
              you ensure designs are both innovative and practical. Your
              expertise in solving complex problems and delivering pixel-perfect
              designs will play a critical role in shaping our digital products
              and achieving business goals.
              <br />
              <br />
              As a Senior UI/UX Designer, you’ll create seamless designs
              tailored to user needs. You will oversee every design stage—from
              research and wireframes to interactive prototypes and final
              visuals. With expertise in user-centric design, tools like Figma,
              and cross-functional collaboration, you’ll craft experiences that
              balance innovation, functionality, and business goals.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="border border-[rgba(220,189,237,1)] rounded-xl p-4">
            <h3 className="font-semibold mb-4">Job Overview</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col gap-2 items-start">
                <Calendar size={16} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Job Posted</p>
                  <p>Jan 7, 2026</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-start">
                <Calendar size={16} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Job Expire</p>
                  <p>Feb 7, 2026</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-start">
                <GraduationCap size={16} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Education</p>
                  <p>Graduation</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-start">
                <Wallet size={16} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Salary</p>
                  <p>{job.salary}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-start">
                <MapPin size={16} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Location</p>
                  <p>{job.location}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-start">
                <Briefcase size={16} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Job Type</p>
                  <p>Full Time</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-start">
                <Briefcase size={16} className="text-purple-600" />
                <div>
                  <p className="text-gray-500">Experience</p>
                  <p>4–5 Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobViewDetails;