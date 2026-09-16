/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Check, ChevronDown, Download, Search, Send, Users, X } from "lucide-react";
import * as XLSX from "xlsx";

// UI-only mock data. Replace with API data when this screen is wired into the app.
const companies = [
  { id: 1, name: "TechVantage Solutions", contact: "Rajesh Gupta", email: "hr@techvantage.com", industry: "Information Technology", city: "Gurugram", employees: "150–200", date: "19 Aug 2026", assignedTo: "Unassigned" },
  { id: 2, name: "Innovate Web Corp", contact: "Meera Deshmukh", email: "careers@innovateweb.io", industry: "Software Development", city: "Mumbai", employees: "50–100", date: "19 Aug 2026", assignedTo: "Unassigned" },
  { id: 3, name: "Apex Retail Group", contact: "Suresh Kumar", email: "contact@apexretail.in", industry: "Retail & E-commerce", city: "Bengaluru", employees: "500+", date: "18 Aug 2026", assignedTo: "Aarav Sharma" },
  { id: 4, name: "BlueSky Logistics", contact: "Amit Patel", email: "info@blueskylogistics.com", industry: "Logistics", city: "Vadodara", employees: "100–150", date: "18 Aug 2026", assignedTo: "Unassigned" },
  { id: 5, name: "Zenith Finance Group", contact: "Neha Sharma", email: "hr@zenithfinance.co.in", industry: "Financial Services", city: "New Delhi", employees: "250–300", date: "17 Aug 2026", assignedTo: "Ananya Iyer" },
  { id: 6, name: "GreenTerra Organics", contact: "Sanjay Joshi", email: "sanjay@greenterra.org", industry: "Agriculture", city: "Pune", employees: "20–50", date: "16 Aug 2026", assignedTo: "Unassigned" },
];

const salesMembers = ["Aarav Sharma", "Ananya Iyer", "Rohan Verma", "Priya Patel", "Vikram Singh"];

