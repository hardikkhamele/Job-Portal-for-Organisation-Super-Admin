import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchExcelData = createAsyncThunk(
  "excelData/fetchExcelData",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const cleanBase = (BASE_URL || "http://localhost:3000").replace(/\/$/, "");
      const headers = { Authorization: `Bearer ${token}` };

      // Candidate database detail endpoints to try
      const endpoints = [
        `${cleanBase}/api/admin/accept-reject/${id}`,
        `${cleanBase}/api/admin/candidate-database/getexcelData/${id}`,
        `${cleanBase}/api/admin/candidate-database/${id}`,
        `${cleanBase}/api/admin/candidate-database/getCandidateDatabase/${id}`,
      ];

      let lastError = null;
      for (const endpoint of endpoints) {
        try {
          const response = await axios.get(endpoint, { headers });
          if (response.data) {
            return response.data;
          }
        } catch (err) {
          lastError = err;
          // If status is not 404, we still try others in case of route mismatch
        }
      }

      return rejectWithValue(
        lastError?.response?.data?.message || "Failed to fetch excel data"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch excel data"
      );
    }
  }
);

const getExcelDataSlice = createSlice({
  name: "excelData",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearExcelData: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    updateExcelDataState: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExcelData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExcelData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchExcelData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearExcelData, updateExcelDataState } = getExcelDataSlice.actions;
export default getExcelDataSlice.reducer;
