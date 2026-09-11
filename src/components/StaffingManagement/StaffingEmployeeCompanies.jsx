import React, { useState, useMemo } from "react";
import { ArrowLeft, Building2, Calendar, Eye, Users, X } from "lucide-react";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import Footer from "../Footer";
import {
  getStaffingEmployees,
  getStaffingCompanies,
  saveStaffingCompanies,
  getCompaniesForEmployee
} from "./staffingStore";

function StaffingEmployeeCompanies() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { employeeId } = useParams();

  // Load employee either from route state or storage
  const employee = useMemo(() => {
    if (state?.employee) return state.employee;
    const employees = getStaffingEmployees();
    return employees.find((e) => String(e.id) === String(employeeId)) || null;
  }, [state, employeeId]);

  // Load companies from state or store
  const [companies, setCompanies] = useState(() => {
    if (state?.companies && state.companies.length > 0) return state.companies;
    if (employee?.name) {
      return getCompaniesForEmployee(employee.name);
    }
    return [];
  });

  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [newCompanyData, setNewCompanyData] = useState({
    companyName: "",
    employerName: "",
    email: "",
    phone: "",
    sector: "Information Technology",
    status: "Completed"
  });

  if (!employee) {
    return <Navigate to="/staffing-management" replace />;
  }

  const completed = companies.filter((c) => c.status === "Completed").length;
  const pending = companies.filter((c) => c.status === "Pending").length;
  const today = companies.filter((c) => {
    const todayStr = new Date().toISOString().split("T")[0];
    return c.date === todayStr || c.date === "2026-08-19";
  }).length;

  const handleAddCompany = (e) => {
    e.preventDefault();
    if (!newCompanyData.companyName.trim() || !newCompanyData.employerName.trim()) return;

    const newCompany = {
      id: Date.now(),
      companyName: newCompanyData.companyName.trim(),
      employerName: newCompanyData.employerName.trim(),
      onboardedBy: employee.name,
      date: new Date().toISOString().split("T")[0],
      status: newCompanyData.status,
      email: newCompanyData.email.trim(),
      phone: newCompanyData.phone.trim(),
      sector: newCompanyData.sector,
      website: `www.${newCompanyData.companyName.toLowerCase().replace(/\s+/g, "")}.com`,
      address: "India",
      employeeCount: "50-100"
    };

    const allCompanies = getStaffingCompanies();
    const updatedAll = [newCompany, ...allCompanies];
    saveStaffingCompanies(updatedAll);

    setCompanies((prev) => [newCompany, ...prev]);
    setIsAddCompanyOpen(false);
    setNewCompanyData({
      companyName: "",
      employerName: "",
      email: "",
      phone: "",
      sector: "Information Technology",
      status: "Completed"
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F6FA] p-4 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <button
              onClick={() => navigate("/staffing-management")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 cursor-pointer"
            >
              <ArrowLeft size={18} /> Back to Staffing Management
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
              <Users size={24} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-black">Companies Onboarded</h4>
              <p className="mt-1 text-sm text-gray-500">
                Sales representative: <span className="font-semibold text-gray-800">{employee.name}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 3 Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-gray-500">Total Companies</p>
              <p className="mt-2 text-2xl font-bold text-purple-700">{companies.length}</p>
            </div>
            <Building2 className="text-blue-600" size={24} />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-gray-500">Completed</p>
              <p className="mt-2 text-2xl font-bold text-green-600">{completed}</p>
            </div>
            <Calendar className="text-green-600" size={24} />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-gray-500">Pending</p>
              <p className="mt-2 text-2xl font-bold text-amber-600">{pending}</p>
              <p className="mt-1 text-xs text-gray-400">{today} onboarded today</p>
            </div>
            <Calendar className="text-amber-600" size={24} />
          </div>
        </div>

        {/* Companies Table Card */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[720px] border-collapse text-sm text-center">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                  <th className="px-4 py-3 text-left font-semibold">Company Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Employer Name</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {companies.length > 0 ? (
                  companies.map((company) => (
                    <tr key={company.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-4 py-4 text-left font-medium text-gray-900">{company.companyName}</td>
                      <td className="px-4 py-4 text-left text-gray-700">{company.employerName}</td>
                      <td className="px-4 py-4 text-gray-500">
                        {new Date(company.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            company.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {company.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() =>
                            navigate(`/staffing-management/${employee.id}/company/${company.id}`, {
                              state: { company, employee }
                            })
                          }
                          className="cursor-pointer p-1 text-purple-600 hover:text-purple-800 transition"
                          title="View Company Details"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-10 text-gray-500">
                      No companies onboarded yet by this representative.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Company Modal */}
      {isAddCompanyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Add Company for {employee.name}</h3>
              <button
                onClick={() => setIsAddCompanyOpen(false)}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddCompany} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Company Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. TechVantage Solutions Ltd"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={newCompanyData.companyName}
                  onChange={(e) => setNewCompanyData({ ...newCompanyData, companyName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Employer Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rajesh Gupta"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={newCompanyData.employerName}
                  onChange={(e) => setNewCompanyData({ ...newCompanyData, employerName: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="contact@company.com"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={newCompanyData.email}
                    onChange={(e) => setNewCompanyData({ ...newCompanyData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={newCompanyData.phone}
                    onChange={(e) => setNewCompanyData({ ...newCompanyData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Sector</label>
                  <input
                    type="text"
                    placeholder="Information Technology"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={newCompanyData.sector}
                    onChange={(e) => setNewCompanyData({ ...newCompanyData, sector: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Status</label>
                  <select
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={newCompanyData.status}
                    onChange={(e) => setNewCompanyData({ ...newCompanyData, status: e.target.value })}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddCompanyOpen(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 cursor-pointer"
                >
                  Save Company
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

export default StaffingEmployeeCompanies;
