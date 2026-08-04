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

      const response = await axios.get(
        `${BASE_URL}/api/admin/candidate-database/getCandidates`,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
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
        const list =
          action.payload?.data ||
          action.payload?.candidates ||
          (Array.isArray(action.payload) ? action.payload : []);
        state.candidates = Array.isArray(list) ? list : [];
        state.total =
          action.payload?.total || action.payload?.count || state.candidates.length;
        state.totalPages =
          action.payload?.totalPages ||
          Math.ceil(state.total / (action.payload?.limit || 10)) ||
          1;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch candidates";
      });
  },
});

export default getAllCandidateSlice.reducer;