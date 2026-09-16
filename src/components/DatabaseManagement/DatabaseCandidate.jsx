import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, ChevronLeft, ChevronRight, Send, X, Trash2, History, CheckCircle2, UserCheck, Calendar, Clock, Search, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { fetchCandidates } from "../../redux/slice/databaseManagement/getAllCandidate";
import {
  fetchCategories,
  fetchDesignations,
  clearDesignations,
} from "../../redux/slice/databaseManagement/dropdownSlice";
import { fetchAllHr } from "../../redux/slice/hrManagement/getAllHr";
import { fetchEmployers } from "../../redux/slice/employer/getAllEmployer";
import { addNotification } from "../../utils/notificationHelper";
import { addTransferRecord, getTransferHistory } from "../../utils/transferHistoryHelper";
const getCandidateName = (item) => {
  if (!item || typeof item !== "object") return "N/A";

  // 1. Direct explicit property checks
  const explicitName =
    item.name ||
    item.fullName ||
    item.full_name ||
    item.candidateName ||
    item.candidate_name ||
    item.CandidateName ||
    item.Candidate_Name ||
    item.HRName ||
    item.hrName ||
    item.userName ||
    item.user_name ||
    item.applicantName ||
    item.applicant_name ||
    item.seekerName ||
    item.seeker_name ||
    item.contactPerson ||
    item["FULL NAME"] ||
    item["Full Name"] ||
    item["Candidate Name"] ||
    item["CANDIDATE NAME"] ||
    item["Candidate_Name"] ||
    item["CandidateName"] ||
    item["Name"] ||
    item["NAME"] ||
    item.candidate?.name ||
    item.candidate?.fullName ||
    item.candidateId?.name ||
    item.candidateId?.fullName ||
    item.candidate_id?.name ||
    item.candidate_id?.fullName ||
    item.jobseekerId?.name ||
    item.jobSeekerId?.name ||
    item.userId?.name ||
    item.user_id?.name ||
    item.candidateDetails?.name ||
    item.candidate_details?.name ||
    item.personalInfo?.name ||
    item.personalInfo?.fullName ||
    item.personalInfo?.full_name ||
    item.personalInfo?.candidateName ||
    item.basicDetails?.name ||
    item.basicDetails?.fullName ||
    item.basicDetails?.full_name ||
    item.user?.name ||
    item.user?.fullName ||
    item.user?.userName ||
    item.profile?.name ||
    item.profile?.fullName ||
    item.details?.name;

  if (explicitName && typeof explicitName === "string" && explicitName.trim()) {
    return explicitName.trim();
  }

  if (typeof explicitName === "object" && explicitName !== null) {
    const subName = explicitName?.name || explicitName?.fullName || explicitName?.full_name || explicitName?.label;
    if (subName && String(subName).trim()) return String(subName).trim();
  }

  // 2. First name + Last name
  const getCombinedFirstLast = (obj) => {
    if (!obj || typeof obj !== "object") return "";
    const fn = obj.firstName || obj.first_name || obj.FirstName || obj.fname;
    const ln = obj.lastName || obj.last_name || obj.LastName || obj.lname;
    if (fn || ln) {
      return `${fn || ""} ${ln || ""}`.trim();
    }
    return "";
  };

  const combined =
    getCombinedFirstLast(item) ||
    getCombinedFirstLast(item.candidate) ||
    getCombinedFirstLast(item.candidateId) ||
    getCombinedFirstLast(item.personalInfo) ||
    getCombinedFirstLast(item.basicDetails) ||
    getCombinedFirstLast(item.user) ||
    getCombinedFirstLast(item.profile);

  if (combined) return combined;

  // 3. Dynamic scan of all keys in item
  const ignoredKeys = [
    "categoryname", "category_name", "category", "designationname", "designation_name",
    "designation", "subcategoryname", "companyname", "hrname", "filename", "tablename",
    "updatedat", "createdat", "_id", "id", "dbitemid", "uniquekey", "status", "workmode"
  ];

  const keys = Object.keys(item);
  for (const k of keys) {
    const cleanKey = k.trim().toLowerCase();
    if (ignoredKeys.includes(cleanKey)) continue;

    if (cleanKey.includes("name") || cleanKey.includes("candidate") || cleanKey.includes("user") || cleanKey.includes("applicant") || cleanKey.includes("seeker")) {
      const val = item[k];
      if (val && typeof val === "string" && val.trim() && !val.includes("@") && val.trim() !== "N/A") {
        return val.trim();
      }
    }
  }

  return "N/A";
};

const getCandidateEmail = (item) => {
  if (!item || typeof item !== "object") return "N/A";

  // 1. Direct explicit property checks
  const explicitEmail =
    item.email ||
    item.emailId ||
    item.email_id ||
    item.candidateEmail ||
    item.candidate_email ||
    item.CandidateEmail ||
    item.Email ||
    item.contactEmail ||
    item.emailAddress ||
    item.email_address ||
    item.mail ||
    item.Mail ||
    item.applicantEmail ||
    item.applicant_email ||
    item.seekerEmail ||
    item.seeker_email ||
    item["EMAIL"] ||
    item["EMAIL ID"] ||
    item["Email"] ||
    item["Email Id"] ||
    item["Email ID"] ||
    item["Email Address"] ||
    item["EMAIL ADDRESS"] ||
    item["CandidateEmail"] ||
    item["Candidate_Email"] ||
    item.candidate?.email ||
    item.candidateId?.email ||
    item.candidate_id?.email ||
    item.jobseekerId?.email ||
    item.jobSeekerId?.email ||
    item.userId?.email ||
    item.user_id?.email ||
    item.candidateDetails?.email ||
    item.personalInfo?.email ||
    item.personalInfo?.emailId ||
    item.personalInfo?.email_id ||
    item.personalInfo?.emailAddress ||
    item.basicDetails?.email ||
    item.basicDetails?.emailId ||
    item.user?.email ||
    item.profile?.email ||
    item.details?.email;

  if (explicitEmail && typeof explicitEmail === "string" && explicitEmail.trim()) {
    return explicitEmail.trim();
  }

  if (typeof explicitEmail === "object" && explicitEmail !== null) {
    const subEmail = explicitEmail?.email || explicitEmail?.address;
    if (subEmail && String(subEmail).trim()) return String(subEmail).trim();
  }

  // 2. Dynamic scan for keys containing email or mail
  const keys = Object.keys(item);
  for (const k of keys) {
    const cleanKey = k.trim().toLowerCase();
    if (cleanKey.includes("email") || cleanKey.includes("mail")) {
      const val = item[k];
      if (val && typeof val === "string" && val.trim() && val.trim() !== "N/A") {
        return val.trim();
      }
    }
  }

  // 3. Scan all property values for email regex string
  for (const k of keys) {
    const val = item[k];
    if (val && typeof val === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
      return val.trim();
    }
  }

  return "N/A";
};

const getCandidatePhone = (item) => {
  if (!item || typeof item !== "object") return "N/A";

  const explicitPhone =
    item.phone ||
    item.mobile ||
    item.mobileNumber ||
    item.mobile_number ||
    item.contactNumber ||
    item.contact_number ||
    item.phoneNo ||
    item.phone_no ||
    item.phoneNumber ||
    item.phone_number ||
    item.candidatePhone ||
    item.candidate_phone ||
    item["PHONE NUMBER"] ||
    item["MOBILE"] ||
    item["Phone"] ||
    item["Phone Number"] ||
    item["MOBILE NUMBER"] ||
    item["Contact Number"] ||
    item.candidate?.phone ||
    item.candidate?.mobile ||
    item.candidateId?.phone ||
    item.candidateId?.mobile ||
    item.personalInfo?.phone ||
    item.personalInfo?.mobile ||
    item.personalInfo?.mobileNumber ||
    item.personalInfo?.contactNumber ||
    item.basicDetails?.phone ||
    item.basicDetails?.mobile ||
    item.user?.phone ||
    item.user?.mobile ||
    item.profile?.phone ||
    item.details?.phone;

  if (explicitPhone && (typeof explicitPhone === "string" || typeof explicitPhone === "number")) {
    const str = String(explicitPhone).trim();
    if (str) return str;
  }

  if (typeof explicitPhone === "object" && explicitPhone !== null) {
    const subPhone = explicitPhone?.phone || explicitPhone?.mobile || explicitPhone?.number;
    if (subPhone && String(subPhone).trim()) return String(subPhone).trim();
  }

  const keys = Object.keys(item);
  for (const k of keys) {
    const cleanKey = k.trim().toLowerCase();
    if (cleanKey.includes("phone") || cleanKey.includes("mobile") || cleanKey.includes("contact")) {
      const val = item[k];
      if (val && (typeof val === "string" || typeof val === "number")) {
        const str = String(val).trim();
        if (str && str !== "N/A") return str;
      }
    }
  }

  return "N/A";
};

