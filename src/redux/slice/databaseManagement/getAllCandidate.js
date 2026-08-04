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
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (search && search.trim()) params.search = search.trim();
      if (category) params.category = category;
      if (designation) params.designation = designation;
      if (location) params.location = location;
      if (city) params.city = city;
      if (state) params.state = state;
      if (country) params.country = country;
      if (workMode) params.workMode = workMode;
      if (experience) params.experience = experience;
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

      // Fetch direct candidates AND approved candidate databases from Accept/Reject module concurrently
      const [resCandidates, resDatabases] = await Promise.allSettled([
        axios.get(`${BASE_URL}/api/admin/candidate-database/getCandidates`, {
          params,
          ...authHeader,
        }),
        axios.get(
          `${BASE_URL}/api/admin/candidate-database/getCandidateDatabases?page=1&pageSize=1000`,
          authHeader
        ),
      ]);

      const candidateData =
        resCandidates.status === "fulfilled" ? resCandidates.value.data : null;
      const databaseData =
        resDatabases.status === "fulfilled" ? resDatabases.value.data : null;

      return {
        candidateData,
        databaseData,
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

        const combinedCandidates = [];
        const seenIds = new Set();

        // Push direct candidates first
        directList.forEach((c) => {
          if (!c) return;
          const cId = c._id || c.id;
          if (cId) seenIds.add(String(cId));
          combinedCandidates.push(c);
        });

        // Process approved candidate databases from Accept/Reject module
        dbList.forEach((dbItem) => {
          if (!dbItem) return;

          // Must be approved / accepted
          const isApproved =
            dbItem.isApproved ||
            dbItem.status === "Approved" ||
            dbItem.status === "Accepted" ||
            dbItem.approvalStatus === "Approved" ||
            dbItem.approved === true;

          if (!isApproved) return;

          // Check for inner candidate rows (e.g. from uploaded Excel file)
          const rows =
            (Array.isArray(dbItem.excelData) && dbItem.excelData.length > 0 && dbItem.excelData) ||
            (Array.isArray(dbItem.candidates) && dbItem.candidates.length > 0 && dbItem.candidates) ||
            (Array.isArray(dbItem.excel_data) && dbItem.excel_data.length > 0 && dbItem.excel_data) ||
            (Array.isArray(dbItem.parsedData) && dbItem.parsedData.length > 0 && dbItem.parsedData);

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

              const name =
                row["FULL NAME"] ||
                row["Candidate Name"] ||
                row.name ||
                row.fullName ||
                row.Name ||
                `Candidate #${rIdx + 1}`;

              const email =
                row["EMAIL"] ||
                row["EMAIL ID"] ||
                row.email ||
                row.Email ||
                "N/A";

              const phone =
                row["PHONE NUMBER"] ||
                row["MOBILE"] ||
                row.phone ||
                row.mobile ||
                row.Phone ||
                "N/A";

              const catName =
                dbItem.CategoryName ||
                dbItem.categoryName ||
                (typeof dbItem.category === "object" ? dbItem.category?.name || dbItem.category?.categoryName : dbItem.category) ||
                row.categoryName ||
                "N/A";

              const desigName =
                dbItem.DesignationName ||
                dbItem.designationName ||
                (typeof dbItem.designation === "object" ? dbItem.designation?.name || dbItem.designation?.designationName : dbItem.designation) ||
                row.designationName ||
                "N/A";

              combinedCandidates.push({
                _id: validMongoId,
                uniqueKey: uniqueKey,
                dbItemId: dbItem._id,
                name,
                email,
                phone,
                categoryName: catName,
                designationName: desigName,
                city: row["CITY"] || row.city || dbItem.city || "N/A",
                state: row["STATE"] || row.state || dbItem.state || "N/A",
                country: row["COUNTRY"] || row.country || dbItem.country || "India",
                workMode: row["WORK MODE"] || row.workMode || dbItem.workMode || "N/A",
                experience: row["EXPERIENCE"] || row.experience || dbItem.experience || "N/A",
                createdAt: dbItem.createdAt || dbItem.exceluploadedDate || dbItem.uploadedDate || new Date().toISOString(),
                isApproved: true,
                ...row,
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
                name: dbItem.name || dbItem.fullName || dbItem.HRName || "Candidate",
                categoryName: dbItem.CategoryName || dbItem.categoryName || "N/A",
                designationName: dbItem.DesignationName || dbItem.designationName || "N/A",
                phone: dbItem.phone || dbItem.mobile || "N/A",
                email: dbItem.email || "N/A",
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