import React, { useState, useMemo } from "react";
import {
  Search,
  Users,
  Building2,
  Calendar,
  Clock,
  Eye,
  X,
  TrendingUp,
  Award,
  Filter,
  CheckCircle,
  AlertCircle,
  Plus,
  Pencil,
  Trash2
} from "lucide-react";
import Footer from "../Footer";

// Realistic Mock Data for Sales Employees
const mockSalesEmployees = [
  { id: 1, name: "Aarav Sharma", total: 45, today: 3, completed: 40, pending: 5, performance: 88 },
  { id: 2, name: "Ananya Iyer", total: 38, today: 2, completed: 35, pending: 3, performance: 92 },
  { id: 3, name: "Rohan Verma", total: 50, today: 5, completed: 42, pending: 8, performance: 84 },
  { id: 4, name: "Priya Patel", total: 29, today: 1, completed: 27, pending: 2, performance: 93 },
  { id: 5, name: "Vikram Singh", total: 33, today: 0, completed: 30, pending: 3, performance: 90 }
];

// Realistic Mock Data for Onboarded Companies
const mockOnboardedCompanies = [
  {
    id: 101,
    companyName: "TechVantage Solutions Ltd",
    employerName: "Rajesh Gupta",
    onboardedBy: "Aarav Sharma",
    date: "2026-08-19",
    status: "Completed",
    email: "hr@techvantage.com",
    phone: "+91 98765 43210",
    sector: "Information Technology",
    website: "www.techvantage.com",
    address: "DLF Cyber City, Phase 3, Gurugram, Haryana",
    employeeCount: "150-200"
  },
  {
    id: 102,
    companyName: "Innovate Web Corp",
    employerName: "Meera Deshmukh",
    onboardedBy: "Ananya Iyer",
    date: "2026-08-19",
    status: "Completed",
    email: "careers@innovateweb.io",
    phone: "+91 87654 32109",
    sector: "Software Development",
    website: "www.innovateweb.io",
    address: "Bandra Kurla Complex, Mumbai, Maharashtra",
    employeeCount: "50-100"
  },
  {
    id: 103,
    companyName: "Apex Retail Group",
    employerName: "Suresh Kumar",
    onboardedBy: "Rohan Verma",
    date: "2026-08-19",
    status: "Pending",
    email: "contact@apexretail.in",
    phone: "+91 76543 21098",
    sector: "Retail & E-commerce",
    website: "www.apexretail.in",
    address: "Whitefield Main Road, Bengaluru, Karnataka",
    employeeCount: "500+"
  },
  {
    id: 104,
    companyName: "BlueSky Logistics",
    employerName: "Amit Patel",
    onboardedBy: "Rohan Verma",
    date: "2026-08-18",
    status: "Completed",
    email: "info@blueskylogistics.com",
    phone: "+91 65432 10987",
    sector: "Logistics & Supply Chain",
    website: "www.blueskylogistics.com",
    address: "GIDC Industrial Estate, Vadodara, Gujarat",
    employeeCount: "100-150"
  },
  {
    id: 105,
    companyName: "Zenith Finance Group",
    employerName: "Neha Sharma",
    onboardedBy: "Priya Patel",
    date: "2026-08-17",
    status: "Completed",
    email: "hr@zenithfinance.co.in",
    phone: "+91 54321 09876",
    sector: "Financial Services",
    website: "www.zenithfinance.co.in",
    address: "Connaught Place, New Delhi",
    employeeCount: "250-300"
  },
  {
    id: 106,
    companyName: "GreenTerra Organics",
    employerName: "Sanjay Joshi",
    onboardedBy: "Vikram Singh",
    date: "2026-08-16",
    status: "Pending",
    email: "sanjay@greenterra.org",
    phone: "+91 43210 98765",
    sector: "Agriculture & Organic Products",
    website: "www.greenterra.org",
    address: "Hinjewadi IT Park, Phase 1, Pune, Maharashtra",
    employeeCount: "20-50"
  },
  {
    id: 107,
    companyName: "Starlight EdTech",
    employerName: "Pooja Reddy",
    onboardedBy: "Aarav Sharma",
    date: "2026-08-15",
    status: "Completed",
    email: "support@starlight.edu",
    phone: "+91 32109 87654",
    sector: "Education Technology",
    website: "www.starlight.edu",
    address: "Gachibowli, Hyderabad, Telangana",
    employeeCount: "80-120"
  },
  {
    id: 108,
    companyName: "Nova Healthtech Solutions",
    employerName: "Karan Malhotra",
    onboardedBy: "Ananya Iyer",
    date: "2026-08-14",
    status: "Pending",
    email: "onboard@novahealth.tech",
    phone: "+91 21098 76543",
    sector: "Healthcare & Biotech",
    website: "www.novahealth.tech",
    address: "Salt Lake Sector V, Kolkata, West Bengal",
    employeeCount: "10-20"
  }
];

