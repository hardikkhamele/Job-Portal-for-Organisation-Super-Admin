// Data store and localStorage helper for Current Vacancy module

export const VACANCIES_KEY = "admin_current_vacancies";

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

export const defaultVacancies = [
  {
    id: 1,
    vacancyId: "VAC-101",
    companyName: "TechVantage Solutions",
    email: "hr@techvantage.com",
    contactNumber: "+91 98765 43210",
    state: "Maharashtra",
    city: "Mumbai",
    category: "IT",
    subCategory: "Frontend Development",
    profile: "Senior React Developer",
    technology: "React, TypeScript, Node.js",
    requirements: "5+ years experience in React.js, proficiency in TypeScript, knowledge of REST APIs and GraphQL",
    noOfVacancy: 5,
    applicationSubmitted: 2,
    workMode: "Remote",
    deadline: "2026-10-15",
    addedBy: "Aarav Sharma",
    status: "Open",
    createdAt: "2026-08-10T10:30:00Z"
  },
  {
    id: 2,
    vacancyId: "VAC-102",
    companyName: "Innovate Web Corp",
    email: "careers@innovateweb.io",
    contactNumber: "+91 87654 32109",
    state: "Karnataka",
    city: "Bengaluru",
    category: "IT",
    subCategory: "UI/UX Design",
    profile: "Lead UI/UX Designer",
    technology: "Figma, Adobe XD, Sketch",
    requirements: "3+ years experience in UI/UX design, portfolio required, experience with design systems",
    noOfVacancy: 3,
    applicationSubmitted: 1,
    workMode: "Hybrid",
    deadline: "2026-09-30",
    addedBy: "Ananya Iyer",
    status: "Open",
    createdAt: "2026-08-12T09:15:00Z"
  },
  {
    id: 3,
    vacancyId: "VAC-103",
    companyName: "Apex Retail Group",
    email: "contact@apexretail.in",
    contactNumber: "+91 76543 21098",
    state: "Delhi",
    city: "New Delhi",
    category: "Non IT",
    subCategory: "Digital Marketing",
    profile: "SEO & Growth Manager",
    technology: "Google Analytics, SEMrush, Ahrefs",
    requirements: "4+ years in digital marketing, expertise in SEO/SEM, campaign management experience",
    noOfVacancy: 8,
    applicationSubmitted: 2,
    workMode: "Onsite",
    deadline: "2026-10-05",
    addedBy: "Rohan Verma",
    status: "Open",
    createdAt: "2026-08-15T14:00:00Z"
  },
  {
    id: 4,
    vacancyId: "VAC-104",
    companyName: "Zenith Finance Group",
    email: "hr@zenithfinance.co.in",
    contactNumber: "+91 54321 09876",
    state: "Telangana",
    city: "Hyderabad",
    category: "Non IT",
    subCategory: "Recruitment",
    profile: "Technical Recruiter",
    technology: "LinkedIn Recruiter, Naukri, ATS Tools",
    requirements: "2+ years in tech recruitment, sourcing experience, excellent communication skills",
    noOfVacancy: 4,
    applicationSubmitted: 1,
    workMode: "Hybrid",
    deadline: "2026-10-20",
    addedBy: "Priya Patel",
    status: "Open",
    createdAt: "2026-08-18T11:30:00Z"
  },
  {
    id: 5,
    vacancyId: "VAC-105",
    companyName: "BlueSky Logistics",
    email: "info@blueskylogistics.com",
    contactNumber: "+91 65432 10987",
    state: "Gujarat",
    city: "Ahmedabad",
    category: "Non IT",
    subCategory: "Operations",
    profile: "Supply Chain Manager",
    technology: "SAP, Oracle ERP",
    requirements: "6+ years in supply chain management, logistics experience mandatory",
    noOfVacancy: 2,
    applicationSubmitted: 3,
    workMode: "Onsite",
    deadline: "2026-09-25",
    addedBy: "Vikram Singh",
    status: "Closed",
    createdAt: "2026-07-20T08:00:00Z"
  },
  {
    id: 6,
    vacancyId: "VAC-106",
    companyName: "GreenTerra Organics",
    email: "sanjay@greenterra.org",
    contactNumber: "+91 43210 98765",
    state: "Maharashtra",
    city: "Pune",
    category: "IT",
    subCategory: "Backend Development",
    profile: "Java Spring Boot Developer",
    technology: "Java, Spring Boot, Microservices",
    requirements: "3+ years in Java backend development, Spring Boot and microservices architecture",
    noOfVacancy: 6,
    applicationSubmitted: 5,
    workMode: "Remote",
    deadline: "2026-09-15",
    addedBy: "Aarav Sharma",
    status: "Closed",
    createdAt: "2026-07-10T16:45:00Z"
  },
  {
    id: 7,
    vacancyId: "VAC-107",
    companyName: "Nova Healthtech Solutions",
    email: "onboard@novahealth.tech",
    contactNumber: "+91 21098 76543",
    state: "West Bengal",
    city: "Kolkata",
    category: "IT",
    subCategory: "Data Science",
    profile: "ML Engineer",
    technology: "Python, TensorFlow, PyTorch",
    requirements: "2+ years in machine learning, proficiency in Python and deep learning frameworks",
    noOfVacancy: 3,
    applicationSubmitted: 0,
    workMode: "Hybrid",
    deadline: "2026-11-01",
    addedBy: "Ananya Iyer",
    status: "Open",
    createdAt: "2026-08-22T13:00:00Z"
  },
  {
    id: 8,
    vacancyId: "VAC-108",
    companyName: "Starlight EdTech",
    email: "support@starlight.edu",
    contactNumber: "+91 32109 87654",
    state: "Uttar Pradesh",
    city: "Noida",
    category: "Non IT",
    subCategory: "Content & Training",
    profile: "Content Strategist",
    technology: "WordPress, HubSpot, Canva",
    requirements: "3+ years content strategy experience, EdTech background preferred",
    noOfVacancy: 2,
    applicationSubmitted: 4,
    workMode: "Remote",
    deadline: "2026-09-20",
    addedBy: "Rohan Verma",
    status: "Closed",
    createdAt: "2026-07-05T10:00:00Z"
  }
];

