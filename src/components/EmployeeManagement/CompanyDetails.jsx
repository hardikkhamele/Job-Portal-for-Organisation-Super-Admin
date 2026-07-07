import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, User, ArrowLeftRight, Briefcase, Database, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import bannerPlaceholder from "../../assets/Banner.svg";
import logoPlaceholder from "../../assets/BannerTwo.svg";
import TransactionHistory from "../EmployeeManagement/TransactionHistory";
import JobInformation from "../EmployeeManagement/JobInformation";
import CreditHistory from "../EmployeeManagement/CreditHistory";
import JobDetails from "../EmployeeManagement/JobDetails";
import Footer from "../Footer";
import { fetchEmployerById, clearEmployerDetails } from "../../redux/slice/employer/getEmployeeById";

function CompanyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { employer, loading } = useSelector((state) => state.employeeDetails);
  const [activeTab, setActiveTab] = useState("company");
  const [viewJob, setViewJob] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployerById(id));
    }
    return () => dispatch(clearEmployerDetails());
  }, [dispatch, id]);

  if (loading) {
    return <div className="p-10 text-center font-bold text-purple-600 animate-pulse">Loading Company Details...</div>;
  }

  if (!employer) {
    return <div className="p-10 text-center text-gray-500">Company information not found.</div>;
  }

  const companyInfo = employer.companyDetail || {};
  const businessInfo = employer.businessDetail || {};
  const hiringPref = employer.hiringPreference || {};

  const getSafeImage = (imgArray, placeholder) => {
    if (!imgArray || imgArray.length === 0) return placeholder;
    const item = imgArray[0];
    return typeof item === "string" ? item : (item?.url || placeholder);
  };

  const logo = getSafeImage(companyInfo.companyLogo, logoPlaceholder);
  const banner = getSafeImage(companyInfo.companyBanner, bannerPlaceholder);

  const locationStr = [
    companyInfo.location?.area,
    companyInfo.location?.cityName || companyInfo.location?.city,
    companyInfo.location?.state,
    companyInfo.location?.stateCode
  ].filter(Boolean).join(", ") || hiringPref.jobLocation?.name || "N/A";

  return (
    <div className="p-6 bg-gray-100 min-h-screen pb-20">
      <div className="bg-white rounded-xl p-6 shadow-sm max-w-full mx-auto">
        {viewJob ? (
          <JobDetails job={viewJob} onBack={() => setViewJob(null)} />
        ) : (
          <>
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-900 hover:bg-gray-100 transition cursor-pointer"
              >
                <ArrowLeft size={25} className="text-gray-900" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800">Company Information</h2>
            </div>

            <div className="border-b border-gray-200 mb-4"></div>

            {/* TOP BAR: NAME & STATUS */}
            <div className="flex items-center justify-between px-2 mb-6">
              <div>
                <p className="font-bold text-gray-800 text-2xl">{employer.name || "N/A"}</p>
                <p className="text-gray-600 text-lg">{businessInfo.typeOfCompany || "N/A"}</p>
              </div>

              <div className={`flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full ${
                employer.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {employer.status === 'active' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                <span className="capitalize">{employer.status}</span>
              </div>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-10 border-b border-gray-200 mb-8">
              {[
                { id: "company", label: "Company Info", icon: <User size={16} /> },
                { id: "transaction", label: "Transaction History", icon: <ArrowLeftRight size={16} /> },
                { id: "job", label: "Job Information", icon: <Briefcase size={16} /> },
                { id: "credit", label: "Credit History", icon: <Database size={16} /> },
              ].map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-3 cursor-pointer transition-all font-semibold ${
                    activeTab === tab.id ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </div>
              ))}
            </div>

            {/* COMPANY TAB CONTENT */}
            {activeTab === "company" && (
              <>
                {/* BANNER & ROUNDED LOGO */}
                <div className="relative mb-10">
                  <div className="rounded-xl overflow-hidden shadow-sm h-[270px] bg-gray-200">
                    <img src={banner} alt="company banner" className="w-full h-full object-cover" />
                  </div>
                  {/* ROUNDED LOGO OVERLAY */}
                  <div className="absolute -bottom-20 left-10 w-44 h-44 rounded-full bg-white flex items-center justify-center shadow-xl overflow-hidden border-4 border-white">
                    <img src={logo} alt="logo overlay" className="w-full h-full object-contain p-2" />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-start mt-24 px-4 gap-10">
                  <div className="flex-1 max-w-4xl">
                    <h3 className="text-4xl font-black text-gray-900 mb-1">{employer.name}</h3>
                    <p className="text-purple-600 mb-2 text-xl font-bold italic">
                      {companyInfo.companyTagline || "No Tagline provided"}
                    </p>
                    <p className="text-gray-500 mb-6 font-medium">
                      {businessInfo.typeOfCompany} • Founded in {businessInfo.fundedIn || "N/A"}
                    </p>

                    <h4 className="font-bold mb-3 text-2xl text-gray-800">About Us</h4>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-2xl italic border border-gray-100 shadow-sm whitespace-pre-line">
                      {businessInfo.aboutCompany || companyInfo.jobDescription || "No description available."}
                    </p>

                    {/* DETAILS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-400 uppercase text-xs tracking-widest">Phone</h4>
                        <p className="text-blue-600 font-bold text-lg">{employer.mobileNumber || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-400 uppercase text-xs tracking-widest">Website</h4>
                        <a href={companyInfo.companyWebsite} target="_blank" rel="noreferrer" className="text-blue-600 font-bold text-lg hover:underline">
                          {companyInfo.companyWebsite || "N/A"}
                        </a>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-400 uppercase text-xs tracking-widest">Location</h4>
                        <p className="text-gray-800 font-bold text-lg">{locationStr}</p>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-400 uppercase text-xs tracking-widest">Company Email</h4>
                        <p className="text-gray-800 font-bold text-lg">{employer.email || "N/A"}</p>
                      </div>
                      <div className="col-span-full space-y-1">
                        <h4 className="font-bold text-gray-400 uppercase text-xs tracking-widest">Social Presence</h4>
                        <div className="flex gap-4 mt-1">
                           {employer.socialMediaLinks?.linkedin && (
                             <a href={employer.socialMediaLinks.linkedin} target="_blank" className="text-blue-700 font-bold hover:underline">LinkedIn</a>
                           )}
                           {employer.socialMediaLinks?.twitter && (
                             <a href={employer.socialMediaLinks.twitter} target="_blank" className="text-sky-500 font-bold hover:underline">Twitter/X</a>
                           )}
                           {!employer.socialMediaLinks?.linkedin && !employer.socialMediaLinks?.twitter && <p className="text-gray-400 italic">No links available</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SIDE STATS CARD */}
                  <div className="w-full lg:w-auto min-w-[200px]">
                    <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 text-center shadow-sm">
                      <p className="text-purple-700 font-black text-xl">{businessInfo.companySize || "0"}</p>
                      <p className="text-purple-500 font-bold  text-sm tracking-tighter mt-1">Employees</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* OTHER TABS CONTENT */}
            {activeTab === "transaction" && <TransactionHistory employerId={id} employer={employer} />}
            {activeTab === "job" && <JobInformation setViewJob={setViewJob} employerId={id} jobs={employer.jobs} />}
            {activeTab === "credit" && <CreditHistory employerId={id} employer={employer} />}
          </>
        )}
      </div>


      {/* JOBS TABLE SECTION */}
<div className="mt-5 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
      Available Job Openings
    </h3>
    <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-bold">
      {employer.jobs?.length || 0} Total Jobs
    </span>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-50 text-gray-500 text-sm">
          <th className="px-6 py-4">Job Title</th>
          <th className="px-6 py-4">Category</th>
          <th className="px-6 py-4">Sub-Category</th>
          <th className="px-6 py-4">Employer</th>
          <th className="px-6 py-4">Salary Range</th>
          <th className="px-6 py-4 text-center">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {employer.jobs && employer.jobs.length > 0 ? (
          employer.jobs.map((job) => (
            <tr key={job._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <p className="font-bold text-gray-800">{job.jobTitle}</p>
                <p className="text-xs text-gray-400">{job.workMode}</p>
              </td>
              <td className="px-6 py-4 text-gray-600 font-medium">
                {job.category} 
              </td>
              <td className="px-6 py-4 text-gray-600 font-medium">
                {job.subCategory}
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-700 font-semibold">{employer.name}</span>
              </td>
              <td className="px-6 py-4">
                <div className="text-blue-600 font-bold">
                  ₹{job.salaryRange?.minSalary?.toLocaleString()} - ₹{job.salaryRange?.maxSalary?.toLocaleString()}
                </div>
                <span className="text-[10px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded uppercase">
                  {job.salaryType}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  job.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {job.status}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="px-6 py-10 text-center text-gray-400 italic">
              No specific job records found for this employer.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
      <Footer />
    </div>
  );
}

export default CompanyDetails;