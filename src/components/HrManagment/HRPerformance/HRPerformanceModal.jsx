import React from "react";
import { X, User, Briefcase, Mail, Phone, Target, PhoneCall, UserPlus, FileText, CheckCircle2 } from "lucide-react";
import HRStatusBadge from "./HRStatusBadge";

const HRPerformanceModal = ({ isOpen, onClose, hr }) => {
  if (!isOpen || !hr) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-white">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg">
              <User size={20} />
            </span>
            HR Performance Details
          </h3>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row gap-5 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white font-bold flex items-center justify-center text-2xl shadow-md shrink-0">
              {hr.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-800">{hr.name}</h2>
                <HRStatusBadge type="status" value={hr.isActiveToday} />
              </div>
              <p className="text-purple-600 font-semibold mb-3">{hr.designation}</p>
              
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Mail size={16} className="text-gray-400" />
                  {hr.email}
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={16} className="text-gray-400" />
                  {hr.phone}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100 mb-6" />

          {/* Metrics Grid */}
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Work Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            
            {/* Job Profile / Mode */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex gap-3">
              <div className="mt-0.5 text-blue-500"><Briefcase size={18} /></div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">Job Type & Mode</p>
                <p className="font-bold text-gray-800">{hr.jobType}</p>
                <div className="mt-1">
                  <HRStatusBadge type="workMode" value={hr.workMode} />
                </div>
              </div>
            </div>

            {/* Target */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex gap-3">
              <div className="mt-0.5 text-amber-500"><Target size={18} /></div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">Daily Target</p>
                <p className="font-bold text-gray-800">{hr.target} Calls/Day</p>
              </div>
            </div>

            {/* Calls Done */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex gap-3">
              <div className="mt-0.5 text-purple-500"><PhoneCall size={18} /></div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">Calls Done</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-bold text-purple-700">{hr.callsToday}</p>
                  <p className="text-xs font-medium text-gray-500">today</p>
                </div>
              </div>
            </div>

            {/* Onboarded Candidates */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex gap-3">
              <div className="mt-0.5 text-emerald-500"><UserPlus size={18} /></div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">Candidates Onboarded</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-bold text-emerald-700">{hr.candidatesOnboarded}</p>
                  <p className="text-xs font-medium text-gray-500">total</p>
                </div>
              </div>
            </div>
            
          </div>

          {/* Vacancies Filled Details */}
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 mt-6">Vacancies Handled</h4>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-emerald-600"><CheckCircle2 size={18} /></div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Total Filled: <span className="text-gray-800 font-bold">{hr.vacanciesFilled}</span></p>
                <p className="text-sm font-bold text-gray-800 leading-relaxed">
                  Roles: <span className="font-medium text-gray-600">{hr.vacanciesFilledList}</span>
                </p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg text-sm transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default HRPerformanceModal;