export const getVacancies = () => {
  const stored = readLocalStorage(VACANCIES_KEY, null);
  if (Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  writeLocalStorage(VACANCIES_KEY, defaultVacancies);
  return defaultVacancies;
};

export const saveVacancies = (vacancies) => {
  writeLocalStorage(VACANCIES_KEY, vacancies);
};

export const addVacancy = (data) => {
  const vacancies = getVacancies();
  const nextId = vacancies.length > 0 ? Math.max(...vacancies.map((v) => Number(v.id) || 0)) + 1 : 1;
  const nextVacId = `VAC-${100 + nextId}`;

  const newVacancy = {
    id: nextId,
    vacancyId: nextVacId,
    companyType: data.companyType || "IT",
    companyName: data.companyName || "",
    industrySector: data.industrySector || "Information Technology",
    email: data.email || "",
    contactNumber: data.contactNumber || "",
    website: data.website || "",
    address: data.address || "",
    hrName: data.hrName || "",
    hrMobile: data.hrMobile || "",
    hrEmail: data.hrEmail || "",
    state: data.state || "",
    city: data.city || "",
    category: data.category || "IT",
    subCategory: data.subCategory || "",
    profile: data.profile || "",
    technology: data.technology || "",
    requirements: data.requirements || "",
    noOfVacancy: Number(data.noOfVacancy || data.requiredCandidates) || 1,
    requiredCandidates: Number(data.requiredCandidates || data.noOfVacancy) || 1,
    experience: data.experience || "",
    budget: data.budget || "",
    noticePeriod: data.noticePeriod || "",
    applicationSubmitted: 0,
    workMode: data.workMode || "Onsite",
    deadline: data.deadline || "",
    addedBy: data.addedBy || "Super Admin",
    status: "Open",
    createdAt: new Date().toISOString()
  };

  const updated = [newVacancy, ...vacancies];
  saveVacancies(updated);
  return { newVacancy, allVacancies: updated };
};
