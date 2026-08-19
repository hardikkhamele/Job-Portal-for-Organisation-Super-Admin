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
  AlertCircle
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null); // Detail Modal
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Clear all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedEmployee("");
    setSelectedStatus("");
    setSelectedDate("");
    setCurrentPage(1);
  };

  // Filtered Company List
  const filteredCompanies = useMemo(() => {
    return mockOnboardedCompanies.filter((company) => {
      const matchesSearch =
        company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.employerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEmployee = selectedEmployee ? company.onboardedBy === selectedEmployee : true;
      const matchesStatus = selectedStatus ? company.status === selectedStatus : true;
      const matchesDate = selectedDate ? company.date === selectedDate : true;

      return matchesSearch && matchesEmployee && matchesStatus && matchesDate;
    });
  }, [searchTerm, selectedEmployee, selectedStatus, selectedDate]);

  // Paginated List
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCompanies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCompanies, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / itemsPerPage));

  // Metrics calculation
  const totalEmployees = mockSalesEmployees.length;
  const totalCompaniesOnboarded = mockOnboardedCompanies.length;
  const todayOnboardings = mockOnboardedCompanies.filter((c) => c.date === "2026-08-19").length;
  const pendingOnboardings = mockOnboardedCompanies.filter((c) => c.status === "Pending").length;

  return (
    <div className="w-full bg-[#F4F6FA] p-4 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header Block */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-2xl font-bold text-black">Sales Team Onboarding</h4>
          <p className="text-xs text-gray-500 mt-1">Manage sales representatives and track corporate onboarding metrics</p>
          <hr className="border-gray-300 mt-3" />
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
                  <th className="py-3 px-4 font-semibold text-right">Performance Score</th>
                </tr>
              </thead>
              <tbody>
                {mockSalesEmployees.map((emp) => (
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
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${emp.performance}%` }}
                          />
                        </div>
                        <span className="font-semibold text-purple-700 w-10 text-right">{emp.performance}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Onboarded Companies */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h5 className="text-lg font-bold text-black mb-4">Onboarded Companies</h5>
          
          {/* Filters Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
            {/* Search */}
            <div className="flex items-center border border-gray-200 rounded-lg px-3 bg-gray-50 focus-within:border-purple-400 focus-within:bg-white transition h-11">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search Company / Employer..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            {/* Sales Representative Filter */}
            <select
              value={selectedEmployee}
              onChange={(e) => {
                setSelectedEmployee(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-200 rounded-lg px-3 bg-gray-50 text-sm focus:border-purple-400 focus:bg-white focus:outline-none transition h-11"
            >
              <option value="">All Sales Employees</option>
              {mockSalesEmployees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-200 rounded-lg px-3 bg-gray-50 text-sm focus:border-purple-400 focus:bg-white focus:outline-none transition h-11"
            >
              <option value="">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>

            {/* Date Filter */}
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border border-gray-200 rounded-lg px-3 bg-gray-50 text-sm focus:border-purple-400 focus:bg-white focus:outline-none transition h-11 cursor-pointer"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className="border border-purple-200 hover:border-purple-300 bg-purple-50 text-purple-700 font-medium px-4 rounded-lg text-sm transition h-11 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Filter size={16} />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Companies Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm text-center border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-left">Company Name</th>
                  <th className="py-3 px-4 font-semibold">Employer Name</th>
                  <th className="py-3 px-4 font-semibold">Onboarded By</th>
                  <th className="py-3 px-4 font-semibold">Onboarding Date</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCompanies.length > 0 ? (
                  paginatedCompanies.map((company) => (
                    <tr key={company.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-3.5 px-4 text-left font-medium text-gray-900">{company.companyName}</td>
                      <td className="py-3.5 px-4 text-gray-700">{company.employerName}</td>
                      <td className="py-3.5 px-4 text-gray-700">{company.onboardedBy}</td>
                      <td className="py-3.5 px-4 text-gray-500">
                        {new Date(company.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            company.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {company.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => setSelectedCompany(company)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-purple-600 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-50 transition cursor-pointer"
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-10 text-gray-500 text-center font-medium">
                      No companies match the filters. Try resetting search parameters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredCompanies.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-5">
              <span className="text-xs text-gray-500">
                Showing {Math.min(filteredCompanies.length, (currentPage - 1) * itemsPerPage + 1)} to{" "}
                {Math.min(filteredCompanies.length, currentPage * itemsPerPage)} of {filteredCompanies.length} entries
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition cursor-pointer ${
                    currentPage === 1 ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed" : "border-purple-300 text-purple-700 hover:bg-purple-50"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition cursor-pointer ${
                      currentPage === i + 1
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "border-purple-300 text-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition cursor-pointer ${
                    currentPage === totalPages ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed" : "border-purple-300 text-purple-700 hover:bg-purple-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>

      {/* --- COMPANY DETAIL MODAL --- */}
      {selectedCompany && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
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
    </div>
  );
}

export default SalesTeamOnboarding;
