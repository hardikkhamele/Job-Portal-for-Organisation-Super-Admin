import React, { useState } from "react";
import { ArrowLeft, CheckCircle, User, ArrowLeftRight, Briefcase, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import technokreatlogo from "../../assets/Technokreat.svg";
import banner from "../../assets/Banner.svg";
import bannertwo from "../../assets/BannerTwo.svg";
import TransactionHistory from "../EmployeeManagement/TransactionHistory";

function CompanyDetails() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("company");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl p-6 shadow-sm">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-900 hover:bg-gray-100 transition"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Company Information
          </h2>
        </div>

        {/* BORDER  */}
        <div className="border-b border-gray-500 mb-1"></div>

        {/* COMPANY HEADING */}
        <div className="flex items-center justify-between rounded-lg px-4 py-3 mb-4">
          
          {/* LEFT */}
          <div className="flex items-center gap-5">
            <div className="w-15 h-15 rounded-full border border-white shadow-sm flex items-center justify-center">
              <img
                src={bannertwo}
                alt="logo"
                className="w-45 h-45 object-contain"
              />
            </div>

            <div>
              <p className="font-bold text-gray-800 text-3xl">
                Talentrise Technokrate
              </p>
              <p className="text text-gray-700">
                IT Services and IT Consulting
              </p>
            </div>
          </div>

          {/* RIGHT STATUS */}
          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <CheckCircle size={16} />
            Active
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-10 border-b border-gray-200 mb-6 text">

          {/* ACTIVE TAB */}
         <div
            onClick={() => setActiveTab("company")}
            className={`flex items-center gap-3 pb-2 cursor-pointer ${
              activeTab === "company"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>Company Info</span>
          </div>
        
                  {/* OTHER TABS */}
                 <div
            onClick={() => setActiveTab("transaction")}
            className={`flex items-center gap-3 pb-2 cursor-pointer ${
              activeTab === "transaction"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>Transaction History</span>
          </div>
        
                   <div
            onClick={() => setActiveTab("job")}
            className={`flex items-center gap-3 pb-2 cursor-pointer ${
              activeTab === "job"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>Job Information</span>
          </div>
        
                  <div
            onClick={() => setActiveTab("credit")}
            className={`flex items-center gap-3 pb-2 cursor-pointer ${
              activeTab === "credit"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>Credit History</span>
          </div>
        
        </div>

         {/*  COMPANY TAB */}
        {activeTab === "company" && (
          <>

        {/* BANNER + PROFILE */}
        <div className="relative mb-10">

          {/* BANNER */}
          <div className="rounded-lg overflow-hidden">
            <img
              src={banner}
              alt="banner"
              className="w-full h-[270px] object-cover"
            />
          </div>

          {/* LOGO (OVERLAPPING) */}
          <div className="absolute -bottom-28 left-0.1 w-66 h-66 rounded-full  bg-white flex items-center justify-center shadow-md">
            <img
              src={bannertwo}
              alt="logo"
              className="w-90 h-90 object-contain"
            />
          </div>

        </div>

        {/* DETAILS SECTION */}
        <div className="flex justify-between items-start mt-30 px-2">

          {/* LEFT TEXT */}
          <div>
            <h3 className="text-3xl font-bold mb-1">
              Talentrise Technokrate
            </h3>

            <p className="text-gray-800 mb-1 text-xl">
              One Step towards the future
            </p>

            <p className="text-gray-800 mb-4">
              IT Services and IT Consulting
            </p>

            <h4 className="font-semibold mb-2 text-xl">About Us</h4>

            <p className="text text-gray-700 max-w-3xl leading-6">
              Let me start by saying we are passionate about providing quality solutions.
              We have a team of QC professionals who quality check every deliverable
              before it goes out to our clients. I would like to work with you, please
              consider once we will not disappoint you.
            </p><br />

           <p className="text text-gray-700 max-w-3xl leading-6">
                Talentrise Technokrate Pvt Ltd is a fast-growing IT service provider in the field of Custom Web Application Development and Mobile App Development.
              </p><br />

              <p className="text text-gray-700 max-w-3xl leading-6">
                <span className="font-medium">99% Success Rate</span><br />
                Over 756+ Jobs completed Successfully
              </p>


              {/* VISION */}
            <div className="mt-5">
              <h4 className="font-semibold mb-2 text-xl">Vision</h4>

              <p className="text text-gray-700 max-w-3xl leading-6">
                Our Javascript Expertise – Angular | React JS |<br />
                Our Mobile App Expertise (Hybrid) – Ionic Framework | Flutter<br />
                Our PHP Expertise – Laravel | CodeIgniter | CakePHP | Yii<br />
                Our CMS Expertise – Magento | Joomla | Drupal | WordPress<br />
                Our Mobile App Expertise (Native) – Android | Swift (iOS Development)<br />
                Our Backend Expertise – SpringBoot | NodeJS | Django | ASP.NET<br />
                Our Database Expertise – MySQL, MS SQL, PostgreSQL, MongoDB, NoSQL<br />
                Our frontend Expertise – Adobe Photoshop | CorelDraw | HTML | HTML5 | Dreamweaver | Bootstrap | AJAX | JavaScript | jQuery Mobile | Responsive Designs<br />
                Javascript Build Tools – Gulp/Bower/NPM Node | webpack<br />
                Our Digital Marketing Expertise – SEO | SMM | SMO | SEM | E-Mail.
              </p>

              {/* POINTS */}
              <div className="mt-4 space-y-4 text text-gray-800 leading-6">

                <div>
                  <p className="font-medium text text-gray-800">1. Dedicated Teams</p>
                  <p className="text text-gray-700">
                    Each Project is assigned to a Dedicated Team of professional web designers and web developers according to the required level of expertise as per project needs. The Team works in an extremely methodical and streamlined approach which helps us in delivering you what exactly you need.
                  </p>
                </div>

                <div>
                  <p className="font-medium text text-gray-800">2. Methodical Development Process</p>
                  <p className="text text-gray-700">
                    A Project Manager, who is technically equipped and has strong communication skills, is assigned to every single project, to take care of the Project as well as be your point of contact from the beginning till end. Our Company has its own Online Project Management System which helps you keep track of your project just at any point of time you need. So you are never left to wonder about the status of your project or whom to get in touch with for your needs.
                  </p>
                </div>

              </div>

                {/* CONTACT DETAILS */}
                <div className="mt-6">

                  {/* PHONE */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-1 text-xl">Phone</h4>
                    <p className="text text-black-600 underline cursor-pointer">
                      +91 8956992803
                    </p>
                  </div>

                  {/* WEBSITE */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-1 text-xl">Website</h4>
                    <a
                      href="https://www.talentrisetechnokrate.com/020"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text text-black-600 underline"
                    >
                      https://www.talentrisetechnokrate.com/020
                    </a>
                  </div>

                  {/* LOCATION */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-1 text-xl">Location</h4>
                    <p className="text text-gray-600">India</p>
                  </div>

                  {/* SOCIAL MEDIA */}
                  <div>
                    <h4 className="font-semibold mb-1 text-xl">Social Media</h4>
                    <div className="text text-black-600 space-y-1">
                      <p className="underline cursor-pointer">https://facebook.com</p>
                      <p className="underline cursor-pointer">https://twitter.com</p>
                      <p className="underline cursor-pointer">https://instagram.com</p>
                      <p className="underline cursor-pointer">https://youtube.com</p>
                    </div>
                  </div>

                </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="text-gray-700 text-xl mt-2 whitespace-nowrap">
            51–200 Employees
          </div>
            
                </div>
            </> 
        )}


     {/* Transaction history */}
       {activeTab === "transaction" && <TransactionHistory />}

     </div>
    </div>
  );
}

export default CompanyDetails;