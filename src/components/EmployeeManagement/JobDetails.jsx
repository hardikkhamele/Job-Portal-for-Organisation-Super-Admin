import React from "react";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Link2,
  Wallet,
CheckCircle,
Camera, Share2, ThumbsUp, Users 
  
} from "lucide-react";

import bannertwo from "../../assets/BannerTwo.svg";

const decodeHtml = (html) => {
  if (!html) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

function JobDetails({ job, onBack }) {
  const { employer } = useSelector((state) => state.employeeDetails);
  
  const getSafeImage = (imgArray, placeholder) => {
    if (!imgArray || imgArray.length === 0) return placeholder;
    const item = imgArray[0];
    return typeof item === "string" ? item : (item?.url || placeholder);
  };

  const logo = getSafeImage(employer?.companyDetail?.companyLogo, bannertwo);
  const website = employer?.companyDetail?.companyWebsite || "#";
  const email = employer?.email || "N/A";
  const phone = employer?.mobileNumber || "N/A";
  const companyName = employer?.name || "N/A";
  const companyIndustry = employer?.businessDetail?.typeOfCompany || "IT Services and IT Consulting";

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">

        {/* CIRCLE BUTTON */}
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 bg-white hover:bg-gray-100"
        >
          <ArrowLeft size={25} />
        </button>

        {/* TEXT */}
        <h2 className="text-3xl font-bold">
          Job Post Information
        </h2>

      </div>

      <hr className="mb-5 border-gray-700 " />

      {/* COMPANY */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-5">

          <img
            src={logo}   
            alt="company logo"
            className="w-18 h-18 rounded-full object-cover shadow-lg bg-gray-50 border border-gray-200"
          />
          <div>
            <h3 className="font-bold text-2xl">
              {companyName}
            </h3>
            <p className="text text-gray-500">
              {companyIndustry}
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center text">
          <span className="text-red-500 font-semibold">
            {job?.spamCount || 0} Spam Reports
          </span>
          <div className="flex items-center gap-1">
            <CheckCircle className={job?.status === "active" ? "text-green-500" : "text-red-500"} size={16} />
            <span className={`${job?.status === "active" ? "text-green-500" : "text-red-500"} font-semibold capitalize`}>
              {job?.status || "Inactive"}
            </span>
          </div>

        </div>
      </div>

      <hr className="mb-3 border-gray-400" />

      {/* TITLE + APPLICATION */}
      <div className="flex justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-5">

            {/* TITLE */}
            <h2 className="text-2xl font-semibold">
              {job?.jobTitle || job?.post}
            </h2>

            {/* BADGE 1 */}
            <span className="bg-gray-200 px-3 py-1 rounded-full text font-semibold">
              {job?.jobType || job?.type || "Classic"}
            </span>

            {/* BADGE 2 */}
            <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text font-semibold">
              {job?.advanceInformation?.jobType || "Full time"}
            </span>

          </div>

          {/* CONTACT ROW */}
          <div className="flex gap-6 text text-gray-600">
            {website !== "#" && (
              <div className="flex items-center gap-2 underline">
                <Link2 size={16} className="text-purple-600" />
                <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Phone size={16} className="text-purple-600" />
              {phone}
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} className="text-purple-600" />
              {email}
            </div>
          </div>
        </div>

        {/* TOTAL APPLICATION */}
        <div className="flex flex-col items-start">

          {/* ICON + TEXT */}
          <div className="flex items-center gap-3 mb-1">
            
            <div className="bg-purple-100 p-2 rounded-full">
              <Users className="text-purple-600" size={18} />
            </div>
          
            <p className="text-gray-500 text">
              Total Applications
            </p>
          
          </div>
          
          {/* NUMBER */}
          <h2 className="text-2xl font-bold">
            {job?.jobApplications?.length || job?.applicationsCount || 0}
          </h2>
          
        </div>
      </div>

      {/* DESCRIPTION + OVERVIEW */}
      <div className="grid grid-cols-2 gap-8">

        {/* LEFT */}
        <div>
          <h3 className="font-semibold mb-3 text-xl">Job Description</h3>
          {job?.jobDescription ? (
            <div
              className="text-gray-600 text leading-6"
              dangerouslySetInnerHTML={{ __html: decodeHtml(job.jobDescription) }}
            />
          ) : (
            <p className="text-gray-500 italic">No description provided.</p>
          )}

          {job?.jobResponsibilities && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3 text-xl">Responsibilities</h3>
              <div
                className="text-gray-600 text leading-6"
                dangerouslySetInnerHTML={{ __html: decodeHtml(job.jobResponsibilities) }}
              />
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="border border-purple-300 rounded-xl p-6 h-fit">
          <h3 className="font-semibold mb-6">Job Overview</h3>

          <div className="grid grid-cols-2 gap-y-8 text-sm">

            {/* ITEM */}
            <div className="flex flex-col items-start gap-2">
              <Calendar className="text-purple-600" size={22} />
              <p className="text-gray-400 text-xs">Job Posted :</p>
              <p className="text-gray-700">
                {job?.createdAt ? new Date(job.createdAt).toLocaleDateString("en-GB") : "N/A"}
              </p>
            </div>

            {/* ITEM */}
            <div className="flex flex-col items-start gap-2">
              <Clock className="text-purple-600" size={22} />
              <p className="text-gray-400 text-xs">Job Expire In :</p>
              <p className="text-gray-700">
                {job?.advanceInformation?.expireDate 
                  ? new Date(job.advanceInformation.expireDate).toLocaleDateString("en-GB") 
                  : "N/A"}
              </p>
            </div>

            {/* ITEM */}
            <div className="flex flex-col items-start gap-2">
              <Briefcase className="text-purple-600" size={22} />
              <p className="text-gray-400 text-xs">Education :</p>
              <p className="text-gray-700">
                {Array.isArray(job?.advanceInformation?.education)
                  ? job.advanceInformation.education.join(", ")
                  : job?.advanceInformation?.education || "N/A"}
              </p>
            </div>

            {/* ITEM */}
            <div className="flex flex-col items-start gap-2">
              <Wallet className="text-purple-600" size={22} />
              <p className="text-gray-400 text-xs">Salary ({job?.salaryType || "N/A"}) :</p>
              <p className="text-gray-700">
                {job?.salaryRange?.minSalary && job?.salaryRange?.maxSalary 
                  ? `₹${job.salaryRange.minSalary.toLocaleString()} - ₹${job.salaryRange.maxSalary.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>

            {/* ITEM */}
            <div className="flex flex-col items-start gap-2">
              <MapPin className="text-purple-600" size={22} />
              <p className="text-gray-400 text-xs">Location :</p>
              <p className="text-gray-700">{job?.jobLocation?.name || "N/A"}</p>
            </div>

            {/* ITEM */}
            <div className="flex flex-col items-start gap-2">
              <Briefcase className="text-purple-600" size={22} />
              <p className="text-gray-400 text-xs">Experience :</p>
              <p className="text-gray-700">{job?.advanceInformation?.experience || "N/A"}</p>
            </div>

          </div>
        </div>
      </div>

      {/* SKILLS & QUALIFICATIONS */}
      {job?.skillsRequired && job.skillsRequired.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="font-semibold mb-3 text-xl">Skills & Qualifications</h3>
          <div className="flex flex-wrap gap-2">
            {job.skillsRequired.map((skill, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetails;