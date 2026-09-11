// Data store and localStorage helper for Staffing Management module

export const STAFFING_EMPLOYEES_KEY = "admin_staffing_employees";
export const STAFFING_COMPANIES_KEY = "admin_staffing_companies";
export const STAFFING_REQUIREMENTS_KEY = "admin_staffing_company_requirements";

export const defaultStaffingEmployees = [];

const legacyStaffingNames = new Set([
  "Aarav Sharma",
  "Ananya Iyer",
  "Rohan Verma",
  "Priya Patel",
  "Vikram Singh"
]);

export const defaultStaffingCompanies = [
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
  }
];

export const readLocalStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

export const writeLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
};

export const getStaffingEmployees = () => {
  const stored = readLocalStorage(STAFFING_EMPLOYEES_KEY, null);

  if (Array.isArray(stored) && stored.length > 0) {
    const cleaned = stored.filter((emp) => !legacyStaffingNames.has(emp?.name));

    if (cleaned.length !== stored.length) {
      writeLocalStorage(STAFFING_EMPLOYEES_KEY, cleaned);
    }

    return cleaned;
  }

  writeLocalStorage(STAFFING_EMPLOYEES_KEY, defaultStaffingEmployees);
  return defaultStaffingEmployees;
};

export const saveStaffingEmployees = (employees) => {
  writeLocalStorage(STAFFING_EMPLOYEES_KEY, employees);
};

export const getStaffingCompanies = () => {
  const stored = readLocalStorage(STAFFING_COMPANIES_KEY, null);
  if (stored && Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  writeLocalStorage(STAFFING_COMPANIES_KEY, defaultStaffingCompanies);
  return defaultStaffingCompanies;
};

export const saveStaffingCompanies = (companies) => {
  writeLocalStorage(STAFFING_COMPANIES_KEY, companies);
};

export const addStaffingMember = (memberData) => {
  const employees = getStaffingEmployees();
  const nextId = employees.length > 0 ? Math.max(...employees.map((e) => Number(e.id) || 0)) + 1 : 1;
  const newMember = {
    id: nextId,
    name: memberData.name || memberData.companyName || "New Member",
    designation: memberData.designation || "Staffing Member",
    email: memberData.email || "",
    phone: memberData.mobileNumber || "",
    total: 0,
    today: 0,
    completed: 0,
    pending: 0,
    performance: 100,
    isBlocked: false,
    dateAdded: new Date().toISOString()
  };
  const updated = [newMember, ...employees.filter((e) => e.name.toLowerCase() !== newMember.name.toLowerCase())];
  saveStaffingEmployees(updated);
  return { newMember, allEmployees: updated };
};

export const getCompaniesForEmployee = (employeeName) => {
  if (!employeeName) return [];
  const companies = getStaffingCompanies();
  return companies.filter(
    (c) => c.onboardedBy && c.onboardedBy.trim().toLowerCase() === employeeName.trim().toLowerCase()
  );
};
