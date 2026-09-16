import React, { useMemo, useState, useEffect } from "react";
import { ArrowLeft, MapPin, Briefcase, Calendar, Search, Mail, FileText, Check, Trash2, ExternalLink } from "lucide-react";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";
import Breadcrumb from "../common/Breadcrumb";

function VacancyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [vacancy, setVacancy] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({});

  const fetchVacancyDetails = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      if (!token) {
        const match = document.cookie.match(/(?:^|;)\s*(?:token|access_token)\s*=\s*([^;]+)/);
        if (match) token = match[1];
      }
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://new-job-portal-be.onrender.com";
      const headers = token && token !== "null" ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.get(`${BASE_URL}/api/admin/vacancies/${id}/applications`, { headers });
      
      if (res.data?.success) {
        setVacancy(res.data.vacancy);
        setCandidates(res.data.data || []);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error("Error fetching vacancy applications", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Vacancy & Applications
  useEffect(() => {
    fetchVacancyDetails();
  }, [id]);

  const handleAccept = async (applicationId) => {
    if (!window.confirm("Are you sure you want to accept this candidate?")) return;
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        const match = document.cookie.match(/(?:^|;)\s*(?:token|access_token)\s*=\s*([^;]+)/);
        if (match) token = match[1];
      }
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://new-job-portal-be.onrender.com";
      const headers = token && token !== "null" ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.patch(`${BASE_URL}/api/admin/vacancies/applications/${applicationId}/accept`, {}, { headers });
      if (res.data?.success) {
        setCandidates((prev) => prev.map((c) => (c._id === applicationId || c.applicationId === applicationId ? { ...c, status: "accepted" } : c)));
      }
    } catch (err) {
      console.error(err);
      alert("Error accepting candidate: " + (err.response?.data?.message || err.message));
    }
  };

  const handleReject = async (applicationId) => {
    const reason = window.prompt("Enter rejection reason:");
    if (reason === null) return; // cancelled
    
    try {
       let token = localStorage.getItem("token");
       if (!token) {
         const match = document.cookie.match(/(?:^|;)\s*(?:token|access_token)\s*=\s*([^;]+)/);
         if (match) token = match[1];
       }
       const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://new-job-portal-be.onrender.com";
       const headers = token && token !== "null" ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : {};
 
       const res = await axios.patch(`${BASE_URL}/api/admin/vacancies/applications/${applicationId}/reject`, { rejectionReason: reason }, { headers });
       if (res.data?.success) {
         setCandidates((prev) => prev.map((c) => (c._id === applicationId || c.applicationId === applicationId ? { ...c, status: "rejected", rejectionReason: reason } : c)));
       }
    } catch (err) {
       console.error(err);
       alert("Error rejecting candidate: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return <div className="w-full min-h-screen flex items-center justify-center font-bold text-gray-500">Loading...</div>;
  }

  if (!vacancy) {
    return <div className="w-full min-h-screen flex items-center justify-center font-bold text-gray-500">Vacancy not found.</div>;
  }

  const currentVacancy = vacancy;

  // Filter local for now, could be server side later
  const filteredCandidates = candidates.filter(c => {
    if (!searchQuery) return true;
    const sq = searchQuery.toLowerCase();
    return (c.fullName || "").toLowerCase().includes(sq) || (c.email || "").toLowerCase().includes(sq) || (c.phone || "").toLowerCase().includes(sq);
  });

  return (
    <div className="w-full min-h-screen bg-[#F4F6FA] p-6 pb-20 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* --- HEADER --- */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <button
                  onClick={() => navigate("/current-vacancy")}
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition cursor-pointer shadow-sm shrink-0"
                >
                  <ArrowLeft size={18} />
                </button>
                Submitted Applications
              </h4>
              <p className="text-xs text-gray-500 mt-1 ml-12">
                Candidate applications for vacancy profile: <span className="text-gray-900 font-semibold">{currentVacancy.profile}</span>
              </p>
            </div>
          </div>
          <hr className="border-gray-200 mt-4" />
        </div>

        {/* --- VACANCY DETAILS CARD --- */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col xl:flex-row xl:items-center justify-between gap-5 mt-2">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {currentVacancy.profile} <span className="text-gray-500 font-medium text-[15px] ml-1">({currentVacancy.vacancyId})</span>
            </h3>
            <p className="text-[13px] text-gray-500 font-medium mt-1">
              {currentVacancy.category} • {currentVacancy.subCategory || "Frontend Development"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-gray-50 rounded-lg px-4 py-2 text-[13px] font-semibold text-gray-700 flex items-center gap-2 border border-gray-100 shadow-sm">
              <MapPin size={15} className="text-gray-400" />
              {[currentVacancy.city, currentVacancy.state].filter(Boolean).join(", ")}
            </span>
            <span className="bg-gray-50 rounded-lg px-4 py-2 text-[13px] font-semibold text-gray-700 flex items-center gap-2 border border-gray-100 shadow-sm">
              <Briefcase size={15} className="text-gray-400" />
              {currentVacancy.workMode}
            </span>
            <span className="bg-gray-50 rounded-lg px-4 py-2 text-[13px] font-semibold text-gray-700 flex items-center gap-2 border border-gray-100 shadow-sm">
              <Calendar size={15} className="text-gray-400" />
              Deadline: {currentVacancy.deadline ? new Date(currentVacancy.deadline).toISOString().split('T')[0] : "N/A"}
            </span>
          </div>
        </div>

        {/* --- SEARCH & TOTAL --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search candidate name, email, contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm bg-white"
            />
          </div>
          <div className="bg-white rounded-xl px-6 py-2.5 border border-gray-200 shadow-sm text-sm font-semibold text-gray-600">
            Total Applications: <span className="bg-gray-100 px-2.5 py-0.5 rounded text-gray-800 font-bold ml-1 text-base border border-gray-200">{filteredCandidates.length}</span>
          </div>
        </div>

        {/* --- CANDIDATES TABLE --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-1">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead>
                <tr className="bg-[#F8F9FC] border-b border-gray-100">
                  <th className="py-4 px-6 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Sr. No.</th>
                  <th className="py-4 px-6 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Candidate Name</th>
                  <th className="py-4 px-6 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="py-4 px-6 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="py-4 px-6 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">City / Location</th>
                  <th className="py-4 px-6 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider">CV / Resume</th>
                  <th className="py-4 px-6 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCandidates.map((candidate, idx) => (
                  <tr key={candidate._id || candidate.id || idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-500 font-semibold align-middle">
                      {idx + 1}
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {candidate.fullName ? candidate.fullName.charAt(0).toUpperCase() : "?"}
                        </div>
                        <span className="font-bold text-gray-800 uppercase text-[13px] tracking-wide">
                          {candidate.fullName || "GUEST"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 align-middle">
                      {candidate.email && candidate.email !== "N/A" ? (
                        <div className="flex items-center gap-2 text-gray-600 font-medium text-[13px]">
                          <Mail size={14} className="text-gray-400" />
                          {candidate.email}
                        </div>
                      ) : (
                        <span className="text-gray-400 font-medium text-[13px]">N/A</span>
                      )}
                    </td>
                    <td className="py-4 px-6 align-middle text-gray-700 font-medium text-[13px] tracking-wide">
                      {candidate.phone || candidate.contact || "N/A"}
                    </td>
                    <td className="py-4 px-6 align-middle font-medium text-gray-700 text-[13px]">
                      {candidate.city || "N/A"}
                    </td>
                    <td className="py-4 px-6 align-middle text-center">
                      {candidate.resumeLink ? (
                        <a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg bg-gray-50 text-purple-600 hover:bg-gray-100 border border-gray-200 transition text-[13px] font-bold shadow-sm m-auto">
                          <FileText size={14} /> View CV <ExternalLink size={13} className="ml-0.5 text-purple-400" />
                        </a>
                      ) : (
                        <span className="text-gray-400 font-semibold text-[13px]">No CV</span>
                      )}
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center justify-center gap-2">
                        {candidate.status === "accepted" ? (
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 text-[13px] font-bold tracking-wide">
                            <Check size={15} /> Accepted
                          </span>
                        ) : candidate.status === "rejected" ? (
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 text-red-600 border border-red-200 text-[13px] font-bold tracking-wide cursor-pointer" title={candidate.rejectionReason}>
                            <Trash2 size={13} /> Rejected
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAccept(candidate._id || candidate.applicationId)}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition text-[13px] font-bold shadow-sm cursor-pointer"
                          >
                            <Check size={15} /> Accept
                          </button>
                        )}
                        
                        {candidate.status !== "rejected" && (
                          <button 
                            onClick={() => handleReject(candidate._id || candidate.applicationId)}
                            className="px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition shadow-sm border border-red-100 cursor-pointer"
                            title="Reject Candidate"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCandidates.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-gray-500 font-semibold">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default VacancyDetails;
