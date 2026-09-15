import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircleChevronLeft, Mail, Phone, Briefcase, Target, PhoneCall, UserPlus, CheckCircle2 } from "lucide-react";
import hrPerformanceData from "./HRPerformance/hrPerformanceData";
import Footer from "../Footer";
import HRStatusBadge from "./HRPerformance/HRStatusBadge";

function HRViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the exact HR record based on URL ID
  const hr = useMemo(() => {
    return hrPerformanceData.find((h) => String(h.id) === String(id));
  }, [id]);

  if (!hr) {
    return (
      <div className="w-full bg-[#F4F6FA] p-4 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">HR Not Found</h2>
          <p className="text-sm text-gray-500 mb-6">The HR recruiter record could not be found.</p>
          <button
            onClick={() => navigate("/hr-management")}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
          >
            Back to HR Management
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F4F6FA] p-5 pb-20 min-h-screen flex flex-col justify-between">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/hr-management")}>
            <CircleChevronLeft size={26} className="text-gray-600 hover:text-purple-600 transition" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">
            HR Performance Profile
          </h1>
        </div>

        {/* Single View Card Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Column: Personal & Contact Info (1/3 width) */}
          <div className="w-full md:w-1/3 bg-gray-50/50 p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
            <div className="flex flex-col items-center text-center mb-6 mt-2">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold flex items-center justify-center text-3xl shadow-md mb-4 ring-4 ring-purple-50">
                {hr.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{hr.name}</h2>
              <p className="text-sm font-semibold text-purple-600 mb-3">{hr.designation}</p>
              <HRStatusBadge type="status" value={hr.isActiveToday} />
            </div>

            <hr className="border-gray-200 w-full mb-6" />

            <div className="flex flex-col gap-4 w-full text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <Briefcase size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">{hr.jobType}</p>
                  <div className="mt-1">
                    <HRStatusBadge type="workMode" value={hr.workMode} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <Mail size={18} className="text-gray-400 shrink-0" />
                <span className="font-medium truncate">{hr.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-400 shrink-0" />
                <span className="font-medium">{hr.phone}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Performance Metrics (2/3 width) */}
          <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-base font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">
              Today's Performance & Targets
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {/* Daily Target */}
              <div className="border border-gray-100 rounded-xl p-4 flex items-center gap-4 bg-white hover:shadow-md transition">
                <div className="p-3 bg-amber-50 text-amber-500 rounded-lg">
                  <Target size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Daily Target</p>
                  <p className="text-lg font-bold text-gray-900">{hr.target} Calls</p>
                </div>
              </div>

              {/* Calls Done */}
              <div className="border border-gray-100 rounded-xl p-4 flex items-center gap-4 bg-white hover:shadow-md transition">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                  <PhoneCall size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Calls Done</p>
                  <div className="flex items-end gap-1.5">
                    <p className="text-2xl font-black text-purple-700 leading-none">{hr.callsToday}</p>
                    <p className="text-xs font-semibold text-gray-500 pb-0.5">today</p>
                  </div>
                </div>
              </div>

              {/* Onboarded Candidates */}
              <div className="border border-gray-100 rounded-xl p-4 flex items-center gap-4 bg-white hover:shadow-md transition">
                <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
                  <UserPlus size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Onboarded</p>
                  <p className="text-2xl font-black text-blue-700 leading-none">{hr.candidatesOnboarded}</p>
                </div>
              </div>

              {/* Vacancies Filled */}
              <div className="border border-gray-100 rounded-xl p-4 flex items-center gap-4 bg-white hover:shadow-md transition">
                <div className="p-3 bg-emerald-50 text-emerald-500 rounded-lg">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Vacancies Filled</p>
                  <p className="text-2xl font-black text-emerald-700 leading-none">{hr.vacanciesFilled}</p>
                </div>
              </div>
            </div>

            {/* Vacancy Details List */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5">
              <h4 className="text-sm font-bold text-emerald-800 mb-2 flex items-center gap-2">
                <Briefcase size={16} /> 
                Specific Roles Handled
              </h4>
              <p className="text-sm font-medium text-emerald-700 leading-relaxed">
                {hr.vacanciesFilledList}
              </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HRViewDetails;