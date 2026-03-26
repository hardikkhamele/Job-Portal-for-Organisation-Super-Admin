// import React, { useState } from "react";
// import { ArrowLeft, CheckCircle, User, ArrowLeftRight, Briefcase, Database } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import technokreatlogo from "../../assets/Technokreat.svg";
// import banner from "../../assets/Banner.svg";
// import bannertwo from "../../assets/BannerTwo.svg";
// import TransactionHistory from "../EmployeeManagement/TransactionHistory";
// import JobInformation from "../EmployeeManagement/JobInformation";
// import CreditHistory  from "../EmployeeManagement/CreditHistory";
// import JobDetails from "../EmployeeManagement/JobDetails";
// import Footer from "../Footer";

// function CompanyDetails() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("company");
//   const [viewJob, setViewJob] = useState(null);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen pb-20">
//       <div className="bg-white rounded-xl p-6 ">



//         {viewJob ? (
//           // SHOW ONLY JOB DETAILS
//           <JobDetails job={viewJob} onBack={() => setViewJob(null)} />
//         ) : (
//           <>


//         {/* HEADER */}
//         <div className="flex items-center gap-3 mb-4 ">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-900 hover:bg-gray-100 transition cursor-pointer"
//           >
//             <ArrowLeft size={25} className="text-gray-1000 cursor-pointer" />
//           </button>

//          {!viewJob && (
//             <>
//               <h2 className="text-3xl font-bold">Company Information</h2>
//               <hr className="mb-8" />
//             </>
//           )}
//         </div>

//         {/* BORDER  */}
//         <div className="border-b border-gray-500 mb-1"></div>

//         {/* COMPANY HEADING */}
//         <div className="flex items-center justify-between rounded-lg px-4 py-3 mb-4">
          
//           {/* LEFT */}
//           <div className="flex items-center gap-5">
//             <div className="w-15 h-15 rounded-full border border-white shadow-sm flex items-center justify-center">
//               <img
//                 src={bannertwo}
//                 alt="logo"
//                 className="w-45 h-45 object-contain"
//               />
//             </div>

//             <div>
//               <p className="font-bold text-gray-800 text-2xl">
//                 Talentrise Technokrate
//               </p>
//               <p className="text text-gray-700">
//                 IT Services and IT Consulting
//               </p>
//             </div>
//           </div>

//           {/* RIGHT STATUS */}
//           <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
//             <CheckCircle size={16} />
//             Active
//           </div>
//         </div>

//         {/* TABS */}
//         <div className="flex items-center gap-10 border-b border-gray-200 mb-6 text">

//           {/* ACTIVE TAB */}
//          <div
//             onClick={() => setActiveTab("company")}
//             className={`flex items-center gap-3 pb-2 cursor-pointer ${
//               activeTab === "company"
//                 ? "text-purple-600 border-b-2 border-purple-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <span className="flex items-center gap-2">
//               <User size={16} />
//               Company Info
//             </span>
//           </div>
        
//                   {/* OTHER TABS */}
//                  <div
//             onClick={() => setActiveTab("transaction")}
//             className={`flex items-center gap-3 pb-2 cursor-pointer ${
//               activeTab === "transaction"
//                 ? "text-purple-600 border-b-2 border-purple-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <span className="flex items-center gap-2">
//             <ArrowLeftRight size={16} />
//             Transaction History
//           </span>
//           </div>
        
//             <div
//             onClick={() => setActiveTab("job")}
//             className={`flex items-center gap-3 pb-2 cursor-pointer ${
//               activeTab === "job"
//                 ? "text-purple-600 border-b-2 border-purple-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <span className="flex items-center gap-2">
//               <Briefcase size={16} />
//               Job Information
//             </span>
//           </div>
        
//                   <div
//             onClick={() => setActiveTab("credit")}
//             className={`flex items-center gap-3 pb-2 cursor-pointer ${
//               activeTab === "credit"
//                 ? "text-purple-600 border-b-2 border-purple-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <span className="flex items-center gap-2">
//               <Database
//                 size={16}
//                 className={activeTab === "credit" ? "text-purple-600" : "text-gray-500"}
//               />
//               Credit History
//             </span>
//           </div>
        
