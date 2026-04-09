import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchCandidates = createAsyncThunk(
  "candidates/fetchCandidates",
  async ({ page, limit, search,category, designation }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); 

      const response = await axios.get(`${BASE_URL}/api/admin/candidate-database/getCandidates`, {
        params: { page, limit, search,category,designation },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        state.candidates = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getAllCandidateSlice.reducer;