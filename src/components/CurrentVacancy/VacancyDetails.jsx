import React, { useMemo, useState, useEffect } from "react";
import { ArrowLeft, MapPin, Briefcase, Calendar, Search, Mail, FileText, Check, Trash2, ExternalLink, Eye, X, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate, useParams, Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/Logo.svg";
import Footer from "../Footer";
import Breadcrumb from "../common/Breadcrumb";

function VacancyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [vacancy, setVacancy] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "all";
  const experienceFilter = searchParams.get("experience") || "all";
  const noticeFilter = searchParams.get("notice") || "all";
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const itemsPerPage = 7;

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectingCandidateId, setRejectingCandidateId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

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

  const openRejectModal = (applicationId) => {
    setRejectingCandidateId(applicationId);
    setRejectionReason("");
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
    setRejectingCandidateId(null);
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
 
       const res = await axios.patch(`${BASE_URL}/api/admin/vacancies/applications/${rejectingCandidateId}/reject`, { rejectionReason }, { headers });
       if (res.data?.success) {
         setCandidates((prev) => prev.map((c) => (c._id === rejectingCandidateId || c.applicationId === rejectingCandidateId ? { ...c, status: "rejected", rejectionReason: rejectionReason } : c)));
         closeRejectModal();
       }
    } catch (err) {
       console.error(err);
       alert("Error rejecting candidate: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F4F6FA] flex flex-col items-center justify-center p-6 pb-20">
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
        <p className="mt-4 text-purple-600 font-bold tracking-widest text-sm animate-pulse">LOADING DATA...</p>
      </div>
    );
  }

  if (!vacancy) {
    return <div className="w-full min-h-screen flex items-center justify-center font-bold text-gray-500">Vacancy not found.</div>;
  }

  const currentVacancy = vacancy;

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchParams(prev => {
      if (val) prev.set("search", val);
      else prev.delete("search");
      prev.set("page", "1");
      return prev;
    });
  };

  const handleStatusFilter = (status) => {
    setSearchParams(prev => {
      if (status !== "all") prev.set("status", status);
      else prev.delete("status");
      prev.set("page", "1");
      return prev;
    });
  };

  const handleDropdownFilter = (key, value) => {
    setSearchParams(prev => {
      if (value !== "all") prev.set(key, value);
      else prev.delete(key);
      prev.set("page", "1");
      return prev;
    });
  };

  const clearFilter = (key) => {
    setSearchParams(prev => {
      prev.delete(key);
      prev.set("page", "1");
      return prev;
    });
  };

  const clearAllFilters = () => {
    setSearchParams(prev => {
      prev.delete("search");
      prev.delete("status");
      prev.delete("experience");
      prev.delete("notice");
      prev.set("page", "1");
      return prev;
    });
  };

  const hasActiveFilters = searchQuery || statusFilter !== "all" || experienceFilter !== "all" || noticeFilter !== "all";

  const filteredCandidates = candidates.filter(c => {
    let match = true;
    
    if (statusFilter !== "all" && match) {
       const stat = c.status?.toLowerCase() || "pending";
       if (stat !== statusFilter) match = false;
    }

    if (experienceFilter !== "all" && match) {
       const exp = parseFloat(c.totalExperience) || 0;
       if (experienceFilter === "0-1" && exp > 1) match = false;
       else if (experienceFilter === "1-3" && (exp < 1 || exp > 3)) match = false;
       else if (experienceFilter === "3-5" && (exp < 3 || exp > 5)) match = false;
       else if (experienceFilter === "5+" && exp < 5) match = false;
    }

    if (noticeFilter !== "all" && match) {
       const notice = (c.noticePeriod || "").toLowerCase();
       if (noticeFilter === "immediate" && !notice.includes("immediate")) match = false;
       else if (noticeFilter === "15" && !notice.includes("15")) match = false;
       else if (noticeFilter === "30" && !notice.includes("30") && !notice.includes("1 month")) match = false;
       else if (noticeFilter === "60+" && !notice.includes("60") && !notice.includes("90") && !notice.includes("2 month") && !notice.includes("3 month")) match = false;
    }

    if (searchQuery && match) {
      const sq = searchQuery.toLowerCase();
      const textMatch = (c.fullName || "").toLowerCase().includes(sq) || 
                        (c.email || "").toLowerCase().includes(sq) || 
                        (c.phone || "").toLowerCase().includes(sq);
      if (!textMatch) match = false;
    }
    return match;
  });

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCandidates = filteredCandidates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full min-h-screen bg-[#F4F6FA] p-4 sm:p-6 pb-20 flex flex-col justify-between overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-5">
        
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

        {/* --- SEARCH & FILTERS --- */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4 mt-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Search input & Filter Chips */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 flex-1 min-w-[280px]">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search candidate name, email, contact..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-11 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm bg-white"
                />
              </div>

              {/* Status Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5 sm:border-l sm:border-gray-200 sm:pl-4">
                <Filter size={15} className="text-gray-400 mr-1 hidden sm:block" />
                {['all', 'pending', 'accepted', 'rejected'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-bold capitalize transition border cursor-pointer ${
                      statusFilter === status 
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm' 
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Dropdowns & Total Count */}
            <div className="flex flex-wrap items-center gap-3">
              <select 
                value={experienceFilter} 
                onChange={(e) => handleDropdownFilter("experience", e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer shadow-sm"
              >
                <option value="all">Any Experience</option>
                <option value="0-1">0-1 Years (Fresher)</option>
                <option value="1-3">1-3 Years</option>
                <option value="3-5">3-5 Years</option>
                <option value="5+">5+ Years</option>
              </select>

              <select 
                value={noticeFilter} 
                onChange={(e) => handleDropdownFilter("notice", e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer shadow-sm"
              >
                <option value="all">Any Notice Period</option>
                <option value="immediate">Immediate Joiner</option>
                <option value="15">15 Days</option>
                <option value="30">30 Days</option>
                <option value="60+">60+ Days</option>
              </select>

              <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 shadow-sm text-xs font-semibold text-gray-600">
                Total found: <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold ml-1 text-xs border border-purple-200">{filteredCandidates.length}</span>
              </div>
            </div>

          </div>

          {/* Active Applied Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100 mt-1 w-full">
              <span className="text-xs font-semibold text-gray-500 mr-1">Active Filters:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">
                  Search: "{searchQuery}"
                  <button onClick={() => clearFilter("search")} className="hover:bg-purple-200 rounded-full p-0.5 cursor-pointer">
                    <X size={12} />
                  </button>
                </span>
              )}

              {statusFilter !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium capitalize">
                  Status: {statusFilter}
                  <button onClick={() => clearFilter("status")} className="hover:bg-purple-200 rounded-full p-0.5 cursor-pointer">
                    <X size={12} />
                  </button>
                </span>
              )}

              {experienceFilter !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">
                  Experience: {experienceFilter === "0-1" ? "0-1 Yrs" : experienceFilter === "1-3" ? "1-3 Yrs" : experienceFilter === "3-5" ? "3-5 Yrs" : "5+ Yrs"}
                  <button onClick={() => clearFilter("experience")} className="hover:bg-purple-200 rounded-full p-0.5 cursor-pointer">
                    <X size={12} />
                  </button>
                </span>
              )}

              {noticeFilter !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">
                  Notice: {noticeFilter === "immediate" ? "Immediate Joiner" : `${noticeFilter} Days`}
                  <button onClick={() => clearFilter("notice")} className="hover:bg-purple-200 rounded-full p-0.5 cursor-pointer">
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline ml-2 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* --- CANDIDATES TABLE --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-1">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[1200px] table-auto">
              <thead>
                <tr className="bg-purple-600 border-b border-purple-700">
                  <th className="py-4 px-6 text-left text-[11px] font-extrabold text-white uppercase tracking-wider whitespace-nowrap">Sr. No.</th>
                  <th className="py-4 px-6 text-left text-[11px] font-extrabold text-white uppercase tracking-wider whitespace-nowrap">Candidate Name</th>
                  <th className="py-4 px-6 text-left text-[11px] font-extrabold text-white uppercase tracking-wider whitespace-nowrap">Email</th>
                  <th className="py-4 px-6 text-left text-[11px] font-extrabold text-white uppercase tracking-wider whitespace-nowrap">Contact</th>
                  <th className="py-4 px-6 text-left text-[11px] font-extrabold text-white uppercase tracking-wider whitespace-nowrap">City / Location</th>
                  <th className="py-4 px-6 text-left text-[11px] font-extrabold text-white uppercase tracking-wider whitespace-nowrap">Experience</th>
                  <th className="py-4 px-6 text-left text-[11px] font-extrabold text-white uppercase tracking-wider whitespace-nowrap">Current Org</th>
                  <th className="py-4 px-6 text-left text-[11px] font-extrabold text-white uppercase tracking-wider whitespace-nowrap">Notice Period</th>
                  <th className="py-4 px-6 text-left text-[11px] font-extrabold text-white uppercase tracking-wider whitespace-nowrap">Expected CTC</th>
                  <th className="py-4 px-6 text-center text-[11px] font-extrabold text-white uppercase tracking-wider whitespace-nowrap">CV / Resume</th>
                  <th className="py-4 px-6 text-center text-[11px] font-extrabold text-white uppercase tracking-wider whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedCandidates.map((candidate, idx) => (
                  <tr key={candidate._id || candidate.id || idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-500 font-semibold align-middle whitespace-nowrap">
                      {startIndex + idx + 1}
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {candidate.fullName ? candidate.fullName.charAt(0).toUpperCase() : "?"}
                        </div>
                        <span className="font-bold text-gray-800 uppercase text-[13px] tracking-wide truncate max-w-[160px] block" title={candidate.fullName || "GUEST"}>
                          {candidate.fullName || "GUEST"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 align-middle">
                      {candidate.email && candidate.email !== "N/A" ? (
                        <div className="flex items-center gap-2 text-gray-600 font-medium text-[13px] truncate max-w-[180px]" title={candidate.email}>
                          <Mail size={14} className="text-gray-400 shrink-0" />
                          <span className="truncate">{candidate.email}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 font-medium text-[13px]">N/A</span>
                      )}
                    </td>
                    <td className="py-4 px-6 align-middle text-gray-700 font-medium text-[13px] tracking-wide whitespace-nowrap">
                      {candidate.phone || candidate.contact || "N/A"}
                    </td>
                    <td className="py-4 px-6 align-middle font-medium text-gray-700 text-[13px] truncate max-w-[120px]" title={candidate.city || "N/A"}>
                      {candidate.city || "N/A"}
                    </td>
                    <td className="py-4 px-6 align-middle font-medium text-gray-700 text-[13px] whitespace-nowrap">
                      {candidate.totalExperience ? `${candidate.totalExperience} Yrs` : "N/A"}
                    </td>
                    <td className="py-4 px-6 align-middle font-medium text-gray-700 text-[13px] truncate max-w-[140px]" title={candidate.currentOrganization}>
                      {candidate.currentOrganization || "N/A"}
                    </td>
                    <td className="py-4 px-6 align-middle font-medium text-gray-700 text-[13px] whitespace-nowrap">
                      {candidate.noticePeriod || "N/A"}
                    </td>
                    <td className="py-4 px-6 align-middle font-bold text-gray-800 text-[13px] whitespace-nowrap">
                      {candidate.expectedCTC || "N/A"}
                    </td>
                    <td className="py-4 px-6 align-middle text-center whitespace-nowrap">
                      {candidate.resumeLink ? (
                        <a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg bg-gray-50 text-purple-600 hover:bg-gray-100 border border-gray-200 transition text-[13px] font-bold shadow-sm m-auto hover:text-purple-700 group">
                          <FileText size={14} className="text-purple-500 group-hover:text-purple-600" /> View CV <ExternalLink size={13} className="ml-0.5 text-purple-400 group-hover:text-purple-500" />
                        </a>
                      ) : (
                        <span className="text-gray-400 font-semibold text-[13px]">No CV</span>
                      )}
                    </td>
                    <td className="py-4 px-6 align-middle whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          title="View Candidate"
                          onClick={() => navigate(`/current-vacancy/candidate/${candidate._id || candidate.applicationId}`)}
                          className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition shadow-sm border border-blue-100 cursor-pointer"
                        >
                          <Eye size={15} />
                        </button>
                        {candidate.status === "accepted" ? (
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 text-[13px] font-bold tracking-wide shadow-sm">
                            <Check size={15} /> Accepted
                          </span>
                        ) : candidate.status === "rejected" ? (
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 text-red-600 border border-red-200 text-[13px] font-bold tracking-wide cursor-default shadow-sm" title={candidate.rejectionReason}>
                            <Trash2 size={13} /> Rejected
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAccept(candidate._id || candidate.applicationId)}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition text-[13px] font-bold shadow-sm cursor-pointer border border-emerald-600/50"
                          >
                            <Check size={15} /> Accept
                          </button>
                        )}
                        
                        {candidate.status !== "rejected" && (
                          <button 
                            onClick={() => openRejectModal(candidate._id || candidate.applicationId)}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition text-[13px] font-bold shadow-sm cursor-pointer border border-red-600/50"
                            title="Reject Candidate"
                          >
                            <Trash2 size={14} /> Reject
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
          
          {/* PAGINATION FOOTER */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-[13px] font-semibold text-gray-500">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCandidates.length)} of {filteredCandidates.length} entries
              </p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold transition cursor-pointer ${
                        currentPage === i + 1 
                        ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-600 ring-offset-1 ring-offset-gray-50' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
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

export default VacancyDetails;
