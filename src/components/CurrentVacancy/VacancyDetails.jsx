import React, { useMemo } from "react";
import { ArrowLeft, Building2, Calendar, CheckCircle2, ClipboardList, MapPin, Send, User, Users, Briefcase, Mail, Phone, Code, FileText, Globe, DollarSign, Clock, Award } from "lucide-react";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import Footer from "../Footer";
import Breadcrumb from "../common/Breadcrumb";
import { getVacancies, saveVacancies } from "./vacancyStore";

const workModeBadge = {
  Remote: "bg-green-100 text-green-700 border border-green-300",
  Hybrid: "bg-orange-100 text-orange-700 border border-orange-300",
  Onsite: "bg-blue-100 text-blue-700 border border-blue-300"
};

function VacancyDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const [vacancies, setVacancies] = React.useState(() => getVacancies());

  const vacancy = useMemo(() => {
    if (state?.vacancy) return state.vacancy;
    return vacancies.find((v) => String(v.id) === String(id)) || null;
  }, [state, id, vacancies]);

  if (!vacancy) {
    return <Navigate to="/current-vacancy" replace />;
  }

  const handleToggleStatus = () => {
    const updated = vacancies.map((v) =>
      v.id === vacancy.id ? { ...v, status: v.status === "Open" ? "Closed" : "Open" } : v
    );
    setVacancies(updated);
    saveVacancies(updated);
  };

  const currentVacancy = vacancies.find((v) => String(v.id) === String(vacancy.id)) || vacancy;

  return (
    <div className="w-full min-h-screen bg-[#F4F6FA] p-4 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-4">

        {/* --- BREADCRUMB --- */}
        <Breadcrumb
          items={[
            { label: "Staffing Management", link: "/staffing-management" },
            { label: "Current Vacancy", link: "/current-vacancy" },
            { label: `Vacancy Details (${currentVacancy.vacancyId})` }
          ]}
        />

        {/* --- TOP BACK BAR & HEADER --- */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={() => navigate("/current-vacancy")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 cursor-pointer w-fit"
            >
              <ArrowLeft size={18} /> Back to Vacancies
            </button>

            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                  currentVacancy.status === "Open"
                    ? "bg-green-100 text-green-700 border-green-300"
                    : "bg-red-100 text-red-700 border-red-300"
                }`}
              >
                {currentVacancy.status === "Open" ? "● Open Position" : "✓ Closed"}
              </span>

              <button
                onClick={handleToggleStatus}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition cursor-pointer shadow-sm ${
                  currentVacancy.status === "Open"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {currentVacancy.status === "Open" ? (
                  <>
                    <Send size={14} />
                    Mark as Closed
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    Re-open Vacancy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-gray-100 pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-purple-50 p-4 text-purple-600 border border-purple-100">
                <Briefcase size={32} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-2xl font-bold text-gray-900">{currentVacancy.profile}</h3>
                  <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-md">
                    {currentVacancy.vacancyId}
                  </span>
                  {currentVacancy.companyType && (
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md">
                      {currentVacancy.companyType}
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-600 mt-1 flex items-center gap-2">
                  <Building2 size={16} className="text-purple-500" />
                  {currentVacancy.companyName}
                  {currentVacancy.industrySector && (
                    <span className="text-gray-400 font-normal">({currentVacancy.industrySector})</span>
                  )}
                </p>
              </div>
            </div>

            <div className="bg-purple-50/60 rounded-xl p-4 border border-purple-100 flex items-center gap-6">
              <div>
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">Added By</span>
                <span className="text-sm font-bold text-gray-800 flex items-center gap-1.5 mt-0.5">
                  <User size={14} className="text-purple-600" />
                  {currentVacancy.addedBy || "Super Admin"}
                </span>
              </div>
              <div className="h-8 w-px bg-purple-200"></div>
              <div>
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">Category</span>
                <span className="text-sm font-bold text-gray-800 mt-0.5 block">
                  {currentVacancy.category} {currentVacancy.subCategory ? `— ${currentVacancy.subCategory}` : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- COMPANY & HR DETAILS --- */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Building2 size={18} className="text-purple-600" />
            Company & HR Information
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <Building2 size={13} className="text-purple-500" /> Company Name
              </span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">{currentVacancy.companyName || "—"}</span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <Mail size={13} className="text-purple-500" /> Official Email
              </span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">{currentVacancy.email || "—"}</span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <Phone size={13} className="text-purple-500" /> Company Mobile
              </span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">{currentVacancy.contactNumber || "—"}</span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <Globe size={13} className="text-purple-500" /> Website
              </span>
              <span className="text-sm font-bold text-purple-700 mt-1 block truncate">
                {currentVacancy.website ? (
                  <a href={currentVacancy.website} target="_blank" rel="noreferrer" className="underline">
                    {currentVacancy.website}
                  </a>
                ) : "—"}
              </span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <User size={13} className="text-purple-500" /> HR Name
              </span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">{currentVacancy.hrName || "—"}</span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <Phone size={13} className="text-purple-500" /> HR Mobile
              </span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">{currentVacancy.hrMobile || "—"}</span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <Mail size={13} className="text-purple-500" /> HR Email
              </span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">{currentVacancy.hrEmail || "—"}</span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <MapPin size={13} className="text-purple-500" /> Location
              </span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">
                {[currentVacancy.city, currentVacancy.state].filter(Boolean).join(", ") || "—"}
              </span>
            </div>
          </div>

          {currentVacancy.address && (
            <div className="mt-4 bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <MapPin size={13} className="text-purple-500" /> Full Address
              </span>
              <span className="text-sm font-medium text-gray-800 mt-1 block">{currentVacancy.address}</span>
            </div>
          )}
        </div>

        {/* --- JOB REQUIREMENT DETAILS GRID --- */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
            <ClipboardList size={18} className="text-purple-600" />
            Requirement Specifications
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider">
                Category
              </span>
              <span className="text-sm font-bold text-purple-700 mt-1 block">{currentVacancy.category || "—"}</span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <Code size={13} className="text-purple-500" /> Technology
              </span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">{currentVacancy.technology || "—"}</span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <Users size={13} className="text-purple-500" /> Required Candidates
              </span>
              <span className="text-sm font-bold text-purple-700 mt-1 block">{currentVacancy.noOfVacancy} Positions</span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <Award size={13} className="text-purple-500" /> Experience
              </span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">{currentVacancy.experience || "—"}</span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <DollarSign size={13} className="text-purple-500" /> Budget / Salary
              </span>
              <span className="text-sm font-bold text-green-700 mt-1 block">
                {currentVacancy.budget ? `₹${currentVacancy.budget}` : "—"}
              </span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider">
                Work Mode
              </span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${workModeBadge[currentVacancy.workMode] || "bg-gray-100 text-gray-600"}`}>
                {currentVacancy.workMode || "—"}
              </span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <Clock size={13} className="text-purple-500" /> Notice Period
              </span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">{currentVacancy.noticePeriod || "—"}</span>
            </div>

            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-gray-400 block tracking-wider flex items-center gap-1">
                <Calendar size={13} className="text-purple-500" /> Deadline Date
              </span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">{currentVacancy.deadline || "—"}</span>
            </div>
          </div>

          {currentVacancy.requirements && (
            <div className="mt-4 bg-purple-50/50 rounded-xl p-4 border border-purple-100">
              <span className="text-xs font-bold uppercase text-purple-700 tracking-wider flex items-center gap-1.5 mb-2">
                <FileText size={15} /> Requirements & Job Description
              </span>
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                {currentVacancy.requirements}
              </p>
            </div>
          )}
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default VacancyDetails;
