import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Building2, Plus, X } from "lucide-react";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import Footer from "../Footer";
import {
  STAFFING_REQUIREMENTS_KEY,
  readLocalStorage,
  writeLocalStorage,
  getStaffingCompanies,
  getStaffingEmployees
} from "./staffingStore";

function StaffingCompanyDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { employeeId, companyId } = useParams();

  const employee = useMemo(() => {
    if (state?.employee) return state.employee;
    const employees = getStaffingEmployees();
    return employees.find((e) => String(e.id) === String(employeeId)) || null;
  }, [state, employeeId]);

  const company = useMemo(() => {
    if (state?.company) return state.company;
    const companies = getStaffingCompanies();
    return companies.find((c) => String(c.id) === String(companyId)) || null;
  }, [state, companyId]);

  const backPath = employee?.id ? `/staffing-management/${employee.id}` : "/staffing-management";

  const [isRequirementOpen, setIsRequirementOpen] = useState(false);
  const [requirements, setRequirements] = useState(() => readLocalStorage(STAFFING_REQUIREMENTS_KEY, {}));
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    if (!company) return;
    const store = readLocalStorage(STAFFING_REQUIREMENTS_KEY, {});
    const existing = store[company.id] || {};
    setRequirements(store);
    setFormData({
      postedOn: existing.postedOn || company.date || "",
      state: existing.state || "",
      city: existing.city || "",
      category: existing.category || company.sector || "IT",
      technology: existing.technology || "",
      requiredCandidates: existing.requiredCandidates || "",
      experience: existing.experience || "",
      budget: existing.budget || "",
      workMode: existing.workMode || "On-site",
      noticePeriod: existing.noticePeriod || "",
      deadline: existing.deadline || ""
    });
  }, [company]);

  if (!company) {
    return <Navigate to={backPath} replace />;
  }

  const rowValues = requirements?.[company.id] || {};

  const detailRows = [
    { label: "Posted On", value: rowValues.postedOn || company.date || "" },
    { label: "State", value: rowValues.state || "" },
    { label: "City", value: rowValues.city || "" },
    { label: "Category (IT / Non IT)", value: rowValues.category || company.sector || "IT" },
    { label: "Technology", value: rowValues.technology || "" },
    { label: "Required Candidates", value: rowValues.requiredCandidates || "" },
    { label: "Experience", value: rowValues.experience || "" },
    { label: "Budget", value: rowValues.budget || "" },
    { label: "Work Mode", value: rowValues.workMode || "On-site" },
    { label: "Notice Period", value: rowValues.noticePeriod || "" },
    { label: "Deadline", value: rowValues.deadline || "" }
  ];

  const saveRequirement = (event) => {
    event.preventDefault();

    const updatedStore = readLocalStorage(STAFFING_REQUIREMENTS_KEY, {});
    const savedRequirement = {
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

    updatedStore[company.id] = savedRequirement;
    writeLocalStorage(STAFFING_REQUIREMENTS_KEY, updatedStore);

    setRequirements(updatedStore);
    setIsRequirementOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F6FA] p-4 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => navigate(backPath, { state: { employee } })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 cursor-pointer"
            >
              <ArrowLeft size={18} /> Back to Companies Onboarded
            </button>

            <button
              onClick={() => setIsRequirementOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 cursor-pointer"
            >
              <Plus size={16} /> Add Requirement
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
              <Building2 size={26} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-black">{company.companyName}</h4>
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
                    <th
                      key={row.label}
                      className="border-b border-slate-200 px-3 py-3 text-center text-[11px] font-black uppercase text-slate-600 whitespace-nowrap"
                    >
                      {row.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {detailRows.map((row) => (
                    <td
                      key={row.label}
                      className="border-b border-slate-100 px-3 py-4 text-center text-sm font-semibold text-slate-800 whitespace-nowrap"
                    >
                      {row.value || "-"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {isRequirementOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900">Add Requirement for {company.companyName}</h3>
                <button
                  onClick={() => setIsRequirementOpen(false)}
                  className="rounded-lg p-1 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={saveRequirement} className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-xs font-bold uppercase text-slate-600">Posted On</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={formData.postedOn}
                    onChange={(e) => setFormData({ ...formData, postedOn: e.target.value })}
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-bold uppercase text-slate-600">State</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-bold uppercase text-slate-600">City</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-bold uppercase text-slate-600">Category (IT / Non IT)</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-bold uppercase text-slate-600">Technology</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={formData.technology}
                    onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-bold uppercase text-slate-600">Required Candidates</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={formData.requiredCandidates}
                    onChange={(e) => setFormData({ ...formData, requiredCandidates: e.target.value })}
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-bold uppercase text-slate-600">Experience</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-bold uppercase text-slate-600">Budget</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-bold uppercase text-slate-600">Work Mode</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={formData.workMode}
                    onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-bold uppercase text-slate-600">Notice Period</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={formData.noticePeriod}
                    onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                  />
                </label>
                <label className="space-y-1 md:col-span-2">
                  <span className="text-xs font-bold uppercase text-slate-600">Deadline</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </label>

                <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsRequirementOpen(false)}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 cursor-pointer"
                  >
                    Save Requirement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default StaffingCompanyDetails;