//         </div>

//          {/*  COMPANY TAB */}
//         {activeTab === "company" && (
//           <>

//         {/* BANNER + PROFILE */}
//         <div className="relative mb-10">

//           {/* BANNER */}
//           <div className="rounded-lg overflow-hidden">
//             <img
//               src={banner}
//               alt="banner"
//               className="w-full h-[270px] object-cover"
//             />
//           </div>

//           {/* LOGO (OVERLAPPING) */}
//           <div className="absolute -bottom-28 left-0.1 w-66 h-66 rounded-full  bg-white flex items-center justify-center shadow-md">
//             <img
//               src={bannertwo}
//               alt="logo"
//               className="w-90 h-90 object-contain"
//             />
//           </div>

//         </div>

//         {/* DETAILS SECTION */}
//         <div className="flex justify-between items-start mt-30 px-2">

//           {/* LEFT TEXT */}
//           <div>
//             <h3 className="text-3xl font-bold mb-1">
//               Talentrise Technokrate
//             </h3>

//             <p className="text-gray-800 mb-1 text-xl">
//               One Step towards the future
//             </p>

//             <p className="text-gray-800 mb-4">
//               IT Services and IT Consulting
//             </p>

//             <h4 className="font-semibold mb-2 text-xl">About Us</h4>

//             <p className="text text-gray-700 max-w-3xl leading-6">
//               Let me start by saying we are passionate about providing quality solutions.
//               We have a team of QC professionals who quality check every deliverable
//               before it goes out to our clients. I would like to work with you, please
//               consider once we will not disappoint you.
//             </p><br />

//            <p className="text text-gray-700 max-w-3xl leading-6">
//                 Talentrise Technokrate Pvt Ltd is a fast-growing IT service provider in the field of Custom Web Application Development and Mobile App Development.
//               </p><br />

//               <p className="text text-gray-700 max-w-3xl leading-6">
//                 <span className="font-medium">99% Success Rate</span><br />
//                 Over 756+ Jobs completed Successfully
//               </p>


//               {/* VISION */}
//             <div className="mt-5">
//               <h4 className="font-semibold mb-2 text-xl">Vision</h4>

//               <p className="text text-gray-700 max-w-3xl leading-6">
//                 Our Javascript Expertise – Angular | React JS |<br />
//                 Our Mobile App Expertise (Hybrid) – Ionic Framework | Flutter<br />
//                 Our PHP Expertise – Laravel | CodeIgniter | CakePHP | Yii<br />
//                 Our CMS Expertise – Magento | Joomla | Drupal | WordPress<br />
//                 Our Mobile App Expertise (Native) – Android | Swift (iOS Development)<br />
//                 Our Backend Expertise – SpringBoot | NodeJS | Django | ASP.NET<br />
//                 Our Database Expertise – MySQL, MS SQL, PostgreSQL, MongoDB, NoSQL<br />
//                 Our frontend Expertise – Adobe Photoshop | CorelDraw | HTML | HTML5 | Dreamweaver | Bootstrap | AJAX | JavaScript | jQuery Mobile | Responsive Designs<br />
//                 Javascript Build Tools – Gulp/Bower/NPM Node | webpack<br />
//                 Our Digital Marketing Expertise – SEO | SMM | SMO | SEM | E-Mail.
//               </p>

//               {/* POINTS */}
//               <div className="mt-4 space-y-4 text text-gray-800 leading-6">

//                 <div>
//                   <p className="font-medium text text-gray-800">1. Dedicated Teams</p>
//                   <p className="text text-gray-700">
//                     Each Project is assigned to a Dedicated Team of professional web designers and web developers according to the required level of expertise as per project needs. The Team works in an extremely methodical and streamlined approach which helps us in delivering you what exactly you need.
//                   </p>
//                 </div>