export default function VendorModule() {
  const navigate = useNavigate();
  const [companyList, setCompanyList] = useState(companies);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [transferOpen, setTransferOpen] = useState(false);
  const [member, setMember] = useState("");

  const visibleCompanies = useMemo(() => companyList.filter((company) =>
    `${company.name} ${company.contact} ${company.industry} ${company.city}`.toLowerCase().includes(search.toLowerCase())
  ), [companyList, search]);

  const toggleCompany = (id) => setSelectedIds((current) => current.includes(id)
    ? current.filter((companyId) => companyId !== id)
    : [...current, id]);

  const toggleAll = () => setSelectedIds(selectedIds.length === visibleCompanies.length ? [] : visibleCompanies.map((company) => company.id));

  const assignCompanies = () => {
    if (!member) return;
    setCompanyList((current) => current.map((company) => selectedIds.includes(company.id) ? { ...company, assignedTo: member } : company));
    setSelectedIds([]);
    setMember("");
    setTransferOpen(false);
  };

  const handleExport = () => {
    const listToExport = selectedIds.length
      ? companyList.filter((company) => selectedIds.includes(company.id))
      : visibleCompanies;

    if (!listToExport.length) return;

    const data = listToExport.map((company, index) => ({
      "Sr. No.": index + 1,
      "Company Name": company.name,
      "Contact Person": company.contact,
      "Email": company.email,
      "Industry": company.industry,
      "City": company.city,
      "Size (Employees)": company.employees,
      "Joined Date": company.date,
      "Assigned To": company.assignedTo,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendors");
    XLSX.writeFile(workbook, "Vendors_List.xlsx");
  };

  return (
    <section className="min-h-screen bg-[#f6f7fb] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-violet-600"><Building2 size={17} /> Sales Team Onboarding / Vendors</div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Vendor Management</h1>
              <p className="mt-1 text-sm text-slate-500">View company information and assign selected vendors to your sales team.</p>
            </div>
            <button onClick={() => setTransferOpen(true)} disabled={!selectedIds.length} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500">
              <Send size={16} /> Transfer{selectedIds.length ? ` (${selectedIds.length})` : ""}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Total Companies" value={companyList.length} icon={<Building2 size={21} />} color="bg-violet-50 text-violet-600" />
          <Stat label="Unassigned Vendors" value={companyList.filter((company) => company.assignedTo === "Unassigned").length} icon={<Users size={21} />} color="bg-amber-50 text-amber-600" />
          <Stat label="Selected for Transfer" value={selectedIds.length} icon={<Check size={21} />} color="bg-emerald-50 text-emerald-600" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">All Vendors</h2>
              <p className="mt-0.5 text-xs text-slate-500">Select one or more companies to transfer them.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="relative block w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <input 
                  value={search} 
                  onChange={(event) => setSearch(event.target.value)} 
                  placeholder="Search company or contact..." 
                  className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100" 
                />
              </label>
              <button 
                type="button"
                onClick={handleExport}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 cursor-pointer"
                title="Export vendors to Excel"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[930px] w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"><tr><th className="w-14 px-5 py-4"><input aria-label="Select all companies" type="checkbox" checked={visibleCompanies.length > 0 && selectedIds.length === visibleCompanies.length} onChange={toggleAll} className="h-4 w-4 accent-violet-600" /></th><th className="px-3 py-4">Company</th><th className="px-3 py-4">Contact Details</th><th className="px-3 py-4">Industry</th><th className="px-3 py-4">Size</th><th className="px-3 py-4">Assigned To</th><th className="px-5 py-4 text-right">Action</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {visibleCompanies.map((company) => <tr key={company.id} className="transition hover:bg-violet-50/30"><td className="px-5 py-4"><input aria-label={`Select ${company.name}`} type="checkbox" checked={selectedIds.includes(company.id)} onChange={() => toggleCompany(company.id)} className="h-4 w-4 accent-violet-600" /></td><td className="px-3 py-4"><p className="font-semibold text-slate-800">{company.name}</p><p className="mt-1 text-xs text-slate-400">Joined {company.date}</p></td><td className="px-3 py-4"><p className="font-medium text-slate-700">{company.contact}</p><p className="mt-1 text-xs text-slate-400">{company.email}</p></td><td className="px-3 py-4"><p className="text-slate-700">{company.industry}</p><p className="mt-1 text-xs text-slate-400">{company.city}</p></td><td className="px-3 py-4 text-slate-600">{company.employees}</td><td className="px-3 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${company.assignedTo === "Unassigned" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{company.assignedTo}</span></td><td className="px-5 py-4 text-right"><button onClick={() => navigate(`/sales-team-onboarding/vendors/company/${company.id}`, { state: { company } })} className="font-semibold text-violet-600 hover:text-violet-800">View details</button></td></tr>)}
                {!visibleCompanies.length && <tr><td colSpan="7" className="px-5 py-12 text-center text-slate-500">No vendors match your search.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {transferOpen && <Modal title="Transfer selected vendors" onClose={() => setTransferOpen(false)}><p className="text-sm text-slate-500">Assign <b className="text-slate-800">{selectedIds.length} selected {selectedIds.length === 1 ? "company" : "companies"}</b> to a sales team member.</p><label className="mt-5 block text-sm font-semibold text-slate-700">Sales team member</label><div className="relative mt-2"><select value={member} onChange={(event) => setMember(event.target.value)} className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"><option value="">Select a sales member</option>{salesMembers.map((name) => <option key={name}>{name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3 text-slate-400" size={18} /></div><div className="mt-6 flex justify-end gap-3"><button onClick={() => setTransferOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button><button onClick={assignCompanies} disabled={!member} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300">Assign vendors</button></div></Modal>}
    </section>
  );
}

function Stat({ label, value, icon, color }) { return <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-slate-900">{value}</p></div><div className={`rounded-xl p-3 ${color}`}>{icon}</div></div>; }
function Detail({ label, value }) { return <div><p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-sm font-semibold text-slate-800">{value}</p></div>; }
function Modal({ title, children, onClose }) { return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"><div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-slate-100 px-6 py-4"><h3 className="text-lg font-bold text-slate-900">{title}</h3><button onClick={onClose} aria-label="Close modal" className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={20} /></button></div><div className="p-6">{children}</div></div></div>; }