const getCandidateCity = (item) => {
  if (!item || typeof item !== "object") return "N/A";

  const isValidCity = (val) => {
    if (!val || typeof val !== "string") return false;
    const trimmed = val.trim();
    if (!trimmed) return false;
    const lower = trimmed.toLowerCase();
    if (
      lower === "n/a" ||
      lower === "na" ||
      lower === "null" ||
      lower === "undefined" ||
      lower === "-" ||
      lower === "—" ||
      lower === "none"
    ) {
      return false;
    }
    if (/^[0-9a-fA-F]{24}$/.test(trimmed)) return false;
    return true;
  };

  // 1. Direct candidate fields across all known response models
  const candidateList = [
    item.personalInfo?.location?.city,
    item.personalInfo?.city,
    item.personalInfo?.cityName,
    item.personalInfo?.location?.cityName,
    typeof item.personalInfo?.location === "string" ? item.personalInfo.location.split(",")[0] : null,
    item.location?.city,
    item.location?.cityName,
    typeof item.location === "string" ? item.location.split(",")[0] : null,
    item.city,
    item.cityName,
    item.City,
    item.CITY,
    item.CityName,
    item.candidateCity,
    item.currentCity,
    item.preferredCity,
    item["CITY"],
    item["City"],
    item["city"],
    item["City Name"],
    item["CITY NAME"],
    item["CityName"],
    item["Current City"],
    item["CURRENT CITY"],
    item["Location"],
    item["LOCATION"],
    typeof item["Location"] === "string" ? item["Location"].split(",")[0] : null,
    item.address?.city,
    item.address?.cityName,
    typeof item.address === "string" ? item.address.split(",")[0] : null,
    item.candidate?.personalInfo?.location?.city,
    item.candidate?.personalInfo?.city,
    item.candidate?.location?.city,
    item.candidate?.city,
    typeof item.candidate?.location === "string" ? item.candidate.location.split(",")[0] : null,
    item.candidateId?.personalInfo?.location?.city,
    item.candidateId?.personalInfo?.city,
    item.candidateId?.location?.city,
    item.candidateId?.city,
    typeof item.candidateId?.location === "string" ? item.candidateId.location.split(",")[0] : null,
    item.basicDetails?.location?.city,
    item.basicDetails?.city,
    typeof item.basicDetails?.location === "string" ? item.basicDetails.location.split(",")[0] : null,
    item.user?.location?.city,
    item.user?.city,
    typeof item.user?.location === "string" ? item.user.location.split(",")[0] : null,
    item.profile?.location?.city,
    item.profile?.city,
    typeof item.profile?.location === "string" ? item.profile.location.split(",")[0] : null,
    item.details?.location?.city,
    item.details?.city,
    typeof item.details?.location === "string" ? item.details.location.split(",")[0] : null,
  ];

  for (const c of candidateList) {
    if (isValidCity(c)) {
      return c.trim();
    }
  }

  // 2. Dynamic scan of all keys in item
  const ignoredKeys = [
    "categoryname", "category_name", "category", "designationname", "designation_name",
    "designation", "subcategoryname", "companyname", "hrname", "filename", "tablename",
    "updatedat", "createdat", "_id", "id", "dbitemid", "uniquekey", "status", "workmode",
    "email", "phone", "name", "education", "experience", "resume", "cv", "cityset", "citylist"
  ];

  const keys = Object.keys(item);
  for (const k of keys) {
    const cleanKey = k.trim().toLowerCase();
    if (ignoredKeys.includes(cleanKey)) continue;

    if (cleanKey.includes("city") || cleanKey === "location" || cleanKey.includes("town") || cleanKey.includes("district")) {
      const val = item[k];
      if (typeof val === "string") {
        const candidateStr = cleanKey === "location" || cleanKey.includes("location")
          ? val.split(",")[0].trim()
          : val.trim();
        if (isValidCity(candidateStr)) {
          return candidateStr;
        }
      } else if (typeof val === "object" && val !== null) {
        const subCity = val.city || val.cityName || val.name;
        if (isValidCity(subCity)) {
          return subCity.trim();
        }
      }
    }
  }

  return "N/A";
};

const getCandidateState = (item) => {
  if (!item || typeof item !== "object") return "N/A";

  const isValidState = (val) => {
    if (!val || typeof val !== "string") return false;
    const trimmed = val.trim();
    if (!trimmed) return false;
    const lower = trimmed.toLowerCase();
    if (
      lower === "n/a" ||
      lower === "na" ||
      lower === "null" ||
      lower === "undefined" ||
      lower === "-" ||
      lower === "—" ||
      lower === "none"
    ) {
      return false;
    }
    if (/^[0-9a-fA-F]{24}$/.test(trimmed)) return false;
    return true;
  };

  const stateList = [
    item.personalInfo?.location?.state,
    item.personalInfo?.state,
    item.personalInfo?.stateName,
    typeof item.personalInfo?.location === "string" ? item.personalInfo.location.split(",")[1] : null,
    item.location?.state,
    item.location?.stateName,
    typeof item.location === "string" ? item.location.split(",")[1] : null,
    item.state,
    item.stateName,
    item.State,
    item.STATE,
    item.StateName,
    item.address?.state,
    item.address?.stateName,
    item.candidate?.personalInfo?.location?.state,
    item.candidate?.personalInfo?.state,
    item.candidate?.location?.state,
    item.candidate?.state,
    typeof item.candidate?.location === "string" ? item.candidate.location.split(",")[1] : null,
    item.candidateId?.personalInfo?.location?.state,
    item.candidateId?.personalInfo?.state,
    item.candidateId?.location?.state,
    item.candidateId?.state,
    typeof item.candidateId?.location === "string" ? item.candidateId.location.split(",")[1] : null,
    item.basicDetails?.location?.state,
    item.basicDetails?.state,
    typeof item.basicDetails?.location === "string" ? item.basicDetails.location.split(",")[1] : null,
    item.user?.location?.state,
    item.user?.state,
    typeof item.user?.location === "string" ? item.user.location.split(",")[1] : null,
    item.profile?.location?.state,
    item.profile?.state,
    typeof item.profile?.location === "string" ? item.profile.location.split(",")[1] : null,
    item.details?.location?.state,
    item.details?.state,
    typeof item.details?.location === "string" ? item.details.location.split(",")[1] : null,
  ];

  for (const st of stateList) {
    if (isValidState(st)) {
      return st.trim();
    }
  }

  const ignoredKeys = [
    "categoryname", "category_name", "category", "designationname", "designation_name",
    "designation", "subcategoryname", "companyname", "hrname", "filename", "tablename",
    "updatedat", "createdat", "_id", "id", "dbitemid", "uniquekey", "status", "workmode",
    "email", "phone", "name", "education", "experience", "resume", "cv", "cityset", "citylist"
  ];

  const keys = Object.keys(item);
  for (const k of keys) {
    const cleanKey = k.trim().toLowerCase();
    if (ignoredKeys.includes(cleanKey)) continue;

    if (cleanKey.includes("state") || cleanKey === "location" || cleanKey.includes("province") || cleanKey.includes("region")) {
      const val = item[k];
      if (typeof val === "string") {
        const candidateStr = cleanKey === "location" || cleanKey.includes("location")
          ? val.split(",")[1]?.trim() || val.trim()
          : val.trim();
        if (isValidState(candidateStr)) {
          return candidateStr;
        }
      } else if (typeof val === "object" && val !== null) {
        const subState = val.state || val.stateName || val.name;
        if (isValidState(subState)) {
          return subState.trim();
        }
      }
    }
  }

  return "N/A";
};

const getCandidateCategory = (item, categoryList = []) => {
  if (!item || typeof item !== "object") return "";

  const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

  // 1. Check explicit string properties
  const explicitString =
    item.categoryName ||
    item.CategoryName ||
    item.category_name ||
    item.Category_Name ||
    item["CATEGORY NAME"] ||
    item["Category Name"] ||
    item["CATEGORY"] ||
    item["Category"] ||
    item.jobCategoryName ||
    item.jobCategory ||
    (typeof item.category === "string" ? item.category : null) ||
    (typeof item.Category === "string" ? item.Category : null);

  if (explicitString && typeof explicitString === "string" && explicitString.trim() && explicitString.trim() !== "N/A") {
    const strVal = explicitString.trim();
    if (!isValidObjectId(strVal)) {
      return strVal;
    }
    if (Array.isArray(categoryList)) {
      const found = categoryList.find(
        (c) => String(c._id || c.id || c.rawObj?._id || c.rawObj?.id).toLowerCase() === strVal.toLowerCase()
      );
      if (found && (found.name || found.categoryName)) {
        return String(found.name || found.categoryName).trim();
      }
    }
  }

  // 2. Check object properties
  const catObj = item.category || item.Category || item.personalInfo?.category || item.professionalInfo?.category;
  if (typeof catObj === "object" && catObj !== null) {
    const extracted = catObj?.name || catObj?.categoryName || catObj?.CategoryName || catObj?.label;
    if (extracted && String(extracted).trim() && String(extracted).trim() !== "N/A" && !isValidObjectId(String(extracted).trim())) {
      return String(extracted).trim();
    }
  }

  // 3. Dynamic key scan
  const keys = Object.keys(item);
  for (const k of keys) {
    const cleanKey = k.trim().toLowerCase();
    if (cleanKey.includes("category")) {
      const val = item[k];
      if (val && typeof val === "string" && val.trim() && val.trim() !== "N/A") {
        const strVal = val.trim();
        if (!isValidObjectId(strVal)) return strVal;
      }
    }
  }

  return "";
};

