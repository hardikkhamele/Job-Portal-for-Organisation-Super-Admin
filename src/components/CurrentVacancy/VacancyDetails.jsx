import React, { useMemo, useState } from "react";
import { ArrowLeft, MapPin, Briefcase, Calendar, Search, Mail, FileText, Check, Trash2, ExternalLink } from "lucide-react";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import Footer from "../Footer";
import { getVacancies } from "./vacancyStore";

function VacancyDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const [vacancies] = useState(() => getVacancies());
  const [searchQuery, setSearchQuery] = useState("");

  const vacancy = useMemo(() => {
    if (state?.vacancy) return state.vacancy;
    return vacancies.find((v) => String(v.id) === String(id)) || null;
  }, [state, id, vacancies]);

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "",
      email: "N/A",
      contact: "",
      city: "Mumbai",
      cvAvailable: false,
      status: "Accepted"
    },
    {
      id: 2,
      name: "Amol Shinde",
      email: "amol.shinde@example.com",
      contact: "9527445459",
      city: "Mukhed",
      cvAvailable: true,
      status: "Pending"
    },
    {
      id: 3,
      name: "ASHWINI CHANDRAKANT CHABRE",
      email: "ashwini.c@example.com",
      contact: "9158458147",
      city: "Mukhed",
      cvAvailable: true,
      status: "Pending"
    }
  ]);

  if (!vacancy) {
    return <Navigate to="/current-vacancy" replace />;
  }

  const handleAccept = (candidateId) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: "Accepted" } : c))
    );
  };

  const currentVacancy = vacancies.find((v) => String(v.id) === String(vacancy.id)) || vacancy;

  return (
    <div className="w-full min-h-screen bg-[#F4F6FA] p-6 pb-20 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* --- HEADER --- */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <button
              onClick={() => navigate("/current-vacancy")}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-purple-600 hover:bg-gray-50 transition cursor-pointer shadow-sm"
            >
              <ArrowLeft size={18} />
            </button>
            Submitted Applications
          </h2>
          <p className="text-sm text-gray-500 mt-1 ml-[48px]">
            Candidate applications for vacancy profile: <span className="text-purple-600 font-semibold">{currentVacancy.profile}</span>
          </p>
        </div>

        {/* --- VACANCY DETAILS CARD --- */}
        <div className="bg-white rounded-2xl p-6 border border-purple-50 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-5 mt-2">
          <div>
            <span className="text-[11px] font-black uppercase text-purple-600 tracking-wider">
              VACANCY DETAILS
            </span>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">
              {currentVacancy.profile} <span className="text-purple-600 font-semibold text-[15px]">({currentVacancy.vacancyId})</span>
            </h3>
            <p className="text-[13px] text-gray-500 font-medium mt-1">
              {currentVacancy.category} • {currentVacancy.subCategory || "Frontend Development"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-white rounded-full px-4 py-2 text-[13px] font-semibold text-gray-700 flex items-center gap-2 border border-gray-100 shadow-sm">
              <MapPin size={15} className="text-purple-500" />
              {[currentVacancy.city, currentVacancy.state].filter(Boolean).join(", ")}
            </span>
            <span className="bg-white rounded-full px-4 py-2 text-[13px] font-semibold text-gray-700 flex items-center gap-2 border border-gray-100 shadow-sm">
              <Briefcase size={15} className="text-purple-500" />
              {currentVacancy.workMode}
            </span>
            <span className="bg-white rounded-full px-4 py-2 text-[13px] font-semibold text-gray-700 flex items-center gap-2 border border-gray-100 shadow-sm">
              <Calendar size={15} className="text-purple-500" />
              Deadline: {currentVacancy.deadline}
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
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm bg-white"
            />
          </div>
          <div className="bg-white rounded-full px-6 py-2.5 border border-gray-200 shadow-sm text-sm font-semibold text-gray-600">
            Total Applications: <span className="text-purple-600 font-black ml-1 text-base">{candidates.length}</span>
          </div>
        </div>

        {/* --- CANDIDATES TABLE --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-1">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-5 px-6 font-black text-xs uppercase tracking-wider text-purple-800">
                    SR.<br/>NO.
                  </th>
                  <th className="py-5 px-6 font-black text-xs uppercase tracking-wider text-purple-800">
                    CANDIDATE NAME
                  </th>
                  <th className="py-5 px-6 font-black text-xs uppercase tracking-wider text-purple-800">
                    EMAIL
                  </th>
                  <th className="py-5 px-6 font-black text-xs uppercase tracking-wider text-purple-800">
                    CONTACT
                  </th>
                  <th className="py-5 px-6 font-black text-xs uppercase tracking-wider text-purple-800">
                    CITY / LOCATION
                  </th>
                  <th className="py-5 px-6 font-black text-xs uppercase tracking-wider text-purple-800 text-center">
                    CV / RESUME
                  </th>
                  <th className="py-5 px-6 font-black text-xs uppercase tracking-wider text-purple-800 text-center">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {candidates.map((candidate, idx) => (
                  <tr key={candidate.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="py-4 px-6 text-gray-500 font-semibold align-middle">
                      {idx + 1}
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {candidate.name ? candidate.name.charAt(0).toUpperCase() : ""}
                        </div>
                        <span className="font-bold text-gray-800 uppercase text-[13px] tracking-wide">
                          {candidate.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 align-middle">
                      {candidate.email !== "N/A" ? (
                        <div className="flex items-center gap-2 text-purple-600 font-semibold text-[13px]">
                          <Mail size={14} className="text-purple-400" />
                          {candidate.email}
                        </div>
                      ) : (
                        <span className="text-gray-400 font-medium text-[13px]">N/A</span>
                      )}
                    </td>
                    <td className="py-4 px-6 align-middle text-gray-700 font-semibold text-[13px] tracking-wide">
                      {candidate.contact}
                    </td>
                    <td className="py-4 px-6 align-middle font-bold text-gray-700 text-[13px]">
                      {candidate.city}
                    </td>
                    <td className="py-4 px-6 align-middle text-center">
                      {candidate.cvAvailable ? (
                        <button className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition text-[13px] font-bold shadow-sm m-auto">
                          <FileText size={14} /> View CV <ExternalLink size={13} className="ml-0.5 text-purple-400" />
                        </button>
                      ) : (
                        <span className="text-gray-400 font-semibold text-[13px]">No CV</span>
                      )}
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center justify-center gap-2">
                        {candidate.status === "Accepted" ? (
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 text-[13px] font-bold tracking-wide">
                            <Check size={15} /> Accepted
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAccept(candidate.id)}
                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition text-[13px] font-bold shadow-sm"
                          >
                            <Check size={15} /> Accept
                          </button>
                        )}
                        <button className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition shadow-sm border border-red-100">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
