import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Building2,
  ShieldCheck,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  Trash2,
  X,
  Users,
  TrendingUp,
  Award,
  Pencil,
} from "lucide-react";
import Footer from "../Footer";
import {
  getCompaniesForEmployee
} from "./staffingStore";
import { approveStaffing, deleteStaffing, getStaffingList, getStaffingStats } from "./staffingApi";

const getStatus = (staffing) => String(staffing.status || staffing.approvalStatus || "pending").toLowerCase();
const getId = (staffing) => staffing._id || staffing.id;
const getName = (staffing) => staffing.staffingName || staffing.name || staffing.companyName || "-";
const statValue = (stats, keys, fallback) => keys.reduce((value, key) => value ?? stats?.[key], undefined) ?? fallback;

function StaffingManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- EMPLOYEES / MEMBERS STATE ---
  const [salesEmployees, setSalesEmployees] = useState([]);
  const [pendingStaffings, setPendingStaffings] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [apiError, setApiError] = useState("");
  const [employeesCurrentPage, setEmployeesCurrentPage] = useState(1);
  const employeesPerPage = 5;

  // Edit Employee State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [activeTab, setActiveTab] = useState("approved"); // 'approved' | 'pending' | 'rejected'

  useEffect(() => {
    const loadStaffing = async () => {
      setIsLoading(true);
      setApiError("");
      try {
        const [staffings, pending, staffingStats] = await Promise.all([
          getStaffingList(),
          getStaffingList("pending"),
          getStaffingStats()
        ]);
        setSalesEmployees(staffings);
        setPendingStaffings(pending);
        setStats(staffingStats);
      } catch (error) {
        setApiError(error.response?.data?.message || "Unable to load staffing data.");
      } finally {
        setIsLoading(false);
      }
    };
    loadStaffing();
  }, [location.key]);

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
      getId(emp) === getId(editingEmployee) ? { ...editingEmployee, name: editingEmployee.name.trim() } : emp
    );
    setSalesEmployees(updatedList);
    setIsEditModalOpen(false);
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setActionId(id);
      setApiError("");
      try {
        await deleteStaffing(id);
        setSalesEmployees((previous) => previous.filter((staffing) => getId(staffing) !== id));
        setPendingStaffings((previous) => previous.filter((staffing) => getId(staffing) !== id));
      } catch (error) {
        setApiError(error.response?.data?.message || "Unable to delete staffing.");
      } finally {
        setActionId(null);
      }
    }
  };

  const handleApprove = async (id) => {
    setActionId(id);
    setApiError("");
    try {
      await approveStaffing(id);
      setSalesEmployees((previous) => previous.map((staffing) =>
        getId(staffing) === id ? { ...staffing, status: "approved", approvalStatus: "approved" } : staffing
      ));
      setPendingStaffings((previous) => previous.filter((staffing) => getId(staffing) !== id));
      setStats((previous) => ({ ...previous, pending: Math.max(0, Number(previous.pending || 0) - 1) }));
    } catch (error) {
      setApiError(error.response?.data?.message || "Unable to approve staffing.");
    } finally {
      setActionId(null);
    }
  };

  // Filtered Agency Counts
  const approvedList = useMemo(() => salesEmployees.filter((staffing) => getStatus(staffing) === "approved"), [salesEmployees]);
  const pendingList = pendingStaffings.length ? pendingStaffings : salesEmployees.filter((staffing) => getStatus(staffing) === "pending");
  const rejectedList = useMemo(() => salesEmployees.filter((staffing) => ["rejected", "reject"].includes(getStatus(staffing))), [salesEmployees]);

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
              <span className="text-2xl font-bold text-purple-700 mt-2">{statValue(stats, ["approved", "approvedCount", "totalApproved"], approvedList.length)}</span>
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
              <span className="text-2xl font-bold text-purple-700 mt-2">{statValue(stats, ["pending", "pendingCount", "totalPending"], pendingList.length)}</span>
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
              <span className="text-2xl font-bold text-purple-700 mt-2">{statValue(stats, ["rejected", "rejectedCount", "totalRejected"], rejectedList.length)}</span>
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
                {statValue(stats, ["totalJobsPosted", "jobsPosted", "totalJobs"], salesEmployees.reduce((sum, item) => sum + Number(item.postedJobs || item.totalJobs || 0), 0))}
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

          {apiError && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{apiError}</p>}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm text-center border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-left">Staffing Name</th>
                  <th className="py-3 px-4 font-semibold">Designation</th>
                  <th className="py-3 px-4 font-semibold">Mobile</th>
                  <th className="py-3 px-4 font-semibold">Email</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan="6" className="py-8 text-center text-gray-500">Loading staffing data...</td></tr>
                ) : paginatedEmployees.map((emp) => (
                  <tr key={getId(emp)} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3.5 px-4 text-left font-medium text-gray-900">
                      <div className="flex flex-col">
                        <span>{getName(emp)}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-700 font-semibold">{emp.designation || "-"}</td>
                    <td className="py-3.5 px-4 text-gray-700 font-semibold">{emp.mobileNumber || emp.phone || "-"}</td>
                    <td className="py-3.5 px-4 text-gray-700 font-semibold">{emp.email || "-"}</td>
                    <td className="py-3.5 px-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatus(emp) === "approved" ? "bg-green-100 text-green-700" : getStatus(emp) === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{getStatus(emp)}</span></td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        {/* View Button -> Opens Companies Onboarded (Image 3) */}
                        <button
                          onClick={() =>
                            navigate(`/staffing-management/${getId(emp)}`, {
                              state: {
                                employee: emp,
                                companies: getCompaniesForEmployee(getName(emp))
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

                        {getStatus(emp) === "pending" && (
                          <button onClick={() => handleApprove(getId(emp))} disabled={actionId === getId(emp)} className="rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50" title="Approve staffing">
                            {actionId === getId(emp) ? "..." : "Approve"}
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteEmployee(getId(emp))}
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

      <Footer />
    </div>
  );
}

export default StaffingManagement;