const getCandidateDesignation = (item, designationList = []) => {
  if (!item || typeof item !== "object") return "";

  const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

  const explicitString =
    item.designationName ||
    item.DesignationName ||
    item.designation_name ||
    item.Designation_Name ||
    item["DESIGNATION NAME"] ||
    item["Designation Name"] ||
    item["DESIGNATION"] ||
    item["Designation"] ||
    item.jobDesignationName ||
    item.jobDesignation ||
    (typeof item.designation === "string" ? item.designation : null) ||
    (typeof item.Designation === "string" ? item.Designation : null);

  if (explicitString && typeof explicitString === "string" && explicitString.trim() && explicitString.trim() !== "N/A") {
    const strVal = explicitString.trim();
    if (!isValidObjectId(strVal)) {
      return strVal;
    }
    if (Array.isArray(designationList)) {
      const found = designationList.find(
        (d) => String(d._id || d.id || d.rawId || d.rawObj?._id).toLowerCase() === strVal.toLowerCase()
      );
      if (found && (found.name || found.designationName)) {
        return String(found.name || found.designationName).trim();
      }
    }
  }

  const desigObj = item.designation || item.Designation || item.personalInfo?.designation || item.professionalInfo?.designation;
  if (typeof desigObj === "object" && desigObj !== null) {
    const extracted = desigObj?.name || desigObj?.designationName || desigObj?.DesignationName || desigObj?.label;
    if (extracted && String(extracted).trim() && String(extracted).trim() !== "N/A" && !isValidObjectId(String(extracted).trim())) {
      return String(extracted).trim();
    }
  }

  const keys = Object.keys(item);
  for (const k of keys) {
    const cleanKey = k.trim().toLowerCase();
    if (cleanKey.includes("designation") || cleanKey.includes("role") || cleanKey.includes("title")) {
      const val = item[k];
      if (val && typeof val === "string" && val.trim() && val.trim() !== "N/A") {
        const strVal = val.trim();
        if (!isValidObjectId(strVal)) return strVal;
      }
    }
  }

  return "";
};

