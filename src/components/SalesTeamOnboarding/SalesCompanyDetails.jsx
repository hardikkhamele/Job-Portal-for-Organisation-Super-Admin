import React from "react";
import { ArrowLeft, Building2, Calendar, Mail, MapPin, Phone, Users, Globe } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";

function SalesCompanyDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const company = state?.company;
  const employee = state?.employee;

  if (!company) {
    return (
      <div className="w-full min-h-screen bg-[#F4F6FA] p-4">
        <div className="max-w-7xl mx-auto rounded-xl bg-white p-8 text-center shadow-sm">
          <h4 className="text-xl font-bold text-gray-900">Company details not found</h4>
          <button onClick={() => navigate("/sales-team-onboarding")} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">
            <ArrowLeft size={16} /> Back to Sales Team
          </button>
        </div>
      </div>
    );
  }

  const backPath = `/sales-team-onboarding/${employee?.id || ""}`;

  return (
    <div className="w-full min-h-screen bg-[#F4F6FA] p-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <button onClick={() => navigate(backPath)} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900">
            <ArrowLeft size={18} /> Back to Companies Onboarded
          </button>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-3 text-purple-600"><Building2 size={26} /></div>
            <div>
              <h4 className="text-2xl font-bold text-black">{company.companyName}</h4>
              <p className="mt-1 text-sm text-gray-500">Company onboarding details</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h5 className="mb-4 text-lg font-bold text-gray-900">Contact Information</h5>
            <div className="space-y-4">
              <Detail icon={<Users size={18} />} label="Employer Name" value={company.employerName} />
              <Detail icon={<Mail size={18} />} label="Email Address" value={company.email} />
              <Detail icon={<Phone size={18} />} label="Phone Number" value={company.phone} />
              <Detail icon={<Globe size={18} />} label="Website" value={company.website} />
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h5 className="mb-4 text-lg font-bold text-gray-900">Onboarding Details</h5>
            <div className="space-y-4">
              <Detail icon={<Building2 size={18} />} label="Sector" value={company.sector} />
              <Detail icon={<Users size={18} />} label="Company Size" value={`${company.employeeCount} Employees`} />
              <Detail icon={<Calendar size={18} />} label="Onboarding Date" value={new Date(company.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} />
              <div className="flex items-center justify-between border-b border-gray-100 pb-3"><span className="text-sm text-gray-500">Status</span><span className={`rounded-full px-3 py-1 text-xs font-semibold ${company.status === "Completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{company.status}</span></div>
            </div>
          </section>
        </div>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2"><MapPin size={19} className="text-purple-600" /><h5 className="text-lg font-bold text-gray-900">Registered Address</h5></div>
          <p className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">{company.address}</p>
        </section>
        <Footer />
      </div>
    </div>
  );
}

function Detail({ icon, label, value }) {
  return <div className="flex items-start gap-3 border-b border-gray-100 pb-3"><span className="mt-0.5 text-purple-600">{icon}</span><div><p className="text-xs text-gray-500">{label}</p><p className="mt-1 text-sm font-semibold text-gray-800">{value || "-"}</p></div></div>;
}

export default SalesCompanyDetails;