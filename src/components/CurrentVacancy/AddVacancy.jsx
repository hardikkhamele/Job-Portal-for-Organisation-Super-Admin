import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  CheckCircle2,
  Plus,
  ArrowLeft,
  Briefcase,
  Globe,
  MapPin,
  Mail,
  Phone,
  User,
  Trash2,
  Save,
  X
} from "lucide-react";
import Footer from "../Footer";
import Breadcrumb from "../common/Breadcrumb";
import { addVacancy } from "./vacancyStore";

const industryOptions = [
  "Information Technology",
  "Healthcare & Pharma",
  "Banking & Financial Services",
  "E-Commerce & Retail",
  "Education & EdTech",
  "Manufacturing & Industrial",
  "Telecommunications",
  "Logistics & Supply Chain",
  "Consulting & Services",
  "Other"
];

const stateOptions = [
  "Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Maharashtra",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];

const cityOptions = [
  "Ahmedabad", "Bengaluru", "Chennai", "Delhi", "Hyderabad",
  "Kolkata", "Mumbai", "New Delhi", "Noida", "Pune"
];

const experienceOptions = [
  "0-1 Years", "1-2 Years", "2-3 Years", "3-4 Years",
  "4-5 Years", "5-6 Years", "6-7 Years", "7-8 Years",
  "8-9 Years", "9-10 Years", "10+ Years"
];

const workModeOptions = ["Remote", "Onsite", "Hybrid"];

const noticePeriodOptions = [
  "Immediate", "15 Days", "30 Days", "45 Days", "60 Days", "90 Days"
];

