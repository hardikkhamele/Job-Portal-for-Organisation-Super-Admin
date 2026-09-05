import React from "react";
import { ArrowLeft, Building2, Calendar, Eye, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";

function SalesEmployeeCompanies() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const employee = state?.employee;
  const companies = state?.companies || [];

  if (!employee) {
    return (
      <div className="w-full min-h-screen bg-[#F4F6FA] p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
          <h4 className="text-xl font-bold text-gray-900">Sales member not found</h4>
          <p className="mt-2 text-sm text-gray-500">Please open this page from the Sales Team Onboarding list.</p>
          <button onClick={() => navigate("/sales-team-onboarding")} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">
            <ArrowLeft size={16} /> Back to Sales Team
          </button>
        </div>
      </div>
    );
  }

  const completed = companies.filter((company) => company.status === "Completed").length;
  const pending = companies.filter((company) => company.status === "Pending").length;
  const today = companies.filter((company) => company.date === "2026-08-19").length;

  return (
    <div className="w-full min-h-screen bg-[#F4F6FA] p-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <button onClick={() => navigate("/sales-team-onboarding")} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900">
            <ArrowLeft size={18} /> Back to Sales Team Onboarding
          </button>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-3 text-purple-600"><Users size={24} /></div>
            <div>
              <h4 className="text-2xl font-bold text-black">Companies Onboarded</h4>
              <p className="mt-1 text-sm text-gray-500">Sales representative: <span className="font-semibold text-gray-800">{employee.name}</span></p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm"><div><p className="text-sm font-semibold text-gray-500">Total Companies</p><p className="mt-2 text-2xl font-bold text-purple-700">{companies.length}</p></div><Building2 className="text-blue-600" size={24} /></div>
          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm"><div><p className="text-sm font-semibold text-gray-500">Completed</p><p className="mt-2 text-2xl font-bold text-green-600">{completed}</p></div><Calendar className="text-green-600" size={24} /></div>
          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm"><div><p className="text-sm font-semibold text-gray-500">Pending</p><p className="mt-2 text-2xl font-bold text-amber-600">{pending}</p><p className="mt-1 text-xs text-gray-400">{today} onboarded today</p></div><Calendar className="text-amber-600" size={24} /></div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[720px] border-collapse text-sm text-center">
              <thead><tr className="border-b border-gray-200 bg-gray-50 text-gray-600"><th className="px-4 py-3 text-left font-semibold">Company Name</th><th className="px-4 py-3 text-left font-semibold">Employer Name</th><th className="px-4 py-3 font-semibold">Date</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 font-semibold">Action</th></tr></thead>
              <tbody>
                {companies.length > 0 ? companies.map((company) => (
                  <tr key={company.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4 text-left font-medium text-gray-900">{company.companyName}</td>
                    <td className="px-4 py-4 text-left text-gray-700">{company.employerName}</td>
                    <td className="px-4 py-4 text-gray-500">{new Date(company.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</td>
                    <td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${company.status === "Completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{company.status}</span></td>
                    <td className="px-4 py-4"><button onClick={() => navigate(`/sales-team-onboarding/${employee.id}/company/${company.id}`, { state: { company, employee } })} className="cursor-pointer p-1 text-purple-600 hover:text-purple-800" title="View Company Details"><Eye size={18} /></button></td>
                  </tr>
                )) : <tr><td colSpan="5" className="py-10 text-gray-500">No companies onboarded yet by this representative.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default SalesEmployeeCompanies;