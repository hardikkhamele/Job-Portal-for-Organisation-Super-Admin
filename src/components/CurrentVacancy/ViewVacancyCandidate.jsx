import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  FileText,
  Check,
  X,
  Trash2
} from "lucide-react";
import logo from "../../assets/Logo.svg";
import Breadcrumb from "../common/Breadcrumb";
import Footer from "../Footer";

const InfoItem = ({ label, value, subValue }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">{label}</span>
    <span className="text-[15px] font-bold text-gray-900 break-words leading-tight">{value || "N/A"}</span>
    {subValue && <span className="text-[13px] font-medium text-gray-500">{subValue}</span>}
  </div>
);

function ViewVacancyCandidate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      try {
        setLoading(true);
        let token = localStorage.getItem("token");
        if (!token) {
          const match = document.cookie.match(/(?:^|;)\s*(?:token|access_token)\s*=\s*([^;]+)/);
          if (match) token = match[1];
        }
        const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://new-job-portal-be.onrender.com";
        const headers = token && token !== "null" ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(`${BASE_URL}/api/admin/vacancies/applications/${id}`, { headers });
        if (res.data?.success) {
          setCandidate(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching candidate details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidateDetails();
  }, [id]);

  const handleAccept = async () => {
    if (!window.confirm("Are you sure you want to accept this candidate?")) return;
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        const match = document.cookie.match(/(?:^|;)\s*(?:token|access_token)\s*=\s*([^;]+)/);
        if (match) token = match[1];
      }
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://new-job-portal-be.onrender.com";
      const headers = token && token !== "null" ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.patch(`${BASE_URL}/api/admin/vacancies/applications/${id}/accept`, {}, { headers });
      if (res.data?.success) {
        setCandidate(prev => ({ ...prev, status: "accepted" }));
      }
    } catch (err) {
      console.error(err);
      alert("Error accepting candidate: " + (err.response?.data?.message || err.message));
    }
  };

  const openRejectModal = () => {
    setRejectionReason("");
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
    setRejectionReason("");
  };

  const submitReject = async () => {
    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }
    
    try {
       let token = localStorage.getItem("token");
       if (!token) {
         const match = document.cookie.match(/(?:^|;)\s*(?:token|access_token)\s*=\s*([^;]+)/);
         if (match) token = match[1];
       }
       const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://new-job-portal-be.onrender.com";
       const headers = token && token !== "null" ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : {};
 
       const res = await axios.patch(`${BASE_URL}/api/admin/vacancies/applications/${id}/reject`, { rejectionReason }, { headers });
       if (res.data?.success) {
         setCandidate(prev => ({ ...prev, status: "rejected", rejectionReason: rejectionReason }));
         closeRejectModal();
       }
    } catch (err) {
       console.error(err);
       alert("Error rejecting candidate: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-[#F4F6FA] min-h-screen flex items-center justify-center">
        <style>
          {`
            @keyframes heartbeat {
              0%, 100% { transform: scale(1); }
              25% { transform: scale(1.05); }
              50% { transform: scale(0.95); }
              75% { transform: scale(1.02); }
            }
          `}
        </style>
        <img 
          src={logo} 
          alt="Loading..." 
          className="w-56 h-auto opacity-80 mix-blend-multiply drop-shadow-md" 
          style={{ animation: 'heartbeat 1.5s infinite ease-in-out' }} 
        />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="w-full bg-[#F4F6FA] min-h-screen flex flex-col p-4">
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Candidate not found</h2>
          <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F4F6FA] min-h-screen p-4 flex flex-col justify-between">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-5">
        <Breadcrumb
          items={[
            { label: "Staffing Management", link: "/staffing-management" },
            { label: "Current Vacancy", link: "/current-vacancy" },
            { label: "Candidate Details" }
          ]}
        />

        {/* TOP HEADER ROW */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition shrink-0"
              title="Go Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-2xl font-bold shrink-0 shadow-sm border border-purple-200/50">
                {candidate.fullName ? candidate.fullName.charAt(0).toUpperCase() : "C"}
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  {candidate.fullName || "N/A"}
                </h3>
                <p className="text-[14px] text-gray-500 font-medium mt-1">
                  Applied for <span className="text-gray-800 font-bold">{candidate.vacancy?.designation || "N/A"}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <span className={`px-4 py-2 rounded-lg text-[13px] font-bold uppercase tracking-wider ${
               candidate.status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
               candidate.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
               'bg-blue-50 text-blue-700 border border-blue-200'
             }`}>
               {candidate.status || "Pending"}
             </span>
             {candidate.resumeLink && (
               <a
                 href={candidate.resumeLink}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-6 py-2.5 rounded-lg bg-purple-600 text-white text-[14px] font-bold hover:bg-purple-700 transition flex items-center gap-2 shadow-md"
               >
                 <FileText size={18} /> View Resume
               </a>
             )}
          </div>
        </div>

        {/* REJECTION REASON BANNER */}
        {candidate.status?.toLowerCase() === 'rejected' && candidate.rejectionReason && (
          <div className="bg-red-50 rounded-xl shadow-[0_2px_10px_-3px_rgba(239,68,68,0.2)] border border-red-200 p-5 flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
             <div className="mt-0.5 bg-red-200/50 p-1 rounded-full"><X size={18} className="text-red-600" /></div>
             <div>
                <h4 className="text-[15px] font-bold text-red-900 mb-1">Application Rejected</h4>
                <p className="text-[14px] text-red-700 font-medium leading-relaxed">{candidate.rejectionReason}</p>
             </div>
          </div>
        )}

        {/* UNIFIED DETAILS CARD */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-8 pb-10">
           
           {/* Section 1: Contact & Personal Details */}
           <h4 className="text-[16px] font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3 flex items-center gap-2">
              Contact & Basic Information
           </h4>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              <InfoItem label="Email Address" value={candidate.email} />
              <InfoItem label="Phone Number" value={candidate.phone} />
              <InfoItem label="Location" value={`${candidate.city || ''}${candidate.city && candidate.state ? ', ' : ''}${candidate.state || ''}`} />
              <InfoItem label="Application ID" value={candidate.applicationId} />
           </div>

           {/* Section 2: Professional Details */}
           <h4 className="text-[16px] font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3 flex items-center gap-2">
              Professional Information
           </h4>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              <InfoItem label="Total Experience" value={candidate.totalExperience ? `${candidate.totalExperience} Years` : null} />
              <InfoItem label="Current Organization" value={candidate.currentOrganization} />
              <InfoItem label="Current CTC" value={candidate.currentCTC} />
              <InfoItem label="Expected CTC" value={candidate.expectedCTC} />
              <InfoItem label="Notice Period" value={candidate.noticePeriod} />
           </div>

           {/* Section 3: Application Specs */}
           <h4 className="text-[16px] font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3 flex items-center gap-2">
              Vacancy & Referral Details
           </h4>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <InfoItem label="Vacancy Code" value={candidate.vacancyCode || candidate.vacancy?.vacancyId} />
              <InfoItem label="Category" value={`${candidate.vacancy?.category || 'N/A'} - ${candidate.vacancy?.subCategory || 'N/A'}`} />
              <InfoItem label="Work Mode" value={candidate.vacancy?.workMode} />
              <InfoItem label="Referred By" value={candidate.referredBy || "Self Applied"} />
              {candidate.submittedBy && (
                 <InfoItem 
                    label="Submitted By (HR)" 
                    value={candidate.submittedBy.hrName} 
                    subValue={candidate.submittedBy.designation} 
                 />
              )}
           </div>

        </div>

        {/* RECRUITER NOTES CARD */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-8 mb-10">
           <h4 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
              Recruiter Notes
           </h4>
           <div className="bg-[#F8FAFC] rounded-xl p-5 border border-gray-200/60 shadow-inner">
              <p className="text-[15px] font-medium text-gray-700 leading-relaxed whitespace-pre-wrap">
                 {candidate.recruiterNotes || "No internal recruiter notes added for this candidate."}
              </p>
           </div>
           
           {/* ACTION BAR */}
           {candidate.status?.toLowerCase() !== "accepted" && candidate.status?.toLowerCase() !== "rejected" && (
             <div className="mt-8 pt-6 border-t border-gray-200/60 flex items-center justify-end gap-4">
               <button 
                 onClick={openRejectModal}
                 className="px-6 py-2.5 rounded-lg border border-red-200 text-red-600 font-bold hover:bg-red-50 transition flex items-center gap-2"
               >
                 <X size={18} /> Reject Profile
               </button>
               <button 
                 onClick={handleAccept}
                 className="px-6 py-2.5 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 shadow-md transition flex items-center gap-2"
               >
                 <Check size={18} /> Accept Candidate
               </button>
             </div>
           )}
        </div>

      </div>
      <Footer />

      {/* --- REJECT MODAL --- */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 flex flex-col scale-in-center">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Trash2 size={18} className="text-red-500" /> Reject Candidate
              </h3>
              <button 
                onClick={closeRejectModal}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-sm font-medium text-gray-600 mb-2">Please provide a reason for rejecting this application:</p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g., Does not meet experience requirement..."
                className="w-full h-28 border border-gray-200 rounded-xl p-4 text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400 resize-none shadow-inner"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
              <button 
                onClick={closeRejectModal}
                className="px-5 py-2 font-bold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={submitReject}
                disabled={!rejectionReason.trim()}
                className="px-5 py-2 font-bold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-md transition-colors cursor-pointer text-sm"
              >
                Confirm Rejection
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default ViewVacancyCandidate;