function SalesTeamOnboarding() {
  // Filters & State
  const [salesEmployees, setSalesEmployees] = useState(mockSalesEmployees);
  const [onboardedCompanies, setOnboardedCompanies] = useState(mockOnboardedCompanies);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEmployeeForCompanies, setSelectedEmployeeForCompanies] = useState(null); // Member companies modal
  const [newMember, setNewMember] = useState({
    name: "",
    total: "",
    today: "",
    completed: "",
    pending: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [newMemberCompanies, setNewMemberCompanies] = useState([]); // Companies currently assigned in new member form
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [editingMemberCompanies, setEditingMemberCompanies] = useState([]); // Companies currently assigned in edit form
  const [editFormErrors, setEditFormErrors] = useState({});

  const [selectedCompany, setSelectedCompany] = useState(null); // Detail Modal
  const [employeesCurrentPage, setEmployeesCurrentPage] = useState(1);
  const employeesPerPage = 5;

  const paginatedEmployees = useMemo(() => {
    const startIndex = (employeesCurrentPage - 1) * employeesPerPage;
    return salesEmployees.slice(startIndex, startIndex + employeesPerPage);
  }, [salesEmployees, employeesCurrentPage]);

  const totalEmployeePages = Math.max(1, Math.ceil(salesEmployees.length / employeesPerPage));

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!newMember.name.trim()) {
      errors.name = "Name is required";
    } else if (newMember.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const nextId = salesEmployees.length > 0 ? Math.max(...salesEmployees.map(emp => emp.id)) + 1 : 1;
    const newName = newMember.name.trim();

    // Recalculate metrics based on assigned companies in modal
    const totalCount = newMemberCompanies.length;
    const completedCount = newMemberCompanies.filter(c => c.status === "Completed").length;
    const pendingCount = newMemberCompanies.filter(c => c.status === "Pending").length;
    const todayCount = newMemberCompanies.filter(c => c.date === "2026-08-19").length;

    // Save company assignments back to onboardedCompanies state
    setOnboardedCompanies(prevCompanies =>
      prevCompanies.map(c => {
        const isAssignedInModal = newMemberCompanies.some(mc => mc.id === c.id);
        if (isAssignedInModal) {
          return { ...c, onboardedBy: newName };
        }
        return c;
      })
    );

    const memberToAdd = {
      id: nextId,
      name: newName,
      total: totalCount,
      today: todayCount,
      completed: completedCount,
      pending: pendingCount
    };

    setSalesEmployees([...salesEmployees, memberToAdd]);
    setIsAddModalOpen(false);
    setNewMember({ name: "", total: "", today: "", completed: "", pending: "" });
    setNewMemberCompanies([]);
    setFormErrors({});
  };

  const handleEditClick = (emp) => {
    setEditingMember({ ...emp });
    // Filter companies currently assigned to this employee
    const assignedCompanies = onboardedCompanies.filter(c => c.onboardedBy === emp.name);
    setEditingMemberCompanies(assignedCompanies);
    setEditFormErrors({});
    setIsEditModalOpen(true);
  };

  const handleEditMemberSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!editingMember.name.trim()) {
      errors.name = "Name is required";
    } else if (editingMember.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (Object.keys(errors).length > 0) {
      setEditFormErrors(errors);
      return;
    }

    const oldName = salesEmployees.find(emp => emp.id === editingMember.id)?.name || "";
    const newName = editingMember.name.trim();

    // Recalculate metrics based on assigned companies in modal
    const totalCount = editingMemberCompanies.length;
    const completedCount = editingMemberCompanies.filter(c => c.status === "Completed").length;
    const pendingCount = editingMemberCompanies.filter(c => c.status === "Pending").length;
    const todayCount = editingMemberCompanies.filter(c => c.date === "2026-08-19").length;

    // Save company assignments back to onboardedCompanies state
    setOnboardedCompanies(prevCompanies =>
      prevCompanies.map(c => {
        const isCurrentlyAssignedInModal = editingMemberCompanies.some(mc => mc.id === c.id);
        if (c.onboardedBy === oldName && !isCurrentlyAssignedInModal) {
          return { ...c, onboardedBy: "" };
        }
        if (isCurrentlyAssignedInModal) {
          return { ...c, onboardedBy: newName };
        }
        return c;
      })
    );

    // Save sales employee updates with recalculated metrics
    setSalesEmployees(prev =>
      prev.map(emp => (emp.id === editingMember.id ? {
        ...editingMember,
        name: newName,
        total: totalCount,
        today: todayCount,
        completed: completedCount,
        pending: pendingCount
      } : emp))
    );

    setIsEditModalOpen(false);
    setEditingMember(null);
    setEditingMemberCompanies([]);
    setEditFormErrors({});
  };

  const handleDeleteMember = (id) => {
    const empToDelete = salesEmployees.find(emp => emp.id === id);
    if (!empToDelete) return;
    if (window.confirm(`Are you sure you want to delete sales member "${empToDelete.name}"?`)) {
      setSalesEmployees(prev => prev.filter(emp => emp.id !== id));
      // Also unassign their companies
      setOnboardedCompanies(prev =>
        prev.map(c => c.onboardedBy === empToDelete.name ? { ...c, onboardedBy: "" } : c)
      );
    }
  };



  // Metrics calculation
  const totalEmployees = salesEmployees.length;
  const totalCompaniesOnboarded = onboardedCompanies.length;
  const todayOnboardings = onboardedCompanies.filter((c) => c.date === "2026-08-19").length;
  const pendingOnboardings = onboardedCompanies.filter((c) => c.status === "Pending").length;

  return (
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header Block */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-2xl font-bold text-black">Sales Team Onboarding</h4>
              <p className="text-xs text-gray-500 mt-1">Manage sales representatives and track corporate onboarding metrics</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto h-11"
            >
              <Plus size={18} />
              <span>Add Sales Member</span>
            </button>
          </div>
          <hr className="border-gray-300 mt-4" />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Sales Members</span>
              <span className="text-2xl font-bold text-purple-700 mt-2">{totalEmployees}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600 font-medium">
                <TrendingUp size={14} />
                <span>Active Team</span>
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <Users size={24} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Total Companies</span>
              <span className="text-2xl font-bold text-purple-700 mt-2">{totalCompaniesOnboarded}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600 font-medium">
                <TrendingUp size={14} />
                <span>+12% this week</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <Building2 size={24} />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Today's Onboarding</span>
              <span className="text-2xl font-bold text-purple-700 mt-2">{todayOnboardings}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-purple-600 font-medium">
                <Calendar size={14} />
                <span>Real-time update</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <CheckCircle size={24} />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Pending Approvals</span>
              <span className="text-2xl font-bold text-purple-700 mt-2">{pendingOnboardings}</span>
              <div className="flex items-center gap-1 mt-2 text-xs text-amber-600 font-medium">
                <Clock size={14} />
                <span>Requires review</span>
              </div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
              <AlertCircle size={24} />
            </div>
          </div>
        </div>

        {/* Section 1: Sales Employee Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-purple-600" size={20} />
            <h5 className="text-lg font-bold text-black">Sales Employee Performance</h5>
          </div>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm text-center border-collapse">
              <thead>
                <tr className="bg-gray-55 text-gray-600 border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-left">Sales Employee</th>
                  <th className="py-3 px-4 font-semibold">Total Companies</th>
                  <th className="py-3 px-4 font-semibold">Today's Onboarding</th>
                  <th className="py-3 px-4 font-semibold">Completed</th>
                  <th className="py-3 px-4 font-semibold">Pending</th>
                  <th className="py-3 px-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map((emp) => (
                  <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3.5 px-4 text-left font-medium text-gray-900">{emp.name}</td>
                    <td className="py-3.5 px-4 text-gray-700">{emp.total}</td>
                    <td className="py-3.5 px-4">
                      {emp.today > 0 ? (
                        <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                          +{emp.today} Today
                        </span>
                      ) : (
                        <span className="text-gray-400 font-normal">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-green-600 font-semibold">{emp.completed}</td>
                    <td className="py-3.5 px-4 text-amber-600 font-semibold">{emp.pending}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-3.5">
                        <button
                          onClick={() => setSelectedEmployeeForCompanies(emp)}
                          className="text-purple-600 hover:text-purple-800 transition cursor-pointer p-1"
                          title="View Onboarded Companies"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEditClick(emp)}
                          className="text-blue-600 hover:text-blue-800 transition cursor-pointer p-1"
                          title="Edit Member"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(emp.id)}
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
              Showing {salesEmployees.length > 0 ? Math.min(salesEmployees.length, (employeesCurrentPage - 1) * employeesPerPage + 1) : 0} to{" "}
              {Math.min(salesEmployees.length, employeesCurrentPage * employeesPerPage)} of {salesEmployees.length} entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setEmployeesCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={employeesCurrentPage === 1}
                className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition cursor-pointer ${
                  employeesCurrentPage === 1 ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed" : "border-purple-300 text-purple-700 hover:bg-purple-50"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setEmployeesCurrentPage((prev) => Math.min(prev + 1, totalEmployeePages))}
                disabled={employeesCurrentPage === totalEmployeePages}
                className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition cursor-pointer ${
                  employeesCurrentPage === totalEmployeePages ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed" : "border-purple-300 text-purple-700 hover:bg-purple-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>



        <Footer />
      </div>

      {/* --- COMPANY DETAIL MODAL --- */}
      {selectedCompany && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{selectedCompany.companyName}</h3>
                <p className="text-xs text-purple-200 mt-1">Sector: {selectedCompany.sector}</p>
              </div>
              <button
                onClick={() => setSelectedCompany(null)}
                className="text-white/80 hover:text-white transition p-1 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h6 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Information</h6>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Employer Name</span>
                    <span className="font-semibold text-gray-800">{selectedCompany.employerName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Email Address</span>
                    <span className="font-semibold text-purple-700">{selectedCompany.email}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Phone Number</span>
                    <span className="font-semibold text-gray-800">{selectedCompany.phone}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Website URL</span>
                    <a
                      href={`https://${selectedCompany.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-purple-600 hover:underline"
                    >
                      {selectedCompany.website}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h6 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Onboarding Details</h6>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Onboarded By</span>
                    <span className="font-semibold text-gray-800">{selectedCompany.onboardedBy}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Onboarding Date</span>
                    <span className="font-semibold text-gray-800">
                      {new Date(selectedCompany.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Company Size</span>
                    <span className="font-semibold text-gray-800">{selectedCompany.employeeCount} Employees</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100 items-center">
                    <span className="text-gray-500">Onboarding Status</span>
                    <span
                      className={`inline-flex px-3 py-0.5 rounded-full text-xs font-semibold ${
                        selectedCompany.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {selectedCompany.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <h6 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Registered Address</h6>
                <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {selectedCompany.address}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedCompany(null)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- ADD SALES MEMBER MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-5 flex justify-between items-center">
              <h3 className="text-lg font-bold">Add Sales Member</h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setNewMember({ name: "", total: "", today: "", completed: "", pending: "" });
                  setNewMemberCompanies([]);
                  setFormErrors({});
                }}
                className="text-white/80 hover:text-white transition p-1 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer border-none outline-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAddMemberSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Member Name *</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className={`w-full mt-1.5 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                    formErrors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-purple-400"
                  }`}
                  required
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Total Companies</label>
                  <input
                    type="number"
                    value={newMemberCompanies.length}
                    readOnly
                    className="w-full mt-1.5 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Today's Onboard</label>
                  <input
                    type="number"
                    value={newMemberCompanies.filter(c => c.date === "2026-08-19").length}
                    readOnly
                    className="w-full mt-1.5 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Completed</label>
                  <input
                    type="number"
                    value={newMemberCompanies.filter(c => c.status === "Completed").length}
                    readOnly
                    className="w-full mt-1.5 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Pending</label>
                  <input
                    type="number"
                    value={newMemberCompanies.filter(c => c.status === "Pending").length}
                    readOnly
                    className="w-full mt-1.5 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none font-medium"
                  />
                </div>
              </div>

              {/* Assign Companies Section */}
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Assign Companies</label>
                
                {/* List of currently assigned companies in the modal */}
                <div className="space-y-1.5 max-h-32 overflow-y-auto mb-3 border border-gray-100 p-2 rounded-lg bg-gray-50/50">
                  {newMemberCompanies.length > 0 ? (
                    newMemberCompanies.map((c) => (
                      <div key={c.id} className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs">
                        <span className="font-semibold text-gray-800">{c.companyName}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setNewMemberCompanies(prev => prev.filter(mc => mc.id !== c.id));
                          }}
                          className="text-red-500 hover:text-red-700 font-bold transition cursor-pointer text-[11px]"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic py-1 text-center">No companies assigned yet.</p>
                  )}
                </div>

                {/* Dropdown to assign a new company */}
                <div className="flex gap-2">
                  <select
                    id="newMemberCompanyAssignSelect"
                    className="flex-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-400 bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>Select company to assign...</option>
                    {onboardedCompanies
                      .filter(c => !newMemberCompanies.some(mc => mc.id === c.id))
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.companyName} {c.onboardedBy ? `(onboarded by ${c.onboardedBy})` : "(unassigned)"}
                        </option>
                      ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      const selectEl = document.getElementById("newMemberCompanyAssignSelect");
                      const companyId = parseInt(selectEl.value, 10);
                      if (isNaN(companyId)) return;
                      const companyToAssign = onboardedCompanies.find(c => c.id === companyId);
                      if (companyToAssign) {
                        setNewMemberCompanies(prev => [...prev, companyToAssign]);
                        selectEl.value = ""; // Reset select dropdown
                      }
                    }}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    Assign
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setNewMember({ name: "", total: "", today: "", completed: "", pending: "" });
                    setNewMemberCompanies([]);
                    setFormErrors({});
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition cursor-pointer"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SALES MEMBER'S COMPANIES MODAL --- */}
      {selectedEmployeeForCompanies && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-5 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Companies Onboarded</h3>
                <p className="text-xs text-purple-200 mt-1">Representative: {selectedEmployeeForCompanies.name}</p>
              </div>
              <button
                onClick={() => setSelectedEmployeeForCompanies(null)}
                className="text-white/80 hover:text-white transition p-1 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer border-none outline-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="overflow-x-auto border border-gray-200 rounded-lg max-h-80 overflow-y-auto">
                <table className="w-full text-sm text-center border-collapse">
                  <thead>
                    <tr className="bg-gray-55 text-gray-600 border-b border-gray-200 sticky top-0 bg-white">
                      <th className="py-2.5 px-4 font-semibold text-left">Company Name</th>
                      <th className="py-2.5 px-4 font-semibold text-left">Employer Name</th>
                      <th className="py-2.5 px-4 font-semibold">Date</th>
                      <th className="py-2.5 px-4 font-semibold">Status</th>
                      <th className="py-2.5 px-4 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {onboardedCompanies.filter(c => c.onboardedBy === selectedEmployeeForCompanies.name).length > 0 ? (
                      onboardedCompanies
                        .filter(c => c.onboardedBy === selectedEmployeeForCompanies.name)
                        .map((company) => (
                          <tr key={company.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                            <td className="py-3 px-4 text-left font-medium text-gray-900">{company.companyName}</td>
                            <td className="py-3 px-4 text-left text-gray-700">{company.employerName}</td>
                            <td className="py-3 px-4 text-gray-500">
                              {new Date(company.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                              })}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  company.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {company.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => setSelectedCompany(company)}
                                className="text-purple-600 hover:text-purple-800 transition cursor-pointer p-1"
                                title="View Company Details"
                              >
                                <Eye size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-8 text-gray-500 text-center font-medium">
                          No companies onboarded yet by this representative.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedEmployeeForCompanies(null)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT SALES MEMBER MODAL --- */}
      {isEditModalOpen && editingMember && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-5 flex justify-between items-center">
              <h3 className="text-lg font-bold">Edit Sales Member</h3>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingMember(null);
                  setEditFormErrors({});
                }}
                className="text-white/80 hover:text-white transition p-1 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer border-none outline-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleEditMemberSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Member Name *</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className={`w-full mt-1.5 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                    editFormErrors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-purple-400"
                  }`}
                  required
                />
                {editFormErrors.name && <p className="text-red-500 text-xs mt-1">{editFormErrors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Total Companies</label>
                  <input
                    type="number"
                    value={editingMemberCompanies.length}
                    readOnly
                    className="w-full mt-1.5 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Today's Onboard</label>
                  <input
                    type="number"
                    value={editingMemberCompanies.filter(c => c.date === "2026-08-19").length}
                    readOnly
                    className="w-full mt-1.5 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Completed</label>
                  <input
                    type="number"
                    value={editingMemberCompanies.filter(c => c.status === "Completed").length}
                    readOnly
                    className="w-full mt-1.5 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Pending</label>
                  <input
                    type="number"
                    value={editingMemberCompanies.filter(c => c.status === "Pending").length}
                    readOnly
                    className="w-full mt-1.5 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none font-medium"
                  />
                </div>
              </div>

              {/* Assign Companies Section */}
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Assigned Companies</label>
                
                {/* List of currently assigned companies in the modal */}
                <div className="space-y-1.5 max-h-32 overflow-y-auto mb-3 border border-gray-100 p-2 rounded-lg bg-gray-50/50">
                  {editingMemberCompanies.length > 0 ? (
                    editingMemberCompanies.map((c) => (
                      <div key={c.id} className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs">
                        <span className="font-semibold text-gray-800">{c.companyName}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingMemberCompanies(prev => prev.filter(mc => mc.id !== c.id));
                          }}
                          className="text-red-500 hover:text-red-700 font-bold transition cursor-pointer text-[11px]"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic py-1 text-center">No companies assigned to this member.</p>
                  )}
                </div>

                {/* Dropdown to assign a new company */}
                <div className="flex gap-2">
                  <select
                    id="companyAssignSelect"
                    className="flex-1 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-400 bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>Select company to assign...</option>
                    {onboardedCompanies
                      .filter(c => c.onboardedBy !== editingMember.name && !editingMemberCompanies.some(mc => mc.id === c.id))
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.companyName} {c.onboardedBy ? `(onboarded by ${c.onboardedBy})` : "(unassigned)"}
                        </option>
                      ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      const selectEl = document.getElementById("companyAssignSelect");
                      const companyId = parseInt(selectEl.value, 10);
                      if (isNaN(companyId)) return;
                      const companyToAssign = onboardedCompanies.find(c => c.id === companyId);
                      if (companyToAssign) {
                        setEditingMemberCompanies(prev => [...prev, companyToAssign]);
                        selectEl.value = ""; // Reset select dropdown
                      }
                    }}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    Assign
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingMember(null);
                    setEditFormErrors({});
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesTeamOnboarding;
