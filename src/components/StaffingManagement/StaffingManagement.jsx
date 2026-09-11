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
  Trash2,
  Check,
  X,
  ArrowLeft,
  Users,
  TrendingUp,
  Award,
  Pencil,
  Ban
} from "lucide-react";
import Footer from "../Footer";
import BlockModal from "../common/BlockModal";
import {
  getStaffingEmployees,
  saveStaffingEmployees,
  getCompaniesForEmployee,
  STAFFING_REQUIREMENTS_KEY,
  readLocalStorage,
  writeLocalStorage
} from "./staffingStore";

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

  // --- EMPLOYEES / MEMBERS STATE ---
  const [salesEmployees, setSalesEmployees] = useState(() => getStaffingEmployees());
  const [employeesCurrentPage, setEmployeesCurrentPage] = useState(1);
  const employeesPerPage = 5;

  // Edit Employee State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Block Modal State
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [selectedEmployeeForBlock, setSelectedEmployeeForBlock] = useState(null);

  // --- AGENCIES STATE ---
  const [agencies, setAgencies] = useState(mockStaffingAgencies);
  const [activeTab, setActiveTab] = useState("approved"); // 'approved' | 'pending' | 'rejected'

  // Sync employees on load or when newStaffing arrives
  useEffect(() => {
    if (location.state?.newStaffing) {
      const newStaffingData = location.state.newStaffing;
      const memberName = (newStaffingData.name || newStaffingData.companyName || "").trim();
      if (memberName) {
        setSalesEmployees((prev) => {
          if (prev.some((emp) => emp.name.toLowerCase() === memberName.toLowerCase())) {
            return prev;
          }
          const nextId = prev.length > 0 ? Math.max(...prev.map((e) => Number(e.id) || 0)) + 1 : 1;
          const newEntry = {
            id: nextId,
            name: memberName,
            designation: newStaffingData.designation || "Staffing Member",
            email: newStaffingData.email || "",
            phone: newStaffingData.mobileNumber || "",
            total: 0,
            today: 0,
            completed: 0,
            pending: 0,
            performance: 100,
            isBlocked: false
          };
          const updated = [newEntry, ...prev];
          saveStaffingEmployees(updated);
          return updated;
        });
      }
    }
  }, [location.state]);

  // Paginated Employees
  const paginatedEmployees = useMemo(() => {
    const startIndex = (employeesCurrentPage - 1) * employeesPerPage;
    return salesEmployees.slice(startIndex, startIndex + employeesPerPage);
  }, [salesEmployees, employeesCurrentPage]);

  const totalEmployeePages = Math.max(1, Math.ceil(salesEmployees.length / employeesPerPage));

  // Edit Employee handlers
  const handleEditClick = (emp) => {
    setEditingEmployee({ ...emp });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingEmployee || !editingEmployee.name.trim()) return;

    const updatedList = salesEmployees.map((emp) =>
      emp.id === editingEmployee.id ? { ...editingEmployee, name: editingEmployee.name.trim() } : emp
    );
    setSalesEmployees(updatedList);
    saveStaffingEmployees(updatedList);
    setIsEditModalOpen(false);
    setEditingEmployee(null);
  };

  // Block Employee handlers
  const handleBlockClick = (emp) => {
    setSelectedEmployeeForBlock(emp);
    setOpenBlockModal(true);
  };

  const handleConfirmBlock = () => {
    if (!selectedEmployeeForBlock) return;
    const updatedList = salesEmployees.map((emp) =>
      emp.id === selectedEmployeeForBlock.id ? { ...emp, isBlocked: !emp.isBlocked } : emp
    );
    setSalesEmployees(updatedList);
    saveStaffingEmployees(updatedList);
    setOpenBlockModal(false);
    setSelectedEmployeeForBlock(null);
  };

  // Delete Employee handler
  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updatedList = salesEmployees.filter((emp) => emp.id !== id);
      setSalesEmployees(updatedList);
      saveStaffingEmployees(updatedList);
      if (paginatedEmployees.length === 1 && employeesCurrentPage > 1) {
        setEmployeesCurrentPage((prev) => prev - 1);
      }
    }
  };

  // Filtered Agency Counts
  const approvedList = useMemo(() => agencies.filter((a) => a.status === "Approved"), [agencies]);
  const pendingList = useMemo(() => agencies.filter((a) => a.status === "Pending"), [agencies]);
  const rejectedList = useMemo(() => agencies.filter((a) => a.status === "Rejected"), [agencies]);

  return (
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* --- TOP HEADER (IMAGE 1) --- */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-2xl font-bold text-black flex items-center gap-2">
                <Building2 className="text-purple-600" size={26} />
                Staffing Management
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Admin decision center: Accept or Reject new company job requests & manage active staffing employers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/staffing-management/create-staffing")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto h-11 shadow-sm"
            >
              <Plus size={18} />
              <span>Add Sales Member</span>
            </button>
          </div>
          <hr className="border-gray-200 mt-4" />
        </div>

        {/* --- 4 STAT CARDS (IMAGE 1) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setActiveTab("approved")}
            className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition cursor-pointer ${
              activeTab === "approved" ? "ring-2 ring-purple-300/50 border-purple-400" : ""
            }`}
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Approved Agencies</span>
              <span className="text-2xl font-bold text-purple-700 mt-2">{approvedList.length}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600 font-medium">
                <TrendingUp size={14} />
                <span>Active Listing</span>
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <ShieldCheck size={24} />
            </div>
          </div>

          <div
            onClick={() => setActiveTab("pending")}
            className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition cursor-pointer relative ${
              activeTab === "pending" ? "ring-2 ring-amber-300/50 border-amber-400" : ""
            }`}
          >
            {pendingList.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 rounded-full animate-ping"></span>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Pending Approvals</span>
              <span className="text-2xl font-bold text-purple-700 mt-2">{pendingList.length}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-amber-600 font-medium">
                <Clock size={14} />
                <span>Awaiting review</span>
              </div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
              <Clock size={24} />
            </div>
          </div>

          <div
            onClick={() => setActiveTab("rejected")}
            className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition cursor-pointer ${
              activeTab === "rejected" ? "ring-2 ring-red-300/50 border-red-400" : ""
            }`}
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Rejected Requests</span>
              <span className="text-2xl font-bold text-purple-700 mt-2">{rejectedList.length}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-red-600 font-medium">
                <AlertCircle size={14} />
                <span>Not active</span>
              </div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg text-red-600">
              <AlertCircle size={24} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Total Jobs Posted</span>
              <span className="text-2xl font-bold text-purple-700 mt-2">
                {agencies.reduce((sum, item) => sum + item.postedJobs, 0)}
              </span>
              <div className="flex items-center gap-1 mt-2 text-xs text-purple-600 font-medium">
                <Users size={14} />
                <span>Workforce demand</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <Award size={24} />
            </div>
          </div>
        </div>

        {/* --- SECTION: SALES EMPLOYEE PERFORMANCE (IMAGE 2) --- */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-purple-600" size={20} />
            <h5 className="text-lg font-bold text-black">Sales Employee Performance</h5>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm text-center border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-left">Staffing Name</th>
                  <th className="py-3 px-4 font-semibold">Designation</th>
                  <th className="py-3 px-4 font-semibold">Mobile</th>
                  <th className="py-3 px-4 font-semibold">Email</th>
                  <th className="py-3 px-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map((emp) => (
                  <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3.5 px-4 text-left font-medium text-gray-900">
                      <div className="flex flex-col">
                        <span>{emp.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700 font-semibold">{emp.designation || "-"}</td>
                    <td className="py-3.5 px-4 text-gray-700 font-semibold">{emp.phone || "-"}</td>
                    <td className="py-3.5 px-4 text-gray-700 font-semibold">{emp.email || "-"}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        {/* View Button -> Opens Companies Onboarded (Image 3) */}
                        <button
                          onClick={() =>
                            navigate(`/staffing-management/${emp.id}`, {
                              state: {
                                employee: emp,
                                companies: getCompaniesForEmployee(emp.name)
                              }
                            })
                          }
                          className="text-purple-600 hover:text-purple-800 transition cursor-pointer p-1"
                          title="View Onboarded Companies"
                        >
                          <Eye size={18} />
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => handleEditClick(emp)}
                          className="text-blue-600 hover:text-blue-800 transition cursor-pointer p-1"
                          title="Edit Member"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* Block/Unblock Button */}
                        <div
                          className="cursor-pointer p-1"
                          onClick={() => handleBlockClick(emp)}
                          title={emp.isBlocked ? "Unblock Member" : "Block Member"}
                        >
                          <Ban
                            size={18}
                            className={`transition ${
                              emp.isBlocked ? "text-red-700 font-bold" : "text-red-500 hover:text-red-700"
                            }`}
                          />
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteEmployee(emp.id)}
                          className="text-red-500 hover:text-red-700 transition cursor-pointer p-1"
                          title="Delete Member"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-5">
            <span className="text-xs text-gray-500">
              Showing {salesEmployees.length > 0 ? (employeesCurrentPage - 1) * employeesPerPage + 1 : 0} to{" "}
              {Math.min(salesEmployees.length, employeesCurrentPage * employeesPerPage)} of {salesEmployees.length} entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setEmployeesCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={employeesCurrentPage === 1}
                className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition cursor-pointer ${
                  employeesCurrentPage === 1
                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-purple-300 text-purple-700 hover:bg-purple-50"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setEmployeesCurrentPage((prev) => Math.min(prev + 1, totalEmployeePages))}
                disabled={employeesCurrentPage === totalEmployeePages}
                className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition cursor-pointer ${
                  employeesCurrentPage === totalEmployeePages
                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-purple-300 text-purple-700 hover:bg-purple-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>


      </div>

      {/* --- EDIT EMPLOYEE MODAL --- */}
      {isEditModalOpen && editingEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Edit Member</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Employee Name</label>
                <input
                  required
                  type="text"
                  value={editingEmployee.name}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Designation</label>
                <input
                  type="text"
                  value={editingEmployee.designation || ""}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, designation: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Total Companies</label>
                  <input
                    type="number"
                    value={editingEmployee.total}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, total: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Today's Onboarding</label>
                  <input
                    type="number"
                    value={editingEmployee.today}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, today: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Completed</label>
                  <input
                    type="number"
                    value={editingEmployee.completed}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, completed: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Pending</label>
                  <input
                    type="number"
                    value={editingEmployee.pending}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, pending: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- BLOCK MODAL --- */}
      <BlockModal
        isOpen={openBlockModal}
        onClose={() => setOpenBlockModal(false)}
        onConfirm={handleConfirmBlock}
        title={selectedEmployeeForBlock?.isBlocked ? "Unblock Member" : "Block Member"}
        message={
          selectedEmployeeForBlock?.isBlocked
            ? `Are you sure you want to unblock ${selectedEmployeeForBlock?.name}?`
            : `Are you sure you want to block ${selectedEmployeeForBlock?.name}?`
        }
        buttonText={selectedEmployeeForBlock?.isBlocked ? "Unblock" : "Block"}
        variant={selectedEmployeeForBlock?.isBlocked ? "primary" : "danger"}
      />

      <Footer />
    </div>
  );
}

export default StaffingManagement;
