import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchHrReports = createAsyncThunk(
  "hrReports/fetch",
  async ({ hrId, date, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      // API call with pagination and date filters
      const response = await axios.get(
        `${BASE_URL}/api/admin/hr/gethr/${hrId}/reports?date=${date}&page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Expected: { data: [...], total: 50, pages: 5, ... }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching reports");
    }
  }
);

const getReportofHrSlice = createSlice({
  name: "getReportofHr",
  initialState: {
    reports: [],
    totalRecords: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearReports: (state) => {
      state.reports = [];
      state.totalRecords = 0;
      state.totalPages = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHrReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHrReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data;
        state.totalRecords = action.payload.total;
        state.totalPages = action.payload.pages;
      })
      .addCase(fetchHrReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReports } = getReportofHrSlice.actions;
export default getReportofHrSlice.reducer;