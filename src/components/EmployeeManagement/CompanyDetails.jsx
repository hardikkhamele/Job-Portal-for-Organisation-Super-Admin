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
    return <div className="p-6 text-center font-bold text-purple-600">Loading Company Details...</div>;
  }

  if (!employer) {
    return <div className="p-6 text-center">Company information not found.</div>;
  }

  // API Mapping based on your JSON structure
  const companyInfo = employer.companyDetail || {};
  const businessInfo = employer.businessDetail || {};
  
  const logo = companyInfo.companyLogo?.[0] || logoPlaceholder;
  const banner = companyInfo.companyBanner?.[0] || bannerPlaceholder;

  return (
    <div className="p-6 bg-gray-100 min-h-screen pb-20">
      <div className="bg-white rounded-xl p-6 ">
        {viewJob ? (
          <JobDetails job={viewJob} onBack={() => setViewJob(null)} />
        ) : (
          <>
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-4 ">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-900 hover:bg-gray-100 transition cursor-pointer"
              >
                <ArrowLeft size={25} className="text-gray-1000 cursor-pointer" />
              </button>
              <h2 className="text-3xl font-bold">Company Information</h2>
            </div>

            <div className="border-b border-gray-500 mb-1"></div>

            {/* TOP BAR: LOGO & STATUS */}
            <div className="flex items-center justify-between rounded-lg px-4 py-3 mb-4">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden bg-white">
                  <img src={logo} alt="company logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-2xl">{employer.name || "N/A"}</p>
                  <p className="text text-gray-700">{businessInfo.typeOfCompany || "N/A"}</p>
                </div>
              </div>

              <div className={`flex items-center gap-1 text-sm font-medium ${employer.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                {employer.status === 'active' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                <span className="capitalize">{employer.status}</span>
              </div>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-10 border-b border-gray-200 mb-6 text">
              {[
                { id: "company", label: "Company Info", icon: <User size={16} /> },
                { id: "transaction", label: "Transaction History", icon: <ArrowLeftRight size={16} /> },
                { id: "job", label: "Job Information", icon: <Briefcase size={16} /> },
                { id: "credit", label: "Credit History", icon: <Database size={16} /> },
              ].map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 pb-2 cursor-pointer transition-all ${
                    activeTab === tab.id ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab.icon}
                    {tab.label}
                  </span>
                </div>
              ))}
            </div>

            {/* COMPANY TAB CONTENT */}
            {activeTab === "company" && (
              <>
                <div className="relative mb-10">
                  <div className="rounded-lg overflow-hidden shadow-sm">
                    {/* API BANNER SHOWING HERE */}
                    <img src={banner} alt="company banner" className="w-full h-[270px] object-cover" />
                  </div>
                  <div className="absolute -bottom-24 left-6 w-48 h-48 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden border-4 border-white">
                    <img src={logo} alt="logo overlay" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="flex justify-between items-start mt-28 px-2">
                  <div className="max-w-4xl">
                    <h3 className="text-3xl font-bold mb-1">{employer.name}</h3>
                    <p className="text-purple-600 mb-1 text-xl font-medium">
                        {companyInfo.companyTagline || "No Tagline provided"}
                    </p>
                    <p className="text-gray-500 mb-4">{businessInfo.typeOfCompany} • Founded in {businessInfo.fundedIn || "N/A"}</p>

                    <h4 className="font-semibold mb-2 text-xl text-gray-800">About Us</h4>
                    <p className="text text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg italic">
                      {businessInfo.aboutCompany || "No description available."}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div>
                        <h4 className="font-semibold mb-1 text-lg text-gray-800">Phone</h4>
                        <p className="text-blue-600 hover:underline cursor-pointer font-medium">
                            {employer.mobileNumber || "Not Verified"}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-lg text-gray-800">Website</h4>
                        <a href={companyInfo.companyWebsite} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">
                          {companyInfo.companyWebsite || "N/A"}
                        </a>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-lg text-gray-800">Location</h4>
                        <p className="text-gray-600">
                            {companyInfo.location?.name}, {companyInfo.location?.countryCode}-{companyInfo.location?.stateCode}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-lg text-gray-800">Company Email</h4>
                        <p className="text-gray-600">{employer.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
                    <p className="text-purple-700 font-bold text-2xl">{businessInfo.companySize || "0"}</p>
                    <p className="text-purple-600 text-sm">Employees</p>
                  </div>
                </div>
              </>
            )}

            {activeTab === "transaction" && <TransactionHistory employerId={id} />}
            {activeTab === "job" && <JobInformation setViewJob={setViewJob} employerId={id} />}
            {activeTab === "credit" && <CreditHistory employerId={id} credits={employer.credits} />}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CompanyDetails;