function AddVacancy() {
  const navigate = useNavigate();

  // Company Information State
  const [companyData, setCompanyData] = useState({
    companyType: "IT",
    companyName: "",
    industrySector: "Information Technology",
    email: "",
    contactNumber: "",
    website: "",
    address: "",
    hrName: "",
    hrMobile: "",
    hrEmail: ""
  });

  // Multiple Job Requirements State
  const [requirements, setRequirements] = useState([
    {
      id: Date.now(),
      category: "IT",
      profile: "",
      state: "",
      city: "",
      technology: "",
      requiredCandidates: "",
      experience: "",
      budget: "",
      workMode: "",
      noticePeriod: "",
      deadline: ""
    }
  ]);

  // Add another requirement card
  const handleAddAnotherRequirement = () => {
    setRequirements((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        category: companyData.companyType || "IT",
        profile: "",
        state: "",
        city: "",
        technology: "",
        requiredCandidates: "",
        experience: "",
        budget: "",
        workMode: "",
        noticePeriod: "",
        deadline: ""
      }
    ]);
  };

  // Remove a requirement card
  const handleRemoveRequirement = (reqId) => {
    if (requirements.length === 1) {
      alert("At least one requirement is required.");
      return;
    }
    setRequirements((prev) => prev.filter((r) => r.id !== reqId));
  };

  // Update specific requirement field
  const handleRequirementChange = (reqId, field, value) => {
    setRequirements((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, [field]: value } : r))
    );
  };

  // Submit and Save Company & Requirements
  const handleSubmitAll = (e) => {
    e.preventDefault();

    if (!companyData.companyName.trim()) {
      alert("Please enter a Company Name.");
      return;
    }

    // Filter valid requirements (must have profile)
    const validReqs = requirements.filter((r) => r.profile.trim() !== "");

    if (validReqs.length === 0) {
      alert("Please enter at least one job Profile for requirement.");
      return;
    }

    // Save each requirement into store
    validReqs.forEach((req) => {
      addVacancy({
        companyType: companyData.companyType,
        companyName: companyData.companyName,
        industrySector: companyData.industrySector,
        email: companyData.email,
        contactNumber: companyData.contactNumber,
        website: companyData.website,
        address: companyData.address,
        hrName: companyData.hrName,
        hrMobile: companyData.hrMobile,
        hrEmail: companyData.hrEmail,
        category: req.category || companyData.companyType || "IT",
        profile: req.profile,
        state: req.state,
        city: req.city,
        technology: req.technology,
        noOfVacancy: req.requiredCandidates || 1,
        requiredCandidates: req.requiredCandidates || 1,
        experience: req.experience,
        budget: req.budget,
        workMode: req.workMode || "Onsite",
        noticePeriod: req.noticePeriod,
        deadline: req.deadline,
        addedBy: "Super Admin"
      });
    });

    navigate("/current-vacancy");
  };

  return (
    <div className="w-full bg-[#F8FAFC] p-4 min-h-screen flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">

        {/* --- BREADCRUMB --- */}
        <Breadcrumb
          items={[
            { label: "Staffing Management", link: "/staffing-management" },
            { label: "Current Vacancy", link: "/current-vacancy" },
            { label: "Add New Company & Requirements" }
          ]}
        />

        {/* --- TOP HEADER --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/current-vacancy")}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition cursor-pointer text-gray-600 shrink-0"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <Building2 className="text-purple-600" size={26} />
                Add New Company
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Fill in company or contact details (all fields are optional) and define job requirements.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmitAll} className="flex flex-col gap-6">

          {/* ========================================================================= */}
          {/* SECTION 1: COMPANY INFORMATION                                           */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col gap-5">
            <h5 className="text-xs font-black uppercase text-gray-800 tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3">
              <Building2 size={16} className="text-purple-600" />
              Company Information
            </h5>

            {/* COMPANY TYPE PILL BUTTONS */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase text-gray-700 block tracking-wider">
                Company Type
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCompanyData({ ...companyData, companyType: "IT" })}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer border ${
                    companyData.companyType === "IT"
                      ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  IT
                </button>
                <button
                  type="button"
                  onClick={() => setCompanyData({ ...companyData, companyType: "Non IT" })}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer border ${
                    companyData.companyType === "Non IT"
                      ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  NON - IT
                </button>
              </div>
            </div>

            {/* COMPANY NAME & INDUSTRY SECTOR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-1">
                <span className="text-[11px] font-bold uppercase text-gray-700 block">COMPANY NAME *</span>
                <div className="relative">
                  <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="text"
                    placeholder="Enter company name"
                    value={companyData.companyName}
                    onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                  />
                </div>
              </label>

              <label className="space-y-1">
                <span className="text-[11px] font-bold uppercase text-gray-700 block">INDUSTRY SECTOR</span>
                <div className="relative">
                  <Briefcase size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={companyData.industrySector}
                    onChange={(e) => setCompanyData({ ...companyData, industrySector: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 cursor-pointer font-medium"
                  >
                    {industryOptions.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
              </label>
            </div>

            {/* EMAIL & PHONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-1">
                <span className="text-[11px] font-bold uppercase text-gray-700 block">COMPANY OFFICIAL EMAIL</span>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="e.g. contact@company.com"
                    value={companyData.email}
                    onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                  />
                </div>
              </label>

              <label className="space-y-1">
                <span className="text-[11px] font-bold uppercase text-gray-700 block">COMPANY MOBILE / PHONE</span>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="e.g. +91 011-23456789 / +91 98765 00000"
                    value={companyData.contactNumber}
                    onChange={(e) => setCompanyData({ ...companyData, contactNumber: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                  />
                </div>
              </label>
            </div>

            {/* WEBSITE */}
            <label className="space-y-1">
              <span className="text-[11px] font-bold uppercase text-gray-700 block">WEBSITE</span>
              <div className="relative">
                <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  placeholder="e.g. https://www.company.com"
                  value={companyData.website}
                  onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                />
              </div>
            </label>

            {/* ADDRESS */}
            <label className="space-y-1">
              <span className="text-[11px] font-bold uppercase text-gray-700 block">ADDRESS</span>
              <div className="relative">
                <MapPin size={15} className="absolute left-3.5 top-3 text-gray-400" />
                <textarea
                  rows={2}
                  placeholder="Enter complete company address"
                  value={companyData.address}
                  onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 resize-none"
                />
              </div>
            </label>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 2: CONTACT PERSON / HR DETAILS                                    */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col gap-4">
            <h5 className="text-xs font-black uppercase text-gray-800 tracking-wider flex items-center gap-2 border-b border-gray-100 pb-3">
              <User size={16} className="text-purple-600" />
              Contact Person / HR Details
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* HR Name */}
              <label className="space-y-1">
                <span className="text-[11px] font-bold uppercase text-gray-700 block">CONTACT PERSON / HR NAME</span>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g. John Doe (HR Manager)"
                    value={companyData.hrName}
                    onChange={(e) => setCompanyData({ ...companyData, hrName: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                  />
                </div>
              </label>

              {/* HR Mobile */}
              <label className="space-y-1">
                <span className="text-[11px] font-bold uppercase text-gray-700 block">HR MOBILE NUMBER</span>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={companyData.hrMobile}
                    onChange={(e) => setCompanyData({ ...companyData, hrMobile: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                  />
                </div>
              </label>

              {/* HR Email */}
              <label className="space-y-1">
                <span className="text-[11px] font-bold uppercase text-gray-700 block">HR EMAIL</span>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="e.g. hr@company.com"
                    value={companyData.hrEmail}
                    onChange={(e) => setCompanyData({ ...companyData, hrEmail: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                  />
                </div>
              </label>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 3: JOB REQUIREMENTS (CARD PER REQUIREMENT)                        */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-4">
            <h5 className="text-xs font-black uppercase text-gray-800 tracking-wider flex items-center gap-2">
              <Briefcase size={16} className="text-purple-600" />
              Job Requirements
            </h5>

            {requirements.map((req, index) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl shadow-sm p-6 border border-purple-100 flex flex-col gap-4 relative"
              >
                {/* CARD HEADER */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h6 className="font-bold text-sm text-purple-900">
                      Requirement #{index + 1}
                    </h6>
                  </div>

                  {requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(req.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  )}
                </div>

                {/* REQUIREMENT FIELDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* CATEGORY */}
                  <label className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-gray-700 block">CATEGORY (IT / NON IT)</span>
                    <select
                      value={req.category}
                      onChange={(e) => handleRequirementChange(req.id, "category", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 cursor-pointer font-medium"
                    >
                      <option value="IT">IT</option>
                      <option value="Non IT">Non IT</option>
                    </select>
                  </label>

                  {/* PROFILE */}
                  <label className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-gray-700 block">PROFILE</span>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Senior Frontend Developer"
                      value={req.profile}
                      onChange={(e) => handleRequirementChange(req.id, "profile", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                    />
                  </label>

                  {/* STATE */}
                  <label className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-gray-700 block">STATE</span>
                    <select
                      value={req.state}
                      onChange={(e) => handleRequirementChange(req.id, "state", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 cursor-pointer font-medium"
                    >
                      <option value="">Select State</option>
                      {stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>

                  {/* CITY */}
                  <label className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-gray-700 block">CITY</span>
                    <select
                      value={req.city}
                      onChange={(e) => handleRequirementChange(req.id, "city", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 cursor-pointer font-medium"
                    >
                      <option value="">Select City</option>
                      {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </label>

                  {/* TECHNOLOGY */}
                  <label className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-gray-700 block">TECHNOLOGY</span>
                    <input
                      type="text"
                      placeholder="e.g. React, Node.js"
                      value={req.technology}
                      onChange={(e) => handleRequirementChange(req.id, "technology", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                    />
                  </label>

                  {/* REQUIRED CANDIDATES */}
                  <label className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-gray-700 block">REQUIRED CANDIDATES</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 5"
                      value={req.requiredCandidates}
                      onChange={(e) => handleRequirementChange(req.id, "requiredCandidates", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                    />
                  </label>

                  {/* EXPERIENCE */}
                  <label className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-gray-700 block">EXPERIENCE</span>
                    <select
                      value={req.experience}
                      onChange={(e) => handleRequirementChange(req.id, "experience", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 cursor-pointer font-medium"
                    >
                      <option value="">Select Experience</option>
                      {experienceOptions.map((exp) => <option key={exp} value={exp}>{exp}</option>)}
                    </select>
                  </label>

                  {/* BUDGET */}
                  <label className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-gray-700 block">BUDGET</span>
                    <input
                      type="text"
                      placeholder="e.g. 800000"
                      value={req.budget}
                      onChange={(e) => handleRequirementChange(req.id, "budget", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                    />
                  </label>

                  {/* WORK MODE */}
                  <label className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-gray-700 block">WORK MODE</span>
                    <select
                      value={req.workMode}
                      onChange={(e) => handleRequirementChange(req.id, "workMode", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 cursor-pointer font-medium"
                    >
                      <option value="">Select Work Mode</option>
                      {workModeOptions.map((wm) => <option key={wm} value={wm}>{wm}</option>)}
                    </select>
                  </label>

                  {/* NOTICE PERIOD */}
                  <label className="space-y-1">
                    <span className="text-[11px] font-bold uppercase text-gray-700 block">NOTICE PERIOD</span>
                    <select
                      value={req.noticePeriod}
                      onChange={(e) => handleRequirementChange(req.id, "noticePeriod", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 cursor-pointer font-medium"
                    >
                      <option value="">Select Notice Period</option>
                      {noticePeriodOptions.map((np) => <option key={np} value={np}>{np}</option>)}
                    </select>
                  </label>

                  {/* DEADLINE */}
                  <label className="space-y-1 md:col-span-2">
                    <span className="text-[11px] font-bold uppercase text-gray-700 block">DEADLINE</span>
                    <input
                      type="date"
                      value={req.deadline}
                      onChange={(e) => handleRequirementChange(req.id, "deadline", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 font-medium"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM BUTTON BAR                                                         */}
          {/* ========================================================================= */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-6">
            {/* Left Button: + Add Another Requirement */}
            <button
              type="button"
              onClick={handleAddAnotherRequirement}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-purple-300 text-purple-700 hover:bg-purple-50 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer bg-white"
            >
              <Plus size={16} />
              Add Another Requirement
            </button>

            {/* Right Buttons: Cancel & Save Company & Requirements */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => navigate("/current-vacancy")}
                className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 font-bold text-xs transition cursor-pointer bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Save size={16} />
                Save Company & Requirements
              </button>
            </div>
          </div>

        </form>

      </div>

      <Footer />
    </div>
  );
}

export default AddVacancy;
