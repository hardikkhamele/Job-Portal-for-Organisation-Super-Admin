import React from "react";
import { ArrowLeft, Building2, Mail, MapPin, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";

function VendorCompanyDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const company = state?.company;

  if (!company) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] p-4">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Company details not found</h1>
          <button onClick={() => navigate("/sales-team-onboarding/vendors")} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">
            <ArrowLeft size={16} /> Back to Vendors
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f6f7fb] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <button onClick={() => navigate("/sales-team-onboarding/vendors")} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800">
            <ArrowLeft size={18} /> Back to Vendor Management
          </button>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-50 p-3 text-violet-600"><Building2 size={27} /></div>
            <div><h1 className="text-2xl font-bold text-slate-900">{company.name}</h1><p className="mt-1 text-sm text-slate-500">Company details and sales assignment</p></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-slate-900">Contact Details</h2>
            <Info icon={<Users size={18} />} label="Contact person" value={company.contact} />
            <Info icon={<Mail size={18} />} label="Email address" value={company.email} />
            <Info icon={<MapPin size={18} />} label="Location" value={company.city} />
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-slate-900">Company Information</h2>
            <Info icon={<Building2 size={18} />} label="Industry" value={company.industry} />
            <Info icon={<Users size={18} />} label="Company size" value={company.employees} />
            <Info icon={<Users size={18} />} label="Sales owner" value={company.assignedTo} />
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
}

function Info({ icon, label, value }) {
  return <div className="mb-4 flex items-start gap-3 border-b border-slate-100 pb-3 last:mb-0"><span className="mt-0.5 text-violet-600">{icon}</span><div><p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-sm font-semibold text-slate-800">{value || "-"}</p></div></div>;
}

export default VendorCompanyDetails;