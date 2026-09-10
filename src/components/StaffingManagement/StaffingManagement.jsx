import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Building2,
  ShieldCheck,
  Clock,
  AlertCircle,
  Search,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  Filter,
  Check,
  X,
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
  Calendar,
  User,
  Briefcase,
  Layers
} from "lucide-react";
import Footer from "../Footer";

const STAFFING_REQUIREMENTS_KEY = "admin_staffing_company_requirements";
const readStore = (key, fallback = {}) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeStore = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors in privacy-restricted environments.
  }
};

// Mock Data for Staffing Agencies
const mockStaffingAgencies = [
  {
    id: 1,
    srNo: "01",
    companyName: "Apex Staffing Solutions",
    email: "contact@apexstaffing.com",
    phone: "+91 98765 43210",
    type: "IT",
    postedJobs: 14,
    location: "Gurugram, Haryana",
    status: "Approved",
    date: "2026-08-10"
  },
  {
    id: 2,
    srNo: "02",
    companyName: "TalentGrid Workforce",
    email: "hr@talentgrid.in",
    phone: "+91 98123 45678",
    type: "Non-IT",
    postedJobs: 8,
    location: "Bengaluru, Karnataka",
    status: "Approved",
    date: "2026-08-12"
  },
  {
    id: 3,
    srNo: "03",
    companyName: "Nexus Talent Partners",
    email: "info@nexustalent.com",
    phone: "+91 97654 32109",
    type: "IT",
    postedJobs: 0,
    location: "Pune, Maharashtra",
    status: "Pending",
    date: "2026-08-18"
  },
  {
    id: 4,
    srNo: "04",
    companyName: "Vanguard Staffing Consultants",
    email: "admin@vanguard.co.in",
    phone: "+91 96543 21098",
    type: "Non-IT",
    postedJobs: 0,
    location: "Noida, Uttar Pradesh",
    status: "Pending",
    date: "2026-08-19"
  },
  {
    id: 5,
    srNo: "05",
    companyName: "Zenith Recruitment Group",
    email: "support@zenithgroup.com",
    phone: "+91 95432 10987",
    type: "IT",
    postedJobs: 0,
    location: "Hyderabad, Telangana",
    status: "Rejected",
    date: "2026-08-15"
  }
];

function StaffingManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [agencies, setAgencies] = useState(mockStaffingAgencies);
  const [activeTab, setActiveTab] = useState("approved"); // 'approved' | 'pending' | 'rejected'
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [perPage, setPerPage] = useState(10);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [showCompanyPage, setShowCompanyPage] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRequirementOpen, setIsRequirementOpen] = useState(false);
  const [requirements, setRequirements] = useState(() => readStore(STAFFING_REQUIREMENTS_KEY, {}));
  const blankRequirement = {
    postedOn: "",
    state: "",
    city: "",
    category: "",
    technology: "",
    requiredCandidates: "",
    experience: "",
    budget: "",
    workMode: "",
    noticePeriod: "",
    deadline: ""
  };
  const [formData, setFormData] = useState(blankRequirement);

  const requirementHeaders = [
    "Posted On",
    "State",
    "City",
    "Category (IT / Non IT)",
    "Technology",
    "Required Candidates",
    "Experience",
    "Budget",
    "Work Mode",
    "Notice Period",
    "Deadline"
  ];

  const selectedRequirements = selectedAgency ? requirements[selectedAgency.id] || {} : {};
  const detailRows = requirementHeaders.map((label) => {
    const keyMap = {
      "Posted On": "postedOn",
      "State": "state",
      "City": "city",
      "Category (IT / Non IT)": "category",
      "Technology": "technology",
      "Required Candidates": "requiredCandidates",
      "Experience": "experience",
      "Budget": "budget",
      "Work Mode": "workMode",
      "Notice Period": "noticePeriod",
      "Deadline": "deadline"
    };

    return {
      label,
      value: selectedRequirements[keyMap[label]] || ""
    };
  });

  const openRequirementForm = () => {
    setFormData(blankRequirement);
    setIsRequirementOpen(true);
  };

  const saveRequirement = (event) => {
    event.preventDefault();

    if (!selectedAgency) return;

    const stored = {
      postedOn: formData.postedOn,
      state: formData.state,
      city: formData.city,
      category: formData.category,
      technology: formData.technology,
      requiredCandidates: formData.requiredCandidates,
      experience: formData.experience,
      budget: formData.budget,
      workMode: formData.workMode,
      noticePeriod: formData.noticePeriod,
      deadline: formData.deadline
    };

    const persisted = readStore(STAFFING_REQUIREMENTS_KEY, {});
    persisted[selectedAgency.id] = stored;
    writeStore(STAFFING_REQUIREMENTS_KEY, persisted);

    setRequirements(persisted);
    setIsRequirementOpen(false);
    setFormData(blankRequirement);
  };

  useEffect(() => {
    if (location.state?.newStaffing) {
      const newAgencyData = location.state.newStaffing;
      const newEntry = {
        id: Date.now(),
        srNo: `0${mockStaffingAgencies.length + 1}`,
        companyName: newAgencyData.companyName,
        email: newAgencyData.email,
        phone: newAgencyData.mobileNumber,
        type: newAgencyData.category || "IT",
        postedJobs: 0,
        location: `${newAgencyData.city}, ${newAgencyData.state}`,
        status: "Pending",
        date: new Date().toISOString().split("T")[0]
      };
      setAgencies((prev) => {
        if (prev.some((item) => item.email === newEntry.email)) return prev;
        return [newEntry, ...prev];
      });
      setActiveTab("pending");
    }
  }, [location.state]);

  // Filtered counts
  const approvedList = useMemo(() => agencies.filter((a) => a.status === "Approved"), [agencies]);
  const pendingList = useMemo(() => agencies.filter((a) => a.status === "Pending"), [agencies]);
  const rejectedList = useMemo(() => agencies.filter((a) => a.status === "Rejected"), [agencies]);

  // Active tab displayed agencies
  const filteredAgencies = useMemo(() => {
    let list = agencies;
    if (activeTab === "approved") list = approvedList;
    else if (activeTab === "pending") list = pendingList;
    else if (activeTab === "rejected") list = rejectedList;

    if (selectedType !== "All") {
      list = list.filter((a) => a.type === selectedType);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (a) =>
          a.companyName.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q)
      );
    }

    return list;
  }, [agencies, activeTab, approvedList, pendingList, rejectedList, selectedType, searchTerm]);

  // Handle Approval / Rejection
  const handleStatusChange = (id, newStatus) => {
    setAgencies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staffing agency?")) {
      setAgencies((prev) => prev.filter((item) => item.id !== id));
    }
  };

  if (showCompanyPage && selectedAgency) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen overflow-y-auto pb-20 flex flex-col justify-between">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          <div className="rounded-2xl bg-white shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  setShowCompanyPage(false);
                  setSelectedAgency(null);
                  setIsRequirementOpen(false);
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900"
              >
                <ArrowLeft size={18} /> Back to Staffing Management
              </button>

              <button
                onClick={openRequirementForm}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700"
              >
                <Plus size={16} /> Add Requirement
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="rounded-lg bg-purple-50 p-3 text-purple-600"><Building2 size={26} /></div>
              <div>
                <h4 className="text-2xl font-bold text-black">{selectedAgency.companyName}</h4>
                <p className="mt-1 text-sm text-gray-500">Company onboarding details</p>
              </div>
            </div>
          </div>

          <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    {detailRows.map((row) => (
                      <th key={row.label} className="border-b border-slate-200 px-3 py-3 text-center text-[11px] font-black uppercase text-slate-600 whitespace-nowrap">
                        {row.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {detailRows.map((row) => (
                      <td key={row.label} className="border-b border-slate-100 px-3 py-4 text-center text-sm font-semibold text-slate-800 whitespace-nowrap">
                        {row.value || ""}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {isRequirementOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
              <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                  <h3 className="text-lg font-bold text-slate-900">Add Requirement</h3>
                  <button onClick={() => setIsRequirementOpen(false)} className="rounded-lg p-1 text-slate-500 hover:bg-slate-100">
                    <X size={18} />
                  </button>
                </div>
                <form onSubmit={saveRequirement} className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Posted On</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.postedOn} onChange={(e) => setFormData({ ...formData, postedOn: e.target.value })} /></label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">State</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} /></label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">City</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} /></label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Category (IT / Non IT)</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} /></label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Technology</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.technology} onChange={(e) => setFormData({ ...formData, technology: e.target.value })} /></label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Required Candidates</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.requiredCandidates} onChange={(e) => setFormData({ ...formData, requiredCandidates: e.target.value })} /></label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Experience</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} /></label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Budget</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} /></label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Work Mode</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.workMode} onChange={(e) => setFormData({ ...formData, workMode: e.target.value })} /></label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Notice Period</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.noticePeriod} onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })} /></label>
                  <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Deadline</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} /></label>

                  <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                    <button type="button" onClick={() => setIsRequirementOpen(false)} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button>
                    <button type="submit" className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">Save Requirement</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-y-auto pb-20 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        
        {/* MAIN CONTAINER CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          
          {/* HEADER TITLE & BUTTON */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Building2 className="text-purple-600" size={26} />
                Staffing Management
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Admin decision center: Accept or Reject new company job requests & manage active employers.
              </p>
            </div>

            <button
              onClick={() => navigate("/staffing-management/create-staffing")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Plus size={18} />
              <span>Add Staffing</span>
            </button>
          </div>

          {/* METRIC SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            
            {/* Approved Companies Card */}
            <div
              onClick={() => setActiveTab("approved")}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeTab === "approved"
                  ? "bg-purple-50/80 border-purple-400 ring-2 ring-purple-300/50 shadow-sm"
                  : "bg-white border-gray-200 hover:border-purple-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-600">Approved Companies</span>
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <ShieldCheck size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">{approvedList.length}</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">Active in Staffing Management</p>
            </div>

            {/* Pending Approvals Card */}
            <div
              onClick={() => setActiveTab("pending")}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                activeTab === "pending"
                  ? "bg-amber-50/80 border-amber-400 ring-2 ring-amber-300/50 shadow-sm"
                  : "bg-white border-gray-200 hover:border-amber-200"
              }`}
            >
              {pendingList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 rounded-full animate-ping"></span>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-600">Pending Approvals</span>
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Clock size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-amber-700 mt-2">{pendingList.length}</p>
              <p className="text-xs text-amber-600 font-medium mt-1">Awaiting Admin Accept/Reject</p>
            </div>

            {/* Rejected Requests Card */}
            <div
              onClick={() => setActiveTab("rejected")}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeTab === "rejected"
                  ? "bg-red-50/80 border-red-400 ring-2 ring-red-300/50 shadow-sm"
                  : "bg-white border-gray-200 hover:border-red-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-600">Rejected Requests</span>
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <AlertCircle size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-red-700 mt-2">{rejectedList.length}</p>
              <p className="text-xs text-red-600 font-medium mt-1">Not shown in Staffing Management</p>
            </div>
          </div>

          {/* TABLE CONTROLS / FILTERS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 mb-6 pb-4">
            
            {/* Search Input */}
            <div className="flex items-center w-full sm:w-[300px] h-[40px] px-3 bg-[#F7F8F9] border border-[#D3D3D3] rounded-xl">
              <Search size={16} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none text-gray-700"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
              
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-[40px] px-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-400"
              >
                <option value="All">All Types</option>
                <option value="IT">IT</option>
                <option value="Non-IT">Non-IT</option>
              </select>

              {/* Status Filter */}
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="h-[40px] px-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-400"
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>

              {/* Items Per Page */}
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="h-[40px] px-3 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-400"
              >
                <option value={10}>10 Per Page</option>
                <option value={20}>20 Per Page</option>
                <option value={50}>50 Per Page</option>
              </select>
            </div>
          </div>

          {/* DATA TABLE / EMPTY STATE */}
          {filteredAgencies.length > 0 ? (
            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                    <th className="py-3.5 px-4 font-semibold">Sr.No.</th>
                    <th className="py-3.5 px-4 font-semibold">Company</th>
                    <th className="py-3.5 px-4 font-semibold text-center">Type</th>
                    <th className="py-3.5 px-4 font-semibold text-center">Posted Jobs</th>
                    <th className="py-3.5 px-4 font-semibold">Contact & Location</th>
                    <th className="py-3.5 px-4 font-semibold text-center">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAgencies.slice(0, perPage).map((agency, index) => (
                    <tr key={agency.id} className="hover:bg-gray-50/80 transition">
                      <td className="py-4 px-4 text-gray-500 font-medium">0{index + 1}</td>
                      <td className="py-4 px-4">
                        <p className="font-semibold text-gray-900">{agency.companyName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{agency.email}</p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          agency.type === "IT" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                        }`}>
                          {agency.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-semibold text-gray-700">
                        {agency.postedJobs}
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-600">
                        <p className="font-medium text-gray-800">{agency.phone}</p>
                        <p className="text-gray-400 mt-0.5">{agency.location}</p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          agency.status === "Approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : agency.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            agency.status === "Approved"
                              ? "bg-emerald-500"
                              : agency.status === "Pending"
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`} />
                          {agency.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          
                          {/* Accept Action for Pending */}
                          {agency.status === "Pending" && (
                            <button
                              onClick={() => handleStatusChange(agency.id, "Approved")}
                              className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition"
                              title="Approve Agency"
                            >
                              <Check size={16} />
                            </button>
                          )}

                          {/* Reject Action for Pending */}
                          {agency.status === "Pending" && (
                            <button
                              onClick={() => handleStatusChange(agency.id, "Rejected")}
                              className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
                              title="Reject Agency"
                            >
                              <X size={16} />
                            </button>
                          )}

                          {/* View Details */}
                          <button
                            onClick={() => {
                              setSelectedAgency(agency);
                              setShowCompanyPage(true);
                              setIsDetailModalOpen(false);
                            }}
                            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(agency.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* EMPTY STATE MATCHING REFERENCE SCREENSHOT */
            <div className="py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-gray-400">
                <Building2 size={32} />
              </div>
              <h5 className="text-base font-semibold text-gray-700">No approved employers found.</h5>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search terms or filter selection.</p>
            </div>
          )}

        </div>

      </div>

      {/* DETAIL MODAL */}
      {isDetailModalOpen && selectedAgency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl overflow-hidden">
            <div className="flex items-center justify-between gap-4 p-5 border-b border-gray-200">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900"
              >
                <ArrowLeft size={18} /> Back to Staffing Management
              </button>

              <button
                onClick={openRequirementForm}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700"
              >
                <Plus size={16} /> Add Requirement
              </button>
            </div>

            <div className="p-6">
              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                <div className="mt-2 flex items-center gap-3">
                  <div className="rounded-lg bg-purple-50 p-3 text-purple-600"><Building2 size={26} /></div>
                  <div>
                    <h4 className="text-2xl font-bold text-black">{selectedAgency.companyName}</h4>
                    <p className="mt-1 text-sm text-gray-500">Company onboarding details</p>
                  </div>
                </div>
              </div>

              <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 mt-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        {detailRows.map((row) => (
                          <th key={row.label} className="border-b border-slate-200 px-3 py-3 text-center text-[11px] font-black uppercase text-slate-600 whitespace-nowrap">
                            {row.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {detailRows.map((row) => (
                          <td key={row.label} className="border-b border-slate-100 px-3 py-4 text-center text-sm font-semibold text-slate-800 whitespace-nowrap">
                            {row.value || ""}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {isRequirementOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
                <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <h3 className="text-lg font-bold text-slate-900">Add Requirement</h3>
                    <button
                      onClick={() => setIsRequirementOpen(false)}
                      className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={saveRequirement} className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
                    <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Posted On</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.postedOn} onChange={(e) => setFormData({ ...formData, postedOn: e.target.value })} /></label>
                    <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">State</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} /></label>
                    <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">City</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} /></label>
                    <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Category (IT / Non IT)</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} /></label>
                    <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Technology</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.technology} onChange={(e) => setFormData({ ...formData, technology: e.target.value })} /></label>
                    <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Required Candidates</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.requiredCandidates} onChange={(e) => setFormData({ ...formData, requiredCandidates: e.target.value })} /></label>
                    <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Experience</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} /></label>
                    <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Budget</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} /></label>
                    <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Work Mode</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.workMode} onChange={(e) => setFormData({ ...formData, workMode: e.target.value })} /></label>
                    <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Notice Period</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.noticePeriod} onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })} /></label>
                    <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Deadline</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} /></label>

                    <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                      <button type="button" onClick={() => setIsRequirementOpen(false)} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button>
                      <button type="submit" className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">Save Requirement</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default StaffingManagement;
