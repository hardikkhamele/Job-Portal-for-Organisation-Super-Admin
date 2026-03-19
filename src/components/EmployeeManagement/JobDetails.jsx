import React from "react";
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

function JobDetails({ job, onBack }) {
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
            src={bannertwo}   
            alt="company logo"
            className="w-18 h-18 rounded-full object-cover shadow-lg"
          />
          <div>
            <h3 className="font-bold text-2xl">
              Talentrise Technokrate
            </h3>
            <p className="text text-gray-500">
              IT Services and IT Consulting
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center text">
          <span className="text-red-500 font-semibold">
            1858 Spam Reports
          </span>
          <div className="flex items-center gap-1">
            <CheckCircle className="text-green-500" size={16} />
            <span className="text-green-500 font-semibold">Active</span>
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
              {job?.post}
            </h2>

            {/* BADGE 1 */}
            <span className="bg-gray-200 px-3 py-1 rounded-full text font-semibold">
              {job?.type}
            </span>

            {/* BADGE 2 */}
            <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text font-semibold">
              Full time
            </span>

          </div>

          {/* CONTACT ROW */}
          <div className="flex gap-6 text text-gray-600">
            <div className="flex items-center gap-2 underline">
              <Link2 size={16} className="text-purple-600" />
              https://Technokrate.com
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} className="text-purple-600" />
              (406) 555-0120
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} className="text-purple-600" />
              career@Technokrate.com
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
            18,578
          </h2>
          
        </div>
      </div>

      {/* DESCRIPTION + OVERVIEW */}
      <div className="grid grid-cols-2 gap-8">

        {/* LEFT */}
        <div>
          <h3 className="font-semibold mb-3 text-xl">Job Description</h3>

          <p className="text-gray-600 text leading-6">
            As a Senior UI/UX Designer, you will craft intuitive and visually compelling designs that elevate user experiences. Collaborating closely with product managers and developers, you’ll lead the end-to-end design process, including research, wireframing, prototyping, and high-fidelity visuals. 
            You possess a deep understanding of design principles, user psychology, and industry trends. 
            With exceptional proficiency in Figma and similar tools, you ensure designs are both innovative and practical. 
            Your expertise in solving complex problems and delivering pixel-perfect designs will play a critical role in shaping our digital products and achieving business goals.
          </p>

          <p className="text-gray-600 text leading-6 mt-4">
            As a Senior UI/UX Designer, you’ll create seamless designs tailored to user needs. 
            You will oversee every design stage—from research and wireframes to interactive prototypes and final visuals. 
            With expertise in user-centric design, tools like Figma, and cross-functional collaboration, you’ll craft experiences that balance innovation, functionality, and business goals.
          </p>
        </div>

        {/* RIGHT */}
        <div className="border border-purple-300 rounded-xl p-6">
        <h3 className="font-semibold mb-6">Job Overview</h3>

        <div className="grid grid-cols-3 gap-y-8 text-sm">

          {/* ITEM */}
          <div className="flex flex-col items-start gap-2">
            <Calendar className="text-purple-600" size={22} />
            <p className="text-gray-400 text-xs">Job Posted :</p>
            <p className="text-gray-700">Jan 7, 2026 19:28</p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-start gap-2">
            <Clock className="text-purple-600" size={22} />
            <p className="text-gray-400 text-xs">Job Expire In :</p>
            <p className="text-gray-700">Feb 12, 2026 19:28</p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-start gap-2">
            <Briefcase className="text-purple-600" size={22} />
            <p className="text-gray-400 text-xs">Education :</p>
            <p className="text-gray-700">Graduation</p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-start gap-2">
            <Wallet className="text-purple-600" size={22} />
            <p className="text-gray-400 text-xs">Salary :</p>
            <p className="text-gray-700">₹45k–₹50k/month</p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-start gap-2">
            <MapPin className="text-purple-600" size={22} />
            <p className="text-gray-400 text-xs">Location :</p>
            <p className="text-gray-700">India</p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-start gap-2">
            <Briefcase className="text-purple-600" size={22} />
            <p className="text-gray-400 text-xs">Job Type :</p>
            <p className="text-gray-700">Full Time</p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-start gap-2">
            <Briefcase className="text-purple-600" size={22} />
            <p className="text-gray-400 text-xs">Experience :</p>
            <p className="text-gray-700">4–5 Years</p>
          </div>

        </div>
      </div>


              <div className="mt-1 space-y-8">

        {/* RESPONSIBILITIES */}
        <div>
          <h3 className="font-semibold mb-3 text">
            Responsibilities & Description
          </h3>

          <ul className="list-disc pl-5 space-y-3 text-gray-600 text leading-6">
            <li>Conduct user research to identify pain points and opportunities.</li>
            <li>Create wireframes, prototypes, and user flows that enhance experiences.</li>
            <li>Collaborate with developers to ensure design feasibility and implementation.</li>
            <li>Iterate designs based on feedback and usability testing.</li>
            <li>Maintain design consistency while innovating with new approaches.</li>
            <li>Design for accessibility and inclusivity to meet diverse user needs.</li>
            <li>Document design processes and maintain a component library.</li>
            <li>Stay updated with industry trends and best practices.</li>
            <li>Present design concepts and justify decisions to stakeholders.</li>
          </ul>
        </div>

        {/* SKILLS */}
        <div>
          <h3 className="font-semibold mb-3 text">
            Skills & Qualifications
          </h3>

          <ul className="list-disc pl-5 space-y-3 text-gray-600 text leading-6">
            <li>Bachelor’s degree in UX Design, Interaction Design, or related field.</li>
            <li>5+ years of experience in UX design, preferably in mobile applications.</li>
            <li>Proficiency in design tools like Figma, Sketch, or Adobe XD.</li>
            <li>Strong understanding of user-centered design principles and methodologies.</li>
            <li>Excellent communication and presentation skills.</li>
            <li>Ability to manage multiple projects and meet deadlines.</li>
          </ul>
        </div>
        </div>
      </div>

      {/* SALARY + SHARE */}
<div className="mt-10">

  {/* SALARY */}
  <div className="mb-6">
    <h3 className="font-semibold mb-2">Salary Range</h3>
    <p className="text-gray-600 text">
      ₹6,00,000 per annum (₹50,000 per month)
    </p>
  </div>

  {/* SHARE */}
  <div className="flex items-center gap-3">
    <p className="text mb-2">Share this job:</p>

    <div className="flex gap-3">
      
      {/* Facebook */}
      <button className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200">
        <ThumbsUp className="text-purple-600 font-bold">f</ThumbsUp>
      </button>

      {/* Twitter */}
      <button className="w-9 h-9 flex items-center justify-center rounded-md bg-purple-200 hover:bg-purple-300">
        <Share2 className="text-white font-bold">t</Share2>
      </button>

      {/* Instagram */}
      <button className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200">
        <Camera className="text-purple-600 font-bold">📷</Camera>
      </button>

    </div>
  </div>

  </div>
</div>
  );
}

export default JobDetails;