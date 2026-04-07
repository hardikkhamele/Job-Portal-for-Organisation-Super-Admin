import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// ─── GET ALL JOBSEEKERS BY DESIGNATION ID (with pagination) ──
export const getJobSeekersByDesignationId = createAsyncThunk(
  "jobseeker/getByDesignationId",
  async ({ designationId, page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/admin/jobSeeker/getJobsSeekerByDesignationId/${designationId}?page=${page}&limit=${limit}`,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// ─── GET JOBSEEKER BY USER ID ─────────────────────────────────
export const getJobSeekerById = createAsyncThunk(
  "jobseeker/getById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/admin/jobSeeker/getJobsSeekerUserById/${userId}`,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// ─── SLICE ────────────────────────────────────────────────────
const jobseekerSlice = createSlice({
  name: "jobseeker",
  initialState: {
    // List
    jobSeekers: [],
    listLoading: false,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalRecords: 0,
      limit: 5,
    },
    activeDesignationId: null,

    // Detail
    selectedJobSeeker: null,
    detailLoading: false,

    error: null,
  },
  reducers: {
    setActiveDesignationId: (state, action) => {
      state.activeDesignationId = action.payload;
      state.jobSeekers = [];
      state.pagination = { currentPage: 1, totalPages: 1, totalRecords: 0, limit: 5 };
    },
    clearSelectedJobSeeker: (state) => {
      state.selectedJobSeeker = null;
    },
    clearJobSeekerError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── getJobSeekersByDesignationId
      .addCase(getJobSeekersByDesignationId.pending, (state) => {
        state.listLoading = true;
        state.error = null;
      })
      .addCase(getJobSeekersByDesignationId.fulfilled, (state, action) => {
        state.listLoading = false;
        state.jobSeekers = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getJobSeekersByDesignationId.rejected, (state, action) => {
        state.listLoading = false;
        state.error = action.payload;
      })

      // ── getJobSeekerById
      .addCase(getJobSeekerById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(getJobSeekerById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedJobSeeker = action.payload.data;
      })
      .addCase(getJobSeekerById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setActiveDesignationId,
  clearSelectedJobSeeker,
  clearJobSeekerError,
} = jobseekerSlice.actions;

export default jobseekerSlice.reducer;