//                 <div>
//                   <p className="font-medium text text-gray-800">2. Methodical Development Process</p>
//                   <p className="text text-gray-700">
//                     A Project Manager, who is technically equipped and has strong communication skills, is assigned to every single project, to take care of the Project as well as be your point of contact from the beginning till end. Our Company has its own Online Project Management System which helps you keep track of your project just at any point of time you need. So you are never left to wonder about the status of your project or whom to get in touch with for your needs.
//                   </p>
//                 </div>

//               </div>

//                 {/* CONTACT DETAILS */}
//                 <div className="mt-6">

//                   {/* PHONE */}
//                   <div className="mb-4">
//                     <h4 className="font-semibold mb-1 text-xl">Phone</h4>
//                     <p className="text text-black-600 underline cursor-pointer">
//                       +91 8956992803
//                     </p>
//                   </div>

//                   {/* WEBSITE */}
//                   <div className="mb-4">
//                     <h4 className="font-semibold mb-1 text-xl">Website</h4>
//                     <a
//                       href="https://www.talentrisetechnokrate.com/020"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text text-black-600 underline"
//                     >
//                       https://www.talentrisetechnokrate.com/020
//                     </a>
//                   </div>

//                   {/* LOCATION */}
//                   <div className="mb-4">
//                     <h4 className="font-semibold mb-1 text-xl">Location</h4>
//                     <p className="text text-gray-600">India</p>
//                   </div>

//                   {/* SOCIAL MEDIA */}
//                   <div>
//                     <h4 className="font-semibold mb-1 text-xl">Social Media</h4>
//                     <div className="text text-black-600 space-y-1">
//                       <p className="underline cursor-pointer">https://facebook.com</p>
//                       <p className="underline cursor-pointer">https://twitter.com</p>
//                       <p className="underline cursor-pointer">https://instagram.com</p>
//                       <p className="underline cursor-pointer">https://youtube.com</p>
//                     </div>
//                   </div>

//                 </div>

//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="text-gray-700 text-xl mt-2 whitespace-nowrap">
//             51–200 Employees
//           </div>
            
//                 </div>
//             </> 
//         )}


//      {/* Transaction history */}
//        {activeTab === "transaction" && <TransactionHistory />}

//        {/* Job information */}
//        {activeTab === "job" && <JobInformation setViewJob={setViewJob} />}

//        {activeTab === "credit" && <CreditHistory />}

//         </>
//       )}

//      </div>
//      <Footer/>
//     </div>
//   );
// }

// export default CompanyDetails;








import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, User, ArrowLeftRight, Briefcase, Database, XCircle, Globe, Phone, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import bannerPlaceholder from "../../assets/Banner.svg";
import bannerTwoPlaceholder from "../../assets/BannerTwo.svg";
import TransactionHistory from "../EmployeeManagement/TransactionHistory";
import JobInformation from "../EmployeeManagement/JobInformation";
import CreditHistory from "../EmployeeManagement/CreditHistory";
import JobDetails from "../EmployeeManagement/JobDetails";
import Footer from "../Footer";
import useGetEmployeeDetails from "../../hooks/employee/useGetEmployeeDetails";

function CompanyDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const employerId = location.state?.employer?._id;

  const [activeTab, setActiveTab] = useState("company");
  const [viewJob, setViewJob] = useState(null);

  const { getDetails, details, loading } = useGetEmployeeDetails();

  useEffect(() => {
    if (employerId) {
      getDetails(employerId);
    }
  }, [employerId, getDetails]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-purple-600 font-medium">Fetching Details...</p>
        </div>
      </div>
    );
  }

  const companyData = details || {};
  const { 
    companyDetail = {}, 
    businessDetail = {}, 
    verificationAndDocumentation = {} 
  } = companyData;

  // Helper function to prevent "Objects as child" error
  const renderSafeText = (text, fallback = "N/A") => {
    if (typeof text === "object" && text !== null) {
      // Agar object hai toh uski koi property dikhao ya empty string
      return text.name || text.city || fallback; 
    }
    return text || fallback;
  };

  const logoUrl = Array.isArray(companyDetail.companyLogo) ? companyDetail.companyLogo[0] : bannerTwoPlaceholder;
  const bannerUrl = Array.isArray(companyDetail.companyBanner) ? companyDetail.companyBanner[0] : bannerPlaceholder;

  return (
    <div className="p-6 bg-gray-100 min-h-screen pb-20">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        {viewJob ? (
          <JobDetails job={viewJob} onBack={() => setViewJob(null)} />
        ) : (
          <>
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
              >
                <ArrowLeft size={25} className="text-gray-800" />
              </button>
              <h2 className="text-3xl font-bold text-gray-800">Company Information</h2>
            </div>

            <div className="border-b border-gray-200 mb-5"></div>

            {/* TOP SUMMARY */}
            <div className="flex items-center justify-between px-4 py-3 mb-4">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full border bg-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src={logoUrl || bannerTwoPlaceholder} alt="logo" className="w-full h-full object-contain p-1" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-2xl">{renderSafeText(companyData.name)}</p>
                  <p className="text-gray-600">{renderSafeText(businessDetail.typeOfCompany, "IT Services")}</p>
                </div>
              </div>

              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${companyData.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {companyData.status === 'active' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {companyData.status === 'active' ? "Active" : "Blocked"}
              </div>
            </div>

            {/* TABS NAVIGATION */}
            <div className="flex items-center gap-10 border-b border-gray-200 mb-6">
              {["company", "transaction", "job", "credit"].map((id) => (
                <div
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`capitalize pb-3 cursor-pointer transition-all ${
                    activeTab === id ? "text-purple-600 border-b-2 border-purple-600 font-semibold" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {id} Info
                </div>
              ))}
            </div>

            {/* COMPANY TAB CONTENT */}
            {activeTab === "company" && (
              <div className="animate-in fade-in duration-500">
                <div className="relative mb-24">
                  <div className="rounded-xl overflow-hidden shadow-sm h-[270px]">
                    <img src={bannerUrl || bannerPlaceholder} alt="banner" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-20 left-6 w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-white overflow-hidden">
                    <img src={logoUrl || bannerTwoPlaceholder} alt="logo" className="w-full h-full object-contain p-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-2 mt-10">
                  <div className="lg:col-span-2">
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{renderSafeText(companyData.name)}</h3>
                    <p className="text-purple-600 font-medium text-lg mb-2 italic">
                      "{renderSafeText(companyDetail.companyTagline, "No tagline provided")}"
                    </p>
                    
                    <h4 className="font-semibold text-xl text-gray-800 mt-6 mb-2 border-l-4 border-purple-500 pl-3">About Company</h4>
                    <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                      {renderSafeText(businessDetail.aboutCompany, "No description available.")}
                    </p>

                    <h4 className="font-semibold text-xl text-gray-800 mt-8 mb-4 border-l-4 border-purple-500 pl-3">Legal Information</h4>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">Legal Name</p>
                        <p className="font-medium">{renderSafeText(verificationAndDocumentation.companyLegalName)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">GST Number</p>
                        <p className="font-medium">{renderSafeText(verificationAndDocumentation.GSTNumber)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="bg-gray-50 p-6 rounded-xl h-fit space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-1"><Phone size={18}/> Contact</h4>
                      <p className="text-gray-700">{renderSafeText(companyData.mobileNumber)}</p>
                      <p className="text-gray-600 text-sm">{renderSafeText(companyData.email)}</p>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-1"><Globe size={18}/> Website</h4>
                      <p className="text-blue-600 break-all">{renderSafeText(companyDetail.companyWebsite)}</p>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-1"><MapPin size={18}/> Location</h4>
                      <p className="text-gray-700">{renderSafeText(companyDetail.location)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== "company" && (
                <div className="p-10 text-center text-gray-400">
                    Component for {activeTab} will load here with ID: {employerId}
                </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CompanyDetails;