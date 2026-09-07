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
  X
} from "lucide-react";
import Footer from "../Footer";

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
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
                              setIsDetailModalOpen(true);
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-5 flex justify-between items-center">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Building2 size={20} /> Staffing Details
              </h3>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-white/80 hover:text-white transition p-1 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase">Company Name</label>
                <p className="text-base font-bold text-gray-900 mt-0.5">{selectedAgency.companyName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase">Category</label>
                  <p className="font-semibold text-purple-700 mt-0.5">{selectedAgency.type}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase">Status</label>
                  <p className="font-semibold text-gray-800 mt-0.5">{selectedAgency.status}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase">Email</label>
                <p className="text-gray-800 mt-0.5">{selectedAgency.email}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase">Mobile Number</label>
                <p className="text-gray-800 mt-0.5">{selectedAgency.phone}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase">Location</label>
                <p className="text-gray-800 mt-0.5">{selectedAgency.location}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default StaffingManagement;
