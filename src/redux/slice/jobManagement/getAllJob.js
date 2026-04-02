import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchAll",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://new-job-portal-be-2f6y.onrender.com/api/admin/jobs/getAllJobs?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Returns the full object: { success, data, totalJobs, totalPages, page, limit }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch jobs");
    }
  }
);

const getAllJobSlice = createSlice({
  name: "getAllJob",
  initialState: {
    jobs: [],
    pagination: {
      totalJobs: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 10,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data;
        // Sync pagination state with API response
        state.pagination.totalJobs = action.payload.totalJobs;
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.currentPage = action.payload.page;
        state.pagination.limit = action.payload.limit;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getAllJobSlice.reducer;