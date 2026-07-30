import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ─── ASYNC THUNKS ────────────────────────────────────────────────────────────

// ✅ Fetch Terms And Service by userType (GET)
// userType: "employer" | "job_seeker"
export const fetchTermsAndService = createAsyncThunk(
  "terms/fetchTermsAndService",
  async (userType, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/api/admin/termsAndService/${userType}`,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data; // Expected: { success, data: { _id, content, userType, ... } }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Terms And Service"
      );
    }
  }
);

// ✅ Create Terms And Service (POST)
export const postTermsAndService = createAsyncThunk(
  "terms/postTermsAndService",
  async ({ userType, title, content }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `/api/admin/termsAndService/terms`,
        { userType, title, content },
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create Terms And Service"
      );
    }
  }
);

// ✅ Update Terms And Service by real MongoDB _id (PUT)
export const updateTermsAndService = createAsyncThunk(
  "terms/updateTermsAndService",
  async ({ id, title, content }, { rejectWithValue }) => {
    try {
      const response = await API.put(
        `/api/admin/termsAndService/terms/${id}`,
        { title, content },
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update Terms And Service"
      );
    }
  }
);

// ─── SLICE ───────────────────────────────────────────────────────────────────

const termsSlice = createSlice({
  name: "terms",
  initialState: {
    termsData: null,   // Holds fetched terms { _id, content, userType }
    loading: false,    // POST/PUT loading
    fetchLoading: false, // GET loading
    success: false,
    error: null,
  },
  reducers: {
    clearTermsState: (state) => {
      state.loading = false;
      state.fetchLoading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch Terms ───
      .addCase(fetchTermsAndService.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchTermsAndService.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.termsData = action.payload?.data || action.payload;
      })
      .addCase(fetchTermsAndService.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })

      // ─── Post Terms ───
      .addCase(postTermsAndService.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(postTermsAndService.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(postTermsAndService.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // ─── Update Terms ───
      .addCase(updateTermsAndService.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateTermsAndService.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateTermsAndService.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearTermsState } = termsSlice.actions;
export default termsSlice.reducer;
