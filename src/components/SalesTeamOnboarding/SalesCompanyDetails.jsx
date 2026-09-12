import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Building2, Calendar, Mail, MapPin, Phone, Users, Globe, Plus, X } from "lucide-react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer";

const SALES_REQUIREMENTS_KEY = "admin_sales_company_requirements";
const SALES_COMPANY_SNAPSHOT_KEY = "admin_sales_company_snapshots";
const stateOptions = ["Andhra Pradesh", "Gujarat", "Karnataka", "Maharashtra", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Delhi"];
const cityOptions = ["Ahmedabad", "Bengaluru", "Chennai", "Delhi", "Hyderabad", "Kolkata", "Mumbai", "Noida", "Pune"];
const experienceOptions = ["0-1 Years", "1-2 Years", "2-3 Years", "3-4 Years", "4-5 Years", "5-6 Years", "6-7 Years", "7-8 Years", "8-9 Years", "9-10 Years", "10+ Years"];
const workModeOptions = ["Remote", "Onsite", "Hybrid"];
const noticePeriodOptions = ["Immediate", "15 Days", "30 Days", "45 Days", "60 Days", "90 Days"];

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

function SalesCompanyDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();
  const initialCompany = state?.company;
  const employee = state?.employee;
  const fallbackCompany = useMemo(() => {
    const id = params.companyId;
    const store = readStore(SALES_COMPANY_SNAPSHOT_KEY, {});
    return store[id] || null;
  }, [params.companyId]);

  const [company, setCompany] = useState(initialCompany || fallbackCompany);
  const [isRequirementOpen, setIsRequirementOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [requirements, setRequirements] = useState(() => readStore(SALES_REQUIREMENTS_KEY, {}));
  const [formData, setFormData] = useState({
    profile: "",
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

  const backPath = employee?.id ? `/sales-team-onboarding/${employee.id}` : "/sales-team-onboarding";

  useEffect(() => {
    if (initialCompany && initialCompany.id) {
      const store = readStore(SALES_COMPANY_SNAPSHOT_KEY, {});
      store[initialCompany.id] = initialCompany;
      writeStore(SALES_COMPANY_SNAPSHOT_KEY, store);
    }
  }, [initialCompany]);

  useEffect(() => {
    if (!company) return;
    const store = readStore(SALES_REQUIREMENTS_KEY, {});
    const existing = store[company.id] || {};
    setRequirements(store);
    setFormData({ ...existing, profile: existing.profile || "", state: existing.state || "", city: existing.city || "", category: existing.category || "", technology: existing.technology || "", requiredCandidates: existing.requiredCandidates || "", experience: existing.experience || "", budget: existing.budget || "", workMode: existing.workMode || "", noticePeriod: existing.noticePeriod || "", deadline: existing.deadline || "" });
  }, [company]);

  if (!company) {
    return <Navigate to={backPath} replace />;
  }

  const rowValues = requirements?.[company.id] || {};

  const detailRows = [
    { label: "Profile", value: rowValues.profile || company?.profile || "" },
    { label: "State", value: rowValues.state || company?.state || "" },
    { label: "City", value: rowValues.city || company?.city || "" },
    { label: "Category (IT / Non IT)", value: rowValues.category || company?.category || "" },
    { label: "Technology", value: rowValues.technology || company?.technology || "" },
    { label: "Required Candidates", value: rowValues.requiredCandidates || company?.requiredCandidates || "" },
    { label: "Experience", value: rowValues.experience || company?.experience || "" },
    { label: "Budget", value: rowValues.budget || company?.budget || "" },
    { label: "Work Mode", value: rowValues.workMode || company?.workMode || "" },
    { label: "Notice Period", value: rowValues.noticePeriod || company?.noticePeriod || "" },
    { label: "Deadline", value: rowValues.deadline || company?.deadline || "" }
  ];

  const saveRequirement = (event) => {
    event.preventDefault();

    const updatedStore = readStore(SALES_REQUIREMENTS_KEY, {});
    const savedRequirement = {
      profile: formData.profile,
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
    writeStore(SALES_REQUIREMENTS_KEY, updatedStore);

    setRequirements(updatedStore);
    setShowDetails(true);
    setIsRequirementOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F6FA] p-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <button onClick={() => navigate(backPath)} className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900">
              <ArrowLeft size={18} /> Back to Companies Onboarded
            </button>

            <button onClick={() => setIsRequirementOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700">
              <Plus size={16} /> Add Requirement
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-3 text-purple-600"><Building2 size={26} /></div>
            <div>
              <h4 className="text-2xl font-bold text-black">{company.companyName}</h4>
              <p className="mt-1 text-sm text-gray-500">Company onboarding details</p>
            </div>
          </div>
        </div>

        <section className="rounded-xl bg-white p-6 shadow-sm">
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
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Category (IT / Non IT)</span><select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}><option value="">Select Category</option><option value="IT">IT</option><option value="Non IT">Non IT</option></select></label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Profile</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.profile} onChange={(e) => setFormData({ ...formData, profile: e.target.value })} /></label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">State</span><select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })}><option value="">Select State</option>{stateOptions.map((state) => <option key={state} value={state}>{state}</option>)}</select></label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">City</span><select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}><option value="">Select City</option>{cityOptions.map((city) => <option key={city} value={city}>{city}</option>)}</select></label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Technology</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.technology} onChange={(e) => setFormData({ ...formData, technology: e.target.value })} /></label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Required Candidates</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.requiredCandidates} onChange={(e) => setFormData({ ...formData, requiredCandidates: e.target.value })} /></label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Experience</span><select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}><option value="">Select Experience</option>{experienceOptions.map((experience) => <option key={experience} value={experience}>{experience}</option>)}</select></label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Budget</span><input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} /></label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Work Mode</span><select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.workMode} onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}><option value="">Select Work Mode</option>{workModeOptions.map((workMode) => <option key={workMode} value={workMode}>{workMode}</option>)}</select></label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Notice Period</span><select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.noticePeriod} onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}><option value="">Select Notice Period</option>{noticePeriodOptions.map((noticePeriod) => <option key={noticePeriod} value={noticePeriod}>{noticePeriod}</option>)}</select></label>
                <label className="space-y-2"><span className="text-xs font-bold uppercase text-slate-600">Deadline</span><input type="date" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} /></label>

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

function Detail({ icon, label, value }) {
  return <div className="flex items-start gap-3 border-b border-gray-100 pb-3"><span className="mt-0.5 text-purple-600">{icon}</span><div><p className="text-xs text-gray-500">{label}</p><p className="mt-1 text-sm font-semibold text-gray-800">{value || "-"}</p></div></div>;
}

export default SalesCompanyDetails;
