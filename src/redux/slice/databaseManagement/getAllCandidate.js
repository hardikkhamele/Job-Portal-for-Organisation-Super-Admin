import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatToDDMMYYYY = (dateVal) => {
  if (!dateVal) return "";
  const str = String(dateVal).trim();
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) return str;
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [y, m, d] = str.split("-");
    return `${d}/${m}/${y}`;
  }
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return str;
};

export const fetchCandidates = createAsyncThunk(
  "candidates/fetchCandidates",
  async (
    {
      page,
      limit,
      search,
      category,
      designation,
      location,
      city,
      state,
      country,
      workMode,
      experience,
      startDate,
      endDate,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      // Build parameters object with non-empty values only
      const params = {};
      const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (search && search.trim()) params.search = search.trim();

      if (category) {
        params.category = category;
        params.categoryName = category;
      }

      if (designation) {
        params.designation = designation;
        params.designationName = designation;
      }

      if (location) params.location = location;
      if (city) params.city = city;
      if (state) params.state = state;
      if (country) params.country = country;
      if (workMode) params.workMode = workMode;
      if (experience !== undefined && experience !== null && experience !== "") {
        params.experience = experience;
        params.totalExperience = experience;
      }
      if (startDate) {
        const formattedStart = formatToDDMMYYYY(startDate);
        params.startDate = formattedStart;
        params.fromDate = formattedStart;
      }
      if (endDate) {
        const formattedEnd = formatToDDMMYYYY(endDate);
        params.endDate = formattedEnd;
        params.toDate = formattedEnd;
      }

      const authHeader = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const resCandidates = await axios.get(
        `${BASE_URL}/api/admin/candidate-database/getCandidates`,
        {
          params,
          ...authHeader,
        }
      );

      return {
        candidateData: resCandidates.data,
        limit: limit || 10,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const getAllCandidateSlice = createSlice({
  name: "getAllCandidate",
  initialState: {
    candidates: [],
    total: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { candidateData, databaseData } = action.payload || {};

        // 1. Extract direct candidates list
        let directList = [];
        if (Array.isArray(candidateData)) {
          directList = candidateData;
        } else if (Array.isArray(candidateData?.candidates)) {
          directList = candidateData.candidates;
        } else if (Array.isArray(candidateData?.data)) {
          directList = candidateData.data;
        } else if (Array.isArray(candidateData?.data?.candidates)) {
          directList = candidateData.data.candidates;
        }

        // 2. Extract database records from Accept/Reject module
        let dbList = [];
        if (Array.isArray(databaseData)) {
          dbList = databaseData;
        } else if (Array.isArray(databaseData?.data)) {
          dbList = databaseData.data;
        } else if (Array.isArray(databaseData?.databases)) {
          dbList = databaseData.databases;
        }

        const extractName = (item) => {
          if (!item || typeof item !== "object") return "";
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

          return "";
        };

        const extractEmail = (item) => {
          if (!item || typeof item !== "object") return "";
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

          for (const k of keys) {
            const val = item[k];
            if (val && typeof val === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
              return val.trim();
            }
          }

          return "";
        };

        const extractPhone = (item) => {
          if (!item || typeof item !== "object") return "";
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

          return "";
        };

        const extractWorkMode = (row, dbItem) => {
          if (!row) return dbItem?.workMode || dbItem?.work_mode || "N/A";
          const val =
            row["WORK MODE"] ||
            row["Work Mode"] ||
            row["workmode"] ||
            row["workMode"] ||
            row["work_mode"] ||
            row["Mode Of Work"] ||
            row["Mode of Work"] ||
            row.workMode ||
            row.work_mode ||
            row.modeOfWork ||
            row.workType ||
            row.jobType ||
            row.employmentType ||
            dbItem?.workMode ||
            dbItem?.work_mode ||
            "N/A";
          return typeof val === "string" ? val.trim() : String(val);
        };

        const extractExperience = (row, dbItem) => {
          if (!row) return dbItem?.experience || dbItem?.totalExperience || "N/A";
          const val =
            row["EXPERIENCE"] ||
            row["Experience"] ||
            row["Total Experience"] ||
            row["total experience"] ||
            row["exp"] ||
            row["Exp"] ||
            row["work experience"] ||
            row["Work Experience"] ||
            row.experience ||
            row.totalExperience ||
            row.exp ||
            dbItem?.experience ||
            dbItem?.totalExperience ||
            "N/A";
          return typeof val === "string" ? val.trim() : String(val);
        };

        const extractCity = (row, dbItem) => {
          if (!row) return dbItem?.city || "N/A";
          const val =
            row["CITY"] ||
            row["City"] ||
            row["city"] ||
            row.city ||
            row.location?.city ||
            row.address?.city ||
            (typeof row.location === "string" ? row.location.split(",")[0] : null) ||
            dbItem?.city ||
            "N/A";
          return typeof val === "string" ? val.trim() : String(val);
        };

        const extractState = (row, dbItem) => {
          if (!row) return dbItem?.state || "N/A";
          const val =
            row["STATE"] ||
            row["State"] ||
            row["state"] ||
            row.state ||
            row.location?.state ||
            row.address?.state ||
            (typeof row.location === "string" && row.location.includes(",")
              ? row.location.split(",")[1]
              : null) ||
            dbItem?.state ||
            "N/A";
          return typeof val === "string" ? val.trim() : String(val);
        };

        const extractCountry = (row, dbItem) => {
          if (!row) return dbItem?.country || "India";
          const val =
            row["COUNTRY"] ||
            row["Country"] ||
            row["country"] ||
            row.country ||
            row.location?.country ||
            row.address?.country ||
            dbItem?.country ||
            "India";
          return typeof val === "string" ? val.trim() : String(val);
        };

        const combinedCandidates = [];
        const seenIds = new Set();

        // Push direct candidates first
        directList.forEach((c) => {
          if (!c) return;
          const cId = c._id || c.id;
          if (cId) seenIds.add(String(cId));

          const normName = extractName(c);
          const normEmail = extractEmail(c);
          const normPhone = extractPhone(c);
          const normWorkMode = extractWorkMode(c);

          combinedCandidates.push({
            ...c,
            name: c.name || normName || "N/A",
            email: c.email || normEmail || "N/A",
            phone: c.phone || normPhone || "N/A",
            workMode: c.workMode || normWorkMode || "N/A",
          });
        });

        // Process candidate databases from Accept/Reject module
        dbList.forEach((dbItem) => {
          if (!dbItem) return;

          // Skip explicitly rejected items
          const isRejected =
            dbItem.status === "Rejected" ||
            dbItem.approvalStatus === "Rejected" ||
            dbItem.isApproved === false ||
            dbItem.approved === false;

          if (isRejected) return;

          // Check for inner candidate rows (e.g. from uploaded Excel file)
          const rows =
            (Array.isArray(dbItem.excelData) && dbItem.excelData.length > 0 && dbItem.excelData) ||
            (Array.isArray(dbItem.candidates) && dbItem.candidates.length > 0 && dbItem.candidates) ||
            (Array.isArray(dbItem.excel_data) && dbItem.excel_data.length > 0 && dbItem.excel_data) ||
            (Array.isArray(dbItem.parsedData) && dbItem.parsedData.length > 0 && dbItem.parsedData) ||
            (Array.isArray(dbItem.rows) && dbItem.rows.length > 0 && dbItem.rows) ||
            (Array.isArray(dbItem.data) && dbItem.data.length > 0 && dbItem.data);

          if (rows) {
            rows.forEach((row, rIdx) => {
              if (!row) return;
              const uniqueKey = row._id || `${dbItem._id}_${rIdx}`;
              if (seenIds.has(String(uniqueKey))) return;
              seenIds.add(String(uniqueKey));

              const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);
              const validMongoId = (row._id && isValidObjectId(String(row._id)))
                ? String(row._id)
                : (dbItem._id && isValidObjectId(String(dbItem._id)))
                ? String(dbItem._id)
                : uniqueKey;

              const name = extractName(row) || extractName(dbItem) || `Candidate #${rIdx + 1}`;
              const email = extractEmail(row) || extractEmail(dbItem) || "N/A";
              const phone = extractPhone(row) || extractPhone(dbItem) || "N/A";

              const catName =
                row.CategoryName ||
                row.categoryName ||
                row.category_name ||
                row.Category_Name ||
                row.Category ||
                row.category ||
                row["CATEGORY"] ||
                row["Category"] ||
                row["CATEGORY NAME"] ||
                row["Category Name"] ||
                (typeof row.category === "object" ? row.category?.name || row.category?.categoryName : "") ||
                dbItem.CategoryName ||
                dbItem.categoryName ||
                dbItem.category_name ||
                (typeof dbItem.category === "object" ? dbItem.category?.name || dbItem.category?.categoryName : dbItem.category) ||
                "N/A";

              const desigName =
                row.DesignationName ||
                row.designationName ||
                row.designation_name ||
                row.Designation_Name ||
                row.Designation ||
                row.designation ||
                row["DESIGNATION"] ||
                row["Designation"] ||
                row["DESIGNATION NAME"] ||
                row["Designation Name"] ||
                (typeof row.designation === "object" ? row.designation?.name || row.designation?.designationName : "") ||
                dbItem.DesignationName ||
                dbItem.designationName ||
                dbItem.designation_name ||
                (typeof dbItem.designation === "object" ? dbItem.designation?.name || dbItem.designation?.designationName : dbItem.designation) ||
                "N/A";

              combinedCandidates.push({
                ...row,
                _id: validMongoId,
                uniqueKey: uniqueKey,
                dbItemId: dbItem._id,
                name,
                email,
                phone,
                categoryName: catName,
                designationName: desigName,
                category: catName,
                designation: desigName,
                city: extractCity(row, dbItem),
                state: extractState(row, dbItem),
                country: extractCountry(row, dbItem),
                workMode: extractWorkMode(row, dbItem),
                experience: extractExperience(row, dbItem),
                createdAt: dbItem.createdAt || dbItem.exceluploadedDate || dbItem.uploadedDate || new Date().toISOString(),
                isApproved: true,
              });
            });
          } else {
            // Include dbItem itself if single candidate record
            const idVal = dbItem._id || dbItem.id;
            if (idVal && !seenIds.has(String(idVal))) {
              seenIds.add(String(idVal));
              combinedCandidates.push({
                _id: idVal,
                uniqueKey: String(idVal),
                dbItemId: idVal,
                name: extractName(dbItem) || "Candidate",
                categoryName: dbItem.CategoryName || dbItem.categoryName || "N/A",
                designationName: dbItem.DesignationName || dbItem.designationName || "N/A",
                phone: extractPhone(dbItem) || "N/A",
                email: extractEmail(dbItem) || "N/A",
                city: extractCity(null, dbItem),
                state: extractState(null, dbItem),
                country: extractCountry(null, dbItem),
                workMode: extractWorkMode(null, dbItem),
                experience: extractExperience(null, dbItem),
                isApproved: true,
                ...dbItem,
              });
            }
          }
        });

        state.candidates = combinedCandidates;
        state.total = candidateData?.total || candidateData?.count || candidateData?.pagination?.total || combinedCandidates.length;
        state.totalPages = candidateData?.totalPages || candidateData?.pagination?.pages || Math.ceil(state.total / (action.payload?.limit || 10)) || 1;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch candidates";
      });
  },
});

export default getAllCandidateSlice.reducer;