const DatabaseCandidate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();  

  // Selectors
  const { candidates, total, totalPages, loading } = useSelector(
    (state) => state.allCandidate,
  );
  const { categories, designations } = useSelector((state) => state.dropdown);
  const { hrList } = useSelector((state) => state.allHr);
  const { employers } = useSelector((state) => state.allEmployer);

  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  const getInitialPage = () => {
    const urlPage = parseInt(searchParams.get("page"), 10);
    if (!isNaN(urlPage) && urlPage > 0) return urlPage;
    const sessionPage = parseInt(sessionStorage.getItem("database_candidate_page"), 10);
    if (!isNaN(sessionPage) && sessionPage > 0) return sessionPage;
    return 1;
  };

  // Local States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedWorkMode, setSelectedWorkMode] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [datePreset, setDatePreset] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transferCountPreset, setTransferCountPreset] = useState("");
  const [transferLowerLimit, setTransferLowerLimit] = useState("");
  const [transferHigherLimit, setTransferHigherLimit] = useState("");
  const [transferRangeError, setTransferRangeError] = useState("");
  const [transferRangeInfo, setTransferRangeInfo] = useState("");
  const [fetchedTransferCandidates, setFetchedTransferCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectAllLoading, setSelectAllLoading] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferHistoryList, setTransferHistoryList] = useState([]);
  const adminProfile = useSelector((state) => state.adminProfile?.profile);

  useEffect(() => {
    const loadHistory = () => {
      setTransferHistoryList(getTransferHistory());
    };
    loadHistory();
    window.addEventListener("transferHistoryUpdated", loadHistory);
    return () => {
      window.removeEventListener("transferHistoryUpdated", loadHistory);
    };
  }, []);

  const [transferTarget, setTransferTarget] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState("");
  const [hrSearchTerm, setHrSearchTerm] = useState("");
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [isHrDropdownOpen, setIsHrDropdownOpen] = useState(false);
  const [isEmpDropdownOpen, setIsEmpDropdownOpen] = useState(false);
  const [hrOptions, setHrOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [loadingPersons, setLoadingPersons] = useState(false);
  const itemsPerPage = 10;

  // Combine Redux and direct API response lists for HRs and Employees safely
  const combinedHrList = useMemo(() => {
    if (Array.isArray(hrOptions) && hrOptions.length > 0) return hrOptions;
    if (Array.isArray(hrList) && hrList.length > 0) return hrList;
    return [];
  }, [hrOptions, hrList]);

  const combinedEmployeeList = useMemo(() => {
    if (Array.isArray(employeeOptions) && employeeOptions.length > 0) return employeeOptions;
    if (Array.isArray(employers) && employers.length > 0) return employers;
    return [];
  }, [employeeOptions, employers]);

  // Formatted & deduplicated list of ALL HRs
  const formattedHrList = useMemo(() => {
    const list = combinedHrList.length > 0 ? combinedHrList : hrList || [];
    const map = new Map();
    const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

    list.forEach((item, idx) => {
      if (!item) return;
      const idVal = item._id || item.id;
      if (!idVal || !isValidObjectId(String(idVal))) return;

      const name =
        item.hrName ||
        item.name ||
        item.fullName ||
        item.userName ||
        item.user?.name ||
        item.user?.fullName ||
        item.email ||
        `HR #${idx + 1}`;

      if (!map.has(String(idVal))) {
        map.set(String(idVal), {
          id: String(idVal),
          name: name,
          email: item.email || item.user?.email || "",
        });
      }
    });
    return Array.from(map.values());
  }, [combinedHrList, hrList]);

  const filteredHrList = useMemo(() => {
    const searchValue = hrSearchTerm.trim().toLowerCase();
    if (!searchValue) return formattedHrList;

    return formattedHrList.filter((hr) =>
      `${hr.name} ${hr.email}`.toLowerCase().includes(searchValue),
    );
  }, [formattedHrList, hrSearchTerm]);

  // Formatted & deduplicated list of ALL Employees
  const formattedEmployeeList = useMemo(() => {
    const list = combinedEmployeeList.length > 0 ? combinedEmployeeList : employers || [];
    const map = new Map();
    const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

    list.forEach((item, idx) => {
      if (!item) return;
      const idVal = item._id || item.id;
      if (!idVal || !isValidObjectId(String(idVal))) return;

      const name =
        item.companyName ||
        item.name ||
        item.fullName ||
        item.employerName ||
        item.contactPerson ||
        item.userName ||
        item.user?.name ||
        item.email ||
        `Employee #${idx + 1}`;

      if (!map.has(String(idVal))) {
        map.set(String(idVal), {
          id: String(idVal),
          name: name,
          email: item.email || item.companyEmail || item.user?.email || "",
        });
      }
    });
    return Array.from(map.values());
  }, [combinedEmployeeList, employers]);

  const filteredEmployeeList = useMemo(() => {
    const searchValue = employeeSearchTerm.trim().toLowerCase();
    if (!searchValue) return formattedEmployeeList;

    return formattedEmployeeList.filter((employee) =>
      `${employee.name} ${employee.email}`.toLowerCase().includes(searchValue),
    );
  }, [formattedEmployeeList, employeeSearchTerm]);

  // Extract dynamic unique cities and states from candidates data
  const { availableCities, availableStates } = useMemo(() => {
    const citySet = new Set();
    const stateSet = new Set();

    (candidates || []).forEach((item) => {
      // City
      const city = getCandidateCity(item);
      if (city && city !== "N/A") {
        citySet.add(city);
      }

      // State
      const stateCandidates = [
        item.personalInfo?.location?.state,
        item.personalInfo?.state,
        typeof item.personalInfo?.location === "string" && item.personalInfo.location.includes(",")
          ? item.personalInfo.location.split(",")[1]
          : null,
        item.location?.state,
        typeof item.location === "string" && item.location.includes(",")
          ? item.location.split(",")[1]
          : null,
        item.state,
        item.address?.state,
      ];

      for (const st of stateCandidates) {
        if (st && typeof st === "string" && st.trim() && st.trim().toLowerCase() !== "n/a") {
          stateSet.add(st.trim());
          break;
        }
      }
    });

    // Popular defaults present in database/region
    const defaultCities = ["Mumbai", "Pune", "Nagpur", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Noida", "Gurgaon", "Ahmedabad"];
    const defaultStates = ["Maharashtra", "Delhi", "Karnataka", "Telangana", "Tamil Nadu", "West Bengal", "Uttar Pradesh", "Haryana", "Gujarat"];

    defaultCities.forEach((c) => citySet.add(c));
    defaultStates.forEach((s) => stateSet.add(s));

    return {
      availableCities: Array.from(citySet).sort(),
      availableStates: Array.from(stateSet).sort(),
    };
  }, [candidates]);

  // Combine Redux API categories and dynamic categories extracted from candidates
  const combinedCategories = useMemo(() => {
    const list = Array.isArray(categories) ? categories : [];
    const map = new Map();

    // 1. Add categories from Redux API state
    list.forEach((cat) => {
      if (!cat) return;
      const name = typeof cat === "string" ? cat : (cat.name || cat.categoryName || cat.title);
      const idVal = cat._id || cat.id || name;
      if (name) {
        const key = String(name).trim().toLowerCase();
        if (!map.has(key)) {
          map.set(key, { id: idVal, name: String(name).trim(), rawObj: cat });
        }
      }
    });

    // 2. Add dynamic categories from candidate records
    (candidates || []).forEach((item) => {
      const catName = getCandidateCategory(item);
      const catId = item.categoryId || item.category_id || item.category?._id || item.category?.id || catName;
      if (catName && typeof catName === "string" && catName.trim() && catName.trim() !== "N/A") {
        const key = catName.trim().toLowerCase();
        if (!map.has(key)) {
          map.set(key, { id: catId || catName.trim(), name: catName.trim(), rawObj: null });
        }
      }
    });

    return Array.from(map.values());
  }, [categories, candidates]);

  // Combine Redux API designations and dynamic designations extracted from candidates
  const combinedDesignations = useMemo(() => {
    const list = Array.isArray(designations) ? designations : [];
    const map = new Map();

    // 1. Add designations from Redux API state
    list.forEach((item) => {
      if (!item) return;
      const name = typeof item === "string" ? item : (item.name || item.designationName || item.title || item.designation);
      if (name && typeof name === "string" && name.trim()) {
        const trimmed = name.trim();
        if (!map.has(trimmed.toLowerCase())) {
          map.set(trimmed.toLowerCase(), { id: trimmed, name: trimmed, rawId: item._id || item.id });
        }
      }
    });

    // 2. Add dynamic designations from candidates list
    (candidates || []).forEach((item) => {
      const desigName = getCandidateDesignation(item);
      if (desigName && typeof desigName === "string" && desigName.trim() && desigName.trim() !== "N/A") {
        const trimmed = desigName.trim();
        if (!map.has(trimmed.toLowerCase())) {
          map.set(trimmed.toLowerCase(), { id: trimmed, name: trimmed, rawId: item.designationId || item.designation?._id });
        }
      }
    });

    return Array.from(map.values());
  }, [designations, candidates]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch initial category & designation dropdown lists
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchDesignations());
  }, [dispatch]);

  // Sync page changes with URL and sessionStorage
  useEffect(() => {
    sessionStorage.setItem("database_candidate_page", String(currentPage));
    const urlPage = parseInt(searchParams.get("page"), 10);
    if (urlPage !== currentPage) {
      setSearchParams(
        (prev) => {
          const updated = new URLSearchParams(prev);
          updated.set("page", String(currentPage));
          return updated;
        },
        { replace: true }
      );
    }
  }, [currentPage, searchParams, setSearchParams]);

  // Sync state if URL search param changes externally (e.g. browser back/forward)
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page"), 10);
    if (!isNaN(pageFromUrl) && pageFromUrl > 0 && pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
  }, [searchParams]);

  // Reset page to 1 when filters change (skipping initial mount so refresh retains the current page)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCurrentPage(1);
  }, [
    debouncedSearch,
    selectedCategory,
    selectedDesignation,
    selectedCountry,
    selectedState,
    selectedCity,
    selectedWorkMode,
    selectedExperience,
    startDate,
    endDate,
  ]);

  // Fetch candidates from API whenever any filter or currentPage changes
  useEffect(() => {
    dispatch(
      fetchCandidates({
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch,
        category: selectedCategory,
        designation: selectedDesignation,
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        workMode: selectedWorkMode,
        experience: selectedExperience,
        startDate: startDate,
        endDate: endDate,
      })
    );
  }, [
    dispatch,
    currentPage,
    debouncedSearch,
    selectedCategory,
    selectedDesignation,
    selectedCountry,
    selectedState,
    selectedCity,
    selectedWorkMode,
    selectedExperience,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
      if (location.state.designation) {
        dispatch(fetchDesignations(location.state.category));
        setSelectedDesignation(location.state.designation);
      }
    }
  }, [location.state, dispatch]);

  const handleCategoryChange = (e) => {
    const categoryVal = e.target.value;
    setSelectedCategory(categoryVal);
    setSelectedDesignation("");
    setCurrentPage(1);

    if (categoryVal) {
      const catObj = combinedCategories?.find(
        (c) =>
          String(c.name).toLowerCase() === categoryVal.toLowerCase() ||
          String(c.id).toLowerCase() === categoryVal.toLowerCase() ||
          (c.rawObj && (String(c.rawObj._id).toLowerCase() === categoryVal.toLowerCase() || String(c.rawObj.id).toLowerCase() === categoryVal.toLowerCase()))
      );
      const catIdForApi = catObj?.rawObj?._id || catObj?.rawObj?.id || catObj?.id || categoryVal;
      dispatch(fetchDesignations(catIdForApi));
    } else {
      dispatch(fetchDesignations());
    }
  };

  const handleExperienceChange = (e) => {
    const expVal = e.target.value;
    setSelectedExperience(expVal);
    setCurrentPage(1);
  };

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handlePresetChange = (preset) => {
    setDatePreset(preset);
    setCurrentPage(1);
    const today = new Date();

    if (preset === "today") {
      const todayStr = formatDateToYYYYMMDD(today);
      setStartDate(todayStr);
      setEndDate(todayStr);
    } else if (preset === "yesterday") {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const yesterdayStr = formatDateToYYYYMMDD(yesterday);
      setStartDate(yesterdayStr);
      setEndDate(yesterdayStr);
    } else if (preset === "this_week") {
      const dayOfWeek = today.getDay();
      const distanceToMon = (dayOfWeek + 6) % 7;
      const monday = new Date(today);
      monday.setDate(today.getDate() - distanceToMon);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      setStartDate(formatDateToYYYYMMDD(monday));
      setEndDate(formatDateToYYYYMMDD(sunday));
    } else if (preset === "this_month") {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      setStartDate(formatDateToYYYYMMDD(firstDay));
      setEndDate(formatDateToYYYYMMDD(lastDay));
    } else if (preset === "") {
      setStartDate("");
      setEndDate("");
    }
  };

  const unpackCandidatePayload = (payload) => {
    if (!payload) return [];
    let directList = [];
    if (Array.isArray(payload)) {
      directList = payload;
    } else if (Array.isArray(payload?.candidates)) {
      directList = payload.candidates;
    } else if (Array.isArray(payload?.data)) {
      directList = payload.data;
    } else if (Array.isArray(payload?.data?.candidates)) {
      directList = payload.data.candidates;
    }

    const result = [];
    const seenKeys = new Set();

    directList.forEach((item, idx) => {
      if (!item) return;

      const rows =
        (Array.isArray(item.excelData) && item.excelData.length > 0 && item.excelData) ||
        (Array.isArray(item.candidates) && item.candidates.length > 0 && item.candidates) ||
        (Array.isArray(item.excel_data) && item.excel_data.length > 0 && item.excel_data) ||
        (Array.isArray(item.parsedData) && item.parsedData.length > 0 && item.parsedData) ||
        (Array.isArray(item.rows) && item.rows.length > 0 && item.rows) ||
        (Array.isArray(item.data) && item.data.length > 0 && item.data);

      if (rows) {
        const dbId = item._id || item.id || `batch_${idx}`;
        rows.forEach((row, rIdx) => {
          if (!row) return;
          const key = row.uniqueKey || row._id || `${dbId}_${rIdx}`;
          if (!seenKeys.has(key)) {
            seenKeys.add(key);
            result.push({
              ...row,
              _id: row._id || dbId,
              uniqueKey: key,
              dbItemId: dbId,
            });
          }
        });
      } else {
        const key = item.uniqueKey || (item._id && !seenKeys.has(String(item._id)) ? String(item._id) : `${item._id || item.id || "cand"}_${idx}`);
        if (!seenKeys.has(String(key))) {
          seenKeys.add(String(key));
          result.push({
            ...item,
            _id: item._id || item.id || key,
            uniqueKey: String(key),
            dbItemId: item.dbItemId || item._id || item.id,
          });
        }
      }
    });

    return result;
  };

  const handleApplyTransferRange = async (lowerVal = transferLowerLimit, higherVal = transferHigherLimit) => {
    const rawLower = String(lowerVal ?? "").trim();
    const rawHigher = String(higherVal ?? "").trim();

    if (!rawLower || !rawHigher) {
      const msg = "Please enter both lower and higher values.";
      setTransferRangeError(msg);
      toast.error(msg);
      return;
    }

    const lower = parseInt(rawLower, 10);
    const higher = parseInt(rawHigher, 10);

    if (isNaN(lower) || isNaN(higher)) {
      const msg = "Please enter valid numeric values for the transfer range.";
      setTransferRangeError(msg);
      toast.error(msg);
      return;
    }

    if (lower <= 0 || higher <= 0) {
      const msg = "Lower and higher values must be greater than 0.";
      setTransferRangeError(msg);
      toast.error(msg);
      return;
    }

    if (lower > higher) {
      const msg = `Validation Error: Lower value (${lower}) cannot be greater than Higher value (${higher})! Please select in lower-to-higher order.`;
      setTransferRangeError(msg);
      toast.error(msg);
      return;
    }

    setTransferRangeError("");

    const totalCount = total || candidates?.length || 0;
    if (totalCount > 0 && lower > totalCount) {
      const msg = `Lower value (${lower}) exceeds total candidates available (${totalCount}).`;
      setTransferRangeError(msg);
      toast.warning(msg);
      return;
    }

    setSelectAllLoading(true);
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("token");
      const params = { limit: Math.max(higher, 50), page: 1 };
      if (search?.trim()) params.search = search.trim();
      if (selectedCategory) params.category = selectedCategory;
      if (selectedDesignation) params.designation = selectedDesignation;
      if (selectedCity || selectedState || selectedCountry) {
        params.location = selectedCity || selectedState || selectedCountry;
      }
      if (selectedCity) params.city = selectedCity;
      if (selectedState) params.state = selectedState;
      if (selectedCountry) params.country = selectedCountry;
      if (selectedWorkMode) params.workMode = selectedWorkMode;
      if (selectedExperience) params.experience = selectedExperience;
      if (startDate) {
        const formatDate = (d) => {
          const [y, m, day] = d.split("-");
          return `${day}/${m}/${y}`;
        };
        params.startDate = formatDate(startDate);
        params.fromDate = formatDate(startDate);
      }
      if (endDate) {
        const formatDate = (d) => {
          const [y, m, day] = d.split("-");
          return `${day}/${m}/${y}`;
        };
        params.endDate = formatDate(endDate);
        params.toDate = formatDate(endDate);
      }

      const response = await axios.get(
        `${BASE_URL}/api/admin/candidate-database/getCandidates`,
        { params, headers: { Authorization: `Bearer ${token}` } }
      );
      const unpacked = unpackCandidatePayload(response.data);
      const availableCandidates = unpacked.length > 0 ? unpacked : (candidates || []);
      setFetchedTransferCandidates(availableCandidates);

      const slicedCandidates = availableCandidates.slice(lower - 1, higher);
      const idsToSelect = slicedCandidates
        .map((item) => item.uniqueKey || item._id)
        .filter(Boolean);

      if (idsToSelect.length > 0) {
        setSelectedCandidates(idsToSelect);
        const actualCount = idsToSelect.length;
        const rangeText = `Sr. No. ${lower} to ${lower + actualCount - 1} (${actualCount} candidates)`;
        setTransferRangeInfo(rangeText);
        toast.success(`Selected ${actualCount} candidate(s) (from #${lower} to #${lower + actualCount - 1}) for transfer.`);
      } else {
        toast.warning("No candidates found in the specified range.");
      }
    } catch (err) {
      console.error("Error fetching candidates for range transfer:", err);
      toast.error("Failed to load candidates for the selected range.");
    } finally {
      setSelectAllLoading(false);
    }
  };

  const handleTransferPresetChange = (value) => {
    setTransferCountPreset(value);
    if (!value) {
      setTransferLowerLimit("");
      setTransferHigherLimit("");
      setTransferRangeError("");
      setTransferRangeInfo("");
      return;
    }
    const count = parseInt(value, 10);
    if (!isNaN(count) && count > 0) {
      setTransferLowerLimit("1");
      setTransferHigherLimit(String(count));
      handleApplyTransferRange(1, count);
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedDesignation("");
    setSelectedCity("");
    setSelectedState("");
    setSelectedCountry("");
    setSelectedWorkMode("");
    setSelectedExperience("");
    setDatePreset("");
    setStartDate("");
    setEndDate("");
    setTransferCountPreset("");
    setTransferLowerLimit("");
    setTransferHigherLimit("");
    setTransferRangeError("");
    setTransferRangeInfo("");
    setFetchedTransferCandidates([]);
    setCurrentPage(1);
    setSelectedCandidates([]);
    dispatch(fetchDesignations());
    dispatch(fetchCandidates({ page: 1, limit: 1000 }));
  };

  const parseDateToMs = (dateInput, endOfDay = false) => {
    if (!dateInput) return null;
    if (typeof dateInput === "number") {
      // Excel serial date to JS timestamp
      if (dateInput > 30000 && dateInput < 60000) {
        const jsDate = new Date((dateInput - (25567 + 2)) * 86400 * 1000);
        if (endOfDay) jsDate.setHours(23, 59, 59, 999);
        else jsDate.setHours(0, 0, 0, 0);
        return jsDate.getTime();
      }
      return dateInput;
    }

    let str = String(dateInput).trim();

    // Handle YYYY-MM-DD or YYYY/MM/DD
    if (/^\d{4}[-/]\d{2}[-/]\d{2}/.test(str)) {
      const parts = str.substring(0, 10).split(/[-/]/).map(Number);
      const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
      if (endOfDay) {
        dateObj.setHours(23, 59, 59, 999);
      } else {
        dateObj.setHours(0, 0, 0, 0);
      }
      return dateObj.getTime();
    }

    // Handle DD-MM-YYYY or DD/MM/YYYY
    if (/^\d{2}[-/]\d{2}[-/]\d{4}/.test(str)) {
      const parts = str.substring(0, 10).split(/[-/]/).map(Number);
      const dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
      if (endOfDay) {
        dateObj.setHours(23, 59, 59, 999);
      } else {
        dateObj.setHours(0, 0, 0, 0);
      }
      return dateObj.getTime();
    }

    // Standard ISO string or generic date
    const dateObj = new Date(str);
    if (!isNaN(dateObj.getTime())) {
      if (endOfDay && !str.includes("T")) {
        dateObj.setHours(23, 59, 59, 999);
      }
      return dateObj.getTime();
    }

    return null;
  };

  const filteredCandidates = useMemo(() => {
    return candidates || [];
  }, [candidates]);

  // Clear selections whenever filter criteria change so stale IDs don't interfere
  useEffect(() => {
    setSelectedCandidates([]);
    setTransferCountPreset("");
    setFetchedTransferCandidates([]);
  }, [
    search,
    selectedCategory,
    selectedDesignation,
    selectedCity,
    selectedState,
    selectedCountry,
    selectedWorkMode,
    selectedExperience,
    startDate,
    endDate,
  ]);

  // IDs of candidates currently visible after all filters applied (ignore undefined _id)
  const filteredIds = useMemo(
    () => filteredCandidates.filter((item) => item.uniqueKey || item._id).map((item) => item.uniqueKey || item._id),
    [filteredCandidates]
  );

  const isAllSelected =
    filteredIds.length > 0 &&
    filteredIds.every((id) => selectedCandidates.includes(id));

  const isIndeterminate =
    !isAllSelected &&
    filteredIds.some((id) => selectedCandidates.includes(id));

  const handleSelectAll = async () => {
    // --- DESELECT: if already all selected, clear them ---
    if (isAllSelected) {
      setSelectedCandidates((prev) =>
        prev.filter((id) => !filteredIds.includes(id))
      );
      return;
    }

    // --- SELECT ALL: fetch every matching candidate across ALL pages ---
    // If total is small (<= current page), just use what we have
    if (!total || total <= filteredIds.length) {
      setSelectedCandidates((prev) =>
        Array.from(new Set([...prev, ...filteredIds]))
      );
      return;
    }

    // Fetch all candidates with current filters but no pagination limit
    setSelectAllLoading(true);
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("token");

      const params = { limit: total || 99999, page: 1 };
      if (search?.trim())        params.search = search.trim();
      if (selectedCategory)      params.category = selectedCategory;
      if (selectedDesignation)   params.designation = selectedDesignation;
      if (selectedCity || selectedState || selectedCountry)
                                 params.location = selectedCity || selectedState || selectedCountry;
      if (selectedCity)          params.city = selectedCity;
      if (selectedState)         params.state = selectedState;
      if (selectedCountry)       params.country = selectedCountry;
      if (selectedWorkMode)      params.workMode = selectedWorkMode;
      if (selectedExperience)    params.experience = selectedExperience;
      if (startDate) {
        const formatDate = (d) => { const [y,m,day] = d.split("-"); return `${day}/${m}/${y}`; };
        params.startDate = formatDate(startDate);
        params.fromDate  = formatDate(startDate);
      }
      if (endDate) {
        const formatDate = (d) => { const [y,m,day] = d.split("-"); return `${day}/${m}/${y}`; };
        params.endDate = formatDate(endDate);
        params.toDate  = formatDate(endDate);
      }

      const response = await axios.get(
        `${BASE_URL}/api/admin/candidate-database/getCandidates`,
        { params, headers: { Authorization: `Bearer ${token}` } }
      );

      const payload = response.data;
      const unpackedAll = unpackCandidatePayload(payload);
      const allList =
        unpackedAll.length > 0
          ? unpackedAll
          : payload?.data ||
            payload?.candidates ||
            (Array.isArray(payload) ? payload : []);

      const allIds = allList
        .filter((item) => item.uniqueKey || item._id)
        .map((item) => item.uniqueKey || item._id);

      if (allIds.length > 0) {
        setSelectedCandidates((prev) =>
          Array.from(new Set([...prev, ...allIds]))
        );
        toast.success(`${allIds.length} candidates selected!`);
      } else {
        // Fallback: select just the current page
        setSelectedCandidates((prev) =>
          Array.from(new Set([...prev, ...filteredIds]))
        );
      }
    } catch (err) {
      console.error("Select All fetch failed, falling back to current page:", err);
      // Fallback: select current page candidates only
      setSelectedCandidates((prev) =>
        Array.from(new Set([...prev, ...filteredIds]))
      );
      toast.warning("Could not fetch all pages — current page candidates selected.");
    } finally {
      setSelectAllLoading(false);
    }
  };

  const handleSelectCandidate = (id) => {
    if (!id) return;
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (!isTransferModalOpen) return;

    const token = localStorage.getItem("token");
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
    const authHeaders = { Authorization: `Bearer ${token}` };

    if (transferTarget === "hr_management") {
      setLoadingPersons(true);
      dispatch(fetchAllHr({ page: 1, limit: 1000, search: "" }));

      const fetchAllHrsExhaustive = async () => {
        let allHrs = [];
        try {
          // 1. Fetch page 1
          const res1 = await axios.get(`${BASE_URL}/api/admin/hr/gethr?page=1&limit=100`, { headers: authHeaders });
          const raw1 = res1.data;
          const list1 =
            raw1?.data?.data ||
            raw1?.data?.hrs ||
            raw1?.data?.hrList ||
            raw1?.data ||
            raw1?.hrs ||
            raw1?.hrList ||
            raw1?.result ||
            (Array.isArray(raw1) ? raw1 : []);

          if (Array.isArray(list1)) {
            allHrs = [...list1];
          }

          // Fetch remaining pages if any
          const totalPages =
            raw1?.data?.totalPages ||
            raw1?.totalPages ||
            raw1?.pagination?.pages ||
            (raw1?.total ? Math.ceil(raw1.total / 10) : 1);

          if (totalPages > 1) {
            const pageRequests = [];
            for (let p = 2; p <= Math.min(totalPages, 50); p++) {
              pageRequests.push(
                axios.get(`${BASE_URL}/api/admin/hr/gethr?page=${p}&limit=100`, { headers: authHeaders }).catch(() => null)
              );
            }
            const responses = await Promise.all(pageRequests);
            responses.forEach((r) => {
              if (r?.data) {
                const rList =
                  r.data?.data?.data ||
                  r.data?.data ||
                  r.data?.hrs ||
                  (Array.isArray(r.data) ? r.data : []);
                if (Array.isArray(rList)) {
                  allHrs = [...allHrs, ...rList];
                }
              }
            });
          }

          // Dropdown fallback endpoints if list is still empty
          if (allHrs.length === 0) {
            const dropdownEndpoints = [
              `${BASE_URL}/api/admin/hr/get-hr-dropdown`,
              `${BASE_URL}/api/admin/hr/getallhr`,
              `${BASE_URL}/api/admin/hr/gethr`,
            ];
            for (const ep of dropdownEndpoints) {
              try {
                const epRes = await axios.get(ep, { headers: authHeaders });
                const epList =
                  epRes.data?.data?.data ||
                  epRes.data?.data ||
                  epRes.data?.hrs ||
                  (Array.isArray(epRes.data) ? epRes.data : []);
                if (Array.isArray(epList) && epList.length > 0) {
                  allHrs = epList;
                  break;
                }
              } catch {
                // ignore
              }
            }
          }
        } catch (err) {
          console.error("Error fetching HRs:", err);
        } finally {
          setHrOptions(allHrs);
          setLoadingPersons(false);
        }
      };

      fetchAllHrsExhaustive();
    } else if (transferTarget === "employee_management") {
      setLoadingPersons(true);
      dispatch(fetchEmployers({ page: 1, limit: 1000, search: "" }));

      const fetchAllEmployersExhaustive = async () => {
        let allEmps = [];
        try {
          // 1. Try dedicated employer dropdown endpoint first
          try {
            const dropRes = await axios.get(`${BASE_URL}/api/admin/employer/get-employer-dropdown`, { headers: authHeaders });
            const dropList =
              dropRes.data?.data ||
              dropRes.data?.employers ||
              (Array.isArray(dropRes.data) ? dropRes.data : []);
            if (Array.isArray(dropList) && dropList.length > 0) {
              allEmps = [...dropList];
            }
          } catch {
            // fallback
          }

          // 2. Query getEmployers with multi-page support
          const res1 = await axios.get(`${BASE_URL}/api/admin/employer/getEmployers?page=1&limit=100`, { headers: authHeaders });
          const raw1 = res1.data;
          const list1 =
            raw1?.data?.data ||
            raw1?.data ||
            raw1?.employers ||
            raw1?.employerList ||
            raw1?.result ||
            (Array.isArray(raw1) ? raw1 : []);

          if (Array.isArray(list1)) {
            // Merge unique entries
            const existingIds = new Set(allEmps.map((x) => x._id || x.id || x.name));
            list1.forEach((item) => {
              const idVal = item._id || item.id || item.name;
              if (!existingIds.has(idVal)) {
                allEmps.push(item);
                existingIds.add(idVal);
              }
            });
          }

          const totalPages =
            raw1?.pagination?.pages ||
            raw1?.data?.totalPages ||
            raw1?.totalPages ||
            (raw1?.pagination?.total ? Math.ceil(raw1.pagination.total / 10) : 1);

          if (totalPages > 1) {
            const pageRequests = [];
            for (let p = 2; p <= Math.min(totalPages, 50); p++) {
              pageRequests.push(
                axios.get(`${BASE_URL}/api/admin/employer/getEmployers?page=${p}&limit=100`, { headers: authHeaders }).catch(() => null)
              );
            }
            const responses = await Promise.all(pageRequests);
            responses.forEach((r) => {
              if (r?.data) {
                const rList =
                  r.data?.data ||
                  r.data?.employers ||
                  (Array.isArray(r.data) ? r.data : []);
                if (Array.isArray(rList)) {
                  const existingIds = new Set(allEmps.map((x) => x._id || x.id || x.name));
                  rList.forEach((item) => {
                    const idVal = item._id || item.id || item.name;
                    if (!existingIds.has(idVal)) {
                      allEmps.push(item);
                      existingIds.add(idVal);
                    }
                  });
                }
              }
            });
          }
        } catch (err) {
          console.error("Error fetching Employers:", err);
        } finally {
          setEmployeeOptions(allEmps);
          setLoadingPersons(false);
        }
      };

      fetchAllEmployersExhaustive();
    }
  }, [isTransferModalOpen, transferTarget, dispatch]);

  const handleConfirmTransfer = async () => {
    const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

    if (!transferTarget) {
      toast.error("Please select a destination module");
      return;
    }

    if (!selectedPersonId || !isValidObjectId(selectedPersonId)) {
      toast.error(
        transferTarget === "hr_management"
          ? "Please select a specific HR from the dropdown"
          : "Please select a specific Employee from the dropdown"
      );
      return;
    }

    const allKnownCandidates = [
      ...(candidates || []),
      ...fetchedTransferCandidates,
    ];

    // Resolve candidates to valid MongoDB ObjectIds
    const rawCandidateIds = selectedCandidates.map((selKey) => {
      const foundCandidate = allKnownCandidates.find(
        (c) => (c.uniqueKey || c._id) === selKey || c._id === selKey
      );
      if (foundCandidate?._id && isValidObjectId(String(foundCandidate._id))) {
        return String(foundCandidate._id);
      }
      if (foundCandidate?.dbItemId && isValidObjectId(String(foundCandidate.dbItemId))) {
        return String(foundCandidate.dbItemId);
      }
      if (isValidObjectId(String(selKey))) {
        return String(selKey);
      }
      return null;
    }).filter(Boolean);

    const validCandidateIds = Array.from(new Set(rawCandidateIds));

    if (validCandidateIds.length === 0) {
      toast.error("Selected candidate(s) do not have a valid database ID for transfer");
      return;
    }

    if (transferLowerLimit && transferHigherLimit) {
      const low = parseInt(transferLowerLimit, 10);
      const high = parseInt(transferHigherLimit, 10);
      if (!isNaN(low) && !isNaN(high) && low > high) {
        const msg = `Validation Error: Lower value (${low}) cannot be greater than Higher value (${high})! Please select in lower-to-higher order.`;
        setTransferRangeError(msg);
        toast.error(msg);
        return;
      }
    }

    let targetPersonName = "";
    if (transferTarget === "hr_management") {
      const foundHr = formattedHrList?.find(
        (h) => String(h.id) === String(selectedPersonId)
      );
      targetPersonName = foundHr?.name || selectedPersonId;
    } else if (transferTarget === "employee_management") {
      const foundEmp = formattedEmployeeList?.find(
        (e) => String(e.id) === String(selectedPersonId)
      );
      targetPersonName = foundEmp?.name || selectedPersonId;
    }

    try {
      const token = localStorage.getItem("token");
      const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

      const payload = {
        candidateIds: validCandidateIds,
        assignedTo: selectedPersonId,
      };

      if (transferTarget === "hr_management") {
        payload.transferTo = "HR";
        payload.hrId = selectedPersonId;
      } else if (transferTarget === "employee_management") {
        payload.transferTo = "Employer";
        payload.employeeId = selectedPersonId;
        payload.employerId = selectedPersonId; 
      }

      const response = await axios.post(
        `${BASE_URL}/api/admin/candidate-database/transfer`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success || response.status === 200 || response.status === 201) {
        const destModuleName =
          transferTarget === "hr_management"
            ? "HR Management"
            : "Employee Management";
        const messageText = `${selectedCandidates.length} candidate(s) transferred to ${targetPersonName} (${destModuleName}) successfully!`;

        toast.success(messageText);
        addNotification(
          "Candidate Transferred Successfully",
          messageText,
          "success"
        );

        const adminName =
          adminProfile?.name ||
          adminProfile?.fullName ||
          adminProfile?.user?.name ||
          localStorage.getItem("adminName") ||
          "Super Admin";

        const transferredCandidatesDetails = selectedCandidates.map((selKey, idx) => {
          const found = allKnownCandidates.find(
            (c) => (c.uniqueKey || c._id) === selKey || c._id === selKey
          );
          return {
            id: found?._id || selKey,
            srNo: idx + 1,
            name: found ? getCandidateName(found) : `Candidate #${selKey.slice(-6)}`,
            email: found ? getCandidateEmail(found) : "N/A",
            phone: found ? getCandidatePhone(found) : "N/A",
            designation: found ? (getCandidateDesignation(found, designations) || "N/A") : "N/A",
            category: found ? (getCandidateCategory(found, categories) || "N/A") : "N/A",
            city: found ? (getCandidateCity(found) || "N/A") : "N/A",
          };
        });

        addTransferRecord({
          count: selectedCandidates.length,
          range: transferRangeInfo || `Sr. No. 1 to ${selectedCandidates.length} (Batch of ${selectedCandidates.length})`,
          transferredTo: targetPersonName,
          destModule: destModuleName,
          transferredBy: adminName,
          status: "Success",
          candidates: transferredCandidatesDetails,
        });

        setSelectedCandidates([]);
        setTransferCountPreset("");
        setTransferLowerLimit("");
        setTransferHigherLimit("");
        setTransferRangeError("");
        setTransferRangeInfo("");
        setFetchedTransferCandidates([]);
        setTransferTarget("");
        setSelectedPersonId("");
        setHrSearchTerm("");
        setEmployeeSearchTerm("");
        setIsTransferModalOpen(false);
      } else {
        toast.error(response.data.message || "Failed to transfer candidates");
      }
    } catch (error) {
      console.error("Error transferring candidates:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while transferring candidates"
      );
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalCandidateCount = total || 0;
  const computedTotalPages = totalPages || 1;
  const maxVisiblePages = 10;
  const startPage = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, computedTotalPages);

  const paginatedCandidates = useMemo(() => {
    return candidates || [];
  }, [candidates]);

  return (
    <div className="w-full bg-[#F4F6FA] p-3 min-h-screen">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 ">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold ">Database Candidate</h2>
              {selectedCandidates.length > 0 && (
                <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-3 py-1 rounded-full border border-purple-200">
                  {selectedCandidates.length} Selected
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => navigate("/candidates/transfer-history")}
                className="flex items-center justify-center gap-2 bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 font-semibold px-4 py-2 rounded-lg shadow-sm transition text-sm cursor-pointer whitespace-nowrap"
                title="View past candidate transfers and logs"
              >
                <History size={16} className="text-purple-600" />
                <span>Transfer History</span>
                {transferHistoryList.length > 0 && (
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full font-bold">
                    {transferHistoryList.length}
                  </span>
                )}
              </button>

              {selectedCandidates.length > 0 && (
                <button
                  onClick={() => setIsTransferModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold px-5 py-2 rounded-lg shadow-sm transition text-sm cursor-pointer whitespace-nowrap"
                >
                  <Send size={16} />
                  <span>Transfer</span>
                </button>
              )}
            </div>
          </div>

          {/* Sub Pages / Tabs navigation within Candidate Database */}
          <div className="flex items-center gap-1 border-b border-gray-200 mt-4 mb-5">
            <button
              type="button"
              className="px-4 py-2.5 text-sm font-bold border-b-2 border-purple-600 text-purple-700 flex items-center gap-2 cursor-pointer"
            >
              <span>Candidates List</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/candidates/transfer-history")}
              className="px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-purple-700 border-b-2 border-transparent hover:border-purple-300 flex items-center gap-2 cursor-pointer transition"
            >
              <History size={16} />
              <span>Transfer History</span>
              {transferHistoryList.length > 0 && (
                <span className="bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded-full font-semibold border border-purple-200">
                  {transferHistoryList.length}
                </span>
              )}
            </button>
          </div>

          {/* Search & Filters */}
          <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-6">
              <input
                type="text"
                placeholder="Search by name, email, etc."
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 xl:col-span-2"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <div className="contents">
                {/* Category Dropdown */}
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full min-w-0 cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="">Select category</option>
                  {combinedCategories?.map((cat, idx) => {
                    return (
                      <option key={cat.id || idx} value={cat.name}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>

                {/* Designation Dropdown */}
                <select
                  value={selectedDesignation}
                  onChange={(e) => {
                    setSelectedDesignation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full min-w-0 cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 xl:col-span-2"
                >
                  <option value="">Select Designation</option>
                  {combinedDesignations?.map((desig, idx) => {
                    return (
                      <option key={desig.id || idx} value={desig.id}>
                        {desig.name}
                      </option>
                    );
                  })}
                </select>

                {/* Country Dropdown */}
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full min-w-0 cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                </select>

                {/* State Dropdown */}
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full min-w-0 cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="">Select State</option>
                  {availableStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>

                {/* City Dropdown */}
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full min-w-0 cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="">Select City</option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

                {/* Work Mode Dropdown */}
                <select
                  value={selectedWorkMode}
                  onChange={(e) => {
                    setSelectedWorkMode(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full min-w-0 cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="">Select Work Mode</option>
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>

                <select
                  value={selectedExperience}
                  onChange={handleExperienceChange}
                  className="w-full min-w-0 cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="">Select Experience</option>
                  <option value="0">Freshers (0+ yrs)</option>
                  <option value="1">1+ Year</option>
                  <option value="2">2+ Years</option>
                  <option value="3">3+ Years</option>
                  <option value="4">4+ Years</option>
                  <option value="5">5+ Years</option>
                  <option value="6">6+ Years</option>
                </select>

                {(search ||
                  selectedCategory ||
                  selectedDesignation ||
                  selectedCity ||
                  selectedState ||
                  selectedCountry ||
                  selectedWorkMode ||
                  selectedExperience ||
                  datePreset ||
                  startDate ||
                  endDate) && (
                  <button
                    onClick={handleClearFilters}
                    className="flex items-center justify-center gap-1 whitespace-nowrap rounded bg-gray-200 px-3 py-2 text-xs text-gray-700 transition hover:bg-gray-300"
                  >
                    <X size={14} /> Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Date Range Preset Row */}
            <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-gray-200 pt-2 text-sm xl:col-span-6">
              <span className="font-semibold text-gray-600 uppercase text-xs tracking-wider">
                Date Filter:
              </span>
              <select
                value={datePreset}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-purple-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              >
                <option value="">Select Date Range</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
              </select>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs">From:</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setDatePreset("");
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 bg-white px-2 py-1 rounded text-xs outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs">To:</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setDatePreset("");
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 bg-white px-2 py-1 rounded text-xs outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Candidate Data Transfer Range (Lower to Higher) & Presets */}
              <div className="flex flex-wrap items-center gap-2 border-l border-gray-300 pl-3 ml-1">
                <span className="font-semibold text-gray-600 uppercase text-xs tracking-wider">
                  Transfer Range:
                </span>
                
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500 text-xs font-medium">Lower:</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Min"
                    value={transferLowerLimit}
                    onChange={(e) => {
                      setTransferLowerLimit(e.target.value);
                      setTransferRangeError("");
                    }}
                    className={`w-16 rounded border px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-purple-200 transition ${
                      transferRangeError ? "border-red-400 bg-red-50 text-red-700" : "border-gray-300 bg-white"
                    }`}
                    title="Lower limit (From index/Sr.No)"
                  />

                  <span className="text-gray-500 text-xs font-medium">Higher:</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Max"
                    value={transferHigherLimit}
                    onChange={(e) => {
                      setTransferHigherLimit(e.target.value);
                      setTransferRangeError("");
                    }}
                    className={`w-16 rounded border px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-purple-200 transition ${
                      transferRangeError ? "border-red-400 bg-red-50 text-red-700" : "border-gray-300 bg-white"
                    }`}
                    title="Higher limit (To index/Sr.No)"
                  />

                  <button
                    type="button"
                    onClick={() => handleApplyTransferRange()}
                    disabled={selectAllLoading}
                    className="rounded bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-xs font-semibold shadow-sm transition cursor-pointer disabled:opacity-50 whitespace-nowrap"
                    title="Apply Range Filter"
                  >
                    {selectAllLoading ? "Selecting..." : "Apply Range"}
                  </button>

                  <select
                    value={transferCountPreset}
                    onChange={(e) => handleTransferPresetChange(e.target.value)}
                    className="rounded border border-purple-200 bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 cursor-pointer hover:bg-purple-100 transition"
                    title="Quick Presets"
                  >
                    <option value="">Quick Presets</option>
                    <option value="10">Top 10 (1 - 10)</option>
                    <option value="20">Top 20 (1 - 20)</option>
                    <option value="30">Top 30 (1 - 30)</option>
                    <option value="40">Top 40 (1 - 40)</option>
                    <option value="50">Top 50 (1 - 50)</option>
                    <option value="100">Top 100 (1 - 100)</option>
                  </select>

                  {(transferLowerLimit || transferHigherLimit || selectedCandidates.length > 0) && (
                    <button
                      type="button"
                      onClick={() => {
                        setTransferLowerLimit("");
                        setTransferHigherLimit("");
                        setTransferCountPreset("");
                        setTransferRangeError("");
                        setTransferRangeInfo("");
                        setSelectedCandidates([]);
                      }}
                      className="text-gray-400 hover:text-red-500 p-1 transition"
                      title="Clear Range Selection"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {transferRangeError && (
                  <span className="text-xs font-semibold text-red-600">
                    ⚠️ {transferRangeError}
                  </span>
                )}
                {transferRangeInfo && !transferRangeError && (
                  <span className="text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                    ✓ {transferRangeInfo}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="overflow-x-auto border rounded-lg border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm">
                  <th className="p-3 text-center w-10">
                    {selectAllLoading ? (
                      <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" title="Selecting all candidates..." />
                    ) : (
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={(el) => { if (el) el.indeterminate = isIndeterminate; }}
                        onChange={handleSelectAll}
                        disabled={filteredIds.length === 0}
                        className="w-4 h-4 text-purple-600 accent-purple-600 rounded cursor-pointer align-middle disabled:cursor-not-allowed"
                        title={
                          isAllSelected
                            ? `Deselect all ${selectedCandidates.length} candidates`
                            : total > filteredIds.length
                            ? `Select all ${total} filtered candidates (across all pages)`
                            : `Select all ${filteredIds.length} candidates`
                        }
                      />
                    )}
                  </th>
                  <th className="p-3 text-center">Sr.No</th>
                  <th className="p-3 text-center">Name</th>
                  <th className="p-3 text-center">Category</th>
                  <th className="p-3 text-center">Designation</th>
                  <th className="p-3 text-center">Phone</th>
                  <th className="p-3 text-center">Email</th>
                  <th className="p-3 text-center">City</th>
                  <th className="p-3 text-center">State</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center p-5 text-gray-500">
                      Loading candidates...
                    </td>
                  </tr>
                ) : (
                  paginatedCandidates.map((item, index) => {
                    const itemKey = item.uniqueKey || item._id;
                    const isChecked = selectedCandidates.includes(itemKey);
                    return (
                      <tr
                        key={itemKey}
                        className={`border-t border-gray-300 text-center text-sm ${isChecked ? "bg-purple-50/50" : ""}`}
                      >
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleSelectCandidate(itemKey)}
                            className="w-4 h-4 text-purple-600 accent-purple-600 rounded cursor-pointer align-middle"
                          />
                        </td>
                      <td className="p-3">{startIndex + index + 1}</td>
                      <td className="p-3">{getCandidateName(item)}</td>
                      <td className="p-3">{getCandidateCategory(item, categories) || "N/A"}</td>
                      <td className="p-3">{getCandidateDesignation(item, designations) || "N/A"}</td>
                      <td className="p-3">{getCandidatePhone(item)}</td>
                      <td className="p-3">{getCandidateEmail(item)}</td>
                      <td className="p-3">{getCandidateCity(item)}</td>
                      <td className="p-3">{getCandidateState(item)}</td>
                      <td className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            title="View candidate"
                            aria-label="View candidate"
                            className="rounded-md p-1.5 text-purple-600 transition hover:bg-purple-50 hover:text-purple-800"
                            onClick={() =>
                              navigate(
                                `/candidates/candidate-details/${item._id}`,
                              )
                            }
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            type="button"
                            title="Delete candidate"
                            aria-label="Delete candidate"
                            className="rounded-md p-1.5 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
                {!loading && paginatedCandidates.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center p-5">
                      No Candidates Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer & Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-purple-600 text-sm font-medium">
              Showing {totalCandidateCount > 0 ? startIndex + 1 : 0} to{" "}
              {Math.min(startIndex + paginatedCandidates.length, totalCandidateCount)} of{" "}
              {totalCandidateCount} Candidates
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border rounded-full border-purple-300 text-purple-600 disabled:opacity-50 hover:bg-purple-50 transition cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: Math.max(0, endPage - startPage + 1) }, (_, i) => startPage + i).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition cursor-pointer ${
                    currentPage === pageNumber
                      ? "bg-purple-600 text-white shadow-sm"
                      : "border border-purple-300 text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, computedTotalPages))
                }
                disabled={currentPage >= computedTotalPages}
                className="p-2 border border-purple-300 text-purple-600 rounded-full disabled:opacity-50 hover:bg-purple-50 transition cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Send size={18} className="text-purple-600" />
                Transfer Candidates
              </h3>
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-full p-1 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="rounded-lg bg-purple-50 p-3 border border-purple-100">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-purple-900 uppercase tracking-wide">
                    Transfer Range (Lower to Higher)
                  </span>
                  <span className="text-xs font-bold text-purple-700 bg-white px-2 py-0.5 rounded-full border border-purple-200">
                    {selectedCandidates.length} Selected
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label className="block text-[11px] text-gray-600 font-medium mb-0.5">Lower Value (From):</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 1"
                      value={transferLowerLimit}
                      onChange={(e) => {
                        setTransferLowerLimit(e.target.value);
                        setTransferRangeError("");
                      }}
                      className="w-full border border-gray-300 rounded px-2.5 py-1 text-xs bg-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-600 font-medium mb-0.5">Higher Value (To):</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 50"
                      value={transferHigherLimit}
                      onChange={(e) => {
                        setTransferHigherLimit(e.target.value);
                        setTransferRangeError("");
                      }}
                      className="w-full border border-gray-300 rounded px-2.5 py-1 text-xs bg-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleApplyTransferRange()}
                    disabled={selectAllLoading}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs font-semibold shadow-sm transition disabled:opacity-50 cursor-pointer"
                  >
                    {selectAllLoading ? "Selecting..." : "Update Range Selection"}
                  </button>
                  {transferRangeInfo && !transferRangeError && (
                    <span className="text-[11px] text-purple-800 font-medium truncate max-w-[200px]" title={transferRangeInfo}>
                      ✓ {transferRangeInfo}
                    </span>
                  )}
                </div>

                {transferRangeError && (
                  <p className="mt-2 text-xs font-semibold text-red-600">
                    ⚠️ {transferRangeError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Select Destination Module / Department
                </label>
                <select
                  value={transferTarget}
                  onChange={(e) => {
                    setTransferTarget(e.target.value);
                    setSelectedPersonId("");
                    setHrSearchTerm("");
                    setEmployeeSearchTerm("");
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                >
                  <option value="">Select Destination</option>
                  <option value="hr_management">HR Management</option>
                  <option value="employee_management">Employee Management</option>
                </select>
              </div>

              {/* Specific HR Sub-Dropdown */}
              {transferTarget === "hr_management" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Select Specific HR
                  </label>
                  {loadingPersons ? (
                    <div className="py-2 text-xs text-purple-600 font-medium animate-pulse">
                      Loading HR list...
                    </div>
                  ) : (
                    <div
                      className="relative w-full"
                      tabIndex={0}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          setIsHrDropdownOpen(false);
                        }
                      }}
                    >
                      <input
                        type="search"
                        value={hrSearchTerm}
                        onFocus={() => setIsHrDropdownOpen(true)}
                        onChange={(e) => {
                          setHrSearchTerm(e.target.value);
                          setSelectedPersonId("");
                          setIsHrDropdownOpen(true);
                        }}
                        placeholder="Search HR by name or email"
                        className={`w-full border ${isHrDropdownOpen ? "border-purple-300 ring-2 ring-purple-300" : "border-gray-300"} rounded-lg px-3 py-2 text-sm outline-none bg-white`}
                      />

                      {isHrDropdownOpen && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[60] max-h-60 overflow-y-auto">
                          {filteredHrList.length > 0 ? (
                            filteredHrList.map((hr, idx) => (
                              <div
                                key={hr.id || idx}
                                className="px-3 py-2 text-sm cursor-pointer hover:bg-purple-50 text-gray-700"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  setSelectedPersonId(hr.id);
                                  setHrSearchTerm(hr.name);
                                  setIsHrDropdownOpen(false);
                                }}
                              >
                                {hr.name} {hr.email && hr.email !== hr.name ? `(${hr.email})` : ""}
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-gray-400">
                              No HRs found in HR Management
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Specific Employee Search */}
              {transferTarget === "employee_management" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Select Specific Employee
                  </label>
                  {loadingPersons ? (
                    <div className="py-2 text-xs text-purple-600 font-medium animate-pulse">
                      Loading Employee list...
                    </div>
                  ) : (
                    <div
                      className="relative w-full"
                      tabIndex={0}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          setIsEmpDropdownOpen(false);
                        }
                      }}
                    >
                      <input
                        type="search"
                        value={employeeSearchTerm}
                        onFocus={() => setIsEmpDropdownOpen(true)}
                        onChange={(e) => {
                          setEmployeeSearchTerm(e.target.value);
                          setSelectedPersonId("");
                          setIsEmpDropdownOpen(true);
                        }}
                        placeholder="Search employee by name or email"
                        className={`w-full border ${isEmpDropdownOpen ? "border-purple-300 ring-2 ring-purple-300" : "border-gray-300"} rounded-lg px-3 py-2 text-sm outline-none bg-white`}
                      />

                      {isEmpDropdownOpen && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[60] max-h-60 overflow-y-auto">
                          {filteredEmployeeList.length > 0 ? (
                            filteredEmployeeList.map((emp, idx) => (
                              <div
                                key={emp.id || idx}
                                className="px-3 py-2 text-sm cursor-pointer hover:bg-purple-50 text-gray-700"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  setSelectedPersonId(emp.id);
                                  setEmployeeSearchTerm(emp.name);
                                  setIsEmpDropdownOpen(false);
                                }}
                              >
                                {emp.name} {emp.email && emp.email !== emp.name ? `(${emp.email})` : ""}
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-gray-400">
                              No Employees found in Employee Management
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmTransfer}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold shadow-sm transition"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseCandidate;

